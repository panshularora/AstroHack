import { useMemo, useState } from "react"
import { useNatalChart, useUser } from "@/context/UserContext"
import { computeVarshphal, houseAreaLabel } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function Varshphal() {
  const { user } = useUser()
  const natal = useNatalChart()
  const { t, locale } = useI18n()
  const hi = locale === "hi"
  const [year, setYear] = useState(new Date().getFullYear())
  const report = useMemo(() => computeVarshphal(natal, year), [natal, year])
  const facts: [string, string][] = [
    [t("solarReturn"), report.solarReturn.toLocaleString("en-IN")],
    [t("yearLagna"), report.lagna],
    [t("muntha"), `${report.munthaSign} · ${t("houseN", { n: report.munthaHouse })}`],
    [t("varshesha"), report.varshesa],
    [t("yearMoon"), report.moonSign],
    [t("natalDasha"), report.dasha],
  ]

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("varshKicker")}</p>
        <div className="mt-2 flex flex-wrap items-end gap-4">
          <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 leading-[0.95]">
            {t("varshHead", { year })}
          </h1>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value) || year)}
            className="h-11 w-24 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white"
          />
        </div>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("varshBody", { name: user.name })}</p>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
          {facts.map(([k, v]) => (
            <div key={k}>
              <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{k}</p>
              <p className="mt-1 font-display text-2xl text-zinc-50 leading-snug">{v}</p>
            </div>
          ))}
        </div>

        <ul className="mt-14 space-y-4">
          <li className="text-[15px] text-zinc-400 leading-relaxed">
            {t("varshMuntha", {
              sign: report.munthaSign,
              n: report.munthaHouse,
              area: houseAreaLabel(report.munthaHouse, hi),
            })}
          </li>
          <li className="text-[15px] text-zinc-400 leading-relaxed">{t("varshLagna", { sign: report.lagna })}</li>
          <li className="text-[15px] text-zinc-400 leading-relaxed">
            {t("varshJupiter", { n: report.jupHouse, area: houseAreaLabel(report.jupHouse, hi) })}
          </li>
          <li className="text-[15px] text-zinc-400 leading-relaxed">{t("varshDasha", { dasha: report.dasha })}</li>
        </ul>
      </div>
    </div>
  )
}
