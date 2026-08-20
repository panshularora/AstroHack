import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { FIRST_RECHARGE_BONUS, WALLET_PACKS, WELCOME_CREDIT } from "@/lib/entitlements"
import { cn } from "@/lib/utils"
import { useI18n, type Msg } from "@/lib/i18n"
import { apiOptional } from "@/lib/api"
import { CosmicField } from "@/components/sky/CosmicField"

type LedgerRow = { amount: number; reason: string; created_at: string }

function reasonLabel(reason: string, t: (k: Msg) => string) {
  if (reason === "welcome-grant") return t("welcomeGrant")
  if (reason === "session") return t("sessionCharge")
  if (reason.startsWith("pack:")) return t("packCredit")
  if (reason.startsWith("plan")) return t("planCharge")
  if (reason.includes("invite")) return t("inviteMinutes")
  return reason
}

export function Wallet() {
  const navigate = useNavigate()
  const { user, buyWalletPack, isAuthed } = useUser()
  const { t } = useI18n()
  const [selectedPack, setSelectedPack] = useState<(typeof WALLET_PACKS)[number]["amount"]>(500)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState("")
  const [rows, setRows] = useState<LedgerRow[]>([])
  const [upiOn, setUpiOn] = useState<boolean | null>(null)
  const walletBalance = user.walletBalance ?? 0
  const pack = WALLET_PACKS.find((p) => p.amount === selectedPack) || WALLET_PACKS[2]
  const firstRecharge = isAuthed && !user.hasRecharged
  const creditPreview = pack.amount + pack.bonus + (firstRecharge ? FIRST_RECHARGE_BONUS : 0)

  useEffect(() => {
    apiOptional<LedgerRow[]>("/api/me/wallet/history").then((data) => {
      if (Array.isArray(data)) setRows(data)
    })
  }, [walletBalance])

  useEffect(() => {
    apiOptional<{ enabled?: boolean }>("/api/pay/upi/config").then((data) => {
      setUpiOn(Boolean(data?.enabled))
    })
  }, [])

  return (
    <div className="relative">
      <CosmicField density={32} />
      <div className="relative page-container max-w-2xl pb-28">
      <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("wallet")}</p>
      <h1 className="font-display text-5xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("walletHead")}</h1>
      <p className="mt-4 text-[15px] text-zinc-400 max-w-md leading-relaxed">{t("walletPageBody")}</p>

      <p className="mt-12 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("balance")}</p>
      <p className="relative mt-2 font-display text-7xl text-zinc-50">
        <span className="pointer-events-none absolute -left-8 -top-6 h-28 w-40 rounded-full bg-[radial-gradient(circle,rgba(232,200,114,0.16),transparent_70%)] blur-2xl" />
        <span className="relative">₹{walletBalance}</span>
      </p>
      <p className="mt-3 text-sm text-zinc-500">{t("cashbackLimit", { n: WELCOME_CREDIT })}</p>

      <p className="mt-12 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("topUp")}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {WALLET_PACKS.map((p) => (
          <button
            key={p.amount}
            type="button"
            onClick={() => setSelectedPack(p.amount)}
            className={cn(
              "h-11 px-4 rounded-full text-sm",
              selectedPack === p.amount ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
            )}
          >
            ₹{p.amount}
            {p.bonus ? ` +${p.bonus}` : ""}
          </button>
        ))}
      </div>
      {firstRecharge && <p className="mt-3 text-sm text-emerald-300">{t("firstRecharge")}</p>}
      {upiOn === false && <p className="mt-3 text-sm text-amber-200">{t("upiNeedKeys")}</p>}
      <Button
        className="mt-5"
        disabled={busy}
        onClick={() => {
          setBusy(true)
          buyWalletPack(pack.amount).then((res) => {
            setBusy(false)
            setMsg(res.ok ? t("addedAmount", { n: res.credited || creditPreview }) : res.reason || t("checkoutFailed"))
          })
        }}
      >
        {busy ? t("upiOpening") : t("payUpi")}
      </Button>
      <p className="mt-2 text-sm text-zinc-500">
        ₹{pack.amount}
        {pack.bonus ? ` +${pack.bonus}` : ""}
        {firstRecharge ? ` +${FIRST_RECHARGE_BONUS}` : ""} → ₹{creditPreview}
      </p>
      {msg && (
        <p className={cn("mt-3 text-sm", /added|Added|जोड़ा|जोड़/i.test(msg) ? "text-emerald-300" : "text-amber-200")}>
          {msg}
        </p>
      )}
      <p className="mt-2 text-sm text-zinc-600">{t("demoTopup")}</p>

      {rows.length > 0 && (
        <div className="mt-16">
          <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("walletActivity")}</p>
          <ul className="mt-6 space-y-5">
            {rows.map((row, i) => (
              <li key={`${row.created_at}-${i}`} className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-zinc-200">{reasonLabel(row.reason, t)}</p>
                  <p className="text-[12px] text-zinc-600 mt-0.5">{row.created_at.slice(0, 16).replace("T", " ")}</p>
                </div>
                <p className={cn("font-display text-2xl", row.amount < 0 ? "text-zinc-400" : "text-zinc-50")}>
                  {row.amount > 0 ? "+" : ""}₹{row.amount}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="button" onClick={() => navigate("/app/subscription")} className="mt-16 block text-left group">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("pricing")}</p>
        <p className="font-display text-3xl text-zinc-50 mt-2 group-hover:italic">{t("seePlusFamily")}</p>
      </button>
      </div>
    </div>
  )
}
