export interface PujaRite {
  id: string
  name: string
  nameHi: string
  fee: number
  minutes: number
  practitionerId: string
  topic: string
  line: string
  lineHi: string
}

export const PUJA_RITES: PujaRite[] = [
  {
    id: "ganesh",
    name: "Ganesh puja",
    nameHi: "गणेश पूजा",
    fee: 199,
    minutes: 21,
    practitionerId: "pandit-ram-sharma",
    topic: "Ganesh puja — dated on this desk",
    line: "Live video with a pandit. The closing line is dated. ₹199 leaves the wallet, then minutes.",
    lineHi: "पंडित के साथ वीडियो। अंत की पंक्ति पर तारीख। ₹199 वॉलेट से, फिर मिनट।",
  },
  {
    id: "navagraha",
    name: "Navagraha shanti",
    nameHi: "नवग्रह शांति",
    fee: 499,
    minutes: 45,
    practitionerId: "pandit-uma-shankar",
    topic: "Navagraha shanti — nine grahas, one dated receipt",
    line: "Same WebRTC desk as Talk now. A receipt, not a couriered tortoise.",
    lineHi: "वही वीडियो डेस्क। रसीद, डाक का कछुआ नहीं।",
  },
  {
    id: "satya",
    name: "Satyanarayan katha",
    nameHi: "सत्यनारायण कथा",
    fee: 299,
    minutes: 35,
    practitionerId: "pandit-ram-sharma",
    topic: "Satyanarayan katha — dated when it ends",
    line: "When the katha ends, you mark the date. ₹299 to sit down.",
    lineHi: "कथा खत्म, तारीख लगती है। बैठने के ₹299।",
  },
]

export function pujaById(id: string) {
  return PUJA_RITES.find((p) => p.id === id)
}
