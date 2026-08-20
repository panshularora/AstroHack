import {
  computeNatal,
  lahiriAyanamsa,
  norm360,
  toJulianDate,
  tropicalSun,
} from "../src/lib/vedic/engine.ts"

function assert(cond: unknown, message: string) {
  if (!cond) throw new Error(message)
}

function near(got: number, want: number, tol: number, label: string) {
  const d = Math.min(Math.abs(norm360(got) - norm360(want)), 360 - Math.abs(norm360(got) - norm360(want)))
  assert(d <= tol, `${label}: got ${got.toFixed(4)} want ${want} ±${tol} (Δ${d.toFixed(4)})`)
}

const j2000 = 2451545.0
near(lahiriAyanamsa(j2000), 23.85, 0.05, "Lahiri ayanamsa at J2000")

const jdNow = toJulianDate(new Date("2026-08-19T00:00:00Z"))
assert(jdNow > 2460000 && jdNow < 2470000, `Julian date out of range: ${jdNow}`)

const sunJ2000 = tropicalSun(j2000)
near(sunJ2000, 280.47, 0.5, "Tropical sun at J2000")

const natal = computeNatal("1994-08-14", "08:30", "New Delhi, India")
assert(natal.sunSign, "natal sun missing")
assert(natal.moonSign, "natal moon missing")
assert(natal.lagnaSign, "natal lagna missing")
assert(natal.dasha?.maha?.lord, "dasha missing")
assert(natal.bodies.length >= 9, `expected 9+ grahas, got ${natal.bodies.length}`)

for (const b of natal.bodies) {
  assert(b.sidereal >= 0 && b.sidereal < 360, `${b.id} sidereal out of range`)
  assert(b.signIndex >= 0 && b.signIndex < 12, `${b.id} sign index`)
}

console.log("vedic engine ok")
console.log(
  `Arjun snapshot: ${natal.lagnaSign} lagna · ${natal.moonSign} moon · ${natal.dasha.label}`
)
