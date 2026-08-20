export interface ProofScore {
  name: string
  closed: number
  cameTrue: number
  partial: number
  missed: number
  hitRate: number
}

export function emptyScore(name: string): ProofScore {
  return { name, closed: 0, cameTrue: 0, partial: 0, missed: 0, hitRate: 0 }
}

export function scoreLabel(s: ProofScore) {
  if (s.closed === 0) return "No dated results yet"
  return `${s.hitRate}% of ${s.closed} dated ${s.closed === 1 ? "claim" : "claims"} came true`
}
