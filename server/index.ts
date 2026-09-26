import "./env.js"
import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { streamSSE } from "hono/streaming"
import { db, id, monthKey, nowIso } from "./db.js"
import { bearer, createSession, destroySession, hashPassword, userIdFromToken, verifyPassword } from "./auth.js"
import { seed } from "./seed.js"
import {
  attachRtcSocket,
  getRoom,
  mintRoomToken,
  othersOf,
  prunePeers,
  pushSignal,
  readRoomToken,
} from "./rtc.js"
import { computeNatal, computePanchang } from "../src/lib/vedic/engine.js"
import {
  buildHoroscope,
  geocodePlace,
  planCatalog,
  serializeMatch,
  serializeNatal,
  serializePanchang,
} from "./live.js"
import { offeringById } from "../src/data/offerings.js"
import { pujaById } from "../src/data/pujas.js"
import {
  FIRST_FREE_MINUTES,
  FIRST_RECHARGE_BONUS,
  PLAN_PRICE_INR,
  PLAN_TALK_CREDIT,
  REPORT_FEE,
  SECOND_OPINION_FEE,
  SHIP_FEE,
  WALLET_PACKS,
  WELCOME_CREDIT,
} from "../src/lib/entitlements.js"
import { mountUpiRoutes } from "./pay.js"
import { mountSpa } from "./static.js"
import { rtcSecret } from "./env.js"

seed()

const PLAN_LIMITS = {
  free: { ai: 5, muhurta: 3, activePredictions: 3, family: false },
  plus: { ai: Infinity, muhurta: Infinity, activePredictions: Infinity, family: false },
  family: { ai: Infinity, muhurta: Infinity, activePredictions: Infinity, family: true },
} as const

type Plan = keyof typeof PLAN_LIMITS

export const app = new Hono()
app.use(
  "*",
  cors({
    origin: (origin) => origin || "*",
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
)

function authUser(c: { req: { header: (n: string) => string | undefined } }) {
  const token = bearer(c.req.header("authorization"))
  const userId = userIdFromToken(token)
  return { token, userId }
}

function requireUser(c: { req: { header: (n: string) => string | undefined } }) {
  const { token, userId } = authUser(c)
  if (!userId) return { error: "Unauthorized" as const, userId: null, token }
  return { error: null, userId, token }
}

const INVITE_CREDIT = 50
const STREAK_BONUS = 10
const PACK_BY_AMOUNT = Object.fromEntries(WALLET_PACKS.map((p) => [p.amount, p])) as Record<
  number,
  (typeof WALLET_PACKS)[number]
>

function todayIST() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
}

function yesterdayIST() {
  const d = new Date()
  d.setTime(d.getTime() - 24 * 60 * 60 * 1000)
  return d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
}

function makeInviteCode(name: string) {
  const base = (name || "LIVE").replace(/[^A-Za-z]/g, "").slice(0, 5).toUpperCase() || "LIVE"
  return `${base}${Math.random().toString(36).slice(2, 5).toUpperCase()}`
}

function ensureInviteCode(userId: string, name: string) {
  const row = db.prepare("SELECT invite_code FROM users WHERE id = ?").get(userId) as { invite_code: string | null } | undefined
  if (row?.invite_code) return row.invite_code
  for (let i = 0; i < 8; i++) {
    const code = i === 0 && userId === "u1" ? "ARJUN" : makeInviteCode(name)
    try {
      db.prepare("UPDATE users SET invite_code = ? WHERE id = ?").run(code, userId)
      return code
    } catch {
      /* unique clash */
    }
  }
  const fallback = `LIVE${userId.slice(-4).toUpperCase()}`
  db.prepare("UPDATE users SET invite_code = ? WHERE id = ?").run(fallback, userId)
  return fallback
}

function creditWallet(userId: string, amount: number, reason: string) {
  db.prepare("UPDATE users SET wallet_balance = wallet_balance + ?, updated_at = ? WHERE id = ?").run(amount, nowIso(), userId)
  db.prepare("INSERT INTO wallet_ledger (id, user_id, amount, reason, created_at) VALUES (?, ?, ?, ?, ?)").run(
    id("wlt"),
    userId,
    amount,
    reason,
    nowIso()
  )
}

function takeWallet(userId: string, amount: number, reason: string) {
  const row = db.prepare("SELECT wallet_balance FROM users WHERE id = ?").get(userId) as { wallet_balance: number }
  if (row.wallet_balance < amount) {
    return { ok: false as const, wallet: row.wallet_balance, needed: amount }
  }
  if (amount > 0) creditWallet(userId, -amount, reason)
  return { ok: true as const, wallet: row.wallet_balance - amount, needed: amount }
}

function applyReferral(newUserId: string, rawCode?: string) {
  const code = (rawCode || "").trim()
  if (!code) return
  const inviter = db.prepare("SELECT id FROM users WHERE invite_code = ? COLLATE NOCASE").get(code) as { id: string } | undefined
  if (!inviter || inviter.id === newUserId) return
  const already = db.prepare("SELECT id FROM referrals WHERE invitee_id = ?").get(newUserId)
  if (already) return
  db.prepare("INSERT INTO referrals (id, inviter_id, invitee_id, code, created_at) VALUES (?, ?, ?, ?, ?)").run(
    id("ref"),
    inviter.id,
    newUserId,
    code.toUpperCase(),
    nowIso()
  )
  creditWallet(inviter.id, INVITE_CREDIT, "invite-reward")
  creditWallet(newUserId, INVITE_CREDIT, "invite-welcome")
}

function usageFor(userId: string) {
  const key = monthKey()
  let row = db.prepare("SELECT * FROM usage_months WHERE user_id = ? AND month_key = ?").get(userId, key) as
    | { ai_questions: number; muhurta_queries: number }
    | undefined
  if (!row) {
    db.prepare("INSERT INTO usage_months (user_id, month_key, ai_questions, muhurta_queries) VALUES (?, ?, 0, 0)").run(userId, key)
    row = { ai_questions: 0, muhurta_queries: 0 }
  }
  return { monthKey: key, aiQuestions: row.ai_questions, muhurtaQueries: row.muhurta_queries }
}

function profile(userId: string) {
  const u = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as Record<string, unknown> | undefined
  if (!u) return null
  const family = db.prepare("SELECT id, name, relation, dob, time_of_birth as timeOfBirth, place_of_birth as placeOfBirth FROM family_members WHERE user_id = ?").all(userId)
  const consultations = db
    .prepare(
      "SELECT id, astrologer_name as astrologerName, topic, started_at as date, duration_minutes as durationMinutes, cost FROM consultations WHERE user_id = ? ORDER BY started_at DESC LIMIT 20"
    )
    .all(userId)
  const predictions = db
    .prepare(
      "SELECT id, title, category, confidence, status, astrologer_name as astrologerName FROM predictions WHERE user_id = ? ORDER BY consultation_date DESC LIMIT 20"
    )
    .all(userId)
  const invitedCount = (
    db.prepare("SELECT COUNT(*) AS n FROM referrals WHERE inviter_id = ?").get(userId) as { n: number }
  ).n
  const inviteCode = ensureInviteCode(userId, String(u.name || "LIVE"))
  const recharged = (
    db.prepare("SELECT COUNT(*) AS n FROM wallet_ledger WHERE user_id = ? AND reason LIKE 'pack:%'").get(userId) as {
      n: number
    }
  ).n
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    dob: u.dob,
    timeOfBirth: u.time_of_birth,
    placeOfBirth: u.place_of_birth,
    avatar: u.avatar,
    plan: u.plan,
    planSince: u.plan_since,
    walletBalance: u.wallet_balance,
    onboardingComplete: Boolean(u.onboarding_complete),
    starterDismissed: Boolean(u.starter_dismissed),
    intentions: JSON.parse(String(u.intentions || "[]")),
    memberSince: u.member_since,
    inviteCode,
    invitedCount,
    checkinStreak: Number(u.checkin_streak || 0),
    lastCheckin: u.last_checkin || null,
    welcomeGranted: Boolean(u.welcome_granted),
    firstSessionFree: !Number(u.first_session_used || 0),
    hasRecharged: recharged > 0,
    usage: usageFor(userId),
    family,
    consultations,
    predictions,
  }
}

function mapPrediction(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    astrologer: { name: row.astrologer_name, avatar: "" },
    consultationDate: row.consultation_date,
    targetDate: row.target_date,
    confidence: row.confidence,
    status: row.status,
    outcome: row.outcome,
    notes: row.notes,
    evidenceNote: row.evidence_note,
    evidenceName: row.evidence_name,
    closedAt: row.closed_at,
  }
}

app.get("/api/health", (c) =>
  c.json({
    status: "ok",
    server: "AstroLive API",
    engine: "hono + better-sqlite3 + vedic + rtc-ws",
    time: nowIso(),
    live: ["sky", "geo", "panchang", "horoscope", "kundli", "match", "plans"],
  })
)

app.get("/api/plans", (c) => c.json(planCatalog()))

app.get("/api/geo", async (c) => {
  const q = c.req.query("q") || c.req.query("place") || "New Delhi, India"
  const place = await geocodePlace(q)
  return c.json({ ...place, source: place.name.includes(q.split(",")[0]) ? "cache-or-live" : "live" })
})

app.get("/api/panchang", async (c) => {
  const q = c.req.query("place") || "New Delhi, India"
  const place = await geocodePlace(q)
  return c.json(serializePanchang(place.name))
})

app.get("/api/horoscope", async (c) => {
  const rashi = Number(c.req.query("rashi") || 0)
  const rangeRaw = c.req.query("range") || "today"
  const range = rangeRaw === "tomorrow" || rangeRaw === "week" || rangeRaw === "month" ? rangeRaw : "today"
  const q = c.req.query("place") || "New Delhi, India"
  await geocodePlace(q)
  return c.json(buildHoroscope(Number.isFinite(rashi) ? rashi : 0, range, q))
})

app.get("/api/kundli", async (c) => {
  const dob = c.req.query("dob") || "1994-08-14"
  const time = c.req.query("time") || "08:30"
  const q = c.req.query("place") || "New Delhi, India"
  const place = await geocodePlace(q)
  return c.json(serializeNatal(dob, time, place.name))
})

app.post("/api/match", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as {
    a?: { dob?: string; time?: string; place?: string }
    b?: { dob?: string; time?: string; place?: string }
  }
  const a = {
    dob: body.a?.dob || "1994-08-14",
    time: body.a?.time || "08:30",
    place: (await geocodePlace(body.a?.place || "New Delhi, India")).name,
  }
  const b = {
    dob: body.b?.dob || "1996-03-12",
    time: body.b?.time || "10:15",
    place: (await geocodePlace(body.b?.place || "Mumbai, India")).name,
  }
  return c.json(serializeMatch(a, b))
})

app.get("/api/sky", async (c) => {
  const dob = c.req.query("dob") || "1994-08-14"
  const time = c.req.query("time") || "08:30"
  const q = c.req.query("place") || "New Delhi, India"
  const place = await geocodePlace(q)
  const natal = computeNatal(dob, time, place.name)
  const sky = computePanchang(new Date(), place.name)
  return c.json({
    computed: true,
    engine: "lahiri-sidereal",
    place,
    natal: {
      lagnaSign: natal.lagnaSign,
      sunSign: natal.sunSign,
      moonSign: natal.moonSign,
      moonNakshatra: natal.moonNakshatra,
      dasha: natal.dasha.label,
      ayanamsa: natal.ayanamsa,
      bodies: natal.bodies.map((b) => ({
        id: b.id,
        sign: b.sign,
        house: b.house,
        dignity: b.dignity,
        degree: b.degreeLabel,
      })),
    },
    now: {
      moonSign: sky.moonSign,
      tithi: sky.tithi,
      nakshatra: sky.nakshatra,
      yoga: sky.yoga,
      karana: sky.karana,
      rahuKaal: sky.rahuKaal.label,
      abhijit: sky.abhijit.label,
      sunrise: sky.sunrise.toISOString(),
      sunset: sky.sunset.toISOString(),
    },
  })
})

app.get("/api/tape", (c) => {
  const rows = db
    .prepare(
      `SELECT id, title, category, astrologer_name, user_name, outcome, verified_on
       FROM proofs ORDER BY verified_on DESC LIMIT 30`
    )
    .all() as Record<string, unknown>[]
  return c.json(
    rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      astrologerName: r.astrologer_name,
      firstName: String(r.user_name || "Someone").split(" ")[0],
      outcome: r.outcome,
      verifiedOn: r.verified_on,
    }))
  )
})

app.get("/api/tape/stream", (c) => {
  return streamSSE(c, async (stream) => {
    let last = ""
    const tick = async () => {
      const rows = db
        .prepare(
          `SELECT id, title, astrologer_name, outcome, verified_on
           FROM proofs ORDER BY verified_on DESC LIMIT 8`
        )
        .all() as Record<string, unknown>[]
      const payload = JSON.stringify(rows)
      if (payload !== last) {
        last = payload
        await stream.writeSSE({ event: "tape", data: payload })
      }
    }
    await tick()
    while (true) {
      await stream.sleep(4000)
      await tick()
    }
  })
})

app.get("/api/proof-scores", (c) => {
  const rows = db
    .prepare(
      `SELECT astrologer_name as name,
        COUNT(*) as closed,
        SUM(CASE WHEN outcome = 'yes' OR (status = 'completed' AND (outcome IS NULL OR outcome = '')) THEN 1 ELSE 0 END) as cameTrue,
        SUM(CASE WHEN outcome = 'partial' THEN 1 ELSE 0 END) as partial,
        SUM(CASE WHEN outcome = 'no' OR status = 'failed' THEN 1 ELSE 0 END) as missed
       FROM predictions
       WHERE status IN ('completed', 'failed')
       GROUP BY astrologer_name`
    )
    .all() as { name: string; closed: number; cameTrue: number; partial: number; missed: number }[]
  return c.json(
    rows
      .map((r) => ({
        name: r.name,
        closed: Number(r.closed),
        cameTrue: Number(r.cameTrue),
        partial: Number(r.partial),
        missed: Number(r.missed),
        hitRate: r.closed > 0 ? Math.round((Number(r.cameTrue) / Number(r.closed)) * 100) : 0,
      }))
      .sort((a, b) => b.closed - a.closed || b.hitRate - a.hitRate)
  )
})

app.get("/api/practitioners", (c) => {
  const rows = db.prepare("SELECT * FROM practitioners").all() as Record<string, unknown>[]
  return c.json(
    rows.map((p) => ({
      id: p.id,
      name: p.name,
      title: p.title,
      specialty: p.specialty,
      tag: p.tag,
      accuracy: p.accuracy,
      imageUrl: p.image_url,
      bio: p.bio,
      experienceYears: p.experience_years,
      ratePerMin: p.rate_per_min,
      rating: p.rating,
      totalSessions: p.total_sessions,
      isOnline: Boolean(p.is_online),
      featuredQuote: p.featured_quote,
      techniques: JSON.parse(String(p.techniques || "[]")),
    }))
  )
})

app.post("/api/auth/register", async (c) => {
  const body = await c.req.json().catch(() => ({})) as {
    name?: string
    email?: string
    password?: string
    dob?: string
    timeOfBirth?: string
    placeOfBirth?: string
    invite?: string
    ref?: string
  }
  const email = (body.email || "").trim().toLowerCase()
  const password = body.password || ""
  if (!email || !password || password.length < 8) {
    return c.json({ error: "Email and a password of 8+ characters are required." }, 400)
  }
  const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(email)
  if (exists) return c.json({ error: "An account with that email already exists." }, 409)
  const userId = id("user")
  const created = nowIso()
  db.prepare(`
    INSERT INTO users (
      id, email, password_hash, name, dob, time_of_birth, place_of_birth,
      avatar, plan, wallet_balance, onboarding_complete, starter_dismissed,
      intentions, member_since, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, '', 'free', 0, 0, 0, '[]', ?, ?, ?)
  `).run(
    userId,
    email,
    hashPassword(password),
    (body.name || "User").trim(),
    body.dob || "1998-05-15",
    body.timeOfBirth || "08:30",
    body.placeOfBirth || "New Delhi, India",
    "Just now",
    created,
    created
  )
  ensureInviteCode(userId, (body.name || "User").trim())
  creditWallet(userId, WELCOME_CREDIT, "welcome-grant")
  db.prepare("UPDATE users SET welcome_granted = 1, updated_at = ? WHERE id = ?").run(nowIso(), userId)
  applyReferral(userId, body.invite || body.ref)
  const session = createSession(userId)
  return c.json({ token: session.token, user: profile(userId) }, 201)
})

app.post("/api/auth/login", async (c) => {
  const body = await c.req.json().catch(() => ({})) as { email?: string; password?: string }
  const email = (body.email || "").trim().toLowerCase()
  const row = db.prepare("SELECT id, password_hash FROM users WHERE email = ?").get(email) as
    | { id: string; password_hash: string }
    | undefined
  if (!row || !verifyPassword(body.password || "", row.password_hash)) {
    return c.json({ error: "Account not found or password incorrect." }, 401)
  }
  const session = createSession(row.id)
  return c.json({ token: session.token, user: profile(row.id) })
})

app.post("/api/auth/logout", (c) => {
  const token = bearer(c.req.header("authorization"))
  if (token) destroySession(token)
  return c.json({ ok: true })
})

app.get("/api/invite/:code", (c) => {
  const code = c.req.param("code").trim()
  const row = db.prepare("SELECT name, invite_code FROM users WHERE invite_code = ? COLLATE NOCASE").get(code) as
    | { name: string; invite_code: string }
    | undefined
  if (!row) return c.json({ error: "Invite not found." }, 404)
  return c.json({
    code: row.invite_code,
    name: String(row.name).split(" ")[0],
    credit: INVITE_CREDIT,
  })
})

app.post("/api/checkin", (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const today = todayIST()
  const row = db.prepare("SELECT last_checkin, checkin_streak FROM users WHERE id = ?").get(userId) as {
    last_checkin: string | null
    checkin_streak: number
  }
  if (row.last_checkin === today) {
    return c.json({ ...profile(userId), checkinBonus: 0, already: true })
  }
  const streak = row.last_checkin === yesterdayIST() ? Number(row.checkin_streak || 0) + 1 : 1
  db.prepare("UPDATE users SET last_checkin = ?, checkin_streak = ?, updated_at = ? WHERE id = ?").run(
    today,
    streak,
    nowIso(),
    userId
  )
  let checkinBonus = 0
  if (streak > 0 && streak % 7 === 0) {
    creditWallet(userId, STREAK_BONUS, `streak-${streak}`)
    checkinBonus = STREAK_BONUS
  }
  return c.json({ ...profile(userId), checkinBonus, already: false })
})

app.get("/api/me", (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  return c.json(profile(userId))
})

app.patch("/api/me", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const body = await c.req.json().catch(() => ({})) as Record<string, unknown>
  const current = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as Record<string, unknown>
  const next = {
    name: String(body.name ?? current.name),
    email: String(body.email ?? current.email).toLowerCase(),
    dob: String(body.dob ?? current.dob),
    time_of_birth: String(body.timeOfBirth ?? current.time_of_birth),
    place_of_birth: String(body.placeOfBirth ?? current.place_of_birth),
    onboarding_complete: body.onboardingComplete === undefined ? current.onboarding_complete : body.onboardingComplete ? 1 : 0,
    starter_dismissed: body.starterDismissed === undefined ? current.starter_dismissed : body.starterDismissed ? 1 : 0,
    intentions: body.intentions ? JSON.stringify(body.intentions) : current.intentions,
    updated_at: nowIso(),
  }
  db.prepare(`
    UPDATE users SET name=?, email=?, dob=?, time_of_birth=?, place_of_birth=?,
      onboarding_complete=?, starter_dismissed=?, intentions=?, updated_at=?
    WHERE id=?
  `).run(
    next.name,
    next.email,
    next.dob,
    next.time_of_birth,
    next.place_of_birth,
    next.onboarding_complete,
    next.starter_dismissed,
    next.intentions,
    next.updated_at,
    userId
  )
  return c.json(profile(userId))
})

app.post("/api/me/plan", (c) => {
  return c.json({ error: "Use POST /api/checkout/plan. Plans cannot be set by clicking." }, 403)
})

app.post("/api/checkout/plan", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const body = await c.req.json().catch(() => ({})) as { plan?: Plan; confirm?: boolean }
  const plan = body.plan
  if (plan !== "free" && plan !== "plus" && plan !== "family") return c.json({ error: "Unknown plan." }, 400)
  if (!body.confirm) return c.json({ error: "Confirmation required." }, 400)

  const current = db.prepare("SELECT plan, wallet_balance FROM users WHERE id = ?").get(userId) as {
    plan: Plan
    wallet_balance: number
  }
  if (current.plan === plan) return c.json({ error: "Already on that plan.", user: profile(userId) }, 400)

  const price = PLAN_PRICE_INR[plan]
  if (plan !== "free" && current.wallet_balance < price) {
    return c.json(
      {
        error: `Need ₹${price} in the wallet. You have ₹${current.wallet_balance}. Recharge first.`,
        needed: price,
        wallet: current.wallet_balance,
      },
      402
    )
  }

  const talkCredit = PLAN_TALK_CREDIT[plan] - PLAN_TALK_CREDIT[current.plan]
  const tx = db.transaction(() => {
    if (plan !== "free") {
      db.prepare("UPDATE users SET wallet_balance = wallet_balance - ?, updated_at = ? WHERE id = ?").run(price, nowIso(), userId)
      db.prepare("INSERT INTO wallet_ledger (id, user_id, amount, reason, created_at) VALUES (?, ?, ?, ?, ?)").run(
        id("wlt"),
        userId,
        -price,
        `plan:${plan}`,
        nowIso()
      )
    }
    db.prepare("UPDATE users SET plan = ?, plan_since = ?, updated_at = ? WHERE id = ?").run(plan, nowIso(), nowIso(), userId)
    if (talkCredit > 0) creditWallet(userId, talkCredit, `plan-credit:${plan}`)
  })
  tx()
  return c.json(profile(userId))
})

app.post("/api/checkout/wallet", async (c) => {
  return c.json({ error: "Wallet top-up is UPI only. Use POST /api/pay/upi/order." }, 403)
})

app.post("/api/checkout/session", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const body = await c.req.json().catch(() => ({})) as {
    minutes?: number
    ratePerMin?: number
    practitionerId?: string
    practitionerName?: string
    mode?: string
    confirm?: boolean
  }
  if (!body.confirm) return c.json({ error: "Confirmation required." }, 400)
  const minutes = Math.max(1, Math.ceil(Number(body.minutes) || 0))
  const rate = Math.max(1, Math.min(500, Math.floor(Number(body.ratePerMin) || 0)))
  const row = db.prepare("SELECT first_session_used, wallet_balance FROM users WHERE id = ?").get(userId) as {
    first_session_used: number
    wallet_balance: number
  }
  const freeMinutes = row.first_session_used ? 0 : Math.min(FIRST_FREE_MINUTES, minutes)
  const billable = Math.max(0, minutes - freeMinutes)
  const cost = billable * rate
  if (cost > row.wallet_balance) {
    return c.json(
      {
        error: `Need ₹${cost} in the wallet. You have ₹${row.wallet_balance}.`,
        needed: cost,
        wallet: row.wallet_balance,
      },
      402
    )
  }
  const tx = db.transaction(() => {
    if (cost > 0) creditWallet(userId, -cost, "session")
    if (!row.first_session_used) {
      db.prepare("UPDATE users SET first_session_used = 1, updated_at = ? WHERE id = ?").run(nowIso(), userId)
    }
    db.prepare(
      `INSERT INTO consultations (
        id, user_id, practitioner_id, astrologer_name, topic, mode, started_at, ended_at, duration_minutes, cost, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ended')`
    ).run(
      id("c"),
      userId,
      body.practitionerId || null,
      (body.practitionerName || "Astrologer").slice(0, 80),
      "Live session",
      body.mode === "audio" || body.mode === "video" ? body.mode : "chat",
      nowIso(),
      nowIso(),
      minutes,
      cost
    )
  })
  tx()
  return c.json({ ...profile(userId), charged: cost, freeMinutes, billable })
})

app.get("/api/claims", (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const rows = db
    .prepare("SELECT offering_id as offeringId, cost, created_at as createdAt FROM claims WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId)
  return c.json(rows)
})

app.post("/api/claims", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const body = (await c.req.json().catch(() => ({}))) as { offeringId?: string; confirm?: boolean }
  if (!body.confirm) return c.json({ error: "Confirmation required." }, 400)
  const item = offeringById(body.offeringId || "")
  if (!item) return c.json({ error: "Unknown offering." }, 400)
  const already = db.prepare("SELECT id FROM claims WHERE user_id = ? AND offering_id = ?").get(userId, item.id)
  if (already) return c.json({ error: "Already in the vault." }, 409)
  const row = db.prepare("SELECT wallet_balance FROM users WHERE id = ?").get(userId) as { wallet_balance: number }
  if (row.wallet_balance < item.minWallet || row.wallet_balance < item.cost) {
    return c.json(
      { error: `Need ₹${Math.max(item.minWallet, item.cost)} in the wallet.`, needed: item.minWallet, wallet: row.wallet_balance },
      402
    )
  }
  const tx = db.transaction(() => {
    if (item.cost > 0) creditWallet(userId, -item.cost, `claim:${item.id}`)
    db.prepare("INSERT INTO claims (id, user_id, offering_id, cost, created_at) VALUES (?, ?, ?, ?, ?)").run(
      id("clm"),
      userId,
      item.id,
      item.cost,
      nowIso()
    )
  })
  tx()
  const claimed = db
    .prepare("SELECT offering_id as offeringId FROM claims WHERE user_id = ?")
    .all(userId) as { offeringId: string }[]
  return c.json({ ...profile(userId), offeringId: item.id, claimed: claimed.map((r) => r.offeringId) })
})

app.post("/api/checkout/fee", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const body = (await c.req.json().catch(() => ({}))) as {
    kind?: string
    confirm?: boolean
    claim?: string
    riteId?: string
    offeringId?: string
    address?: string
  }
  if (!body.confirm) return c.json({ error: "Confirmation required." }, 400)
  const u = db.prepare("SELECT plan FROM users WHERE id = ?").get(userId) as { plan: string }

  if (body.kind === "report") {
    const key = monthKey()
    const had = db.prepare("SELECT id FROM fee_purchases WHERE user_id = ? AND kind = 'report' AND key = ?").get(userId, key)
    if (!had && u.plan === "free") {
      const pay = takeWallet(userId, REPORT_FEE, "report")
      if (!pay.ok) return c.json({ error: `Need ₹${REPORT_FEE} in the wallet.`, needed: REPORT_FEE, wallet: pay.wallet }, 402)
      db.prepare("INSERT INTO fee_purchases (id, user_id, kind, key, amount, created_at) VALUES (?, ?, 'report', ?, ?, ?)").run(
        id("fee"),
        userId,
        key,
        REPORT_FEE,
        nowIso()
      )
    } else if (!had) {
      db.prepare("INSERT INTO fee_purchases (id, user_id, kind, key, amount, created_at) VALUES (?, ?, 'report', ?, ?, ?)").run(
        id("fee"),
        userId,
        key,
        0,
        nowIso()
      )
    }
    return c.json({ ...profile(userId), kind: "report", already: Boolean(had) })
  }

  if (body.kind === "second-opinion") {
    const claim = (body.claim || "").trim().slice(0, 160)
    if (!claim) return c.json({ error: "A dated line is required." }, 400)
    const key = claim.toLowerCase()
    const had = db.prepare("SELECT id FROM fee_purchases WHERE user_id = ? AND kind = 'second-opinion' AND key = ?").get(
      userId,
      key
    )
    if (!had) {
      const pay = takeWallet(userId, SECOND_OPINION_FEE, "second-opinion")
      if (!pay.ok) {
        return c.json({ error: `Need ₹${SECOND_OPINION_FEE} in the wallet.`, needed: SECOND_OPINION_FEE, wallet: pay.wallet }, 402)
      }
      db.prepare(
        "INSERT INTO fee_purchases (id, user_id, kind, key, amount, created_at) VALUES (?, ?, 'second-opinion', ?, ?, ?)"
      ).run(id("fee"), userId, key, SECOND_OPINION_FEE, nowIso())
    }
    return c.json({ ...profile(userId), kind: "second-opinion", already: Boolean(had), claim })
  }

  if (body.kind === "puja") {
    const rite = pujaById(body.riteId || "")
    if (!rite) return c.json({ error: "Unknown puja." }, 400)
    const pay = takeWallet(userId, rite.fee, `puja:${rite.id}`)
    if (!pay.ok) return c.json({ error: `Need ₹${rite.fee} in the wallet.`, needed: rite.fee, wallet: pay.wallet }, 402)
    db.prepare(
      `INSERT INTO consultations (id, user_id, practitioner_id, astrologer_name, topic, mode, started_at, duration_minutes, cost, status)
       VALUES (?, ?, ?, ?, ?, 'video', ?, 0, ?, 'booked')`
    ).run(id("c"), userId, rite.practitionerId, rite.topic, rite.topic, nowIso(), rite.fee)
    return c.json({
      ...profile(userId),
      kind: "puja",
      practitionerId: rite.practitionerId,
      topic: rite.topic,
      riteId: rite.id,
    })
  }

  if (body.kind === "ship") {
    const item = offeringById(body.offeringId || "")
    if (!item || item.kind === "aarti") return c.json({ error: "Only a claimed stone or rudraksha can ship." }, 400)
    const owned = db.prepare("SELECT id FROM claims WHERE user_id = ? AND offering_id = ?").get(userId, item.id)
    if (!owned) return c.json({ error: "Claim the token first." }, 400)
    const existing = db.prepare("SELECT tracking FROM shop_orders WHERE user_id = ? AND offering_id = ?").get(userId, item.id) as
      | { tracking: string }
      | undefined
    if (existing) return c.json({ ...profile(userId), kind: "ship", tracking: existing.tracking, already: true })
    const pay = takeWallet(userId, SHIP_FEE, `ship:${item.id}`)
    if (!pay.ok) return c.json({ error: `Need ₹${SHIP_FEE} in the wallet for lab + courier.`, needed: SHIP_FEE, wallet: pay.wallet }, 402)
    const tracking = `ATL${Date.now().toString(36).toUpperCase()}`
    const address = (body.address || "On file — demo courier").trim().slice(0, 200)
    db.prepare(
      "INSERT INTO shop_orders (id, user_id, offering_id, tracking, address, status, created_at) VALUES (?, ?, ?, ?, ?, 'lab-queued', ?)"
    ).run(id("ord"), userId, item.id, tracking, address, nowIso())
    return c.json({ ...profile(userId), kind: "ship", tracking, offeringId: item.id })
  }

  return c.json({ error: "Unknown fee kind." }, 400)
})

app.get("/api/orders", (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const rows = db
    .prepare(
      "SELECT offering_id as offeringId, tracking, address, status, created_at as createdAt FROM shop_orders WHERE user_id = ? ORDER BY created_at DESC"
    )
    .all(userId)
  return c.json(rows)
})

app.get("/api/me/wallet/history", (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const rows = db
    .prepare(
      "SELECT amount, reason, created_at FROM wallet_ledger WHERE user_id = ? ORDER BY created_at DESC LIMIT 24"
    )
    .all(userId)
  return c.json(rows)
})

app.post("/api/me/wallet", (c) => {
  return c.json({ error: "Wallet top-up is UPI only. Use POST /api/pay/upi/order." }, 403)
})

app.post("/api/me/usage", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const body = await c.req.json().catch(() => ({})) as { kind?: "ai" | "muhurta" }
  const u = db.prepare("SELECT plan FROM users WHERE id = ?").get(userId) as { plan: Plan }
  const limits = PLAN_LIMITS[u.plan]
  const usage = usageFor(userId)
  if (body.kind === "ai") {
    if (usage.aiQuestions + 1 > limits.ai) return c.json({ error: "AI limit reached.", usage }, 402)
    db.prepare("UPDATE usage_months SET ai_questions = ai_questions + 1 WHERE user_id = ? AND month_key = ?").run(userId, usage.monthKey)
  } else if (body.kind === "muhurta") {
    if (usage.muhurtaQueries + 1 > limits.muhurta) return c.json({ error: "Muhurta limit reached.", usage }, 402)
    db.prepare("UPDATE usage_months SET muhurta_queries = muhurta_queries + 1 WHERE user_id = ? AND month_key = ?").run(userId, usage.monthKey)
  } else {
    return c.json({ error: "kind must be ai or muhurta" }, 400)
  }
  return c.json(profile(userId))
})

app.post("/api/family", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const u = db.prepare("SELECT plan FROM users WHERE id = ?").get(userId) as { plan: Plan }
  if (!PLAN_LIMITS[u.plan].family) return c.json({ error: "Family plan required." }, 402)
  const n = (db.prepare("SELECT COUNT(*) as n FROM family_members WHERE user_id = ?").get(userId) as { n: number }).n
  if (n >= 3) return c.json({ error: "Family plan includes 3 additional charts." }, 400)
  const body = await c.req.json().catch(() => ({})) as {
    name?: string
    relation?: string
    dob?: string
    timeOfBirth?: string
    placeOfBirth?: string
  }
  if (!body.name || !body.dob) return c.json({ error: "Name and date of birth required." }, 400)
  const famId = id("fam")
  db.prepare(
    "INSERT INTO family_members (id, user_id, name, relation, dob, time_of_birth, place_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run(famId, userId, body.name, body.relation || "family", body.dob, body.timeOfBirth || "12:00", body.placeOfBirth || "New Delhi, India")
  return c.json(profile(userId), 201)
})

app.get("/api/ledger", (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const rows = db.prepare("SELECT * FROM predictions WHERE user_id = ? ORDER BY consultation_date DESC").all(userId) as Record<string, unknown>[]
  return c.json(rows.map(mapPrediction))
})

app.post("/api/ledger", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const u = db.prepare("SELECT plan FROM users WHERE id = ?").get(userId) as { plan: Plan }
  const active = (
    db.prepare("SELECT COUNT(*) as n FROM predictions WHERE user_id = ? AND status IN ('pending', 'in_progress')").get(userId) as { n: number }
  ).n
  const body = await c.req.json().catch(() => ({})) as {
    items?: Array<{
      id?: string
      title: string
      category: string
      targetDate: string
      confidence: number
      astrologerName?: string
    }>
  }
  const items = body.items || []
  if (!items.length) return c.json({ error: "items required" }, 400)
  if (active + items.length > PLAN_LIMITS[u.plan].activePredictions) {
    return c.json({ error: "Free tracks 3 open predictions. Upgrade to Plus." }, 402)
  }
  const created = items.map((item) => {
    const predId = item.id || id("pred")
    db.prepare(`
      INSERT INTO predictions (
        id, user_id, title, category, astrologer_name, consultation_date, target_date, confidence, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).run(predId, userId, item.title, item.category, item.astrologerName || "Self-logged", nowIso(), item.targetDate, item.confidence || 70)
    return predId
  })
  const rows = db.prepare(`SELECT * FROM predictions WHERE id IN (${created.map(() => "?").join(",")})`).all(...created) as Record<string, unknown>[]
  return c.json(rows.map(mapPrediction), 201)
})

app.post("/api/ledger/:id/close", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const predId = c.req.param("id")
  const pred = db.prepare("SELECT * FROM predictions WHERE id = ? AND user_id = ?").get(predId, userId) as Record<string, unknown> | undefined
  if (!pred) return c.json({ error: "Not found" }, 404)
  const body = await c.req.json().catch(() => ({})) as { outcome?: "yes" | "partial" | "no"; note?: string; evidenceName?: string }
  if (!body.outcome) return c.json({ error: "outcome required" }, 400)
  const status = body.outcome === "no" ? "failed" : "completed"
  const notes =
    body.note ||
    (body.outcome === "yes" ? "Came true." : body.outcome === "partial" ? "Partly true." : "Did not occur as predicted.")
  const closedAt = nowIso()
  db.prepare(
    "UPDATE predictions SET status=?, outcome=?, notes=?, evidence_note=?, evidence_name=?, closed_at=? WHERE id=?"
  ).run(status, body.outcome, notes, body.note || null, body.evidenceName || null, closedAt, predId)

  const user = db.prepare("SELECT name FROM users WHERE id = ?").get(userId) as { name: string }
  const proofId = `proof-${predId}`
  db.prepare("DELETE FROM proofs WHERE prediction_id = ?").run(predId)
  db.prepare(`
    INSERT INTO proofs (
      id, user_id, prediction_id, title, category, astrologer_name, user_name,
      outcome, note, evidence_name, confidence, predicted_on, window_end, verified_on
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    proofId,
    userId,
    predId,
    pred.title,
    pred.category,
    pred.astrologer_name,
    user.name,
    body.outcome,
    body.note || null,
    body.evidenceName || null,
    pred.confidence,
    pred.consultation_date,
    pred.target_date,
    closedAt
  )
  const updated = db.prepare("SELECT * FROM predictions WHERE id = ?").get(predId) as Record<string, unknown>
  const proof = db.prepare("SELECT * FROM proofs WHERE id = ?").get(proofId)
  return c.json({ prediction: mapPrediction(updated), proof })
})

function mapProof(row: Record<string, unknown>) {
  return {
    id: row.id,
    predictionId: row.prediction_id,
    title: row.title,
    category: row.category,
    astrologerName: row.astrologer_name,
    userName: row.user_name,
    outcome: row.outcome,
    note: row.note,
    evidenceName: row.evidence_name,
    confidence: row.confidence,
    predictedOn: row.predicted_on,
    windowEnd: row.window_end,
    verifiedOn: row.verified_on,
  }
}

app.get("/api/proofs/:id", (c) => {
  const row = db.prepare("SELECT * FROM proofs WHERE id = ? OR prediction_id = ?").get(c.req.param("id"), c.req.param("id")) as Record<string, unknown> | undefined
  if (!row) return c.json({ error: "Not found" }, 404)
  return c.json(mapProof(row))
})

app.post("/api/consultations", async (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const body = await c.req.json().catch(() => ({})) as {
    practitionerId?: string
    astrologerName?: string
    topic?: string
    mode?: string
    durationMinutes?: number
    cost?: number
  }
  const cid = id("con")
  db.prepare(`
    INSERT INTO consultations (id, user_id, practitioner_id, astrologer_name, topic, mode, started_at, ended_at, duration_minutes, cost, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ended')
  `).run(
    cid,
    userId,
    body.practitionerId || null,
    body.astrologerName || "Astrologer",
    body.topic || "Live session",
    body.mode || "chat",
    nowIso(),
    nowIso(),
    body.durationMinutes || 0,
    body.cost || 0
  )
  return c.json({ id: cid }, 201)
})

app.get("/api/chat", (c) => {
  const { error, userId } = requireUser(c)
  if (error || !userId) return c.json({ error: "Unauthorized" }, 401)
  const rows = db.prepare("SELECT id, role, content, created_at as createdAt FROM chat_messages WHERE user_id = ? ORDER BY created_at ASC LIMIT 80").all(userId)
  return c.json(rows)
})

app.get("/api/chat/status", (c) => {
  return c.json({ xai: Boolean((process.env.XAI_API_KEY || "").trim()) })
})

app.post("/api/chat", async (c) => {
  const body = await c.req.json().catch(() => ({})) as {
    question?: string
    context?: string
    persona?: string
    history?: { role: string; content: string }[]
  }
  const { userId } = authUser(c)
  if (userId && body.question) {
    db.prepare("INSERT INTO chat_messages (id, user_id, role, content, created_at) VALUES (?, ?, 'user', ?, ?)").run(
      id("msg"),
      userId,
      body.question,
      nowIso()
    )
  }

  const key = process.env.XAI_API_KEY
  if (!key) return c.json({ useLocal: true })
  try {
    const history = Array.isArray(body.history) ? body.history.slice(-12) : []
    const system =
      body.persona?.trim() ||
      "You are AstroLive's Vedic assistant. Use ONLY the provided natal/panchang snapshot. Be specific, short (under 180 words). Answer the user's actual question. Never repeat a canned promotion or job-offer script."
    const upstream = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "grok-4.6",
        temperature: 0.6,
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Chart snapshot:\n${body.context || "(none)"}\n\nQuestion: ${body.question || ""}` },
          ...history.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
        ],
      }),
    })
    const json = (await upstream.json()) as { choices?: { message?: { content?: string } }[]; error?: { message?: string } }
    const text = json.choices?.[0]?.message?.content
    if (!upstream.ok || !text) return c.json({ useLocal: true, error: json.error?.message })
    if (userId) {
      db.prepare("INSERT INTO chat_messages (id, user_id, role, content, created_at) VALUES (?, ?, 'assistant', ?, ?)").run(
        id("msg"),
        userId,
        text,
        nowIso()
      )
    }
    return c.json({ text })
  } catch {
    return c.json({ useLocal: true })
  }
})

app.post("/api/cosmic-reading", async (c) => {
  const body = await c.req.json().catch(() => ({})) as { milestones?: unknown[] }
  const milestonesCount = Array.isArray(body.milestones) ? body.milestones.length : 0
  return c.json({
    reading: {
      title: "The Aligned Trajectory of Purpose",
      summary: `Synthesizing ${milestonesCount} constellation star nodes across your life timeline.`,
      theme: "The Path of Luminous Transformation",
      insights: [
        "Early milestones forged structural resilience.",
        "The nodal axis aligns with a career pivot.",
        "Upcoming 2028-2030 nodes mark a peak of purpose.",
      ],
    },
    isFallback: true,
  })
})

app.post("/api/utm", async (c) => {
  const { userId } = authUser(c)
  const body = await c.req.json().catch(() => ({})) as Record<string, string>
  db.prepare(
    "INSERT INTO utm_events (id, user_id, source, medium, campaign, term, content, ref, captured_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(
    id("utm"),
    userId,
    body.utm_source || body.source || null,
    body.utm_medium || body.medium || null,
    body.utm_campaign || body.campaign || null,
    body.utm_term || body.term || null,
    body.utm_content || body.content || null,
    body.ref || null,
    nowIso()
  )
  return c.json({ ok: true })
})

app.post("/api/rtc/room", (c) => {
  const { error } = requireUser(c)
  if (error) return c.json({ error: "Unauthorized" }, 401)
  const minted = mintRoomToken()
  try {
    db.prepare("INSERT OR REPLACE INTO rtc_rooms (id, exp, created_at) VALUES (?, ?, ?)").run(
      minted.room,
      minted.exp,
      nowIso()
    )
  } catch {
    /* table may lag on first boot */
  }
  return c.json(minted)
})

app.get("/api/rtc/ice", (c) => {
  const stun = { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }
  const turnUrl = process.env.TURN_URL
  const turnUser = process.env.TURN_USERNAME
  const turnPass = process.env.TURN_PASSWORD
  const turn =
    turnUrl && turnUser && turnPass
      ? { urls: turnUrl.split(",").map((u) => u.trim()).filter(Boolean), username: turnUser, credential: turnPass }
      : {
          urls: [
            "turn:openrelay.metered.ca:80",
            "turn:openrelay.metered.ca:443",
            "turn:openrelay.metered.ca:443?transport=tcp",
          ],
          username: "openrelayproject",
          credential: "openrelayproject",
        }
  return c.json({ iceServers: [stun, turn] })
})

app.post("/api/rtc/join", async (c) => {
  const body = await c.req.json().catch(() => ({})) as { token?: string; room?: string; peer?: string }
  const room = readRoomToken(body.token) || (body.room && body.room.startsWith("sess_") ? body.room : null)
  if (!room || !body.peer) return c.json({ error: "signed room token required" }, 400)
  const r = getRoom(room)
  prunePeers(r)
  if (!r.peers.has(body.peer) && r.peers.size >= 2) return c.json({ error: "room full" }, 409)
  r.peers.set(body.peer, { seen: Date.now() })
  return c.json({ peer: body.peer, room, others: othersOf(room, body.peer) })
})

app.post("/api/rtc/leave", async (c) => {
  const body = await c.req.json().catch(() => ({})) as { token?: string; room?: string; peer?: string }
  const room = readRoomToken(body.token) || body.room
  if (room && body.peer) getRoom(room).peers.delete(body.peer)
  return c.json({ ok: true })
})

app.post("/api/rtc/signal", async (c) => {
  const body = await c.req.json().catch(() => ({})) as {
    token?: string
    room?: string
    from?: string
    type?: string
    payload?: unknown
  }
  const room = readRoomToken(body.token) || body.room
  if (!room || !body.from || !body.type) return c.json({ error: "bad signal" }, 400)
  const seq = pushSignal(room, body.from, body.type, body.payload)
  return c.json({ seq })
})

app.get("/api/rtc/poll", (c) => {
  const token = c.req.query("token") || ""
  const room = readRoomToken(token) || c.req.query("room") || ""
  const peer = c.req.query("peer") || ""
  const after = Number(c.req.query("after") || 0)
  if (!room || !peer) return c.json({ error: "room and peer required" }, 400)
  const r = getRoom(room)
  prunePeers(r)
  if (!r.peers.has(peer) && r.peers.size >= 2) return c.json({ error: "room full", others: [], signals: [] }, 409)
  r.peers.set(peer, { seen: Date.now(), ws: r.peers.get(peer)?.ws })
  return c.json({
    others: othersOf(room, peer),
    signals: r.sigs.filter((s) => s.from !== peer && s.seq > after),
  })
})

mountUpiRoutes(app, {
  requireUser,
  profile,
  creditWallet,
  packs: PACK_BY_AMOUNT,
  firstRechargeBonus: FIRST_RECHARGE_BONUS,
})

if (!process.env.VERCEL) {
  const spa = mountSpa(app)
  if (!rtcSecret()) {
    console.warn("RTC_SECRET is empty — set it in server/.env for signed room tokens.")
  }

  const port = Number(process.env.PORT || 8787)
  const host = process.env.HOST || "0.0.0.0"
  const server = serve({ fetch: app.fetch, port, hostname: host }, (info) => {
    console.log(`AstroLive API http://${host}:${info.port}`)
    if (spa) console.log(`SPA from dist/ on the same host`)
    console.log(`UPI webhook POST http://${host}:${info.port}/api/pay/upi/webhook`)
    console.log(process.env.XAI_API_KEY ? "Ask: xAI" : "Ask: local chart")
  })
  attachRtcSocket(server as Parameters<typeof attachRtcSocket>[0])
}
