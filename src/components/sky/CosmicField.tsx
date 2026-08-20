import { useEffect, useMemo, useState } from "react"

function makeStars(count: number, seed: number) {
  let s = seed
  const rand = () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: rand() * 1.8 + 0.35,
    o: rand() * 0.5 + 0.1,
    d: rand() * 6 + 2,
    layer: rand() > 0.55 ? 1 : 0,
  }))
}

export function CosmicField({ density = 42 }: { density?: number }) {
  const stars = useMemo(() => makeStars(density, 19), [density])
  const [shift, setShift] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24
      const y = (e.clientY / window.innerHeight - 0.5) * 16
      setShift({ x, y })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute -inset-[8%] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(210,200,180,0.07), transparent 55%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(120,140,180,0.06), transparent 50%)",
          transform: `translate3d(${shift.x * 0.25}px, ${shift.y * 0.25}px, 0)`,
        }}
      />
      <div className="absolute inset-0 starfield opacity-50" />
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: st.x + "%",
            top: st.y + "%",
            width: st.r,
            height: st.r,
            opacity: st.o,
            animationDelay: st.d + "s",
            animationDuration: 3 + st.d + "s",
            transform: `translate3d(${shift.x * (st.layer ? 0.7 : 0.35)}px, ${shift.y * (st.layer ? 0.7 : 0.35)}px, 0)`,
          }}
        />
      ))}
    </div>
  )
}
