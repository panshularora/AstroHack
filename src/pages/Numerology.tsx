import { useMemo } from "react"
import { useNatalChart, useUser } from "@/context/UserContext"
import { computeNumerology, lagnaLord } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function Numerology() {
  const { user } = useUser()
  const natal = useNatalChart()
  const { t } = useI18n()
  const report = useMemo(
    () => computeNumerology(user.name, user.dob, lagnaLord(Math.floor(natal.lagna / 30) % 12)),
    [user.name, user.dob, natal.lagna]
  )
  const nums: [string, number, string][] = [
    ["Mulank", report.mulank, report.mulankPlanet],
    ["Bhagyank", report.bhagyank, report.bhagyankPlanet],
    ["Name", report.nameNumber, report.namePlanet],
  ]

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("numKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("numHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("numNote")}</p>

        <div className="mt-14 space-y-10">
          {nums.map(([k, n, p]) => (
            <div key={k}>
              <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{k}</p>
              <p className="mt-1 font-display text-6xl text-zinc-50">{n}</p>
              <p className="mt-1 text-sm text-zinc-500">{p}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-[15px] text-zinc-300">{t("chartRulerLine", { name: report.chartRuler })}</p>
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-lg">
          {report.harmonyMatch
            ? t("numHarmonyYes", { lord: report.chartRuler })
            : t("numHarmonyNo", { name: report.namePlanet, lord: report.chartRuler })}
        </p>
      </div>
    </div>
  )
}
