import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useNatalChart, useUser } from "@/context/UserContext"
import { houseAreaLabel, recommendGemstones } from "@/lib/vedic"
import { Button } from "@/components/ui/Button"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function Gemstones() {
  const { user } = useUser()
  const natal = useNatalChart()
  const navigate = useNavigate()
  const { t, locale } = useI18n()
  const hi = locale === "hi"
  const gems = useMemo(() => recommendGemstones(natal), [natal])

  return (
    <div className="relative">
      <CosmicField density={28} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("gemsKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("gemsHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("gemsBody", { name: user.name })}</p>
        <Button className="mt-6" onClick={() => navigate("/app/offerings")}>
          {t("claimWallet")}
        </Button>

        <div className="mt-14 space-y-12">
          {gems.map((g) => (
            <article key={g.planetId}>
              <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                {hi ? g.planetHi : g.planet} · {hi ? g.dayHi : g.day}
              </p>
              <h2 className="mt-1 font-display text-3xl text-zinc-50">{hi ? g.gemHi : g.gem}</h2>
              <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed max-w-lg">
                {g.debilitated
                  ? t("gemDebilitated", { planet: hi ? g.planetHi : g.planet, sign: g.sign })
                  : t("gemInHouse", { planet: hi ? g.planetHi : g.planet, n: g.house, area: houseAreaLabel(g.house, hi) })}
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                {hi ? g.metalHi : g.metal} · {hi ? g.fingerHi : g.finger} ·{" "}
                {g.planetId === "saturn" || g.planetId === "rahu" ? t("gemTrial") : t("gemNatural")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
