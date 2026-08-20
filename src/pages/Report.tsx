import { Link } from "react-router-dom"
import { CosmicField } from "@/components/sky/CosmicField"
import { LangToggle } from "@/components/site/LangToggle"
import { useI18n } from "@/lib/i18n"

export function Report() {
  const { t } = useI18n()

  return (
    <div className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <CosmicField density={32} />
      <div className="relative max-w-2xl mx-auto px-5 py-12 pb-28">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display italic text-xl text-zinc-50">
            {t("brand")}
          </Link>
          <LangToggle compact />
        </div>
        <p className="mt-10 text-[12px] uppercase tracking-[0.18em] text-zinc-500">{t("reportPageKicker")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[1.05]">{t("reportPageHead")}</h1>
        <p className="mt-4 text-[16px] text-zinc-400 italic">{t("reportPageItal")}</p>
        <p className="mt-6 text-[15px] text-zinc-400 leading-relaxed">{t("reportPageIntro")}</p>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-zinc-50">{t("theProblem")}</h2>
          <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed">{t("problemBody")}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-zinc-50">{t("theLoop")}</h2>
          <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed">{t("loopBody")}</p>
        </section>

        <section className="mt-10 space-y-6">
          <h2 className="font-display text-2xl text-zinc-50">{t("fourBets")}</h2>
          <p className="text-[15px] text-zinc-400 leading-relaxed">
            <Link className="underline underline-offset-4" to="/tape">
              {t("watchTape")}
            </Link>{" "}
            {t("orWord")}{" "}
            <Link className="underline underline-offset-4" to="/p/proof-dp2?from=ARJUN">
              {t("openACard")}
            </Link>
            .
          </p>
          <p className="text-[15px] text-zinc-400 leading-relaxed">
            <Link className="underline underline-offset-4" to="/app/today">
              {t("today")}
            </Link>
            {" · "}
            {t("openTodayOnce")}
          </p>
          <p className="text-[15px] text-zinc-400 leading-relaxed">
            <Link className="underline underline-offset-4" to="/board">
              {t("rankedDates")}
            </Link>
          </p>
        </section>

        <p className="mt-14 text-sm text-zinc-500 leading-relaxed">{t("demoLine")}</p>
      </div>
    </div>
  )
}
