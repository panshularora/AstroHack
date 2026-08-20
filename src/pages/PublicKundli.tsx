import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { CosmicField } from "@/components/sky/CosmicField"
import { LangToggle } from "@/components/site/LangToggle"
import { useI18n } from "@/lib/i18n"
import { apiOptional } from "@/lib/api"

type Body = { name: string; sign: string; house: number; dignity: string; degree: string; nakshatra: string }
type KundliPayload = {
  lagna: string
  sun: string
  moon: string
  nakshatra: string
  pada: number
  dasha: string
  ayanamsa: number
  place: string
  lat: number
  lng: number
  bodies: Body[]
  yogas: { name: string; meaning: string }[]
}

const field =
  "w-full h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white focus-visible:outline-none focus-visible:border-zinc-400"

export function PublicKundli() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [dob, setDob] = useState("1994-08-14")
  const [time, setTime] = useState("08:30")
  const [place, setPlace] = useState("New Delhi, India")
  const [row, setRow] = useState<KundliPayload | null>(null)
  const [busy, setBusy] = useState(false)

  const run = async () => {
    setBusy(true)
    const data = await apiOptional<KundliPayload>(
      `/api/kundli?dob=${encodeURIComponent(dob)}&time=${encodeURIComponent(time)}&place=${encodeURIComponent(place)}`
    )
    setBusy(false)
    if (data?.lagna) setRow(data)
  }

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
        <p className="mt-10 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("freeKundli")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[1.02]">{t("kundliHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg">{t("kundliBody")}</p>

        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          <input className={field} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          <input className={field} type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <input className={field} value={place} onChange={(e) => setPlace(e.target.value)} />
        </div>
        <Button className="mt-6" disabled={busy} onClick={() => void run()}>
          {busy ? "…" : t("freeKundli")}
        </Button>

        {row && (
          <div className="mt-12">
            <p className="font-display text-4xl text-zinc-50">
              {row.lagna} <span className="italic text-zinc-400">lagna</span>
            </p>
            <p className="mt-3 text-sm text-zinc-400">
              {row.place} · {row.lat.toFixed(2)}° {row.lng.toFixed(2)}° · Lahiri {row.ayanamsa.toFixed(2)}°
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Sun {row.sun} · Moon {row.moon} {row.nakshatra} p{row.pada} · {row.dasha}
            </p>
            <ul className="mt-8 space-y-3">
              {row.bodies.map((b) => (
                <li key={b.name} className="text-sm text-zinc-300">
                  {b.name} · {b.sign} {b.degree} · H{b.house} · {b.dignity}
                </li>
              ))}
            </ul>
            {row.yogas[0] && (
              <p className="mt-8 text-sm text-zinc-400 max-w-lg">
                {row.yogas[0].name}. {row.yogas[0].meaning}
              </p>
            )}
          </div>
        )}

        <Button className="mt-10" variant="outline" onClick={() => navigate("/app/consult")}>
          {t("talkToExpert")}
        </Button>
      </div>
    </div>
  )
}
