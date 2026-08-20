export type OfferingKind = "aarti" | "gem" | "rudraksha" | "stone"

export interface Offering {
  id: string
  kind: OfferingKind
  name: string
  nameHi: string
  planet?: string
  cost: number
  minWallet: number
  line: string
  lineHi: string
}

/** Digital vault tokens — not couriered jewellery. Cost leaves the wallet. */
export const OFFERINGS: Offering[] = [
  {
    id: "aarti-ganesha",
    kind: "aarti",
    name: "Ganesh aarti",
    nameHi: "गणेश आरती",
    cost: 0,
    minWallet: 50,
    line: "Unlock if the wallet holds ₹50. A short aarti you can play. No courier.",
    lineHi: "वॉलेट में ₹50 हों तो खुलती है। छोटी आरती, डाक नहीं।",
  },
  {
    id: "aarti-durga",
    kind: "aarti",
    name: "Durga aarti",
    nameHi: "दुर्गा आरती",
    cost: 79,
    minWallet: 79,
    line: "Tuesday or Friday. Play after you claim. Leaves ₹79.",
    lineHi: "मंगल या शुक्र। दावा करने पर चलाएँ। ₹79 कटते हैं।",
  },
  {
    id: "aarti-navagraha",
    kind: "aarti",
    name: "Navagraha aarti",
    nameHi: "नवग्रह आरती",
    cost: 129,
    minWallet: 129,
    line: "Nine tones for nine grahas. Claim when the wallet has ₹129.",
    lineHi: "नौ ग्रह, नौ स्वर। वॉलेट में ₹129 हों तो दावा।",
  },
  {
    id: "rudraksha-5",
    kind: "rudraksha",
    name: "5 Mukhi token",
    nameHi: "पंचमुखी रुद्राक्ष",
    planet: "Jupiter",
    cost: 99,
    minWallet: 99,
    line: "A dated token for peace and focus — not a bead in the post.",
    lineHi: "शांति और ध्यान का टोकन। डाक में दाना नहीं।",
  },
  {
    id: "pyrite",
    kind: "stone",
    name: "Pyrite token",
    nameHi: "पायराइट",
    planet: "Sun",
    cost: 99,
    minWallet: 99,
    line: "Wealth karaka as a vault line. Same idea as their pyrite mall, without the SKU farm.",
    lineHi: "धन का टोकन। उनकी दुकान जैसा विचार, बिना सौ प्रोडक्ट।",
  },
  {
    id: "pearl",
    kind: "gem",
    name: "Pearl (Moti)",
    nameHi: "मोती",
    planet: "Moon",
    cost: 149,
    minWallet: 149,
    line: "Moon’s stone. Claim if the wallet holds ₹149.",
    lineHi: "चंद्र का रत्न। वॉलेट में ₹149 हों तो दावा।",
  },
  {
    id: "coral",
    kind: "gem",
    name: "Red coral (Moonga)",
    nameHi: "मूंगा",
    planet: "Mars",
    cost: 199,
    minWallet: 199,
    line: "Mars. Trial-wear advice stays: three days, then keep or drop.",
    lineHi: "मंगल। तीन दिन आज़माएँ, फिर रखें या छोड़ें।",
  },
  {
    id: "pukhraj",
    kind: "gem",
    name: "Yellow sapphire",
    nameHi: "पुखराज",
    planet: "Jupiter",
    cost: 249,
    minWallet: 249,
    line: "Guru’s stone. Needs ₹249 in the wallet. Talk to someone before a real setting.",
    lineHi: "गुरु का रत्न। ₹249 चाहिए। असली जड़ने से पहले बात करें।",
  },
]

export function offeringById(id: string) {
  return OFFERINGS.find((o) => o.id === id)
}
