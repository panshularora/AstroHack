import {
  cachePlace,
  knownPlace,
  DEFAULT_PLACE,
  type GeoPlace,
} from "../src/lib/vedic/cities.ts"
import { RASHIS, RASHI_SA } from "../src/lib/vedic/constants.ts"
import { computeNatal, computePanchang, detectYogas } from "../src/lib/vedic/engine.ts"
import { matchKundlis } from "../src/lib/vedic/match.ts"
import {
  FIRST_FREE_MINUTES,
  FIRST_RECHARGE_BONUS,
  INVITE_CREDIT,
  PLAN_PRICE_INR,
  PLAN_TALK_CREDIT,
  WALLET_PACKS,
  WELCOME_CREDIT,
} from "../src/lib/entitlements.ts"

const geoHits = new Map<string, GeoPlace>()

function tzHours(timeZone: string) {
  try {
    const now = new Date()
    const a = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }))
    const b = new Date(now.toLocaleString("en-US", { timeZone }))
    return Math.round(((b.getTime() - a.getTime()) / 3600000) * 4) / 4
  } catch {
    return 5.5
  }
}

export async function geocodePlace(query: string): Promise<GeoPlace> {
  const q = (query || "").trim()
  if (!q) return DEFAULT_PLACE
  const known = knownPlace(q)
  if (known) return known
  const cached = geoHits.get(q.toLowerCase())
  if (cached) return cached
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1&language=en`
    const res = await fetch(url, { headers: { Accept: "application/json" } })
    const json = (await res.json()) as {
      results?: { name: string; latitude: number; longitude: number; timezone?: string; country?: string }[]
    }
    const hit = json.results?.[0]
    if (hit) {
      const place: GeoPlace = {
        name: hit.country ? `${hit.name}, ${hit.country}` : hit.name,
        aliases: [q.toLowerCase(), hit.name.toLowerCase()],
        lat: hit.latitude,
        lng: hit.longitude,
        tz: hit.timezone ? tzHours(hit.timezone) : 5.5,
      }
      geoHits.set(q.toLowerCase(), place)
      cachePlace(q, place)
      cachePlace(place.name, place)
      return place
    }
  } catch {
    /* network — fall through */
  }
  return DEFAULT_PLACE
}

export function serializePanchang(placeName: string, when = new Date()) {
  const sky = computePanchang(when, placeName)
  const place = knownPlace(placeName) || DEFAULT_PLACE
  return {
    engine: "lahiri-sidereal",
    source: "computed",
    place: place.name,
    lat: place.lat,
    lng: place.lng,
    tz: place.tz,
    weekday: sky.weekday,
    paksha: sky.paksha,
    tithi: sky.tithi,
    nakshatra: sky.nakshatra,
    nakshatraPada: sky.nakshatraPada,
    yoga: sky.yoga,
    karana: sky.karana,
    moonSign: sky.moonSign,
    sunSign: sky.sunSign,
    rahuKaal: sky.rahuKaal.label,
    abhijit: sky.abhijit.label,
    sunrise: sky.sunrise.toISOString(),
    sunset: sky.sunset.toISOString(),
    ayanamsa: sky.ayanamsaLabel,
  }
}

function pillar(level: "Strong" | "Steady" | "Watch", noteEn: string, noteHi: string) {
  return { level, noteEn, noteHi }
}

export function buildHoroscope(rashi: number, range: "today" | "tomorrow" | "week" | "month", placeName: string) {
  const i = ((rashi % 12) + 12) % 12
  const start = new Date()
  if (range === "tomorrow") start.setDate(start.getDate() + 1)
  const days = range === "week" ? 7 : range === "month" ? 30 : 1
  const samples = []
  for (let d = 0; d < days; d++) {
    const when = new Date(start.getTime() + d * 86400000)
    const sky = computePanchang(when, placeName)
    const moonIndex = RASHIS.indexOf(sky.moonSign as (typeof RASHIS)[number])
    const house = ((((moonIndex < 0 ? 0 : moonIndex) - i + 12) % 12) + 1)
    samples.push({ day: when.toISOString().slice(0, 10), moonSign: sky.moonSign, house, tithi: sky.tithi })
  }
  const house = samples[0].house
  const sky = computePanchang(start, placeName)
  const loveH = house === 5 || house === 7
  const careerH = house === 10 || house === 6 || house === 2
  const healthH = house === 1 || house === 8 || house === 6
  const moneyH = house === 2 || house === 11 || house === 5
  const dusthana = house === 6 || house === 8 || house === 12
  const grade = (good: boolean) => (dusthana && !good ? "Watch" : good ? "Strong" : "Steady") as "Strong" | "Steady" | "Watch"

  const lineEn = `Moon is in ${sky.moonSign}, the ${house} from ${RASHIS[i]}. ${sky.tithi}. Rahu Kaal ${sky.rahuKaal.label}.`
  const lineHi = `चंद्र ${sky.moonSign} में हैं, ${RASHI_SA[i]} से ${house} भाव। ${sky.tithi}। राहु काल ${sky.rahuKaal.label}।`

  return {
    engine: "lahiri-sidereal",
    source: "computed",
    range,
    rashi: { index: i, en: RASHIS[i], sa: RASHI_SA[i] },
    moonSign: sky.moonSign,
    tithi: sky.tithi,
    nakshatra: sky.nakshatra,
    yoga: sky.yoga,
    rahuKaal: sky.rahuKaal.label,
    houseFromRashi: house,
    line: { en: lineEn, hi: lineHi },
    pillars: {
      love: pillar(
        grade(loveH),
        loveH ? "5th/7th from the Moon — talks and pairings move." : dusthana ? "Hold the argument. Dusthana Moon." : "Ordinary pull. Nothing to force.",
        loveH ? "चंद्र से 5/7 — बात और जोड़ा चलता है।" : dusthana ? "बहस रोकें। दुस्थान चंद्र।" : "सामान्य खिंचाव। ज़बरदस्ती नहीं।"
      ),
      career: pillar(
        grade(careerH),
        careerH ? "10th/6th/2nd — work and pay are the live houses." : dusthana ? "Do the task, skip the announcement." : "Keep the same desk. Timing is average.",
        careerH ? "10/6/2 — काम और पैसा सक्रिय भाव।" : dusthana ? "काम करें, ऐलान न करें।" : "वही मेज़। समय औसत।"
      ),
      health: pillar(
        grade(!dusthana || healthH),
        dusthana ? "6/8/12 — sleep and digestion first." : "Body is not the story today.",
        dusthana ? "6/8/12 — नींद और पाचन पहले।" : "शरीर आज मुख्य कथा नहीं।"
      ),
      money: pillar(
        grade(moneyH),
        moneyH ? "2nd/11th/5th — a receipt can move." : "Spend only what is already dated.",
        moneyH ? "2/11/5 — एक रसीद हिल सकती है।" : "जो तारीख लगी है वही खर्च।"
      ),
    },
    samples: days > 1 ? samples : undefined,
  }
}

export function serializeNatal(dob: string, time: string, placeName: string) {
  const natal = computeNatal(dob, time, placeName)
  const yogas = detectYogas(natal)
    .filter((y) => y.isActive)
    .slice(0, 8)
    .map((y) => ({ name: y.name, meaning: y.meaning }))
  return {
    engine: "lahiri-sidereal",
    source: "computed",
    name: placeName,
    dob,
    time,
    place: natal.placeName,
    lat: natal.lat,
    lng: natal.lng,
    tz: natal.tz,
    ayanamsa: natal.ayanamsa,
    lagna: natal.lagnaSign,
    sun: natal.sunSign,
    moon: natal.moonSign,
    nakshatra: natal.moonNakshatra,
    pada: natal.moonPada,
    dasha: natal.dasha.label,
    bodies: natal.bodies.map((b) => ({
      id: b.id,
      name: b.name,
      sign: b.sign,
      house: b.house,
      dignity: b.dignity,
      degree: b.degreeLabel,
      nakshatra: b.nakshatra,
    })),
    yogas,
  }
}

export function serializeMatch(a: { dob: string; time: string; place: string }, b: { dob: string; time: string; place: string }) {
  const row = matchKundlis(a, b)
  return {
    engine: "ashtakoot-36",
    source: "computed",
    total: row.total,
    max: row.max,
    verdict: row.verdict,
    leftMoon: row.leftMoon,
    rightMoon: row.rightMoon,
    leftNak: row.leftNak,
    rightNak: row.rightNak,
    rows: row.rows,
  }
}

export function planCatalog() {
  return {
    welcomeCredit: WELCOME_CREDIT,
    firstFreeMinutes: FIRST_FREE_MINUTES,
    firstRechargeBonus: FIRST_RECHARGE_BONUS,
    inviteCredit: INVITE_CREDIT,
    packs: WALLET_PACKS,
    plans: [
      { id: "free", price: PLAN_PRICE_INR.free, talkCredit: PLAN_TALK_CREDIT.free },
      { id: "plus", price: PLAN_PRICE_INR.plus, talkCredit: PLAN_TALK_CREDIT.plus },
      { id: "family", price: PLAN_PRICE_INR.family, talkCredit: PLAN_TALK_CREDIT.family },
    ],
  }
}
