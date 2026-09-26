import { NAKSHATRAS, RASHIS } from "./constants.js"
import { computeNatal } from "./engine.js"

const VARNA = [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1]
const GANA = [0, 1, 2, 1, 0, 2, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0]
const NADI = [0, 1, 2, 1, 0, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]
const YONI = [0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1]

const LORD = [4, 3, 2, 1, 0, 2, 3, 4, 5, 6, 6, 5]
const FRIEND: Record<number, number[]> = {
  0: [1, 4],
  1: [0, 2],
  2: [0, 3, 5],
  3: [2, 6],
  4: [0, 5],
  5: [2, 4],
  6: [3],
}

export type GunaRow = { name: string; nameHi: string; score: number; max: number; note: string; noteHi: string }

export function ashtakoot(boyMoon: number, girlMoon: number, boyNak: number, girlNak: number) {
  const varna = VARNA[boyMoon] >= VARNA[girlMoon] ? 1 : 0

  const vashya = boyMoon === girlMoon ? 2 : Math.abs(boyMoon - girlMoon) % 6 === 0 ? 1 : 2

  const taraCount = ((boyNak - girlNak + 27) % 27) + 1
  const taraRem = taraCount % 9 || 9
  const taraBad = taraRem === 3 || taraRem === 5 || taraRem === 7
  const taraRev = ((girlNak - boyNak + 27) % 27) + 1
  const taraRem2 = taraRev % 9 || 9
  const taraBad2 = taraRem2 === 3 || taraRem2 === 5 || taraRem2 === 7
  const tara = !taraBad && !taraBad2 ? 3 : taraBad !== taraBad2 ? 1.5 : 0

  const yoni = YONI[boyNak] === YONI[girlNak] ? 4 : 2

  const bl = LORD[boyMoon]
  const gl = LORD[girlMoon]
  const graha = bl === gl ? 5 : FRIEND[bl]?.includes(gl) ? 4 : 3

  const gb = GANA[boyNak]
  const gg = GANA[girlNak]
  const gana = gb === gg ? 6 : (gb === 0 && gg === 1) || (gb === 1 && gg === 0) ? 5 : (gb === 1 && gg === 2) || (gb === 2 && gg === 1) ? 1 : 0

  const diff = Math.abs(boyMoon - girlMoon)
  const bhakoot = diff === 1 || diff === 11 || diff === 5 || diff === 7 ? 0 : 7

  const nadi = NADI[boyNak] === NADI[girlNak] ? 0 : 8

  const rows: GunaRow[] = [
    { name: "Varna", nameHi: "वर्ण", score: varna, max: 1, note: "Spiritual temperament.", noteHi: "आध्यात्मिक स्वभाव।" },
    { name: "Vashya", nameHi: "वश्य", score: vashya, max: 2, note: "Mutual pull.", noteHi: "आपसी आकर्षण।" },
    { name: "Tara", nameHi: "तारा", score: tara, max: 3, note: "Birth-star distance.", noteHi: "जन्म नक्षत्र की दूरी।" },
    { name: "Yoni", nameHi: "योनि", score: yoni, max: 4, note: "Nature of the pair.", noteHi: "जोड़े का स्वभाव।" },
    { name: "Graha Maitri", nameHi: "ग्रह मैत्री", score: graha, max: 5, note: "Moon-lord friendship.", noteHi: "चंद्र स्वामी की मित्रता।" },
    { name: "Gana", nameHi: "गण", score: gana, max: 6, note: "Deva, manushya, rakshasa.", noteHi: "देव, मनुष्य, राक्षस।" },
    { name: "Bhakoot", nameHi: "भकूट", score: bhakoot, max: 7, note: "Moon-sign pair.", noteHi: "चंद्र राशि युग्म।" },
    { name: "Nadi", nameHi: "नाड़ी", score: nadi, max: 8, note: "Health and progeny.", noteHi: "स्वास्थ्य और संतान।" },
  ]

  const total = rows.reduce((s, r) => s + r.score, 0)
  const max = 36
  const verdict =
    nadi === 0
      ? "nadi"
      : total >= 24
        ? "good"
        : total >= 18
          ? "ok"
          : "low"

  return { rows, total, max, verdict, boyRashi: RASHIS[boyMoon], girlRashi: RASHIS[girlMoon], boyNak: NAKSHATRAS[boyNak], girlNak: NAKSHATRAS[girlNak] }
}

export function matchKundlis(
  a: { dob: string; time: string; place: string },
  b: { dob: string; time: string; place: string }
) {
  const left = computeNatal(a.dob, a.time, a.place)
  const right = computeNatal(b.dob, b.time, b.place)
  const boyMoon = left.bodies.find((x) => x.id === "moon")!
  const girlMoon = right.bodies.find((x) => x.id === "moon")!
  const result = ashtakoot(
    boyMoon.signIndex,
    girlMoon.signIndex,
    nakIndex(boyMoon.nakshatra),
    nakIndex(girlMoon.nakshatra)
  )
  return {
    ...result,
    leftMoon: boyMoon.sign,
    rightMoon: girlMoon.sign,
    leftNak: boyMoon.nakshatra,
    rightNak: girlMoon.nakshatra,
  }
}

function nakIndex(name: string) {
  const i = NAKSHATRAS.indexOf(name as (typeof NAKSHATRAS)[number])
  return i < 0 ? 0 : i
}
