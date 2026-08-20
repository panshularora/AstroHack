import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useNatalChart } from "@/context/UserContext"
import { computeSkyFlags, grahasInNatalHouses, houseAreaLabel, houseEffect, mostSignificantTransit } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { NightOrbit } from "@/components/sky/NightOrbit"
import { computePanchang } from "@/lib/vedic"
import { useI18n } from "@/lib/i18n"

export function NavagrahaLive() {
  const navigate = useNavigate()
  const natal = useNatalChart()
  const { t, locale } = useI18n()
  const hi = locale === "hi"
  const sky = useMemo(() => grahasInNatalHouses(natal), [natal])
  const flags = useMemo(() => computeSkyFlags(), [])
  const panchang = useMemo(() => computePanchang(new Date(), natal.placeName), [natal.placeName])
  const highlight = mostSignificantTransit(natal, hi)

  return (
    <div className="relative">
      <CosmicField density={32} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("grahasKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("grahasHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">
          {t("grahasBody", { n: sky.ayanamsa.toFixed(2), sign: natal.lagnaSign })}
        </p>

        <div className="relative mt-8 h-[240px] sm:h-[300px]">
          <NightOrbit bodies={sky.bodies} panchang={panchang} />
        </div>

        {flags.length > 0 && (
          <p className="mt-6 text-sm text-amber-200/90 leading-relaxed">
            {flags.map((f) => `${f.name}: ${f.detail}`).join(" · ")}
          </p>
        )}

        <div className="mt-14 space-y-10">
          {sky.bodies.map((p) => (
            <article key={p.id}>
              <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                {p.sanskrit} · {p.dignity}
              </p>
              <h2 className="mt-1 font-display text-3xl text-zinc-50">
                {p.symbol} {p.name}
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                {p.sign} {p.degreeLabel} · {t("houseN", { n: p.house })} · {houseAreaLabel(p.house, hi)}
              </p>
              <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed max-w-lg">
                {houseEffect(p.id, p.house, p.dignity, hi)}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-16 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("mostTransit")}</p>
        <p className="mt-3 text-[15px] text-zinc-300 leading-relaxed max-w-lg">{highlight}</p>
        <Button className="mt-6" variant="outline" onClick={() => navigate("/app/transits")}>
          {t("viewTransits")}
        </Button>
      </div>
    </div>
  )
}
