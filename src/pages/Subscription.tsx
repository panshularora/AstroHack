import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import type { PlanId } from "@/lib/entitlements"
import { PLAN_PRICE_INR, WALLET_PACKS } from "@/lib/entitlements"
import { FamilyProfiles } from "@/components/subscription/FamilyProfiles"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import { CosmicField } from "@/components/sky/CosmicField"

export function Subscription() {
  const navigate = useNavigate()
  const { user, checkoutPlan, buyWalletPack, isAuthed } = useUser()
  const { t } = useI18n()
  const [selectedPack, setSelectedPack] = useState<(typeof WALLET_PACKS)[number]["amount"]>(500)
  const [recharged, setRecharged] = useState(false)
  const [credited, setCredited] = useState(0)
  const [planMsg, setPlanMsg] = useState("")
  const [pendingPlan, setPendingPlan] = useState<PlanId | null>(null)
  const [busy, setBusy] = useState(false)
  const walletBalance = user.walletBalance ?? 0
  const pack = WALLET_PACKS.find((p) => p.amount === selectedPack) || WALLET_PACKS[1]
  const firstRecharge = isAuthed && !user.hasRecharged
  const creditPreview = pack.amount + pack.bonus + (firstRecharge ? 50 : 0)

  const plans: { id: PlanId; name: string; price: string; period: string; lines: string; cta: string }[] = [
    {
      id: "free",
      name: t("planFree"),
      price: "₹0",
      period: t("forever"),
      lines: t("freeLine"),
      cta: t("stayOnFree"),
    },
    {
      id: "plus",
      name: t("planPlus"),
      price: "₹499",
      period: t("perMonth"),
      lines: t("plusLine"),
      cta: t("payFromWallet"),
    },
    {
      id: "family",
      name: t("planFamily"),
      price: "₹999",
      period: t("perMonth"),
      lines: t("familyLine"),
      cta: t("payFromWallet"),
    },
  ]

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-3xl pb-28">
      <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("wallet")}</p>
      <h1 className="font-display text-5xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">
        {t("minutesFirst")} <span className="italic text-zinc-300">{t("planIfStay")}</span>
      </h1>
      <p className="mt-4 text-[15px] text-zinc-400 max-w-md leading-relaxed">{t("walletBody")}</p>

      {(user.firstSessionFree || !user.hasRecharged) && (
        <div className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-400">{t("firstPerkTitle")}</p>
          <p className="mt-2 font-display text-3xl text-zinc-50 leading-snug">{t("firstPerkBody")}</p>
        </div>
      )}

      <div className="mt-12">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("balance")}</p>
        <p className="font-display text-6xl text-zinc-50 mt-2">₹{walletBalance}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {WALLET_PACKS.map((p) => (
            <button
              key={p.amount}
              type="button"
              onClick={() => {
                setSelectedPack(p.amount)
                setRecharged(false)
              }}
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
        <Button
          className="mt-5"
          disabled={busy}
          onClick={() => {
            setBusy(true)
            buyWalletPack(pack.amount).then((res) => {
              setBusy(false)
              if (res.ok) {
                setCredited(res.credited || creditPreview)
                setRecharged(true)
                setPlanMsg("")
              } else {
                setPlanMsg(res.reason || t("checkoutFailed"))
              }
            })
          }}
        >
          {busy ? t("upiOpening") : recharged ? t("addedAmount", { n: credited }) : t("payUpi")}
        </Button>
        <p className="mt-2 text-sm text-zinc-500">{t("demoTopup")}</p>
      </div>

      <div className="mt-16 space-y-10">
        {plans.map((plan) => (
          <div key={plan.id}>
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
              {user.plan === plan.id ? t("currentPlan") : plan.name}
            </p>
            <p className="font-display text-4xl text-zinc-50 mt-1">
              {plan.name} · {plan.price}
              <span className="text-2xl text-zinc-500">{plan.period}</span>
            </p>
            <p className="mt-3 text-sm text-zinc-400 max-w-md">{plan.lines}</p>
            <Button
              className="mt-4"
              variant={plan.id === "plus" ? "primary" : "outline"}
              disabled={busy || user.plan === plan.id}
              onClick={() => setPendingPlan(plan.id)}
            >
              {user.plan === plan.id ? t("thisIsYourPlan") : plan.cta}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <FamilyProfiles />
      </div>

      <button type="button" onClick={() => navigate("/app/share")} className="mt-14 block text-left group">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("invite")}</p>
        <p className="font-display text-3xl text-zinc-50 mt-2 group-hover:italic">{t("sendCardBoth")}</p>
      </button>

      {planMsg && <p className="mt-8 text-sm text-emerald-300">{planMsg}</p>}

      <ConfirmModal
        open={!!pendingPlan}
        title={
          pendingPlan === "free"
            ? t("switchToFree")
            : t("payPlanTitle", { n: pendingPlan ? PLAN_PRICE_INR[pendingPlan] : 0, plan: pendingPlan || "" })
        }
        body={
          pendingPlan === "free"
            ? t("plusLock")
            : t("payLeaveWallet", {
                n: pendingPlan ? PLAN_PRICE_INR[pendingPlan] : 0,
                bal: walletBalance,
              })
        }
        confirmLabel={pendingPlan === "free" ? t("downgrade") : t("payFromWallet")}
        danger={pendingPlan === "free"}
        onConfirm={() => {
          const plan = pendingPlan
          if (!plan) return
          setBusy(true)
          checkoutPlan(plan).then((res) => {
            setBusy(false)
            setPlanMsg(res.ok ? t("planActive", { plan }) : res.reason || t("checkoutFailed"))
          })
        }}
        onClose={() => setPendingPlan(null)}
      />
      </div>
    </div>
  )
}
