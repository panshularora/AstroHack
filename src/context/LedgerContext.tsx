import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { type DetailedPrediction } from "@/lib/mock-data"
import { useUser } from "@/context/UserContext"
import { PLAN_LIMITS } from "@/lib/entitlements"
import { api, apiOptional, getToken } from "@/lib/api"

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

export interface ClosePayload {
  outcome: "yes" | "partial" | "no"
  note?: string
  evidenceName?: string
}

interface LedgerContextValue {
  predictions: DetailedPrediction[]
  addPredictions: (receipts: ExtractedReceipt[]) => { ok: boolean; reason?: string }
  addPrediction: (input: {
    title: string
    category: DetailedPrediction["category"]
    targetDate: string
    confidence: number
    astrologerName: string
  }) => { ok: boolean; reason?: string; prediction?: DetailedPrediction }
  verifyPrediction: (id: string, outcome: "yes" | "partial" | "no", note?: string) => void
  closePrediction: (id: string, payload: ClosePayload) => DetailedPrediction | null
  stats: {
    total: number
    verified: number
    active: number
    needsVerification: number
    accuracy: number
    cameTrue: number
  }
}

const LedgerContext = createContext<LedgerContextValue | null>(null)

export function LedgerProvider({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const [predictions, setPredictions] = useState<DetailedPrediction[]>([])

  useEffect(() => {
    if (!getToken()) {
      setPredictions([])
      return
    }
    apiOptional<DetailedPrediction[]>("/api/ledger").then((rows) => {
      setPredictions(rows && Array.isArray(rows) ? rows : [])
    })
  }, [user.id])

  const activeCount = (list: DetailedPrediction[]) =>
    list.filter((p) => p.status === "pending" || p.status === "in_progress").length

  const addPredictions = useCallback((receipts: ExtractedReceipt[]) => {
    const limit = PLAN_LIMITS[user.plan].activePredictions
    let blocked = false
    setPredictions((prev) => {
      const incoming = receipts.filter((r) => r.type === "prediction")
      if (activeCount(prev) + incoming.length > limit) {
        blocked = true
        return prev
      }
      const newEntries: DetailedPrediction[] = incoming.map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category,
        astrologer: { name: r.astrologerName, avatar: "" },
        consultationDate: new Date().toISOString(),
        targetDate: r.windowEnd,
        confidence: r.confidence,
        status: "pending" as const,
      }))
      return [...newEntries, ...prev]
    })
    if (!blocked && getToken()) {
      const incoming = receipts.filter((r) => r.type === "prediction")
      if (incoming.length) {
        api("/api/ledger", {
          method: "POST",
          body: JSON.stringify({
            items: incoming.map((r) => ({
              id: r.id,
              title: r.title,
              category: r.category,
              targetDate: r.windowEnd,
              confidence: r.confidence,
              astrologerName: r.astrologerName,
            })),
          }),
        }).catch(() => {})
      }
    }
    return blocked
      ? { ok: false, reason: "Free tracks 3 open predictions. Upgrade to Plus to keep the full ledger." }
      : { ok: true }
  }, [user.plan])

  const addPrediction = useCallback((input: {
    title: string
    category: DetailedPrediction["category"]
    targetDate: string
    confidence: number
    astrologerName: string
  }) => {
    const limit = PLAN_LIMITS[user.plan].activePredictions
    if (activeCount(predictions) >= limit) {
      return { ok: false, reason: "Free tracks 3 open predictions. Upgrade to Plus to keep the full ledger." }
    }
    const prediction: DetailedPrediction = {
      id: `pred-${Date.now()}`,
      title: input.title,
      category: input.category,
      astrologer: { name: input.astrologerName || "Self-logged", avatar: "" },
      consultationDate: new Date().toISOString(),
      targetDate: input.targetDate,
      confidence: input.confidence,
      status: "in_progress",
    }
    setPredictions((prev) => [prediction, ...prev])
    if (getToken()) {
      api("/api/ledger", {
        method: "POST",
        body: JSON.stringify({
          items: [
            {
              id: prediction.id,
              title: prediction.title,
              category: prediction.category,
              targetDate: prediction.targetDate,
              confidence: prediction.confidence,
              astrologerName: prediction.astrologer.name,
            },
          ],
        }),
      }).catch(() => {})
    }
    return { ok: true, prediction }
  }, [predictions, user.plan])

  const applyClose = (p: DetailedPrediction, payload: ClosePayload): DetailedPrediction => {
    const status = payload.outcome === "no" ? "failed" : "completed"
    return {
      ...p,
      status,
      outcome: payload.outcome,
      closedAt: new Date().toISOString(),
      evidenceNote: payload.note,
      evidenceName: payload.evidenceName,
      notes:
        payload.note ||
        (payload.outcome === "yes"
          ? "Came true — closed by you."
          : payload.outcome === "partial"
            ? "Partially true — closed by you."
            : "Did not occur as predicted."),
    }
  }

  const verifyPrediction = useCallback((id: string, outcome: "yes" | "partial" | "no", note?: string) => {
    setPredictions((prev) => prev.map((p) => (p.id === id ? applyClose(p, { outcome, note }) : p)))
    if (getToken()) {
      api(`/api/ledger/${id}/close`, { method: "POST", body: JSON.stringify({ outcome, note }) }).catch(() => {})
    }
  }, [])

  const closePrediction = useCallback((id: string, payload: ClosePayload) => {
    let closed: DetailedPrediction | null = null
    setPredictions((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        closed = applyClose(p, payload)
        return closed
      })
    )
    return closed
  }, [])

  const verified = predictions.filter((p) => p.status === "completed" || p.status === "failed")
  const cameTrue = predictions.filter((p) => p.outcome === "yes" || (p.status === "completed" && p.outcome !== "partial" && p.outcome !== "no")).length
  const active = predictions.filter((p) => p.status === "pending" || p.status === "in_progress").length
  const needsVerification = predictions.filter((p) => {
    if (p.status !== "pending" && p.status !== "in_progress") return false
    return new Date(p.targetDate) <= new Date()
  }).length

  const stats = {
    total: predictions.length,
    verified: predictions.filter((p) => p.status === "completed").length,
    active,
    needsVerification,
    accuracy: verified.length > 0 ? Math.round((cameTrue / verified.length) * 100) : 0,
    cameTrue,
  }

  return (
    <LedgerContext.Provider value={{ predictions, addPredictions, addPrediction, verifyPrediction, closePrediction, stats }}>
      {children}
    </LedgerContext.Provider>
  )
}

export function useLedger() {
  const ctx = useContext(LedgerContext)
  if (!ctx) throw new Error("useLedger must be used within LedgerProvider")
  return ctx
}
