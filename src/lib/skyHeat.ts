import type { DetailedPrediction } from "@/lib/mock-data"
import type { NatalChart } from "@/lib/vedic"
import { grahasInNatalHouses } from "@/lib/vedic"

const HOUSES: Record<string, number[]> = {
  career: [2, 6, 10],
  finance: [2, 5, 11],
  relationship: [5, 7, 11],
  health: [1, 6, 8],
  education: [4, 5, 9],
}

export function skyHeat(predictions: DetailedPrediction[], natal: NatalChart) {
  const live = grahasInNatalHouses(natal)
  const moon = live.bodies.find((b) => b.id === "moon")
  const jup = live.bodies.find((b) => b.id === "jupiter")
  const open = predictions.filter((p) => p.status === "pending" || p.status === "in_progress")
  if (!moon) return [] as { prediction: DetailedPrediction; why: string }[]

  const hits: { prediction: DetailedPrediction; why: string }[] = []
  for (const p of open) {
    const houses = HOUSES[p.category] || []
    if (houses.includes(moon.house)) {
      hits.push({
        prediction: p,
        why: `Moon is in your ${moon.house}${ord(moon.house)} today. That house speaks to ${p.category}. This line is live.`,
      })
      continue
    }
    if (jup && houses.includes(jup.house)) {
      hits.push({
        prediction: p,
        why: `Jupiter is transiting your ${jup.house}${ord(jup.house)}. That is why this ${p.category} claim is warm right now.`,
      })
    }
  }
  return hits
}

function ord(n: number) {
  if (n === 1) return "st"
  if (n === 2) return "nd"
  if (n === 3) return "rd"
  return "th"
}
