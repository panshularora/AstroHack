import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useNatalChart, useUser } from "@/context/UserContext"
import { computeMangalDosha, houseAreaLabel } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function MangalDosha() {
  const { user } = useUser()
  const natal = useNatalChart()
  const report = useMemo(() => computeMangalDosha(natal), [natal])
  const navigate = useNavigate()
  const { t, locale } = useI18n()
  const hi = locale === "hi"
  const verdict = !report.hasDosha ? t("noDosha") : report.cancelled ? t("yesCancelled") : t("yesPresent")
  const verdictLine = !report.hasDosha ? t("mangalNone") : report.cancelled ? t("mangalBhanga") : t("mangalPresent")
  const note = !report.hasDosha ? t("mangalNoteNone") : report.cancelled ? t("mangalNoteBhanga") : t("mangalNotePresent")

  return (
    <div className="relative">
      <CosmicField density={28} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("mangalKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("mangalHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">
          {t("mangalLine", { sign: report.marsSign, name: user.name })} · {user.ascendant} lagna · {user.moonSign} moon
        </p>

        <p className="mt-12 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("verdict")}</p>
        <h2 className="mt-2 font-display text-4xl text-zinc-50">{verdict}</h2>
        <p className="mt-4 text-[15px] text-zinc-300 leading-relaxed max-w-lg">{verdictLine}</p>
        <p className="mt-2 text-sm text-zinc-500 max-w-lg leading-relaxed">{note}</p>

        {(report.fromLagna || report.fromMoon) && (
          <div className="mt-12">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("why")}</p>
            <ul className="mt-4 space-y-3">
              {report.fromLagna && (
                <li className="text-[15px] text-zinc-300 leading-relaxed">
                  {t("marsFromLagna", { n: report.marsHouseLagna, area: houseAreaLabel(report.marsHouseLagna, hi) })}
                </li>
              )}
              {report.fromMoon && (
                <li className="text-[15px] text-zinc-300 leading-relaxed">
                  {t("marsFromMoon", { n: report.marsHouseMoon })}
                </li>
              )}
            </ul>
          </div>
        )}

        {(report.marsDignity === "exalted" ||
          report.marsDignity === "own sign" ||
          report.jupiterAspects ||
          report.saturnInDosha ||
          report.ownSeventh) && (
          <div className="mt-12">
            <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-300/80">{t("doshaBhanga")}</p>
            <ul className="mt-4 space-y-3">
              {(report.marsDignity === "exalted" || report.marsDignity === "own sign") && (
                <li className="text-[15px] text-zinc-300 leading-relaxed">
                  {t("marsDignityBhanga", {
                    dignity: report.marsDignity === "exalted" ? t("exalted") : t("ownSign"),
                    sign: report.marsSign,
                  })}
                </li>
              )}
              {report.jupiterAspects && (
                <li className="text-[15px] text-zinc-300 leading-relaxed">
                  {t("guruDrishtiBhanga", { sign: report.jupiterSign })}
                </li>
              )}
              {report.saturnInDosha && (
                <li className="text-[15px] text-zinc-300 leading-relaxed">{t("saturnDoshaBhanga")}</li>
              )}
              {report.ownSeventh && (
                <li className="text-[15px] text-zinc-300 leading-relaxed">{t("marsOwnSeventh")}</li>
              )}
            </ul>
          </div>
        )}

        <Button className="mt-12" onClick={() => navigate("/match")}>
          {t("matching")}
        </Button>
      </div>
    </div>
  )
}
