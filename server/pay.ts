import { createHmac } from "node:crypto"
import type { Hono } from "hono"
import { db, id, nowIso } from "./db.js"
import "./env.js"

export function razorpayKeys() {
  const keyId = (process.env.RAZORPAY_KEY_ID || "").trim()
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim()
  if (!keyId || !keySecret) return null
  return { keyId, keySecret }
}

type Pack = { amount: number; bonus: number }

type Deps = {
  requireUser: (c: { req: { header: (n: string) => string | undefined } }) => {
    error: "Unauthorized" | null
    userId: string | null
  }
  profile: (userId: string) => unknown
  creditWallet: (userId: string, amount: number, reason: string) => void
  packs: Record<number, Pack>
  firstRechargeBonus: number
}

function alreadyPacked(userId: string) {
  return (
    db.prepare("SELECT COUNT(*) AS n FROM wallet_ledger WHERE user_id = ? AND reason LIKE 'pack:%'").get(userId) as {
      n: number
    }
  ).n
}

function creditIfNew(deps: Deps, orderId: string, paymentId: string) {
  const row = db
    .prepare("SELECT * FROM upi_orders WHERE razorpay_order_id = ?")
    .get(orderId) as
    | {
        id: string
        user_id: string
        pack_amount: number
        credit_amount: number
        status: string
      }
    | undefined
  if (!row) return { ok: false as const, error: "Unknown UPI order." }
  if (row.status === "paid") return { ok: true as const, already: true, userId: row.user_id, credited: row.credit_amount }
  const tx = db.transaction(() => {
    const upd = db
      .prepare(
        "UPDATE upi_orders SET status = 'paid', razorpay_payment_id = ?, paid_at = ? WHERE razorpay_order_id = ? AND status = 'created'"
      )
      .run(paymentId, nowIso(), orderId)
    if (upd.changes === 0) return
    deps.creditWallet(row.user_id, row.credit_amount, `pack:${row.pack_amount}`)
  })
  tx()
  return { ok: true as const, already: false, userId: row.user_id, credited: row.credit_amount }
}

async function razorpayOrder(keyId: string, keySecret: string, body: Record<string, unknown>) {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as { id?: string; amount?: number; error?: { description?: string } }
  if (!res.ok || !data.id) {
    throw new Error(data.error?.description || "Could not create UPI order.")
  }
  return data
}

export function mountUpiRoutes(app: Hono, deps: Deps) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS upi_orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      pack_amount INTEGER NOT NULL,
      pay_paise INTEGER NOT NULL,
      credit_amount INTEGER NOT NULL,
      razorpay_order_id TEXT NOT NULL UNIQUE,
      razorpay_payment_id TEXT,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      paid_at TEXT
    );
  `)

  app.get("/api/pay/upi/config", (c) => {
    const keys = razorpayKeys()
    return c.json({
      enabled: Boolean(keys),
      method: "upi",
      provider: "razorpay",
    })
  })

  app.post("/api/pay/upi/order", async (c) => {
    const { error, userId } = deps.requireUser(c)
    if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
    const keys = razorpayKeys()
    if (!keys) {
      return c.json(
        {
          error: "UPI is not live until RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set on the server.",
        },
        503
      )
    }
    const body = (await c.req.json().catch(() => ({}))) as { pack?: number }
    const pack = deps.packs[Number(body.pack)]
    if (!pack) return c.json({ error: "Unknown wallet pack." }, 400)
    const extra = alreadyPacked(userId) === 0 ? deps.firstRechargeBonus : 0
    const credit = pack.amount + pack.bonus + extra
    const payPaise = pack.amount * 100
    const localId = id("upi")
    try {
      const order = await razorpayOrder(keys.keyId, keys.keySecret, {
        amount: payPaise,
        currency: "INR",
        receipt: localId.slice(0, 40),
        payment_capture: 1,
        notes: {
          userId,
          pack: String(pack.amount),
          credit: String(credit),
        },
      })
      db.prepare(
        `INSERT INTO upi_orders (id, user_id, pack_amount, pay_paise, credit_amount, razorpay_order_id, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'created', ?)`
      ).run(localId, userId, pack.amount, payPaise, credit, order.id, nowIso())
      const u = db.prepare("SELECT name, email FROM users WHERE id = ?").get(userId) as { name: string; email: string }
      return c.json({
        keyId: keys.keyId,
        orderId: order.id,
        amount: payPaise,
        currency: "INR",
        pack: pack.amount,
        credit,
        firstBonus: extra,
        name: u.name,
        email: u.email,
      })
    } catch (e) {
      return c.json({ error: e instanceof Error ? e.message : "UPI order failed." }, 502)
    }
  })

  app.post("/api/pay/upi/verify", async (c) => {
    const { error, userId } = deps.requireUser(c)
    if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
    const keys = razorpayKeys()
    if (!keys) return c.json({ error: "UPI is not configured." }, 503)
    const body = (await c.req.json().catch(() => ({}))) as {
      razorpay_order_id?: string
      razorpay_payment_id?: string
      razorpay_signature?: string
    }
    const orderId = body.razorpay_order_id || ""
    const paymentId = body.razorpay_payment_id || ""
    const signature = body.razorpay_signature || ""
    if (!orderId || !paymentId || !signature) return c.json({ error: "Missing UPI signature." }, 400)
    const expected = createHmac("sha256", keys.keySecret).update(`${orderId}|${paymentId}`).digest("hex")
    if (expected !== signature) return c.json({ error: "UPI signature mismatch. Wallet not credited." }, 400)
    const owned = db
      .prepare("SELECT user_id FROM upi_orders WHERE razorpay_order_id = ?")
      .get(orderId) as { user_id: string } | undefined
    if (!owned || owned.user_id !== userId) return c.json({ error: "This UPI order is not yours." }, 403)
    const settled = creditIfNew(deps, orderId, paymentId)
    if (!settled.ok) return c.json({ error: settled.error }, 404)
    return c.json({ ...deps.profile(userId), credited: settled.credited, already: settled.already })
  })

  app.post("/api/pay/upi/webhook", async (c) => {
    const secret = (process.env.RAZORPAY_WEBHOOK_SECRET || "").trim()
    if (!secret) return c.json({ error: "Webhook secret not set." }, 503)
    const raw = await c.req.text()
    const sig = c.req.header("x-razorpay-signature") || ""
    const expected = createHmac("sha256", secret).update(raw).digest("hex")
    if (expected !== sig) return c.json({ error: "Bad webhook signature." }, 400)
    const payload = JSON.parse(raw) as {
      event?: string
      payload?: { payment?: { entity?: { id?: string; order_id?: string; status?: string } } }
    }
    if (payload.event !== "payment.captured" && payload.event !== "payment.authorized") {
      return c.json({ ok: true, ignored: payload.event })
    }
    const entity = payload.payload?.payment?.entity
    if (!entity?.id || !entity.order_id) return c.json({ ok: true })
    creditIfNew(deps, entity.order_id, entity.id)
    return c.json({ ok: true })
  })
}
