import { useMemo, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import type { Panchang, SiderealBody } from "@/lib/vedic"
import type { GrahaId } from "@/lib/vedic"

const PLANET_TONE: Record<GrahaId, string> = {
  sun: "#F2E2B8",
  moon: "#F4F7FB",
  mars: "#C45C4A",
  mercury: "#C5D0D8",
  jupiter: "#D4C4A0",
  venus: "#E6D5C4",
  saturn: "#8B93A1",
  rahu: "#6B7280",
  ketu: "#A78B7A",
}

type HourMood = "night" | "dawn" | "day" | "dusk"

function moodOf(now: Date, sunrise?: Date, sunset?: Date): HourMood {
  const t = now.getTime()
  const rise = sunrise?.getTime() ?? new Date(now).setHours(6, 10, 0, 0)
  const set = sunset?.getTime() ?? new Date(now).setHours(18, 40, 0, 0)
  if (t < rise - 40 * 60_000) return "night"
  if (t < rise + 45 * 60_000) return "dawn"
  if (t < set - 40 * 60_000) return "day"
  if (t < set + 50 * 60_000) return "dusk"
  return "night"
}

const SKY: Record<HourMood, { from: string; via: string; to: string; glow: string; horizon: string }> = {
  night: { from: "#05060A", via: "#0B1020", to: "#121018", glow: "rgba(180,200,255,0.10)", horizon: "rgba(80,90,130,0.18)" },
  dawn: { from: "#120E16", via: "#3A2430", to: "#8A5348", glow: "rgba(255,170,120,0.18)", horizon: "rgba(255,160,110,0.28)" },
  day: { from: "#0C121C", via: "#152033", to: "#2A3A4C", glow: "rgba(160,190,220,0.12)", horizon: "rgba(120,150,180,0.2)" },
  dusk: { from: "#100C14", via: "#2A1830", to: "#6A3A38", glow: "rgba(232,180,120,0.16)", horizon: "rgba(200,120,90,0.26)" },
}

function stars(count: number, seed = 11) {
  let s = seed
  const rand = () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 68,
    r: rand() * 1.35 + 0.25,
    o: rand() * 0.55 + 0.18,
    d: rand() * 5 + 2,
  }))
}

function moonPhase(panchang: Panchang) {
  const i = panchang.tithiIndex
  const illum = i <= 15 ? i / 15 : (30 - i) / 15
  return { illumination: Math.max(0.04, Math.min(0.98, illum)), waxing: i <= 15 }
}

export function LivingSky({
  bodies,
  panchang,
  now = new Date(),
  className = "",
  heightClass = "h-[72vh] min-h-[420px]",
  children,
}: {
  bodies: SiderealBody[]
  panchang: Panchang
  now?: Date
  className?: string
  heightClass?: string
  children?: ReactNode
}) {
  const [hover, setHover] = useState<GrahaId | null>(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const mood = moodOf(now, panchang.sunrise, panchang.sunset)
  const palette = SKY[mood]
  const field = useMemo(() => stars(56), [])
  const phase = moonPhase(panchang)
  const ecliptic = bodies.filter((b) => b.id !== "moon")

  return (
    <div
      className={`relative overflow-hidden ${heightClass} ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setParallax({
          x: ((e.clientX - r.left) / r.width - 0.5) * 16,
          y: ((e.clientY - r.top) / r.height - 0.5) * 10,
        })
      }}
    >
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `linear-gradient(180deg, ${palette.from} 0%, ${palette.via} 48%, ${palette.to} 100%)`,
        }}
      />
      <div
        className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[90px] animate-breathe pointer-events-none"
        style={{ background: palette.glow }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: `linear-gradient(180deg, transparent, ${palette.horizon})` }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate(${parallax.x * 0.35}px, ${parallax.y * 0.35}px)` }}
      >
        {field.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.r,
              height: st.r,
              opacity: st.o,
              animationDelay: `${st.d}s`,
              animationDuration: `${2.4 + st.d}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute right-[12%] top-[16%] sm:right-[16%] sm:top-[14%]"
        style={{ transform: `translate(${parallax.x * 0.7}px, ${parallax.y * 0.55}px)` }}
      >
        <MoonDisc illumination={phase.illumination} waxing={phase.waxing} sky={palette.via} />
        <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
          {panchang.paksha} · {panchang.moonSign}
        </p>
      </div>

      <svg
        viewBox="0 0 1000 360"
        className="absolute inset-x-0 bottom-[8%] h-[42%] w-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 220 C 180 120, 360 280, 520 180 S 820 80, 1000 200"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute inset-x-[4%] bottom-[14%] h-[38%]">
        {ecliptic.map((b, i) => {
          const x = (b.sidereal / 360) * 100
          const y = 48 + Math.sin((b.sidereal / 360) * Math.PI * 2) * 28
          const size = b.id === "sun" ? 11 : b.id === "jupiter" ? 9 : b.id === "saturn" ? 8 : 6
          const active = hover === b.id
          return (
            <button
              key={b.id}
              type="button"
              onMouseEnter={() => setHover(b.id)}
              onMouseLeave={() => setHover(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={`${b.name} in ${b.sign}`}
            >
              <motion.span
                className="block rounded-full"
                animate={{ scale: active ? 1.35 : 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: size,
                  height: size,
                  background: PLANET_TONE[b.id],
                  boxShadow: `0 0 ${active ? 16 : 8}px ${PLANET_TONE[b.id]}`,
                }}
              />
              <span
                className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium tracking-wide ${
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                } text-zinc-100`}
              >
                {b.symbol} {b.name}
              </span>
              {active && (
                <span className="absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap text-[10px] text-zinc-400">
                  {b.sign} {b.degreeLabel}
                </span>
              )}
              <span
                className="absolute left-1/2 top-1/2 -z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
                style={{ background: PLANET_TONE[b.id], animationDelay: `${i * 0.4}s` }}
              />
            </button>
          )
        })}
      </div>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

function MoonDisc({
  illumination,
  waxing,
  sky,
}: {
  illumination: number
  waxing: boolean
  sky: string
}) {
  const size = 92
  const shift = (1 - illumination) * size * (waxing ? -1 : 1)
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        className="absolute -inset-6 rounded-full animate-breathe"
        style={{ background: "radial-gradient(circle, rgba(232,236,245,0.22), transparent 70%)" }}
      />
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 32%, #fff 0%, #d7dee8 52%, #b4bdc8 100%)",
          }}
        />
        <div
          className="absolute inset-[-8%] rounded-full"
          style={{
            background: sky,
            transform: `translateX(${shift}px)`,
            opacity: illumination > 0.94 ? 0 : 1,
          }}
        />
      </div>
    </div>
  )
}
