import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { mockDetailedPredictions, type DetailedPrediction } from "@/lib/mock-data"

export interface ExtractedReceipt {
  id: string
  title: string
  category: DetailedPrediction["category"]
  windowStart: string
  windowEnd: string
  confidence: number
  astrologerName: string
  type: "prediction" | "remedy"
}

interface LedgerContextValue {
  predictions: DetailedPrediction[]
  addPredictions: (receipts: ExtractedReceipt[]) => void
  verifyPrediction: (id: string, outcome: "yes" | "partial" | "no", note?: string) => void
  stats: {
    total: number
    verified: number
    active: number
    needsVerification: number
    accuracy: number
  }
}

const LedgerContext = createContext<LedgerContextValue | null>(null)

export function LedgerProvider({ children }: { children: ReactNode }) {
  const [predictions, setPredictions] = useState<DetailedPrediction[]>(mockDetailedPredictions)

  const addPredictions = useCallback((receipts: ExtractedReceipt[]) => {
    const newEntries: DetailedPrediction[] = receipts
      .filter(r => r.type === "prediction")
      .map(r => ({
        id: r.id,
        title: r.title,
        category: r.category,
        astrologer: { name: r.astrologerName, avatar: "" },
        consultationDate: new Date().toISOString(),
        targetDate: r.windowEnd,
        confidence: r.confidence,
        status: "pending" as const,
      }))
    setPredictions(prev => [...newEntries, ...prev])
  }, [])

  const verifyPrediction = useCallback((id: string, outcome: "yes" | "partial" | "no", note?: string) => {
    setPredictions(prev =>
      prev.map(p => {
        if (p.id !== id) return p
        if (outcome === "yes") {
          return { ...p, status: "completed" as const, notes: note || "Outcome verified by user." }
        }
        if (outcome === "partial") {
          return { ...p, status: "completed" as const, notes: note || "Partially verified." }
        }
        return { ...p, status: "failed" as const, notes: note || "Did not occur as predicted." }
      })
    )
  }, [])

  const verified = predictions.filter(p => p.status === "completed").length
  const active = predictions.filter(p => p.status === "pending" || p.status === "in_progress").length
  const needsVerification = predictions.filter(p => {
    if (p.status !== "pending" && p.status !== "in_progress") return false
    return new Date(p.targetDate) <= new Date()
  }).length

  const stats = {
    total: predictions.length,
    verified,
    active,
    needsVerification,
    accuracy: verified > 0 ? Math.round((verified / predictions.filter(p => p.status === "completed" || p.status === "failed").length || 1) * 100) : 0,
  }

  return (
    <LedgerContext.Provider value={{ predictions, addPredictions, verifyPrediction, stats }}>
      {children}
    </LedgerContext.Provider>
  )
}

export function useLedger() {
  const ctx = useContext(LedgerContext)
  if (!ctx) throw new Error("useLedger must be used within LedgerProvider")
  return ctx
}
