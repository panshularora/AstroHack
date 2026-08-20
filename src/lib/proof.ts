import type { DetailedPrediction } from "@/lib/mock-data"

export interface ProofRecord {
  id: string
  predictionId: string
  title: string
  category: string
  astrologerName: string
  userName: string
  outcome: "yes" | "partial" | "no"
  note?: string
  evidenceName?: string
  confidence: number
  predictedOn: string
  windowEnd: string
  verifiedOn: string
}

const KEY = "astrolive_proofs"

export function loadProofs(): ProofRecord[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ProofRecord[]) : []
  } catch {
    return []
  }
}

export function saveProof(record: ProofRecord) {
  const all = loadProofs().filter((p) => p.id !== record.id && p.predictionId !== record.predictionId)
  all.unshift(record)
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function getProof(id: string): ProofRecord | undefined {
  return loadProofs().find((p) => p.id === id || p.predictionId === id)
}

export function proofFromPrediction(
  p: DetailedPrediction,
  userName: string,
  outcome: "yes" | "partial" | "no",
  note?: string,
  evidenceName?: string
): ProofRecord {
  return {
    id: `proof-${p.id}`,
    predictionId: p.id,
    title: p.title,
    category: p.category,
    astrologerName: p.astrologer.name,
    userName,
    outcome,
    note,
    evidenceName,
    confidence: p.confidence,
    predictedOn: p.consultationDate,
    windowEnd: p.targetDate,
    verifiedOn: new Date().toISOString(),
  }
}

export function proofPublicPath(proofId: string, invite?: string) {
  const path = `/p/${proofId}`
  return invite ? `${path}?from=${encodeURIComponent(invite)}` : path
}

export function proofPublicUrl(proofId: string, invite?: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://astrolive.app"
  return `${origin}${proofPublicPath(proofId, invite)}`
}

export function proofShareText(proof: ProofRecord, invite?: string) {
  const verb =
    proof.outcome === "yes" ? "came true" : proof.outcome === "partial" ? "partly came true" : "did not happen"
  return [
    `${proof.astrologerName} said this. It ${verb}.`,
    /[.!?]$/.test(proof.title.trim()) ? proof.title.trim() : `${proof.title.trim()}.`,
    proof.note || "",
    `See the dated card: ${proofPublicUrl(proof.id, invite)}`,
    invite ? "If you start your own ledger from that link, we both get ₹50 of talk time." : "",
  ]
    .filter(Boolean)
    .join("\n")
}

export function outcomeLabel(outcome: ProofRecord["outcome"]) {
  if (outcome === "yes") return "Came true"
  if (outcome === "partial") return "Partly true"
  return "Did not happen"
}
