import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { CosmicField } from "@/components/sky/CosmicField"
import { NightOrbit } from "@/components/sky/NightOrbit"
import { RASHI_SA, RASHIS } from "@/lib/vedic/constants"
import { computeGrahas, computePanchang } from "@/lib/vedic"
import { LangToggle } from "@/components/site/LangToggle"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { apiOptional } from "@/lib/api"

type Range = "today" | "tomorrow" | "week" | "month"
type Pillar = { level: string; noteEn: string; noteHi: string }

type HoroscopePayload = {
  engine: string
  range: Range
  rashi: { index: number; en: string; sa: string }
  moonSign: string
  tithi: string
  nakshatra: string
  yoga: string
  rahuKaal: string
  houseFromRashi: number
  line: { en: string; hi: string }
  pillars: { love: Pillar; career: Pillar; health: Pillar; money: Pillar }
}

const RANGES: Range[] = ["today", "tomorrow", "week", "month"]

export function Horoscope() {
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const [rashi, setRashi] = useState(0)
  const [range, setRange] = useState<Range>("today")
  const [row, setRow] = useState<HoroscopePayload | null>(null)
  const sky = useMemo(() => computePanchang(new Date(), "New Delhi, India"), [])
  const bodies = useMemo(() => computeGrahas(new Date()).bodies, [])

  useEffect(() => {
    let live = true
    apiOptional<HoroscopePayload>(`/api/horoscope?rashi=${rashi}&range=${range}`).then((data) => {
      if (live && data?.line) setRow(data)
    })
    return () => {
      live = false
    }
  }, [rashi, range])

  const rangeLabel = (id: Range) =>
    id === "today" ? t("today") : id === "tomorrow" ? t("tomorrowScope") : id === "week" ? t("weekScope") : t("monthScope")

  return (
    <div className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <CosmicField density={28} />
      <div className="relative max-w-3xl mx-auto px-5 py-10 pb-24">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display italic text-xl">
            {t("brand")}
          </Link>
          <LangToggle compact />
        </div>
        <p className="mt-10 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("dailyRashi")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[1.02]">{t("horoscopeHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg">{t("horoscopeBody")}</p>
        <div className="relative mt-8 h-[220px] sm:h-[280px] max-w-lg">
          <NightOrbit bodies={bodies} panchang={sky} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {RANGES.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setRange(id)}
              className={cn(
                "h-9 px-4 rounded-full text-sm",
                range === id ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
              )}
            >
              {rangeLabel(id)}
            </button>
          ))}
        </div>

        <p className="mt-10 text-sm text-zinc-500">{t("pickRashi")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {RASHIS.map((name, i) => (
            <button
              key={name}
              type="button"
              onClick={() => setRashi(i)}
              className={cn(
                "h-9 px-4 rounded-full text-sm",
                rashi === i ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
              )}
            >
              {locale === "hi" ? RASHI_SA[i] : name}
            </button>
          ))}
        </div>

        <p className="mt-10 font-display text-3xl text-zinc-50">
          {locale === "hi" ? RASHI_SA[rashi] : RASHIS[rashi]}
        </p>
        <p className="mt-4 text-[16px] text-zinc-300 leading-relaxed max-w-xl">
          {row ? (locale === "hi" ? row.line.hi : row.line.en) : t("horoscopeBody")}
        </p>

        {row && (
          <div className="mt-10 grid grid-cols-2 gap-8">
            {(
              [
                ["love", t("marriage"), row.pillars.love],
                ["career", t("career"), row.pillars.career],
                ["health", t("health"), row.pillars.health],
                ["money", t("money"), row.pillars.money],
              ] as const
            ).map(([id, label, p]) => (
              <div key={id}>
                <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                <p className="mt-1 font-display text-2xl text-zinc-50">{p.level}</p>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{locale === "hi" ? p.noteHi : p.noteEn}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={() => navigate("/app/consult")}>{t("talkToExpert")}</Button>
          <Button variant="ghost" onClick={() => navigate("/panchang")}>
            {t("panchang")}
          </Button>
        </div>
      </div>
    </div>
  )
}
