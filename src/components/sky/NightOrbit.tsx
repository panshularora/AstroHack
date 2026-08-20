import { useMemo } from "react"
import type { Panchang, SiderealBody } from "@/lib/vedic"

const TONE: Record<string, string> = {
  sun: "#F4D59A",
  moon: "#F4F7FB",
  mars: "#C45C4A",
  mercury: "#C5D0D8",
  jupiter: "#D4C4A0",
  venus: "#E6D5C4",
  saturn: "#8B93A1",
  rahu: "#6B7280",
  ketu: "#A78B7A",
}

const SHORT: Record<string, string> = {
  sun: "Su",
  moon: "Mo",
  mars: "Ma",
  mercury: "Me",
  jupiter: "Ju",
  venus: "Ve",
  saturn: "Sa",
  rahu: "Ra",
  ketu: "Ke",
}

export function NightOrbit({
  bodies,
  panchang,
}: {
  bodies: SiderealBody[]
  panchang: Panchang
}) {
  const phase = useMemo(() => {
    const i = panchang.tithiIndex
    const illum = i <= 15 ? i / 15 : (30 - i) / 15
    return { illumination: Math.max(0.08, Math.min(0.96, illum)), waxing: i <= 15 }
  }, [panchang.tithiIndex])

  const planets = bodies.filter((b) => b.id !== "moon")
  const rings = [
    { r: 70, ids: ["mercury", "venus"] },
    { r: 108, ids: ["sun", "mars"] },
    { r: 146, ids: ["jupiter", "saturn"] },
    { r: 182, ids: ["rahu", "ketu"] },
  ]

  return (
    <div className="relative mx-auto h-[360px] w-[360px] sm:h-[440px] sm:w-[440px]">
      <div className="absolute inset-[2%] rounded-full border border-white/[0.06] animate-orbit" />
      <div className="absolute inset-[18%] rounded-full border border-white/[0.05] animate-orbit-reverse" />
      <div
        className="absolute inset-[8%] rounded-full"
        style={{ boxShadow: "inset 0 0 80px rgba(255,255,255,0.04)" }}
      />
      {rings.map((ring) => (
        <div
          key={ring.r}
          className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.12]"
          style={{ width: ring.r * 2, height: ring.r * 2, marginLeft: -ring.r, marginTop: -ring.r }}
        >
          {planets
            .filter((b) => ring.ids.includes(b.id))
            .map((b) => {
              const rad = ((b.sidereal - 90) * Math.PI) / 180
              const x = Math.cos(rad) * ring.r
              const y = Math.sin(rad) * ring.r
              const size = b.id === "sun" ? 11 : b.id === "jupiter" ? 9 : 7
              return (
                <span
                  key={b.id}
                  title={`${b.name} in ${b.sign}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: size,
                      height: size,
                      background: TONE[b.id] || "#ddd",
                    }}
                  />
                  <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 text-[9px] tracking-wide text-zinc-500 whitespace-nowrap">
                    {SHORT[b.id]} {b.sign.slice(0, 3)}
                  </span>
                </span>
              )
            })}
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <MoonMini illumination={phase.illumination} waxing={phase.waxing} />
        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-zinc-400">{panchang.moonSign}</p>
      </div>
    </div>
  )
}

function MoonMini({ illumination, waxing }: { illumination: number; waxing: boolean }) {
  const size = 52
  const shift = (1 - illumination) * size * (waxing ? -1 : 1)
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle at 35% 32%, #fff 0%, #d7dee8 55%, #b4bdc8 100%)" }}
        />
        <div
          className="absolute inset-[-10%] rounded-full bg-[#0B1020]"
          style={{
            transform: "translateX(" + shift + "px)",
            opacity: illumination > 0.94 ? 0 : 1,
          }}
        />
      </div>
    </div>
  )
}
