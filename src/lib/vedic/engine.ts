import {
  DASHA_ORDER,
  DASHA_YEARS,
  DEBILITATION,
  EXALTATION,
  GRAHA_META,
  HOUSE_AREAS,
  HOUSE_AREAS_HI,
  KARANAS,
  KRISHNA_TITHIS,
  NAKSHATRA_LORDS,
  NAKSHATRAS,
  OWN_SIGNS,
  RAHU_KAAL_SLOT,
  RASHI_SA,
  RASHIS,
  TITHIS,
  WEEKDAYS,
  YOGAS,
  type GrahaId,
} from "./constants.js"
import { resolvePlace } from "./cities.js"

const DEG = Math.PI / 180
const NAK_SPAN = 360 / 27
const PADA_SPAN = NAK_SPAN / 4

export function norm360(x: number): number {
  const v = x % 360
  return v < 0 ? v + 360 : v
}

export function toJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5
}

export function fromJulianDate(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000)
}

/** Chitrapaksha / Lahiri ayanamsa (Swiss-Ephemeris compatible closed form). */
export function lahiriAyanamsa(jd: number): number {
  const t = (jd - 2451545.0) / 36525
  return 23.852294 + 1.3969713726 * t - 0.000308 * t * t
}

function sind(x: number) {
  return Math.sin(norm360(x) * DEG)
}

/** Mean obliquity of the ecliptic, degrees. */
function obliquity(jd: number): number {
  const t = (jd - 2451545.0) / 36525
  return 23.43929111 - 0.013004167 * t - 1.63889e-7 * t * t
}

/**
 * Apparent tropical Sun (Meeus ch.25, ~0.01°).
 */
export function tropicalSun(jd: number): number {
  const t = (jd - 2451545.0) / 36525
  const L0 = 280.46646 + 36000.76983 * t + 0.0003032 * t * t
  const M = 357.52911 + 35999.05029 * t - 0.0001537 * t * t
  const C =
    (1.914602 - 0.004817 * t - 0.000014 * t * t) * sind(M) +
    (0.019993 - 0.000101 * t) * sind(2 * M) +
    0.000289 * sind(3 * M)
  return norm360(L0 + C - 0.00569)
}

/**
 * Apparent tropical Moon (Meeus ch.47, principal periodic terms, ~0.1–0.2°).
 */
export function tropicalMoon(jd: number): number {
  const t = (jd - 2451545.0) / 36525
  const Lp =
    218.3164477 +
    481267.88123421 * t -
    0.0015786 * t * t +
    t * t * t / 538841 -
    t * t * t * t / 65194000
  const D =
    297.8501921 + 445267.1114034 * t - 0.0018819 * t * t + t * t * t / 545868
  const M = 357.5291092 + 35999.0502909 * t - 0.0001536 * t * t
  const Mp =
    134.9633964 + 477198.8675055 * t + 0.0087414 * t * t + t * t * t / 69699
  const F =
    93.272095 + 483202.0175233 * t - 0.0036539 * t * t - t * t * t / 3526000
  const E = 1 - 0.002516 * t - 0.0000074 * t * t

  const terms: [number, number, number, number, number][] = [
    [0, 0, 1, 0, 6288774],
    [2, 0, -1, 0, 1274027],
    [2, 0, 0, 0, 658314],
    [0, 0, 2, 0, 213618],
    [0, 1, 0, 0, -185116],
    [0, 0, 0, 2, -114332],
    [2, 0, -2, 0, 58793],
    [2, -1, -1, 0, 57066],
    [2, 0, 1, 0, 53322],
    [2, -1, 0, 0, 45758],
    [0, 1, -1, 0, -40923],
    [1, 0, 0, 0, -34720],
    [0, 1, 1, 0, -30383],
    [2, 0, 0, -2, 15327],
    [0, 0, 1, 2, -12528],
    [0, 0, 1, -2, 10980],
    [4, 0, -1, 0, 10675],
    [0, 0, 3, 0, 10034],
    [4, 0, -2, 0, 8548],
    [2, 1, -1, 0, -7888],
    [2, 1, 0, 0, -6766],
    [1, 0, -1, 0, -5163],
    [1, 1, 0, 0, 4987],
    [2, -1, 1, 0, 4036],
    [2, 0, 2, 0, 3994],
    [4, 0, 0, 0, 3861],
    [2, 0, -3, 0, 3665],
    [0, 1, -2, 0, -2689],
    [2, 0, -1, 2, -2389],
    [2, -1, -2, 0, 2236],
    [1, 0, 1, 0, -2120],
    [2, -2, 0, 0, -2069],
    [0, 1, 2, 0, -2045],
    [0, 2, 0, 0, 1829],
    [4, -1, -1, 0, -1773],
    [0, 0, 2, 2, -1595],
    [3, 0, -1, 0, 1215],
    [2, 1, 1, 0, -1110],
    [4, -1, -2, 0, -892],
    [0, 2, -1, 0, -810],
  ]

  let sum = 0
  for (const [d, m, mp, f, c] of terms) {
    const arg = d * D + m * M + mp * Mp + f * F
    const scale = m === 0 ? 1 : E
    sum += c * scale * sind(arg)
  }
  return norm360(Lp + sum / 1_000_000)
}

/** Mean lunar ascending node = Rahu (tropical). */
export function tropicalRahu(jd: number): number {
  const t = (jd - 2451545.0) / 36525
  return norm360(125.0445479 - 1934.1362891 * t + 0.0020754 * t * t)
}

type KeplerBody = {
  a: [number, number]
  e: [number, number]
  i: [number, number]
  L: [number, number]
  wbar: [number, number]
  Omega: [number, number]
}

/** JPL Keplerian elements, T centuries from J2000. */
const KEPLER: Record<"mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn", KeplerBody> = {
  mercury: {
    a: [0.38709927, 0.00000037],
    e: [0.20563593, 0.00001906],
    i: [7.00497902, -0.00594749],
    L: [252.2503235, 149472.67411175],
    wbar: [77.45779628, 0.16047689],
    Omega: [48.33076593, -0.12534081],
  },
  venus: {
    a: [0.72333566, 0.0000039],
    e: [0.00677672, -0.00004107],
    i: [3.39467605, -0.0007889],
    L: [181.9790995, 58517.81538729],
    wbar: [131.60246718, 0.00268329],
    Omega: [76.67984255, -0.27769418],
  },
  earth: {
    a: [1.00000261, 0.00000562],
    e: [0.01671123, -0.00004392],
    i: [-0.00001531, -0.01294668],
    L: [100.46457166, 35999.37244981],
    wbar: [102.93768193, 0.32327364],
    Omega: [0, 0],
  },
  mars: {
    a: [1.52371034, 0.00001847],
    e: [0.0933941, 0.00007882],
    i: [1.84969142, -0.00813131],
    L: [-4.55343205, 19140.30268499],
    wbar: [-23.94362959, 0.44441088],
    Omega: [49.55953891, -0.29257343],
  },
  jupiter: {
    a: [5.202887, -0.00011607],
    e: [0.04838624, -0.00013253],
    i: [1.30439695, -0.00183714],
    L: [34.39644051, 3034.74612775],
    wbar: [14.72847983, 0.21252668],
    Omega: [100.47390909, 0.20469106],
  },
  saturn: {
    a: [9.53667594, -0.0012506],
    e: [0.05386179, -0.00050991],
    i: [2.48599187, 0.00193609],
    L: [49.95424423, 1222.49362201],
    wbar: [92.59887831, -0.41897216],
    Omega: [113.66242448, -0.28867794],
  },
}

function lerp(pair: [number, number], t: number) {
  return pair[0] + pair[1] * t
}

function solveKepler(Mdeg: number, e: number): number {
  let E = Mdeg * DEG
  const M = norm360(Mdeg) * DEG
  for (let n = 0; n < 14; n++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
  }
  return E
}

function heliocentric(body: KeplerBody, t: number): [number, number, number] {
  const a = lerp(body.a, t)
  const e = lerp(body.e, t)
  const i = lerp(body.i, t)
  const L = lerp(body.L, t)
  const wbar = lerp(body.wbar, t)
  const Omega = lerp(body.Omega, t)
  const w = wbar - Omega
  const M = L - wbar
  const E = solveKepler(M, e)
  const xv = a * (Math.cos(E) - e)
  const yv = a * Math.sqrt(1 - e * e) * Math.sin(E)
  const v = Math.atan2(yv, xv)
  const r = Math.hypot(xv, yv)
  const vw = v + w * DEG
  const om = Omega * DEG
  const inc = i * DEG
  const xh = r * (Math.cos(om) * Math.cos(vw) - Math.sin(om) * Math.sin(vw) * Math.cos(inc))
  const yh = r * (Math.sin(om) * Math.cos(vw) + Math.cos(om) * Math.sin(vw) * Math.cos(inc))
  const zh = r * (Math.sin(vw) * Math.sin(inc))
  return [xh, yh, zh]
}

function tropicalPlanet(
  id: "mercury" | "venus" | "mars" | "jupiter" | "saturn",
  jd: number
): number {
  const t = (jd - 2451545.0) / 36525
  const [px, py, pz] = heliocentric(KEPLER[id], t)
  const [ex, ey, ez] = heliocentric(KEPLER.earth, t)
  const x = px - ex
  const y = py - ey
  void pz
  void ez
  return norm360((Math.atan2(y, x) * 180) / Math.PI)
}

export interface SiderealBody {
  id: GrahaId
  name: string
  sanskrit: string
  symbol: string
  tropical: number
  sidereal: number
  sign: string
  signSa: string
  signIndex: number
  degreeInSign: number
  degreeLabel: string
  nakshatra: string
  pada: number
  dignity: "exalted" | "own sign" | "debilitated" | "neutral"
}

export function formatDMS(degInSign: number): string {
  const d = Math.floor(degInSign)
  const mf = (degInSign - d) * 60
  const m = Math.floor(mf)
  return `${d}°${String(m).padStart(2, "0")}'`
}

export function dignityOf(id: GrahaId, signIndex: number): SiderealBody["dignity"] {
  if (EXALTATION[id] === signIndex) return "exalted"
  if (DEBILITATION[id] === signIndex) return "debilitated"
  if (OWN_SIGNS[id]?.includes(signIndex)) return "own sign"
  return "neutral"
}

export function siderealFromTropical(tropical: number, ayanamsa: number): Omit<
  SiderealBody,
  "id" | "name" | "sanskrit" | "symbol" | "dignity"
> {
  const sidereal = norm360(tropical - ayanamsa)
  const signIndex = Math.floor(sidereal / 30) % 12
  const degreeInSign = sidereal - signIndex * 30
  const nakIndex = Math.floor(sidereal / NAK_SPAN) % 27
  const pada = Math.floor((sidereal % NAK_SPAN) / PADA_SPAN) + 1
  return {
    tropical,
    sidereal,
    sign: RASHIS[signIndex],
    signSa: RASHI_SA[signIndex],
    signIndex,
    degreeInSign,
    degreeLabel: formatDMS(degreeInSign),
    nakshatra: NAKSHATRAS[nakIndex],
    pada,
  }
}

export function computeGrahas(date = new Date()): { ayanamsa: number; jd: number; bodies: SiderealBody[] } {
  const jd = toJulianDate(date)
  const ayanamsa = lahiriAyanamsa(jd)
  const tropical: Record<GrahaId, number> = {
    sun: tropicalSun(jd),
    moon: tropicalMoon(jd),
    mercury: tropicalPlanet("mercury", jd),
    venus: tropicalPlanet("venus", jd),
    mars: tropicalPlanet("mars", jd),
    jupiter: tropicalPlanet("jupiter", jd),
    saturn: tropicalPlanet("saturn", jd),
    rahu: tropicalRahu(jd),
    ketu: norm360(tropicalRahu(jd) + 180),
  }

  const order: GrahaId[] = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"]
  const bodies = order.map((id) => {
    const pos = siderealFromTropical(tropical[id], ayanamsa)
    return {
      id,
      ...GRAHA_META[id],
      ...pos,
      dignity: dignityOf(id, pos.signIndex),
    }
  })
  return { ayanamsa, jd, bodies }
}

export function rashiOf(siderealLong: number) {
  const i = Math.floor(norm360(siderealLong) / 30) % 12
  return { index: i, name: RASHIS[i], sa: RASHI_SA[i], degree: norm360(siderealLong) - i * 30 }
}

export function nakshatraOf(siderealLong: number) {
  const s = norm360(siderealLong)
  const i = Math.floor(s / NAK_SPAN) % 27
  return { index: i, name: NAKSHATRAS[i], pada: Math.floor((s % NAK_SPAN) / PADA_SPAN) + 1, lord: NAKSHATRA_LORDS[i] }
}

export interface Panchang {
  date: Date
  weekday: string
  paksha: "Shukla" | "Krishna"
  tithiIndex: number
  tithi: string
  tithiProgress: number
  nakshatra: string
  nakshatraPada: number
  yoga: string
  karana: string
  moonSign: string
  sunSign: string
  rahuKaal: { start: Date; end: Date; label: string }
  abhijit: { start: Date; end: Date; label: string }
  sunrise: Date
  sunset: Date
  ayanamsa: number
  ayanamsaLabel: string
}

function localCivilDate(date: Date, tz: number): { y: number; m: number; d: number; weekday: number } {
  const shifted = new Date(date.getTime() + tz * 3600000)
  return {
    y: shifted.getUTCFullYear(),
    m: shifted.getUTCMonth() + 1,
    d: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(),
  }
}

/** Approximate sunrise / sunset from solar longitude + latitude. */
export function sunTimes(date: Date, lat: number, lng: number, tz: number): { sunrise: Date; sunset: Date } {
  const civil = localCivilDate(date, tz)
  const noonUtc = Date.UTC(civil.y, civil.m - 1, civil.d, 12, 0, 0) - tz * 3600000
  const jd = toJulianDate(new Date(noonUtc))
  const sun = tropicalSun(jd)
  const t = (jd - 2451545) / 36525
  const dec = Math.asin(sind(obliquity(jd)) * sind(sun))
  const eqTime = 4 * (lng - 15 * tz) +
    (-1.915 * sind(357.52911 + 35999.05029 * t) - 0.02 * sind(2 * (357.52911 + 35999.05029 * t))) * 4
  const latR = lat * DEG
  const cosH = (sind(-0.833) - Math.sin(latR) * Math.sin(dec)) / (Math.cos(latR) * Math.cos(dec))
  const clamped = Math.min(1, Math.max(-1, cosH))
  const H = (Math.acos(clamped) * 180) / Math.PI
  const noonLocalMin = 12 * 60 - eqTime
  const riseMin = noonLocalMin - H * 4
  const setMin = noonLocalMin + H * 4
  const dayStart = Date.UTC(civil.y, civil.m - 1, civil.d, 0, 0, 0) - tz * 3600000
  return {
    sunrise: new Date(dayStart + riseMin * 60000),
    sunset: new Date(dayStart + setMin * 60000),
  }
}

function formatClock(d: Date, tz: number): string {
  const shifted = new Date(d.getTime() + tz * 3600000)
  const h = shifted.getUTCHours()
  const m = shifted.getUTCMinutes()
  const ampm = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`
}

export function computePanchang(date = new Date(), placeName?: string): Panchang {
  const place = resolvePlace(placeName)
  const jd = toJulianDate(date)
  const ayanamsa = lahiriAyanamsa(jd)
  const sun = norm360(tropicalSun(jd) - ayanamsa)
  const moon = norm360(tropicalMoon(jd) - ayanamsa)
  const elongation = norm360(moon - sun)
  const tithiFloat = elongation / 12
  const tithiIndex0 = Math.floor(tithiFloat) % 30
  const paksha: "Shukla" | "Krishna" = tithiIndex0 < 15 ? "Shukla" : "Krishna"
  const tithiName =
    paksha === "Shukla" ? TITHIS[tithiIndex0] : KRISHNA_TITHIS[tithiIndex0 - 15]
  const nak = nakshatraOf(moon)
  const yogaFloat = norm360(sun + moon) / NAK_SPAN
  const yoga = YOGAS[Math.floor(yogaFloat) % 27]
  const karanaIndex = Math.floor(elongation / 6) % 60
  let karana: string
  if (karanaIndex === 0) karana = "Kimstughna"
  else if (karanaIndex === 57) karana = "Shakuni"
  else if (karanaIndex === 58) karana = "Chatushpada"
  else if (karanaIndex === 59) karana = "Naga"
  else karana = KARANAS[(karanaIndex - 1) % 7]

  const { sunrise, sunset } = sunTimes(date, place.lat, place.lng, place.tz)
  const dayMs = sunset.getTime() - sunrise.getTime()
  const slot = RAHU_KAAL_SLOT[localCivilDate(date, place.tz).weekday] ?? 8
  const rahuStart = new Date(sunrise.getTime() + ((slot - 1) / 8) * dayMs)
  const rahuEnd = new Date(sunrise.getTime() + (slot / 8) * dayMs)
  const mid = sunrise.getTime() + dayMs / 2
  const abhiHalf = dayMs / 30
  const abhijitStart = new Date(mid - abhiHalf / 2)
  const abhijitEnd = new Date(mid + abhiHalf / 2)
  const weekday = WEEKDAYS[localCivilDate(date, place.tz).weekday]

  return {
    date,
    weekday,
    paksha,
    tithiIndex: tithiIndex0 + 1,
    tithi: `${paksha} ${tithiName}`,
    tithiProgress: tithiFloat - Math.floor(tithiFloat),
    nakshatra: nak.name,
    nakshatraPada: nak.pada,
    yoga,
    karana,
    moonSign: rashiOf(moon).name,
    sunSign: rashiOf(sun).name,
    rahuKaal: {
      start: rahuStart,
      end: rahuEnd,
      label: `${formatClock(rahuStart, place.tz)} – ${formatClock(rahuEnd, place.tz)}`,
    },
    abhijit: {
      start: abhijitStart,
      end: abhijitEnd,
      label: `${formatClock(abhijitStart, place.tz)} – ${formatClock(abhijitEnd, place.tz)}`,
    },
    sunrise,
    sunset,
    ayanamsa,
    ayanamsaLabel: `${ayanamsa.toFixed(2)}° Lahiri`,
  }
}

function gmstHours(jd: number): number {
  const t = (jd - 2451545.0) / 36525
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * t * t - (t * t * t) / 38710000
  return norm360(gmst) / 15
}

/** Sidereal ascendant (Lagna) using RAMC + latitude. */
export function computeLagna(date: Date, lat: number, lng: number, ayanamsa: number): number {
  const jd = toJulianDate(date)
  const lstHours = gmstHours(jd) + lng / 15
  const ramc = norm360(lstHours * 15)
  const eps = obliquity(jd)
  const ramcR = ramc * DEG
  const epsR = eps * DEG
  const latR = lat * DEG
  const num = Math.cos(ramcR)
  const den = -(Math.sin(ramcR) * Math.cos(epsR) + Math.tan(latR) * Math.sin(epsR))
  let tropicalAsc = (Math.atan2(num, den) * 180) / Math.PI
  if (tropicalAsc < 0) tropicalAsc += 360
  return norm360(tropicalAsc - ayanamsa)
}

export function wholeSignHouse(planetSignIndex: number, lagnaSignIndex: number): number {
  return ((planetSignIndex - lagnaSignIndex + 12) % 12) + 1
}

export interface DashaSpan {
  lord: string
  start: Date
  end: Date
  years: number
}

export function vimshottariDasha(moonSidereal: number, birth: Date, asOf = new Date()): {
  maha: DashaSpan
  antar: DashaSpan
  label: string
  timeline: DashaSpan[]
} {
  const nak = nakshatraOf(moonSidereal)
  const elapsedInNak = (norm360(moonSidereal) % NAK_SPAN) / NAK_SPAN
  const startLord = nak.lord
  const startIdx = DASHA_ORDER.indexOf(startLord)
  const balanceYears = DASHA_YEARS[startLord] * (1 - elapsedInNak)

  const timeline: DashaSpan[] = []
  let cursor = new Date(birth.getTime() - (DASHA_YEARS[startLord] - balanceYears) * 365.25 * 86400000)
  for (let i = 0; i < 9; i++) {
    const lord = DASHA_ORDER[(startIdx + i) % 9]
    const years = DASHA_YEARS[lord]
    const end = new Date(cursor.getTime() + years * 365.25 * 86400000)
    timeline.push({ lord, start: new Date(cursor), end, years })
    cursor = end
  }

  const maha = timeline.find((d) => asOf >= d.start && asOf < d.end) || timeline[0]
  const mahaIdx = DASHA_ORDER.indexOf(maha.lord as (typeof DASHA_ORDER)[number])
  const antarSpans: DashaSpan[] = []
  let aCursor = new Date(maha.start)
  for (let i = 0; i < 9; i++) {
    const lord = DASHA_ORDER[(mahaIdx + i) % 9]
    const years = (DASHA_YEARS[maha.lord as (typeof DASHA_ORDER)[number]] * DASHA_YEARS[lord]) / 120
    const end = new Date(aCursor.getTime() + years * 365.25 * 86400000)
    antarSpans.push({ lord, start: new Date(aCursor), end, years })
    aCursor = end
  }
  const antar = antarSpans.find((d) => asOf >= d.start && asOf < d.end) || antarSpans[0]
  return { maha, antar, label: `${maha.lord}-${antar.lord} Dasha`, timeline }
}

export interface NatalChart {
  birth: Date
  placeName: string
  lat: number
  lng: number
  tz: number
  ayanamsa: number
  lagna: number
  lagnaSign: string
  lagnaSignSa: string
  sunSign: string
  moonSign: string
  moonNakshatra: string
  moonPada: number
  bodies: (SiderealBody & { house: number; houseArea: string })[]
  dasha: ReturnType<typeof vimshottariDasha>
}

export function parseBirthDate(dob: string, time: string, tz: number): Date {
  const [ys, ms, ds] = (dob || "1994-08-14").split("-")
  const [hs, mins] = (time || "12:00").split(":")
  const y = Number(ys) || 1994
  const m = Number(ms) || 8
  const d = Number(ds) || 14
  const h = Number(hs) || 12
  const mi = Number(mins) || 0
  const utcMs = Date.UTC(y, m - 1, d, h, mi, 0) - tz * 3600000
  return new Date(utcMs)
}

export function computeNatal(dob: string, time: string, placeName: string, asOf = new Date()): NatalChart {
  const place = resolvePlace(placeName)
  const birth = parseBirthDate(dob, time, place.tz)
  const { ayanamsa, bodies } = computeGrahas(birth)
  const lagna = computeLagna(birth, place.lat, place.lng, ayanamsa)
  const lagnaSignIndex = Math.floor(lagna / 30) % 12
  const moon = bodies.find((b) => b.id === "moon")!
  const sun = bodies.find((b) => b.id === "sun")!
  const withHouses = bodies.map((b) => {
    const house = wholeSignHouse(b.signIndex, lagnaSignIndex)
    return { ...b, house, houseArea: HOUSE_AREAS[house - 1] }
  })
  return {
    birth,
    placeName: place.name,
    lat: place.lat,
    lng: place.lng,
    tz: place.tz,
    ayanamsa,
    lagna,
    lagnaSign: RASHIS[lagnaSignIndex],
    lagnaSignSa: RASHI_SA[lagnaSignIndex],
    sunSign: sun.sign,
    moonSign: moon.sign,
    moonNakshatra: moon.nakshatra,
    moonPada: moon.pada,
    bodies: withHouses,
    dasha: vimshottariDasha(moon.sidereal, birth, asOf),
  }
}

export interface TransitEvent {
  id: string
  daysOut: number
  date: Date
  planet: string
  transitType: string
  house: number
  houseArea: string
  intensity: "high" | "medium" | "challenging"
  summary: string
  summaryHi: string
  opportunity: string
  opportunityHi: string
  caution: string
  cautionHi: string
  transitTypeHi: string
  planetHi: string
  category: "Career" | "Relationships" | "Finance" | "Health" | "Home"
}

const HOUSE_CATEGORY: Record<number, TransitEvent["category"]> = {
  1: "Health",
  2: "Finance",
  3: "Career",
  4: "Home",
  5: "Relationships",
  6: "Health",
  7: "Relationships",
  8: "Finance",
  9: "Career",
  10: "Career",
  11: "Finance",
  12: "Health",
}

function houseCopy(
  planet: string,
  planetHi: string,
  house: number,
  sign: string
): Pick<TransitEvent, "summary" | "summaryHi" | "opportunity" | "opportunityHi" | "caution" | "cautionHi"> {
  const area = HOUSE_AREAS[house - 1]
  const areaHi = HOUSE_AREAS_HI[house - 1]
  return {
    summary: `${planet} enters ${sign} and activates house ${house} (${area.toLowerCase()}). Live sky — not a canned horoscope.`,
    summaryHi: `${planetHi} ${sign} में प्रवेश, भाव ${house} (${areaHi})। आज का आकाश — नकल राशिफल नहीं।`,
    opportunity: `Lean into ${area.toLowerCase()} while ${planet} is here.`,
    opportunityHi: `${planetHi} जब तक यहाँ हैं, ${areaHi} पर ध्यान दें।`,
    caution: `Don't force outcomes in ${area.toLowerCase()} if the timing still feels tight.`,
    cautionHi: `${areaHi} में जबरदस्ती न करें अगर समय कसा हो।`,
  }
}

function ord(n: number) {
  if (n === 1) return "st"
  if (n === 2) return "nd"
  if (n === 3) return "rd"
  return "th"
}

export function upcomingTransits(natal: NatalChart, days = 40): TransitEvent[] {
  const events: TransitEvent[] = []
  const start = new Date()
  start.setHours(12, 0, 0, 0)
  const lagnaIdx = Math.floor(natal.lagna / 30) % 12
  const natalLong: Partial<Record<GrahaId, number>> = {}
  for (const b of natal.bodies) natalLong[b.id] = b.sidereal

  let prevSigns: Partial<Record<GrahaId, number>> = {}
  const watch: GrahaId[] = ["moon", "sun", "mercury", "venus", "mars", "jupiter", "saturn"]

  for (let d = 0; d <= days; d++) {
    const when = new Date(start.getTime() + d * 86400000)
    const { bodies } = computeGrahas(when)
    for (const id of watch) {
      const body = bodies.find((b) => b.id === id)
      if (!body) continue
      const prev = prevSigns[id]
      if (prev !== undefined && prev !== body.signIndex) {
        const house = wholeSignHouse(body.signIndex, lagnaIdx)
        const copy = houseCopy(body.name, GRAHA_META[id].hi, house, body.sign)
        const intensity: TransitEvent["intensity"] =
          id === "saturn" || id === "mars" ? "challenging" : id === "jupiter" || id === "moon" ? "high" : "medium"
        events.push({
          id: `${id}-ingress-${d}`,
          daysOut: d,
          date: when,
          planet: body.name,
          planetHi: GRAHA_META[id].hi,
          transitType: `Enters ${body.sign}`,
          transitTypeHi: `${body.sign} में प्रवेश`,
          house,
          houseArea: HOUSE_AREAS[house - 1].split(" & ")[0],
          intensity,
          category: HOUSE_CATEGORY[house],
          ...copy,
        })
      }
      prevSigns[id] = body.signIndex

      if (id !== "moon" && natalLong.moon !== undefined) {
        const delta = Math.abs(norm360(body.sidereal - natalLong.moon + 180) - 180)
        if (delta < 0.55 && d > 0) {
          const house = wholeSignHouse(body.signIndex, lagnaIdx)
          events.push({
            id: `${id}-moon-${d}`,
            daysOut: d,
            date: when,
            planet: body.name,
            planetHi: GRAHA_META[id].hi,
            transitType: "Crosses natal Moon",
            transitTypeHi: "जन्म चंद्र पर",
            house,
            houseArea: HOUSE_AREAS[house - 1].split(" & ")[0],
            intensity: "high",
            category: "Home",
            summary: `${body.name} crosses your natal Moon (${natal.moonSign} ${natal.moonNakshatra}). Emotional weather shifts — family and inner life come into focus.`,
            summaryHi: `${GRAHA_META[id].hi} जन्म चंद्र (${natal.moonSign} ${natal.moonNakshatra}) पर। घर और मन का मौसम बदलता है।`,
            opportunity: "Property, family conversations, rest, and emotional reset.",
            opportunityHi: "घर, परिवार की बात, आराम।",
            caution: "Don't overreact to mood swings on this day.",
            cautionHi: "मूड पर अति प्रतिक्रिया न करें।",
          })
        }
      }
      if (id !== "sun" && natalLong.sun !== undefined) {
        const delta = Math.abs(norm360(body.sidereal - natalLong.sun + 180) - 180)
        if (delta < 0.55 && d > 0 && id === "mars") {
          const house = wholeSignHouse(body.signIndex, lagnaIdx)
          events.push({
            id: `${id}-sun-${d}`,
            daysOut: d,
            date: when,
            planet: body.name,
            planetHi: GRAHA_META[id].hi,
            transitType: "Conjunct natal Sun",
            transitTypeHi: "जन्म सूर्य से युति",
            house,
            houseArea: HOUSE_AREAS[house - 1].split(" & ")[0],
            intensity: "high",
            category: "Career",
            summary: `Mars conjuncts your natal Sun. Willpower and visibility spike — good for starting, not for arguing.`,
            summaryHi: `मंगल जन्म सूर्य से युति। इच्छाशक्ति और दिखना बढ़े — शुरू करने के लिए, झगड़े के लिए नहीं।`,
            opportunity: "Leadership moves, workouts, decisive action.",
            opportunityHi: "नेतृत्व, व्यायाम, साफ़ निर्णय।",
            caution: "Temper and impulsive emails.",
            cautionHi: "गुस्सा और जल्दबाज़ी वाले संदेश।",
          })
        }
      }
    }
  }

  events.sort((a, b) => a.daysOut - b.daysOut)
  const seen = new Set<string>()
  return events.filter((e) => {
    const key = `${e.planet}-${e.transitType}`
    if (seen.has(key) && e.daysOut > 2) return false
    seen.add(key)
    return true
  }).slice(0, 10)
}

export interface DetectedYoga {
  name: string
  sanskrit: string
  planets: string
  houses: string
  strength: "Powerful" | "Strong" | "Moderate" | "Latent"
  isActive: boolean
  dashaActivated: boolean
  meaning: string
  meaningHi: string
  manifestation: string
  manifestationHi: string
}

export function detectYogas(natal: NatalChart): DetectedYoga[] {
  const byId = Object.fromEntries(natal.bodies.map((b) => [b.id, b])) as Record<GrahaId, NatalChart["bodies"][number]>
  const moon = byId.moon
  const jup = byId.jupiter
  const sun = byId.sun
  const mer = byId.mercury
  const ven = byId.venus
  const sat = byId.saturn
  const dashaLords = [natal.dasha.maha.lord.toLowerCase(), natal.dasha.antar.lord.toLowerCase()]

  const kendraDiff = (a: number, b: number) => {
    const d = Math.abs(a - b) % 12
    return d === 0 || d === 3 || d === 6 || d === 9
  }

  const gaja = kendraDiff(moon.house, jup.house)
  const budha = sun.signIndex === mer.signIndex
  const dhana = ven.house === 2 || ven.house === 11 || jup.house === 2 || jup.house === 11
  const viparita = sat.house === 6 || sat.house === 8 || sat.house === 12

  return [
    {
      name: "Gaja Kesari Yoga",
      sanskrit: "गजकेसरी योग",
      planets: `${jup.sign} Jupiter · ${moon.sign} Moon`,
      houses: `${jup.house}${ord(jup.house)} & ${moon.house}${ord(moon.house)} house`,
      strength: gaja ? "Powerful" : "Latent",
      isActive: gaja,
      dashaActivated: dashaLords.includes("jupiter") || dashaLords.includes("moon"),
      meaning: gaja
        ? "Moon and Jupiter occupy mutual kendras in your chart — the classical Gaja Kesari. It favours intelligence, public grace, and recovery after setbacks."
        : "Moon and Jupiter are not in kendra from each other right now, so classical Gaja Kesari is not fully formed. The lords still support wisdom when their dashas run.",
      meaningHi: gaja
        ? "चंद्र और गुरु परस्पर केंद्र में — गजकेसरी। बुद्धि, लोक-अनुग्रह, झटके के बाद वापसी।"
        : "चंद्र और गुरु केंद्र में नहीं, गजकेसरी पूरा नहीं। उनकी दशा में ज्ञान फिर साथ देता है।",
      manifestation: gaja
        ? "Recognition at work, mentoring roles, and a reputation for being the calm person in the room."
        : "Wisdom shows up more privately until a Jupiter or Moon period activates it.",
      manifestationHi: gaja
        ? "काम पर पहचान, मार्गदर्शन, कमरे में शांत व्यक्ति होने की प्रतिष्ठा।"
        : "ज्ञान निजी रहता है जब तक गुरु या चंद्र दशा न चले।",
    },
    {
      name: "Budhaditya Yoga",
      sanskrit: "बुधादित्य योग",
      planets: `${sun.sign} Sun · ${mer.sign} Mercury`,
      houses: sun.signIndex === mer.signIndex ? `Together in ${sun.sign}` : "Not conjunct",
      strength: budha ? "Strong" : "Latent",
      isActive: budha,
      dashaActivated: dashaLords.includes("sun") || dashaLords.includes("mercury"),
      meaning: budha
        ? "Sun and Mercury share a sign — Budhaditya. Speech, analysis, and strategy sharpen."
        : "Sun and Mercury are separated, so Budhaditya is not currently formed.",
      meaningHi: budha
        ? "सूर्य और बुध एक राशि में — बुधादित्य। वाणी, विश्लेषण, रणनीति तेज़।"
        : "सूर्य और बुध अलग हैं, बुधादित्य अभी नहीं बना।",
      manifestation: budha
        ? "Writing, negotiation, interviews, and advisory work land well."
        : "Keep communications extra clear until they join again by transit.",
      manifestationHi: budha
        ? "लेखन, बातचीत, इंटरव्यू, सलाह का काम बैठता है।"
        : "गोचर में जुड़ने तक बात साफ़ रखें।",
    },
    {
      name: "Dhana Yoga",
      sanskrit: "धन योग",
      planets: `Venus ${ven.sign} · Jupiter ${jup.sign}`,
      houses: `Venus ${ven.house}${ord(ven.house)} · Jupiter ${jup.house}${ord(jup.house)}`,
      strength: dhana ? "Moderate" : "Latent",
      isActive: dhana,
      dashaActivated: dashaLords.includes("venus") || dashaLords.includes("jupiter"),
      meaning: dhana
        ? "A wealth lord sits in a money house (2 or 11). Gains come through skill, people, and timing — not lottery luck."
        : "Classical dhana yoga is weak in the natal snapshot. Build wealth through dasha timing instead.",
      meaningHi: dhana
        ? "धन कारक दूसरे या ग्यारहवें में। लाभ कौशल, लोग, समय से — लॉटरी से नहीं।"
        : "शास्त्रीय धन योग इस कुंडली में कमज़ोर। दशा समय से धन बनाएँ।",
      manifestation: dhana
        ? "Income ramps when Venus or Jupiter periods run. Avoid debt for status."
        : "Treat money moves as dasha-sensitive, not chart-guaranteed.",
      manifestationHi: dhana
        ? "शुक्र या गुरु दशा में आय बढ़े। शान के लिए कर्ज़ न लें।"
        : "धन चाल दशा-संवेदनशील मानें, कुंडली-गारंटी नहीं।",
    },
    {
      name: "Viparita Raja Yoga",
      sanskrit: "विपरीत राज योग",
      planets: `Saturn in ${sat.sign}`,
      houses: `${sat.house}${ord(sat.house)} house`,
      strength: viparita ? "Moderate" : "Latent",
      isActive: viparita,
      dashaActivated: dashaLords.includes("saturn"),
      meaning: viparita
        ? "Saturn occupies a dusthana (6/8/12). Hard seasons can flip into authority — typical Viparita Raja pattern."
        : "Saturn is not in 6/8/12, so this yoga is not natal.",
      meaningHi: viparita
        ? "शनि दुस्थान (6/8/12) में। कठिन मौसम अधिकार में पलट सकता है — विपरीत राज।"
        : "शनि 6/8/12 में नहीं, यह योग जन्म से नहीं।",
      manifestation: viparita
        ? "Comebacks after delay. Don't quit the week it feels heaviest."
        : "Saturn still teaches via its house — just not via Viparita.",
      manifestationHi: viparita
        ? "देरी के बाद वापसी। सबसे भारी सप्ताह में मत छोड़ें।"
        : "शनि अपने भाव से सिखाता है — विपरीत से नहीं।",
    },
  ]
}

export function transitHouseFor(natal: NatalChart, grahaId: GrahaId, when = new Date()): {
  body: SiderealBody
  house: number
  houseArea: string
} {
  const { bodies } = computeGrahas(when)
  const body = bodies.find((b) => b.id === grahaId)!
  const lagnaIdx = Math.floor(natal.lagna / 30) % 12
  const house = wholeSignHouse(body.signIndex, lagnaIdx)
  return { body, house, houseArea: HOUSE_AREAS[house - 1] }
}

export function grahasInNatalHouses(natal: NatalChart, when = new Date()) {
  const { ayanamsa, bodies } = computeGrahas(when)
  const lagnaIdx = Math.floor(natal.lagna / 30) % 12
  return {
    ayanamsa,
    bodies: bodies.map((b) => {
      const house = wholeSignHouse(b.signIndex, lagnaIdx)
      return { ...b, house, houseArea: HOUSE_AREAS[house - 1] }
    }),
  }
}

export function nextMoonSignChange(from = new Date()): { date: Date; fromSign: string; toSign: string; hours: number } {
  const start = computeGrahas(from).bodies.find((b) => b.id === "moon")!
  let lo = 0
  let hi = 72
  const startSign = start.signIndex
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2
    const when = new Date(from.getTime() + mid * 3600000)
    const moon = computeGrahas(when).bodies.find((b) => b.id === "moon")!
    if (moon.signIndex === startSign) lo = mid
    else hi = mid
  }
  const date = new Date(from.getTime() + hi * 3600000)
  const next = computeGrahas(date).bodies.find((b) => b.id === "moon")!
  return { date, fromSign: start.sign, toSign: next.sign, hours: hi }
}

export function personalizedFocus(natal: NatalChart, intentions: string[] = []): string {
  const live = grahasInNatalHouses(natal)
  const moon = live.bodies.find((b) => b.id === "moon")!
  const jup = live.bodies.find((b) => b.id === "jupiter")!
  const intent = intentions[0]?.toLowerCase()
  if (intent?.includes("career") || intent?.includes("money")) {
    return `You asked about ${intentions[0]}. Transit Jupiter is in your ${jup.house}${ord(jup.house)} house (${jup.houseArea.toLowerCase()}) — that's the lever for the next few weeks.`
  }
  if (intent?.includes("marriage") || intent?.includes("family")) {
    return `You asked about ${intentions[0]}. The Moon is transiting your ${moon.house}${ord(moon.house)} house tonight. Watch conversations at home over the next 2 days.`
  }
  return `Right now the Moon is in ${moon.sign} (${moon.nakshatra}, pada ${moon.pada}) transiting your ${moon.house}${ord(moon.house)} house — ${moon.houseArea.toLowerCase()}.`
}

export function houseEffect(id: GrahaId, house: number, dignity: SiderealBody["dignity"], hi = false): string {
  const area = hi ? HOUSE_AREAS_HI[house - 1] : HOUSE_AREAS[house - 1]
  const name = hi ? GRAHA_META[id].hi : GRAHA_META[id].name
  const tone = hi
    ? dignity === "exalted"
      ? "यह बलवान स्थिति है।"
      : dignity === "debilitated"
        ? "इस क्षेत्र को नरमी से — ग्रह नीच है।"
        : dignity === "own sign"
          ? "ग्रह स्वराशि में है, साफ़ काम करता है।"
          : "मिश्रित, काम चलता प्रभाव।"
    : dignity === "exalted"
      ? "This is a strong placement."
      : dignity === "debilitated"
        ? "Handle this area gently — the planet is debilitated."
        : dignity === "own sign"
          ? "The planet is in its own sign and acts cleanly."
          : "A working, mixed influence."
  return hi ? `${name} ${area} को रंगते हैं। ${tone}` : `${name} colours ${area.toLowerCase()}. ${tone}`
}

export function mostSignificantTransit(natal: NatalChart, hi = false): string {
  const live = grahasInNatalHouses(natal)
  const jup = live.bodies.find((b) => b.id === "jupiter")!
  const mars = live.bodies.find((b) => b.id === "mars")!
  const jArea = hi ? HOUSE_AREAS_HI[jup.house - 1] : jup.houseArea
  const mArea = hi ? HOUSE_AREAS_HI[mars.house - 1] : mars.houseArea
  if (jup.house === mars.house) {
    return hi
      ? `गुरु और मंगल भाव ${jup.house} में साथ (${jArea})। दिखने वाला काम, वादा अधिक न करें।`
      : `Jupiter and Mars are together in house ${jup.house} (${jArea}). Drive plus blessing — good for visible work, risky if you overpromise.`
  }
  return hi
    ? `गुरु भाव ${jup.house} (${jArea})। मंगल भाव ${mars.house} (${mArea})। वृद्धि ${jArea} में; ताप ${mArea} में।`
    : `Jupiter transits house ${jup.house} (${jArea.toLowerCase()}). Mars is in house ${mars.house}. Growth is in ${jArea.toLowerCase()}; heat is in ${mArea.toLowerCase()}.`
}

export function muhurtaScore(p: Panchang, purpose: string): "auspicious" | "neutral" | "avoid" {
  const badTithi = /Chaturthi|Ashtami|Navami|Chaturdashi|Amavasya/.test(p.tithi)
  const badYoga = /Vyatipata|Vaidhriti|Atiganda|Shula|Ganda|Vyaghata|Parigha/.test(p.yoga)
  const vishti = p.karana === "Vishti"
  if (purpose === "medical" || purpose === "travel") {
    if (badTithi || vishti) return "avoid"
  }
  if (badYoga && badTithi) return "avoid"
  if (!badTithi && !badYoga && !vishti) return "auspicious"
  if (badTithi || vishti) return "avoid"
  return "neutral"
}

export function liveSkySnapshot(placeName?: string, when = new Date()) {
  const panchang = computePanchang(when, placeName)
  const grahas = computeGrahas(when)
  const moonMove = nextMoonSignChange(when)
  return { panchang, grahas, moonMove }
}
