import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { castPrashna, houseAreaLabel, type PrashnaReading } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function Prashna() {
  const { user } = useUser()
  const { t, locale } = useI18n()
  const [question, setQuestion] = useState(() => t("prashnaAsk"))
  const [reading, setReading] = useState<PrashnaReading | null>(null)

  useEffect(() => {
    setQuestion((q) => (q === "Will I get this job?" || q === "क्या यह नौकरी मिलेगी?" || !q ? t("prashnaAsk") : q))
  }, [locale, t])

  return (
    <div className="relative">
      <CosmicField density={28} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("prashnaKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("prashnaHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("prashnaBody")}</p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          placeholder={t("prashnaAsk")}
          className="mt-10 w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-400"
        />
        <Button className="mt-4" onClick={() => setReading(castPrashna(question, user.placeOfBirth))}>
          {t("castQuestion")}
        </Button>

        {reading && (
          <div className="mt-14">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
              {reading.askedAt.toLocaleString("en-IN")} · {reading.lagna} lagna · {reading.moonSign} {reading.moonNakshatra}
            </p>
            <h2 className="mt-3 font-display text-3xl text-zinc-50 leading-snug">“{reading.question}”</h2>
            <p className="mt-5 text-[16px] text-zinc-200 leading-relaxed">
              {reading.yes ? t("prashnaYes") : t("prashnaMixed")}
            </p>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              {t("prashnaTiming", {
                sign: reading.moonSign,
                nak: reading.moonNakshatra,
                pada: reading.moonPada,
                n: reading.timingDays,
              })}
            </p>
            <ul className="mt-6 space-y-2">
              <li className="text-sm text-zinc-500">
                {t("prashnaHouse", { n: reading.houseHint, area: houseAreaLabel(reading.houseHint, locale === "hi") })}
              </li>
              <li className="text-sm text-zinc-500">
                {reading.focusName
                  ? t("prashnaFocus", {
                      name: reading.focusName,
                      sign: reading.focusSign || "",
                      dignity:
                        reading.focusDignity === "debilitated"
                          ? t("debilitated")
                          : reading.focusDignity === "exalted"
                            ? t("exalted")
                            : reading.focusDignity === "own sign"
                              ? t("ownSign")
                              : reading.focusDignity || "",
                    })
                  : t("prashnaNoFocus")}
              </li>
              <li className="text-sm text-zinc-500">{t("prashnaLagnaNow", { sign: reading.lagna })}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
