import { useMemo } from "react"
import { useNatalChart, useUser } from "@/context/UserContext"
import { computeAshtakavarga, RASHIS } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function Ashtakavarga() {
  const { user } = useUser()
  const natal = useNatalChart()
  const { t } = useI18n()
  const report = useMemo(() => computeAshtakavarga(natal), [natal])

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("ashtaKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("ashtaHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">
          {t("ashtaLine", { name: user.name, n: report.sarvashtakavarga })} · {report.note}
        </p>

        <div className="mt-12 space-y-5">
          {report.houseScores.map((score, i) => (
            <div key={RASHIS[i]} className="flex items-baseline justify-between gap-4">
              <p className="font-display text-2xl text-zinc-50">{RASHIS[i]}</p>
              <p className="text-sm text-zinc-400 tabular-nums">
                {score}
                <span className="text-zinc-600"> / 8</span>
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-zinc-500 leading-relaxed">
          {t("ashtaFoot", { strong: report.strongestHouse, weak: report.weakestHouse, n: report.saturnTransitScore })}
        </p>
      </div>
    </div>
  )
}
