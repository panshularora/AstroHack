import { useMemo, useState } from "react"
import { useUser } from "@/context/UserContext"
import { PLAN_LIMITS } from "@/lib/entitlements"
import { computePanchang, muhurtaScore } from "@/lib/vedic"
import { PaywallModal } from "@/components/paywall/PaywallModal"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const purposes = [
  { id: "business", label: "mBusiness" },
  { id: "contract", label: "mContract" },
  { id: "travel", label: "mTravel" },
  { id: "property", label: "mProperty" },
  { id: "interview", label: "mInterview" },
  { id: "investment", label: "mInvestment" },
  { id: "medical", label: "mMedical" },
  { id: "marriage", label: "marriage" },
] as const

export function MuhurtaFinder() {
  const { user, consumeMuhurta } = useUser()
  const { t } = useI18n()
  const limit = PLAN_LIMITS[user.plan].muhurtaPerMonth
  const used = user.usage.muhurtaQueries
  const queriesLeft = Number.isFinite(limit) ? Math.max(0, limit - used) : 99
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null)
  const [paywall, setPaywall] = useState(false)

  const handleSelectPurpose = (id: string) => {
    if (!Number.isFinite(limit)) {
      setSelectedPurpose(id)
      return
    }
    if (queriesLeft <= 0) {
      setPaywall(true)
      return
    }
    consumeMuhurta()
    setSelectedPurpose(id)
  }

  const days = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      const p = computePanchang(d, user.placeOfBirth)
      const status = selectedPurpose
        ? muhurtaScore(p, selectedPurpose)
        : p.tithi.includes("Amavasya") || p.karana === "Vishti"
          ? "avoid"
          : "neutral"
      return { index: i, date: d, status, tithi: p.tithi, yoga: p.yoga, nakshatra: p.nakshatra }
    })
  }, [selectedPurpose, user.placeOfBirth])

  const firstAuspiciousDay = days.find((d) => d.status === "auspicious")

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("muhurtaKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("muhurtaHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("muhurtaBody")}</p>
        <p className="mt-3 text-sm text-zinc-500">
          {Number.isFinite(limit) ? t("queriesLeftN", { n: queriesLeft }) : t("unlimitedPlan")}
        </p>

        <p className="mt-10 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("pickEvent")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {purposes.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPurpose(p.id)}
              className={cn(
                "h-9 px-4 rounded-full text-sm",
                selectedPurpose === p.id ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
              )}
            >
              {t(p.label)}
            </button>
          ))}
        </div>
        {selectedPurpose && (
          <button type="button" className="mt-3 text-sm text-zinc-500 hover:text-zinc-200" onClick={() => setSelectedPurpose(null)}>
            {t("clearSelection")}
          </button>
        )}

        {selectedPurpose && (
          <div className="mt-14">
            <h2 className="font-display text-3xl text-zinc-50">{t("sevenDay")}</h2>
            <div className="mt-8 space-y-6">
              {days.map((day) => (
                <div key={day.index} className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl text-zinc-50">
                      {day.date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {day.tithi} · {day.nakshatra}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-sm",
                      day.status === "auspicious"
                        ? "text-emerald-300"
                        : day.status === "avoid"
                          ? "text-zinc-600"
                          : "text-zinc-400"
                    )}
                  >
                    {day.status === "auspicious"
                      ? t("muhurtaGood")
                      : day.status === "avoid"
                        ? t("muhurtaAvoid")
                        : t("muhurtaOk")}
                  </p>
                </div>
              ))}
            </div>

            {firstAuspiciousDay && (
              <div className="mt-14">
                <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-300/80">{t("muhurtaHead")}</p>
                <p className="mt-2 font-display text-3xl text-zinc-50">
                  {firstAuspiciousDay.date.toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="mt-3 text-sm text-zinc-400">
                  {firstAuspiciousDay.tithi} · {firstAuspiciousDay.nakshatra} · {firstAuspiciousDay.yoga}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <PaywallModal open={paywall} feature="muhurta" onClose={() => setPaywall(false)} />
    </div>
  )
}
