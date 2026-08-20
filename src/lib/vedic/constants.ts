export const RASHIS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const

export const RASHI_SA = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrishchika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
] as const

export const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
] as const

export const TITHIS = [
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Purnima",
] as const

export const KRISHNA_TITHIS = [
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Amavasya",
] as const

export const YOGAS = [
  "Vishkambha",
  "Priti",
  "Ayushman",
  "Saubhagya",
  "Shobhana",
  "Atiganda",
  "Sukarma",
  "Dhriti",
  "Shula",
  "Ganda",
  "Vriddhi",
  "Dhruva",
  "Vyaghata",
  "Harshana",
  "Vajra",
  "Siddhi",
  "Vyatipata",
  "Variyan",
  "Parigha",
  "Shiva",
  "Siddha",
  "Sadhya",
  "Shubha",
  "Shukla",
  "Brahma",
  "Indra",
  "Vaidhriti",
] as const

export const KARANAS = [
  "Bava",
  "Balava",
  "Kaulava",
  "Taitila",
  "Gara",
  "Vanija",
  "Vishti",
  "Shakuni",
  "Chatushpada",
  "Naga",
  "Kimstughna",
] as const

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const

/** Rahu Kaal eighth of daytime (1-indexed from sunrise). */
export const RAHU_KAAL_SLOT: Record<number, number> = {
  0: 8,
  1: 2,
  2: 7,
  3: 5,
  4: 6,
  5: 4,
  6: 3,
}

export const GRAHA_META = {
  sun: { name: "Sun", sanskrit: "Surya", symbol: "☉", hi: "सूर्य" },
  moon: { name: "Moon", sanskrit: "Chandra", symbol: "☽", hi: "चंद्र" },
  mars: { name: "Mars", sanskrit: "Mangal", symbol: "♂", hi: "मंगल" },
  mercury: { name: "Mercury", sanskrit: "Budha", symbol: "☿", hi: "बुध" },
  jupiter: { name: "Jupiter", sanskrit: "Brihaspati", symbol: "♃", hi: "गुरु" },
  venus: { name: "Venus", sanskrit: "Shukra", symbol: "♀", hi: "शुक्र" },
  saturn: { name: "Saturn", sanskrit: "Shani", symbol: "♄", hi: "शनि" },
  rahu: { name: "Rahu", sanskrit: "Rahu", symbol: "☊", hi: "राहु" },
  ketu: { name: "Ketu", sanskrit: "Ketu", symbol: "☋", hi: "केतु" },
} as const

export type GrahaId = keyof typeof GRAHA_META

export const HOUSE_AREAS = [
  "Self & vitality",
  "Wealth & speech",
  "Siblings & courage",
  "Home & mother",
  "Children & intellect",
  "Health & service",
  "Partnership & marriage",
  "Transformation & secrets",
  "Fortune & dharma",
  "Career & reputation",
  "Gains & networks",
  "Isolation & spirituality",
] as const

export const HOUSE_AREAS_HI = [
  "स्व व प्राण",
  "धन व वाणी",
  "सहोदर व साहस",
  "घर व माता",
  "संतान व बुद्धि",
  "स्वास्थ्य व सेवा",
  "विवाह व साझेदारी",
  "परिवर्तन व रहस्य",
  "भाग्य व धर्म",
  "कर्म व प्रतिष्ठा",
  "लाभ व नेटवर्क",
  "एकांत व अध्यात्म",
] as const

export function houseAreaLabel(house: number, hi = false): string {
  const i = Math.max(1, Math.min(12, Math.round(house))) - 1
  return hi ? HOUSE_AREAS_HI[i] : HOUSE_AREAS[i]
}

export const EXALTATION: Partial<Record<GrahaId, number>> = {
  sun: 0,
  moon: 1,
  mars: 9,
  mercury: 5,
  jupiter: 3,
  venus: 11,
  saturn: 6,
}

export const DEBILITATION: Partial<Record<GrahaId, number>> = {
  sun: 6,
  moon: 7,
  mars: 3,
  mercury: 11,
  jupiter: 9,
  venus: 5,
  saturn: 0,
}

export const OWN_SIGNS: Partial<Record<GrahaId, number[]>> = {
  sun: [4],
  moon: [3],
  mars: [0, 7],
  mercury: [2, 5],
  jupiter: [8, 11],
  venus: [1, 6],
  saturn: [9, 10],
}

export const DASHA_ORDER = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"] as const

export const DASHA_YEARS: Record<(typeof DASHA_ORDER)[number], number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
}

export const NAKSHATRA_LORDS: (typeof DASHA_ORDER)[number][] = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
]
