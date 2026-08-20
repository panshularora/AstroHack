import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { CosmicField } from "@/components/sky/CosmicField"
import { LangToggle } from "@/components/site/LangToggle"
import { useI18n } from "@/lib/i18n"
import { apiOptional } from "@/lib/api"

type PanchangPayload = {
  place: string
  lat: number
  lng: number
  weekday: string
  paksha: string
  tithi: string
  nakshatra: string
  yoga: string
  karana: string
  moonSign: string
  sunSign: string
  rahuKaal: string
  abhijit: string
  ayanamsa: string
}

export function Panchang() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [place, setPlace] = useState("New Delhi, India")
  const [row, setRow] = useState<PanchangPayload | null>(null)

  useEffect(() => {
    let live = true
    apiOptional<PanchangPayload>(`/api/panchang?place=${encodeURIComponent(place)}`).then((data) => {
      if (live && data?.tithi) setRow(data)
    })
    return () => {
      live = false
    }
  }, [place])

  const rows = row
    ? [
        [t("panchang"), row.weekday],
        ["Tithi", row.tithi],
        ["Nakshatra", row.nakshatra],
        ["Yoga", row.yoga],
        ["Karana", row.karana],
        [t("horoscope"), `${row.moonSign} · ${row.sunSign}`],
        ["Rahu Kaal", row.rahuKaal],
        ["Abhijit", row.abhijit],
      ]
    : []

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
        <p className="mt-10 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("panchang")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[1.02]">{t("panchangHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg">{t("panchangBody")}</p>

        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="mt-8 w-full max-w-md h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm"
          placeholder="New Delhi, India"
        />

        {row && (
          <div className="mt-12 space-y-6">
            <p className="text-sm text-zinc-500">
              {row.place} · {row.lat.toFixed(2)}° · {row.lng.toFixed(2)}° · {row.ayanamsa}
            </p>
            {rows.map(([k, v]) => (
              <div key={k}>
                <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{k}</p>
                <p className="mt-1 font-display text-3xl text-zinc-50">{v}</p>
              </div>
            ))}
          </div>
        )}

        <Button className="mt-10" onClick={() => navigate("/app/consult")}>
          {t("talkToExpert")}
        </Button>
      </div>
    </div>
  )
}
