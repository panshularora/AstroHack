import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { BookOpen, Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useLedger } from "@/context/LedgerContext"
import { PredictionReceiptCard } from "@/components/ledger/PredictionReceiptCard"
import { VerificationModal } from "@/components/ledger/VerificationModal"
import { PredictionShareCardModal } from "@/components/predictions/PredictionShareCardModal"
import type { DetailedPrediction } from "@/lib/mock-data"
import { mockUser } from "@/lib/mock-data"

export function Ledger() {
  const navigate = useNavigate()
  const { predictions, verifyPrediction, stats } = useLedger()
  const [verifyTarget, setVerifyTarget] = useState<DetailedPrediction | null>(null)
  const [shareTarget, setShareTarget] = useState<DetailedPrediction | null>(null)

  const needsVerification = predictions.filter(p => {
    if (p.status !== "pending" && p.status !== "in_progress") return false
    return new Date(p.targetDate) <= new Date()
  })

  const active = predictions.filter(p =>
    (p.status === "pending" || p.status === "in_progress") &&
    new Date(p.targetDate) > new Date()
  )

  const verified = predictions.filter(p => p.status === "completed")

  const handleVerify = (outcome: "yes" | "partial" | "no", note?: string) => {
    if (!verifyTarget) return
    verifyPrediction(verifyTarget.id, outcome, note)
    if (outcome === "yes") {
      setShareTarget({ ...verifyTarget, status: "completed", notes: note })
    }
    setVerifyTarget(null)
  }

  return (
    <div className="pb-28">
      {/* Hero — cosmic field, minimal */}
      <div className="cosmic-hero px-6 pt-8 pb-10 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand mb-2">
            Prediction Ledger
          </p>
          <h1 className="font-display text-h1 text-ink tracking-tight mb-2">
            {mockUser.name}'s Cosmic Receipts
          </h1>
          <p className="text-sm text-ink-secondary max-w-lg">
            Every astrologer claim, dated and tracked. Confirm outcomes. Build trust over years.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 font-mono">
            {[
              { label: "Tracked", value: stats.total },
              { label: "Verified", value: stats.verified, accent: "text-success" },
              { label: "Active", value: stats.active, accent: "text-brand" },
              { label: "Accuracy", value: `${stats.accuracy}%`, accent: "text-gold-bright" },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-md bg-white/[0.04] border border-line/60">
                <p className="text-[9px] uppercase tracking-[0.12em] text-ink-tertiary">{s.label}</p>
                <p className={`text-xl font-bold tabular-nums mt-0.5 ${s.accent || "text-ink"}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content — ivory editorial */}
      <div className="ivory-content px-6 py-10 md:px-10">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Action banner */}
          {needsVerification.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-warning/10 border border-warning/30 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-warning shrink-0" />
                <div>
                  <p className="text-sm font-bold text-ink-ivory">
                    {needsVerification.length} prediction{needsVerification.length > 1 ? "s" : ""} need your confirmation
                  </p>
                  <p className="text-xs text-ink-ivory-secondary font-mono">Window closed — did it happen?</p>
                </div>
              </div>
              <Button size="sm" className="rounded-md shrink-0" onClick={() => setVerifyTarget(needsVerification[0])}>
                Verify Now
              </Button>
            </motion.div>
          )}

          {/* Needs verification */}
          {needsVerification.length > 0 && (
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand mb-4">
                Needs Verification
              </h2>
              <div className="space-y-3">
                {needsVerification.map(p => (
                  <div key={p.id} className="[&_.bg-surface]:bg-ivory-card [&_.border-line]:border-ivory-border [&_.text-ink]:text-ink-ivory [&_.text-ink-secondary]:text-ink-ivory-secondary [&_.text-ink-tertiary]:text-ink-ivory-tertiary">
                    <PredictionReceiptCard
                      prediction={p}
                      highlight
                      onVerify={() => setVerifyTarget(p)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Active windows */}
          {active.length > 0 && (
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-ivory-tertiary mb-4">
                Active Windows
              </h2>
              <div className="space-y-3">
                {active.map(p => (
                  <div key={p.id} className="[&_.bg-surface]:bg-ivory-card [&_.border-line]:border-ivory-border [&_.text-ink]:text-ink-ivory [&_.text-ink-secondary]:text-ink-ivory-secondary [&_.text-ink-tertiary]:text-ink-ivory-tertiary">
                    <PredictionReceiptCard prediction={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Verified */}
          {verified.length > 0 && (
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-success mb-4">
                Verified Outcomes
              </h2>
              <div className="space-y-3">
                {verified.map(p => (
                  <div key={p.id} className="[&_.bg-surface]:bg-ivory-card [&_.border-line]:border-ivory-border [&_.text-ink]:text-ink-ivory [&_.text-ink-secondary]:text-ink-ivory-secondary [&_.text-ink-tertiary]:text-ink-ivory-tertiary">
                    <PredictionReceiptCard
                      prediction={p}
                      onShare={() => setShareTarget(p)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty CTA */}
          {predictions.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <BookOpen className="w-10 h-10 text-brand mx-auto opacity-60" />
              <h3 className="font-display text-xl text-ink-ivory">Your ledger is empty</h3>
              <p className="text-sm text-ink-ivory-secondary max-w-sm mx-auto">
                Book a consultation. Every prediction becomes a dated receipt you can verify later.
              </p>
              <Button onClick={() => navigate("/app/consult")} className="rounded-md">
                <Plus className="w-4 h-4" /> Book Consultation
              </Button>
            </div>
          )}

          {/* Book consultation FAB area */}
          <div className="pt-6 border-t border-ivory-border flex items-center justify-between">
            <p className="text-xs text-ink-ivory-tertiary font-mono">
              {stats.total} receipts · Leo Sun · Scorpio Ascendant
            </p>
            <Button size="sm" className="rounded-md font-mono" onClick={() => navigate("/app/consult")}>
              <Plus className="w-4 h-4" /> New Consultation
            </Button>
          </div>
        </div>
      </div>

      <VerificationModal
        isOpen={!!verifyTarget}
        onClose={() => setVerifyTarget(null)}
        prediction={verifyTarget}
        onConfirm={handleVerify}
      />

      <PredictionShareCardModal
        isOpen={!!shareTarget}
        onClose={() => setShareTarget(null)}
        prediction={shareTarget ? {
          id: shareTarget.id,
          title: shareTarget.title,
          category: shareTarget.category.toUpperCase(),
          targetDate: shareTarget.targetDate,
          confidence: shareTarget.confidence,
          astrologerName: shareTarget.astrologer.name,
          verifiedDate: new Date().toISOString().split("T")[0],
        } : undefined}
      />
    </div>
  )
}
