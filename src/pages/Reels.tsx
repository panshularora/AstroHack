import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { REELS, type Reel } from "@/data/reels"
import { computePanchang } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/Button"

function Glyph({ reel }: { reel: Reel }) {
  if (reel.glyph === "moon") {
    return (
      <div
        className="absolute left-1/2 top-[15%] h-48 w-48 -translate-x-1/2 rounded-full sm:h-64 sm:w-64 animate-float"
        style={{
          background: "radial-gradient(circle at 32% 28%, #f7f4ee, #c5c9d4 48%, #6f7582 78%, #3a3d46)",
          boxShadow: "0 0 120px rgba(220,225,240,0.3), inset -18px -10px 40px rgba(10,12,20,0.45)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(118deg, transparent 38%, rgba(9,9,11,0.45) 100%)" }}
        />
      </div>
    )
  }
  if (reel.glyph === "ring") {
    return (
      <div className="absolute left-1/2 top-[12%] h-56 w-56 -translate-x-1/2 sm:h-72 sm:w-72">
        <div className="absolute inset-0 rounded-full border border-white/25 animate-orbit">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.85)]" />
        </div>
        <div className="absolute inset-[20%] rounded-full border border-white/10" />
        {reel.mark && (
          <p className="absolute inset-0 grid place-items-center font-display text-6xl text-zinc-50 sm:text-7xl">{reel.mark}</p>
        )}
      </div>
    )
  }
  if (reel.glyph === "tape") {
    return (
      <div className="absolute left-1/2 top-[14%] w-[min(82%,22rem)] -translate-x-1/2 -rotate-[3.5deg]">
        <div
          className="relative overflow-hidden rounded-[2px] px-7 py-9 sm:px-9 sm:py-11"
          style={{
            background: "linear-gradient(180deg, #f6edd8 0%, #e8d7b4 100%)",
            boxShadow: "0 28px 80px rgba(0,0,0,0.48)",
          }}
        >
          <div className="absolute inset-y-0 left-0 w-3 opacity-70 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#c4b48e_4px,#c4b48e_5px)]" />
          <div className="absolute inset-y-0 right-0 w-3 opacity-70 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#c4b48e_4px,#c4b48e_5px)]" />
          <p className="font-display text-3xl sm:text-4xl text-[#2a2418] leading-[1.05] italic">
            {reel.by || "TAPE"}
          </p>
          {reel.mark && <p className="mt-3 font-mono text-[11px] tracking-[0.22em] text-[#6a5e48]">{reel.mark}</p>}
        </div>
      </div>
    )
  }
  return (
    <p className="absolute left-3 top-[11%] font-display text-[9rem] leading-none text-white/12 sm:left-6 sm:text-[12rem] select-none">
      {reel.mark || "“"}
    </p>
  )
}

export function Reels() {
  const { locale, t } = useI18n()
  const { user } = useUser()
  const navigate = useNavigate()
  const sky = useMemo(() => computePanchang(new Date(), user.placeOfBirth), [user.placeOfBirth])
  const hi = locale === "hi"
  const [active, setActive] = useState(0)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reel]"))
    if (!nodes.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-reel")))
        })
      },
      { threshold: 0.55 }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <div className="absolute inset-0 bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 z-0">
        <CosmicField density={52} />
      </div>
      <p className="pointer-events-none absolute top-5 left-5 z-30 font-display italic text-zinc-50/75">{t("brand")}</p>
      <div className="pointer-events-none absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5">
        {REELS.map((reel, i) => (
          <span
            key={reel.id}
            className="block w-1 rounded-full transition-[height,background-color] duration-300"
            style={{
              height: active === i ? 22 : 7,
              background: active === i ? "rgba(250,250,250,0.9)" : "rgba(250,250,250,0.22)",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-10 overflow-y-auto snap-y snap-mandatory no-scrollbar">
      {REELS.map((reel, i) => {
        const title = hi ? reel.titleHi : reel.title
        const body = hi ? reel.bodyHi : reel.body
        const kicker = hi ? reel.kickerHi : reel.kicker
        const cta = hi ? reel.ctaHi : reel.cta
        const skyLine = hi
          ? `चंद्र ${sky.moonSign} · ${sky.tithi} · राहु काल ${sky.rahuKaal.label}`
          : `Moon in ${sky.moonSign} · ${sky.tithi} · Rahu Kaal ${sky.rahuKaal.label}`
        return (
          <section
            key={reel.id}
            data-reel={i}
            className="relative snap-start min-h-[100dvh] w-full flex flex-col justify-end overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 24%, ${reel.wash}, transparent 56%), radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.45), transparent 50%), #09090b`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay reel-grain" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
            <Glyph reel={reel} />
            <div className="relative z-10 px-5 pb-[max(7.5rem,env(safe-area-inset-bottom))] pt-28 max-w-xl">
              <p className="text-[12px] uppercase tracking-[0.18em] text-zinc-200/85">
                {kicker}
                {reel.by ? ` · ${reel.by}` : ""}
              </p>
              <h2 className="mt-4 font-display text-[2rem] sm:text-5xl text-zinc-50 leading-[1.05]">{title}</h2>
              {(reel.kind === "sky" || body) && (
                <p className="mt-5 text-[16px] text-zinc-200/85 leading-relaxed max-w-md">
                  {reel.kind === "sky" ? skyLine : body}
                </p>
              )}
              {reel.href && cta && (
                <Button className="mt-8" onClick={() => navigate(reel.href!)}>
                  {cta}
                </Button>
              )}
            </div>
            {i === 0 && active === 0 && (
              <div className="pointer-events-none absolute bottom-[8.4rem] left-1/2 z-20 -translate-x-1/2 flex flex-col items-center text-zinc-200/80">
                <span className="text-[11px] uppercase tracking-[0.22em]">{t("swipeReels")}</span>
                <span className="mt-2 block h-9 w-px bg-white/40 animate-swipe-hint" />
              </div>
            )}
          </section>
        )
      })}
      </div>
    </div>
  )
}
