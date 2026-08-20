import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useNatalChart, useUser } from "@/context/UserContext"
import { detectYogas } from "@/lib/vedic"
import { PLAN_LIMITS } from "@/lib/entitlements"
import { PaywallModal } from "@/components/paywall/PaywallModal"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function YogaReport() {
  const navigate = useNavigate()
  const natal = useNatalChart()
  const { user } = useUser()
  const { t, locale } = useI18n()
  const hi = locale === "hi"
  const yogas = useMemo(() => detectYogas(natal), [natal])
  const locked = !PLAN_LIMITS[user.plan].yogaDetail
  const [paywall, setPaywall] = useState(false)
  const active = yogas.filter((y) => y.isActive).length

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("yogaKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("yogaHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("yogaBody")}</p>

        <div className="mt-14 space-y-12">
          {yogas.map((yoga) => (
            <article key={yoga.name} className={yoga.isActive ? "" : "opacity-60"}>
              <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                {yoga.strength === "Powerful"
                  ? t("yogaPowerful")
                  : yoga.strength === "Strong"
                    ? t("yogaStrong")
                    : yoga.strength === "Moderate"
                      ? t("yogaModerate")
                      : t("yogaLatent")}
                {yoga.isActive && yoga.dashaActivated ? ` · ${t("activeDasha")}` : ""}
              </p>
              <h2 className="mt-1 font-display text-3xl text-zinc-50">{hi ? yoga.sanskrit : yoga.name}</h2>
              <p className="mt-2 text-sm text-zinc-500">
                {yoga.planets} · {yoga.houses}
              </p>
              {locked ? (
                <button type="button" onClick={() => setPaywall(true)} className="mt-3 text-left">
                  <p className="text-[15px] text-zinc-500 blur-[3px] select-none">{hi ? yoga.meaningHi : yoga.meaning}</p>
                  <p className="mt-2 text-sm text-zinc-400">{t("plusUnlocks")}</p>
                </button>
              ) : (
                <>
                  <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed">{hi ? yoga.meaningHi : yoga.meaning}</p>
                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{hi ? yoga.manifestationHi : yoga.manifestation}</p>
                </>
              )}
            </article>
          ))}
        </div>

        <p className="mt-14 text-sm text-zinc-500">
          {active} {t("yogaKicker").toLowerCase()}.
        </p>
        <Button className="mt-4" onClick={() => navigate("/app/consult")}>
          {t("talkToExpert")}
        </Button>
      </div>
      <PaywallModal open={paywall} feature="yoga_detail" onClose={() => setPaywall(false)} />
    </div>
  )
}
