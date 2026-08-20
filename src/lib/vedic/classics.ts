import {
  GRAHA_META,
  HOUSE_AREAS,
  RASHIS,
  WEEKDAYS,
  type GrahaId,
} from "./constants"
import { resolvePlace } from "./cities"
import {
  computeGrahas,
  computeNatal,
  computePanchang,
  grahasInNatalHouses,
  lahiriAyanamsa,
  norm360,
  sunTimes,
  tropicalSun,
  toJulianDate,
  type NatalChart,
  type SiderealBody,
} from "./engine"

function ord(n: number) {
  if (n === 1) return "st"
  if (n === 2) return "nd"
  if (n === 3) return "rd"
  return "th"
}

function fmt(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export type SadeSatiPhase = "rising" | "peak" | "setting" | "clear"

export interface SadeSatiReport {
  phase: SadeSatiPhase
  label: string
  natalMoon: string
  saturnSign: string
  saturnDegree: string
  start: Date | null
  end: Date | null
  advice: string
  intensity: "high" | "medium" | "none"
  houseFromMoon: number
}

function saturnSignOn(date: Date): { sign: number; body: SiderealBody } {
  const sat = computeGrahas(date).bodies.find((b) => b.id === "saturn")!
  return { sign: sat.signIndex, body: sat }
}

function findSaturnIngress(around: Date, targetSign: number, direction: -1 | 1): Date {
  let cursor = new Date(around)
  for (let i = 0; i < 400; i++) {
    cursor = new Date(cursor.getTime() + direction * 12 * 86400000)
    if (saturnSignOn(cursor).sign === targetSign && direction === -1) continue
    if (saturnSignOn(cursor).sign !== targetSign && direction === 1) continue
    break
  }
  let lo = direction === -1 ? cursor.getTime() : around.getTime()
  let hi = direction === -1 ? around.getTime() : cursor.getTime()
  if (lo > hi) [lo, hi] = [hi, lo]
  for (let i = 0; i < 22; i++) {
    const mid = (lo + hi) / 2
    const sign = saturnSignOn(new Date(mid)).sign
    const inTarget = sign === targetSign
    if (inTarget) hi = mid
    else lo = mid
  }
  return new Date(hi)
}

export function computeSadeSati(natal: NatalChart, when = new Date()): SadeSatiReport {
  const moonIdx = natal.bodies.find((b) => b.id === "moon")!.signIndex
  const sat = saturnSignOn(when)
  const houseFromMoon = ((sat.sign - moonIdx + 12) % 12) + 1
  let phase: SadeSatiPhase = "clear"
  if (houseFromMoon === 12) phase = "rising"
  else if (houseFromMoon === 1) phase = "peak"
  else if (houseFromMoon === 2) phase = "setting"

  const labels: Record<SadeSatiPhase, string> = {
    rising: "Rising — 1st phase (Saturn in 12th from Moon)",
    peak: "Peak — 2nd phase (Saturn over natal Moon)",
    setting: "Setting — 3rd phase (Saturn in 2nd from Moon)",
    clear: "Not in Sade Sati",
  }
  const advice: Record<SadeSatiPhase, string> = {
    rising: "Expenses, sleep, and hidden fears rise first. Keep a cash buffer, finish old debts, and don't launch a risky venture just to 'outrun' Saturn.",
    peak: "This is the heaviest 2.5 years — identity, health, and daily load get tested. One duty at a time. Saturn rewards consistency, not drama.",
    setting: "The exit phase. Money, family speech, and self-worth rebuild. Don't cling to the version of you that survived the peak — let it mature.",
    clear: "Saturn is not transiting the 12th, 1st, or 2nd from your Moon. Watch Dhaiya (4th/8th) separately if Saturn is there.",
  }

  let start: Date | null = null
  let end: Date | null = null
  if (phase !== "clear") {
    start = findSaturnIngress(when, sat.sign, -1)
    const nextSign = (sat.sign + 1) % 12
    end = findSaturnIngress(when, nextSign, 1)
  }

  return {
    phase,
    label: labels[phase],
    natalMoon: natal.moonSign,
    saturnSign: sat.body.sign,
    saturnDegree: sat.body.degreeLabel,
    start,
    end,
    advice: advice[phase],
    intensity: phase === "peak" ? "high" : phase === "clear" ? "none" : "medium",
    houseFromMoon,
  }
}

export interface MangalReport {
  hasDosha: boolean
  cancelled: boolean
  fromLagna: boolean
  fromMoon: boolean
  marsHouseLagna: number
  marsHouseMoon: number
  marsSign: string
  marsDignity: string
  lagnaArea: string
  jupiterSign: string
  jupiterAspects: boolean
  saturnInDosha: boolean
  ownSeventh: boolean
  causes: string[]
  bhanga: string[]
  verdict: string
  marriageNote: string
}

const MANGAL_HOUSES = new Set([1, 2, 4, 7, 8, 12])

export function computeMangalDosha(natal: NatalChart): MangalReport {
  const mars = natal.bodies.find((b) => b.id === "mars")!
  const moon = natal.bodies.find((b) => b.id === "moon")!
  const jup = natal.bodies.find((b) => b.id === "jupiter")!
  const sat = natal.bodies.find((b) => b.id === "saturn")!
  const marsHouseLagna = mars.house
  const marsHouseMoon = ((mars.signIndex - moon.signIndex + 12) % 12) + 1
  const fromLagna = MANGAL_HOUSES.has(marsHouseLagna)
  const fromMoon = MANGAL_HOUSES.has(marsHouseMoon)
  const hasDosha = fromLagna || fromMoon

  const causes: string[] = []
  if (fromLagna) causes.push(`Mars in ${marsHouseLagna}${ord(marsHouseLagna)} from Lagna (${HOUSE_AREAS[marsHouseLagna - 1]})`)
  if (fromMoon) causes.push(`Mars in ${marsHouseMoon}${ord(marsHouseMoon)} from Moon`)

  const bhanga: string[] = []
  if (mars.dignity === "exalted" || mars.dignity === "own sign") {
    bhanga.push(`Mars is ${mars.dignity} in ${mars.sign} — classical cancellation`)
  }
  const jupAspectsMars = [1, 5, 7, 9].includes(((mars.house - jup.house + 12) % 12) + 1 === 1 ? 1 : ((mars.signIndex - jup.signIndex + 12) % 12) + 1)
  const jupToMars = ((mars.signIndex - jup.signIndex + 12) % 12) + 1
  if (jupToMars === 1 || jupToMars === 5 || jupToMars === 7 || jupToMars === 9) {
    bhanga.push(`Jupiter aspects or joins Mars from ${jup.sign} — guru-drishti bhanga`)
  }
  if (MANGAL_HOUSES.has(sat.house) && hasDosha) {
    bhanga.push("Saturn also occupies a dosha house — some schools treat this as mutual cancellation")
  }
  if (mars.house === 7 && (mars.sign === "Aries" || mars.sign === "Scorpio")) {
    bhanga.push("Mars in own sign in the 7th — often treated as cancelled")
  }
  void jupAspectsMars

  const cancelled = hasDosha && bhanga.length > 0
  let verdict: string
  if (!hasDosha) verdict = "No Mangal Dosha in this chart (Lagna or Chandra)."
  else if (cancelled) verdict = "Mangal Dosha is present but cancelled (Dosha Bhanga)."
  else verdict = "Mangal Dosha is present and not clearly cancelled."

  return {
    hasDosha,
    cancelled,
    fromLagna,
    fromMoon,
    marsHouseLagna,
    marsHouseMoon,
    marsSign: mars.sign,
    marsDignity: mars.dignity,
    lagnaArea: HOUSE_AREAS[marsHouseLagna - 1],
    jupiterSign: jup.sign,
    jupiterAspects: jupToMars === 1 || jupToMars === 5 || jupToMars === 7 || jupToMars === 9,
    saturnInDosha: MANGAL_HOUSES.has(sat.house) && hasDosha,
    ownSeventh: mars.house === 7 && (mars.sign === "Aries" || mars.sign === "Scorpio"),
    causes,
    bhanga,
    verdict,
    marriageNote: cancelled
      ? "Matching is usually treated as open. Still compare the partner's Mars — two Manglik charts often neutralize each other."
      : hasDosha
        ? "Most families will ask for a Manglik match or a remedial puja. Book a verified match consult before saying yes."
        : "Mars is not in a dosha house. This is not the blocker for marriage timing.",
  }
}

/** Standard Bhinnashtakavarga bindu counts by house-from-karaka (simplified Parashara tables). */
const BINDU_TABLES: Record<string, number[]> = {
  sun: [1, 2, 4, 7, 8, 9, 10, 11],
  moon: [3, 6, 7, 8, 10, 11],
  mars: [1, 2, 4, 7, 8, 9, 10, 11],
  mercury: [1, 3, 5, 6, 9, 10, 11, 12],
  jupiter: [1, 2, 3, 4, 7, 8, 9, 10, 11],
  venus: [1, 2, 3, 4, 5, 8, 9, 11],
  saturn: [3, 5, 6, 11],
  lagna: [1, 2, 4, 5, 7, 8, 9, 10, 11],
}

export interface AshtakavargaReport {
  houseScores: number[]
  planetScores: Record<string, number>
  sarvashtakavarga: number
  weakestHouse: number
  strongestHouse: number
  saturnTransitScore: number
  note: string
}

export function computeAshtakavarga(natal: NatalChart): AshtakavargaReport {
  const houseScores = Array.from({ length: 12 }, () => 0)
  const planetScores: Record<string, number> = {}
  const refs: { name: string; sign: number }[] = natal.bodies
    .filter((b) => b.id !== "rahu" && b.id !== "ketu")
    .map((b) => ({ name: b.id, sign: b.signIndex }))
  refs.push({ name: "lagna", sign: Math.floor(natal.lagna / 30) % 12 })

  for (const karaka of refs) {
    const goods = BINDU_TABLES[karaka.name] || BINDU_TABLES.sun
    let score = 0
    for (let h = 0; h < 12; h++) {
      const houseFrom = ((h - karaka.sign + 12) % 12) + 1
      if (goods.includes(houseFrom)) {
        houseScores[h] += 1
        score += 1
      }
    }
    planetScores[karaka.name] = score
  }

  const satNow = computeGrahas().bodies.find((b) => b.id === "saturn")!
  const saturnTransitScore = houseScores[satNow.signIndex]
  const strongestHouse = houseScores.indexOf(Math.max(...houseScores)) + 1
  const weakestHouse = houseScores.indexOf(Math.min(...houseScores)) + 1
  const sav = houseScores.reduce((a, b) => a + b, 0)

  return {
    houseScores,
    planetScores,
    sarvashtakavarga: sav,
    weakestHouse,
    strongestHouse,
    saturnTransitScore,
    note:
      saturnTransitScore >= 4
        ? `Saturn is transiting a house with ${saturnTransitScore} bindus — impact is manageable if you stay disciplined.`
        : `Saturn is transiting a house with only ${saturnTransitScore} bindus — this transit will feel heavier than the newspaper horoscope.`,
  }
}

export type ChoghadiyaKind = "Amrit" | "Shubh" | "Labh" | "Chal" | "Udveg" | "Kaal" | "Rog"

export interface ChoghadiyaSlot {
  name: ChoghadiyaKind
  start: Date
  end: Date
  label: string
  auspicious: boolean
  period: "day" | "night"
}

const DAY_CHO: ChoghadiyaKind[][] = [
  ["Udveg", "Chal", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"],
  ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Chal", "Labh", "Amrit"],
  ["Rog", "Udveg", "Chal", "Labh", "Amrit", "Kaal", "Shubh", "Rog"],
  ["Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Chal", "Labh"],
  ["Shubh", "Rog", "Udveg", "Chal", "Labh", "Amrit", "Kaal", "Shubh"],
  ["Chal", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Chal"],
  ["Kaal", "Shubh", "Rog", "Udveg", "Chal", "Labh", "Amrit", "Kaal"],
]

const NIGHT_CHO: ChoghadiyaKind[][] = [
  ["Shubh", "Amrit", "Chal", "Rog", "Kaal", "Labh", "Udveg", "Shubh"],
  ["Chal", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Chal"],
  ["Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Chal", "Rog", "Kaal"],
  ["Udveg", "Shubh", "Amrit", "Chal", "Rog", "Kaal", "Labh", "Udveg"],
  ["Amrit", "Chal", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit"],
  ["Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Chal", "Rog"],
  ["Labh", "Udveg", "Shubh", "Amrit", "Chal", "Rog", "Kaal", "Labh"],
]

const GOOD_CHO = new Set<ChoghadiyaKind>(["Amrit", "Shubh", "Labh", "Chal"])

function clock(d: Date, tz: number) {
  const s = new Date(d.getTime() + tz * 3600000)
  const h = s.getUTCHours()
  const m = s.getUTCMinutes()
  const ap = h >= 12 ? "PM" : "AM"
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ap}`
}

export function computeChoghadiya(placeName?: string, when = new Date()): {
  slots: ChoghadiyaSlot[]
  current: ChoghadiyaSlot | null
  rahuKaal: { start: Date; end: Date; label: string }
  weekday: string
} {
  const place = resolvePlace(placeName)
  const panchang = computePanchang(when, placeName)
  const { sunrise, sunset } = sunTimes(when, place.lat, place.lng, place.tz)
  const nextSunrise = new Date(sunrise.getTime() + 86400000)
  const dayLen = sunset.getTime() - sunrise.getTime()
  const nightLen = nextSunrise.getTime() - sunset.getTime()
  const dow = panchang.date ? new Date(sunrise.getTime() + place.tz * 3600000).getUTCDay() : 0
  const weekday = WEEKDAYS[dow]

  const slots: ChoghadiyaSlot[] = []
  DAY_CHO[dow].forEach((name, i) => {
    const start = new Date(sunrise.getTime() + (i * dayLen) / 8)
    const end = new Date(sunrise.getTime() + ((i + 1) * dayLen) / 8)
    slots.push({
      name,
      start,
      end,
      label: `${clock(start, place.tz)} – ${clock(end, place.tz)}`,
      auspicious: GOOD_CHO.has(name),
      period: "day",
    })
  })
  NIGHT_CHO[dow].forEach((name, i) => {
    const start = new Date(sunset.getTime() + (i * nightLen) / 8)
    const end = new Date(sunset.getTime() + ((i + 1) * nightLen) / 8)
    slots.push({
      name,
      start,
      end,
      label: `${clock(start, place.tz)} – ${clock(end, place.tz)}`,
      auspicious: GOOD_CHO.has(name),
      period: "night",
    })
  })

  const current = slots.find((s) => when >= s.start && when < s.end) || null
  return { slots, current, rahuKaal: panchang.rahuKaal, weekday }
}

const COMBUST_ORB: Partial<Record<GrahaId, number>> = {
  moon: 12,
  mars: 17,
  mercury: 14,
  jupiter: 11,
  venus: 10,
  saturn: 15,
}

export interface SkyFlag {
  id: GrahaId
  name: string
  retrograde: boolean
  combust: boolean
  detail: string
}

export function computeSkyFlags(when = new Date()): SkyFlag[] {
  const now = computeGrahas(when).bodies
  const earlier = computeGrahas(new Date(when.getTime() - 2 * 86400000)).bodies
  const sun = now.find((b) => b.id === "sun")!
  return now
    .filter((b) => b.id !== "sun")
    .map((b) => {
      const prev = earlier.find((x) => x.id === b.id)!
      const retro = b.id === "rahu" || b.id === "ketu" || norm360(b.tropical - prev.tropical + 180) - 180 < -0.01
      const orb = COMBUST_ORB[b.id]
      const sep = Math.abs(norm360(b.sidereal - sun.sidereal + 180) - 180)
      const combust = orb !== undefined && sep <= orb
      const bits = [
        retro ? "retrograde" : null,
        combust ? `combust (${sep.toFixed(1)}° from Sun)` : null,
      ].filter(Boolean)
      return {
        id: b.id,
        name: b.name,
        retrograde: retro,
        combust,
        detail: bits.join(" · ") || "direct",
      }
    })
    .filter((f) => f.retrograde || f.combust)
}

export interface GemRec {
  planetId: string
  planet: string
  planetHi: string
  gem: string
  gemHi: string
  metal: string
  metalHi: string
  finger: string
  fingerHi: string
  day: string
  dayHi: string
  sign: string
  house: number
  houseArea: string
  debilitated: boolean
  reason: string
  caution: string
}

const PLANET_HI: Record<string, string> = {
  sun: "सूर्य",
  moon: "चंद्र",
  mars: "मंगल",
  mercury: "बुध",
  jupiter: "गुरु",
  venus: "शुक्र",
  saturn: "शनि",
  rahu: "राहु",
  ketu: "केतु",
}

const GEM_MAP: Record<
  string,
  { gem: string; gemHi: string; metal: string; metalHi: string; finger: string; fingerHi: string; day: string; dayHi: string }
> = {
  sun: { gem: "Ruby (Manik)", gemHi: "माणिक्य", metal: "Gold", metalHi: "सोना", finger: "Ring finger, right hand", fingerHi: "दाहिनी अनामिका", day: "Sunday", dayHi: "रविवार" },
  moon: { gem: "Pearl (Moti)", gemHi: "मोती", metal: "Silver", metalHi: "चाँदी", finger: "Little finger, right hand", fingerHi: "दाहिनी कनिष्ठा", day: "Monday", dayHi: "सोमवार" },
  mars: { gem: "Red Coral (Moonga)", gemHi: "मूंगा", metal: "Gold or copper", metalHi: "सोना या ताँबा", finger: "Ring finger, right hand", fingerHi: "दाहिनी अनामिका", day: "Tuesday", dayHi: "मंगलवार" },
  mercury: { gem: "Emerald (Panna)", gemHi: "पन्ना", metal: "Gold", metalHi: "सोना", finger: "Little finger, right hand", fingerHi: "दाहिनी कनिष्ठा", day: "Wednesday", dayHi: "बुधवार" },
  jupiter: { gem: "Yellow Sapphire (Pukhraj)", gemHi: "पुखराज", metal: "Gold", metalHi: "सोना", finger: "Index finger, right hand", fingerHi: "दाहिनी तर्जनी", day: "Thursday", dayHi: "गुरुवार" },
  venus: { gem: "Diamond / White Sapphire", gemHi: "हीरा / सफ़ेद पुखराज", metal: "Platinum or silver", metalHi: "प्लैटिनम या चाँदी", finger: "Middle finger, right hand", fingerHi: "दाहिनी मध्यमा", day: "Friday", dayHi: "शुक्रवार" },
  saturn: { gem: "Blue Sapphire (Neelam)", gemHi: "नीलम", metal: "Panchdhatu or silver", metalHi: "पंचधातु या चाँदी", finger: "Middle finger, right hand", fingerHi: "दाहिनी मध्यमा", day: "Saturday", dayHi: "शनिवार" },
  rahu: { gem: "Hessonite (Gomed)", gemHi: "गोमेद", metal: "Silver", metalHi: "चाँदी", finger: "Middle finger, right hand", fingerHi: "दाहिनी मध्यमा", day: "Saturday", dayHi: "शनिवार" },
  ketu: { gem: "Cat's Eye (Lehsunia)", gemHi: "लहसुनिया", metal: "Silver", metalHi: "चाँदी", finger: "Middle finger, right hand", fingerHi: "दाहिनी मध्यमा", day: "Thursday", dayHi: "गुरुवार" },
}

export function recommendGemstones(natal: NatalChart): GemRec[] {
  const weak = natal.bodies.filter(
    (b) => b.dignity === "debilitated" || b.house === 6 || b.house === 8 || b.house === 12
  )
  const picks = weak.length > 0 ? weak : natal.bodies.filter((b) => b.id === "jupiter" || b.id === "venus")
  return picks.slice(0, 4).map((b) => {
    const base = GEM_MAP[b.id]
    return {
      planetId: b.id,
      planet: b.name,
      planetHi: PLANET_HI[b.id] || b.name,
      gem: base?.gem || "Consult before wearing",
      gemHi: base?.gemHi || "पहले बैठक लें",
      metal: base?.metal || "Gold",
      metalHi: base?.metalHi || "सोना",
      finger: base?.finger || "Ring finger",
      fingerHi: base?.fingerHi || "अनामिका",
      day: base?.day || "Thursday",
      dayHi: base?.dayHi || "गुरुवार",
      sign: b.sign,
      house: b.house,
      houseArea: b.houseArea,
      debilitated: b.dignity === "debilitated",
      reason:
        b.dignity === "debilitated"
          ? `${b.name} is debilitated in ${b.sign} — a well-tested stone can shore up this karaka.`
          : `${b.name} sits in the ${b.house}${ord(b.house)} house (${b.houseArea.toLowerCase()}).`,
      caution:
        b.id === "saturn" || b.id === "rahu"
          ? "Trial-wear 3 days before committing. If sleep or temper worsens, stop."
          : "Natural, untreated stone. Get it astrologically set after a small puja.",
    }
  })
}

export interface VarshphalReport {
  year: number
  solarReturn: Date
  munthaSign: string
  munthaHouse: number
  varshesa: string
  lagna: string
  sunSign: string
  moonSign: string
  themes: string[]
  dasha: string
  jupHouse: number
}

export function computeVarshphal(natal: NatalChart, year = new Date().getFullYear()): VarshphalReport {
  const natalSun = natal.bodies.find((b) => b.id === "sun")!.sidereal
  const guess = new Date(year, natal.birth.getUTCMonth(), natal.birth.getUTCDate(), 12, 0, 0)
  let lo = guess.getTime() - 20 * 86400000
  let hi = guess.getTime() + 20 * 86400000
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    const sun = computeGrahas(new Date(mid)).bodies.find((b) => b.id === "sun")!.sidereal
    const delta = norm360(sun - natalSun + 180) - 180
    if (delta < 0) lo = mid
    else hi = mid
  }
  const solarReturn = new Date((lo + hi) / 2)
  const vr = computeNatal(
    `${solarReturn.getUTCFullYear()}-${String(solarReturn.getUTCMonth() + 1).padStart(2, "0")}-${String(solarReturn.getUTCDate()).padStart(2, "0")}`,
    `${String(solarReturn.getUTCHours()).padStart(2, "0")}:${String(solarReturn.getUTCMinutes()).padStart(2, "0")}`,
    natal.placeName,
    solarReturn
  )
  const age = year - natal.birth.getUTCFullYear()
  const munthaSignIdx = (Math.floor(natal.lagna / 30) + (age % 12)) % 12
  const munthaHouse = ((munthaSignIdx - Math.floor(vr.lagna / 30) + 12) % 12) + 1
  const jup = vr.bodies.find((b) => b.id === "jupiter")!
  const themes = [
    `Muntha in ${RASHIS[munthaSignIdx]} (${munthaHouse}${ord(munthaHouse)} house) sets the year's weather.`,
    `Year lagna is ${vr.lagnaSign}. First-house transits colour how you show up.`,
    `Jupiter of the year sits in the ${jup.house}${ord(jup.house)} — ${jup.houseArea.toLowerCase()}.`,
    `Active natal dasha still rules the decade: ${natal.dasha.label}.`,
  ]
  return {
    year,
    solarReturn,
    munthaSign: RASHIS[munthaSignIdx],
    munthaHouse,
    varshesa: jup.name,
    lagna: vr.lagnaSign,
    sunSign: vr.sunSign,
    moonSign: vr.moonSign,
    themes,
    dasha: natal.dasha.label,
    jupHouse: jup.house,
  }
}

export interface PrashnaReading {
  askedAt: Date
  question: string
  lagna: string
  moonSign: string
  moonNakshatra: string
  moonPada: number
  timingDays: number
  houseHint: number
  houseArea: string
  yes: boolean
  focusName?: string
  focusSign?: string
  focusDignity?: string
  tenth: string
  verdict: string
  timing: string
  significators: string[]
}

export function castPrashna(question: string, placeName?: string, when = new Date()): PrashnaReading {
  const place = resolvePlace(placeName)
  const natal = computeNatal(
    `${when.getFullYear()}-${String(when.getMonth() + 1).padStart(2, "0")}-${String(when.getDate()).padStart(2, "0")}`,
    `${String(when.getHours()).padStart(2, "0")}:${String(when.getMinutes()).padStart(2, "0")}`,
    place.name,
    when
  )
  const live = grahasInNatalHouses(natal, when)
  const moon = live.bodies.find((b) => b.id === "moon")!
  const tenth = live.bodies.find((b) => b.house === 10)
  const q = question.toLowerCase()
  const houseHint = q.includes("job") || q.includes("career") || q.includes("offer")
    ? 10
    : q.includes("marry") || q.includes("marriage") || q.includes("partner")
      ? 7
      : q.includes("money") || q.includes("salary")
        ? 2
        : q.includes("house") || q.includes("property")
          ? 4
          : 1
  const focus = live.bodies.find((b) => b.house === houseHint)
  const dignityOk = focus && focus.dignity !== "debilitated"
  const moonGood = moon.dignity !== "debilitated" && moon.house !== 6 && moon.house !== 8 && moon.house !== 12
  const yes = Boolean(dignityOk && moonGood)
  const timingDays = Math.max(1, Math.round((30 - moon.degreeInSign) / 13))
  return {
    askedAt: when,
    question,
    lagna: natal.lagnaSign,
    moonSign: moon.sign,
    moonNakshatra: moon.nakshatra,
    moonPada: moon.pada,
    timingDays,
    houseHint,
    houseArea: HOUSE_AREAS[houseHint - 1],
    yes,
    focusName: focus?.name,
    focusSign: focus?.sign,
    focusDignity: focus?.dignity,
    tenth: tenth ? `${tenth.name} in ${tenth.sign}` : "No graha in 10th",
    verdict: yes
      ? "The hora chart leans yes — significator is dignified and the Moon is not in a dusthana."
      : "The hora chart is mixed-to-cautious. Don't force the outcome this week; recast after the next Moon sign change.",
    timing: `Moon in ${moon.sign} (${moon.nakshatra} pada ${moon.pada}) — a window of about ${timingDays} days while the Moon stays here.`,
    significators: [
      `Arudha of the question house: ${houseHint}${ord(houseHint)} (${HOUSE_AREAS[houseHint - 1]})`,
      focus ? `${focus.name} rules the answer from ${focus.sign}, ${focus.dignity}` : "No planet in the question house — read the lord by sign",
      `Lagna of the moment: ${natal.lagnaSign}`,
    ],
  }
}

const CHALDEAN: Record<string, number> = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8,
}

function reduceNum(n: number): number {
  while (n > 9 && n !== 11 && n !== 22) {
    n = String(n).split("").reduce((a, d) => a + Number(d), 0)
  }
  return n
}

const NUM_PLANET: Record<number, string> = {
  1: "Sun",
  2: "Moon",
  3: "Jupiter",
  4: "Rahu",
  5: "Mercury",
  6: "Venus",
  7: "Ketu",
  8: "Saturn",
  9: "Mars",
  11: "Moon (master)",
  22: "Rahu (master)",
}

export interface NumerologyReport {
  mulank: number
  bhagyank: number
  nameNumber: number
  mulankPlanet: string
  bhagyankPlanet: string
  namePlanet: string
  chartRuler: string
  harmony: string
  note: string
  harmonyMatch: boolean
}

export function computeNumerology(name: string, dob: string, chartRuler: string): NumerologyReport {
  const [y, m, d] = (dob || "1994-08-14").split("-").map(Number)
  const mulank = reduceNum(d || 1)
  const bhagyank = reduceNum((d || 1) + (m || 1) + (y || 1994))
  const cleaned = (name || "").toLowerCase().replace(/[^a-z]/g, "")
  const nameSum = cleaned.split("").reduce((a, ch) => a + (CHALDEAN[ch] || 0), 0)
  const nameNumber = reduceNum(nameSum || 1)
  const match = [mulank, bhagyank, nameNumber].some((n) => NUM_PLANET[n]?.startsWith(chartRuler) || NUM_PLANET[n] === chartRuler)
  return {
    mulank,
    bhagyank,
    nameNumber,
    mulankPlanet: NUM_PLANET[mulank],
    bhagyankPlanet: NUM_PLANET[bhagyank],
    namePlanet: NUM_PLANET[nameNumber],
    chartRuler,
    harmonyMatch: match,
    harmony: match
      ? `Your numbers talk to your Lagna lord (${chartRuler}). Name and chart pull in the same direction.`
      : `Name number (${NUM_PLANET[nameNumber]}) and Lagna lord (${chartRuler}) differ — a small spelling tweak is a classic upsell, not a crisis.`,
    note: "Mulank is the birth date. Bhagyank is the full date. Name number uses the Chaldean map Sanjay Jumani-style consults start from.",
  }
}

export function lagnaLord(signIndex: number): string {
  const lords = ["Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"]
  return lords[signIndex] || "Sun"
}

export function formatShortDate(d: Date | null) {
  return d ? fmt(d) : "—"
}

export function ayanamsaNow() {
  return lahiriAyanamsa(toJulianDate(new Date()))
}

export function tropicalSunNow() {
  return tropicalSun(toJulianDate(new Date()))
}

export { GRAHA_META }
