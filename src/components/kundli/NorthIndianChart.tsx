import type { NatalChart } from "@/lib/vedic"

const ABBR: Record<string, string> = {
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

/** North-Indian diamond. House 1 is the top diamond; signs rotate with Lagna. */
export function NorthIndianChart({ natal, size = 360 }: { natal: NatalChart; size?: number }) {
  const lagnaIdx = Math.floor(natal.lagna / 30) % 12
  const byHouse: string[][] = Array.from({ length: 12 }, () => [])
  natal.bodies.forEach((b) => {
    byHouse[b.house - 1].push(`${ABBR[b.id] || b.name.slice(0, 2)}`)
  })
  byHouse[0].unshift("As")

  const houseSign = (house: number) => ((lagnaIdx + house - 1) % 12) + 1

  // House centers in a 400 viewBox (standard NI diamond)
  const centers: [number, number][] = [
    [200, 90],
    [300, 55],
    [345, 100],
    [310, 200],
    [345, 300],
    [300, 345],
    [200, 310],
    [100, 345],
    [55, 300],
    [90, 200],
    [55, 100],
    [100, 55],
  ]

  return (
    <svg viewBox="0 0 400 400" width={size} height={size} className="bg-[#07080C] text-zinc-100">
      <rect x="8" y="8" width="384" height="384" fill="#07080C" stroke="#3f3f46" strokeWidth="2" />
      <line x1="8" y1="8" x2="392" y2="392" stroke="#3f3f46" strokeWidth="1.5" />
      <line x1="392" y1="8" x2="8" y2="392" stroke="#3f3f46" strokeWidth="1.5" />
      <line x1="200" y1="8" x2="392" y2="200" stroke="#3f3f46" strokeWidth="1.5" />
      <line x1="392" y1="200" x2="200" y2="392" stroke="#3f3f46" strokeWidth="1.5" />
      <line x1="200" y1="392" x2="8" y2="200" stroke="#3f3f46" strokeWidth="1.5" />
      <line x1="8" y1="200" x2="200" y2="8" stroke="#3f3f46" strokeWidth="1.5" />

      {centers.map(([x, y], i) => (
        <g key={i}>
          <text x={x} y={y - 16} textAnchor="middle" fill="#71717A" fontSize="11" fontFamily="ui-monospace, monospace">
            {houseSign(i + 1)}
          </text>
          <text
            x={x}
            y={y + 6}
            textAnchor="middle"
            fill={i === 0 ? "#e4e4e7" : "#d4d4d8"}
            fontSize="12"
            fontFamily="ui-sans-serif, system-ui"
            fontWeight={i === 0 ? 700 : 500}
          >
            {byHouse[i].join(" ") || "·"}
          </text>
        </g>
      ))}
    </svg>
  )
}
