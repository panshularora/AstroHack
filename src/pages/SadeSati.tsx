import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useNatalChart, useUser } from "@/context/UserContext"
import { computeSadeSati, formatShortDate } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { Button } from "@/components/ui/Button"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function SadeSati() {
  const { user } = useUser()
  const natal = useNatalChart()
  const { t } = useI18n()
  const navigate = useNavigate()
  const report = useMemo(() => computeSadeSati(natal), [natal])
  const phases = [
    { id: "rising" as const, k: t("rising"), d: t("risingD") },
    { id: "peak" as const, k: t("peak"), d: t("peakD") },
    { id: "setting" as const, k: t("setting"), d: t("settingD") },
  ]
  const phaseLabel =
    report.phase === "rising"
      ? t("sadeLabelRising")
      : report.phase === "peak"
        ? t("sadeLabelPeak")
        : report.phase === "setting"
          ? t("sadeLabelSetting")
          : t("sadeLabelClear")
  const phaseAdvice =
    report.phase === "rising"
      ? t("sadeAdviceRising")
      : report.phase === "peak"
        ? t("sadeAdvicePeak")
        : report.phase === "setting"
          ? t("sadeAdviceSetting")
          : t("sadeAdviceClear")

  return (
    <div className="relative">
      <CosmicField density={28} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("sadeSatiKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("sadeSati")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">
          {t("sadeSatiLine", { name: user.name, moon: report.natalMoon, sign: `${report.saturnSign} ${report.saturnDegree}` })}
        </p>

        <p className="mt-12 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("currentPhase")}</p>
        <h2 className="mt-2 font-display text-4xl text-zinc-50">{phaseLabel}</h2>
        <p className="mt-4 text-[15px] text-zinc-400 leading-relaxed max-w-lg">{phaseAdvice}</p>
        {report.start && report.end && (
          <p className="mt-3 text-sm text-zinc-500">
            {t("thisPhase", { start: formatShortDate(report.start), end: formatShortDate(report.end) })}
          </p>
        )}

        <div className="mt-14 space-y-6">
          {phases.map((p) => (
            <div key={p.id}>
              <p className={cn("font-display text-2xl", report.phase === p.id ? "text-zinc-50 italic" : "text-zinc-500")}>
                {p.k}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{p.d}</p>
            </div>
          ))}
        </div>

        <Button className="mt-12" onClick={() => navigate("/app/consult")}>
          {t("talkToExpert")}
        </Button>
      </div>
    </div>
  )
}
