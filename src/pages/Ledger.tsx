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
import { useUser } from "@/context/UserContext"

export function Ledger() {
  const navigate = useNavigate()
  const { user } = useUser()
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
    <div className="pb-28 font-sans bg-[#080C14] min-h-screen text-white">
      {/* Hero — Unified Dark Cosmic Header */}
      <div className="bg-gradient-to-b from-[#090A0F] to-[#0B101D] border-b border-white/10 px-6 pt-8 pb-10 md:px-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold">
            Prediction Proof Ledger
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
            {user.name}'s Verified Predictions
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl leading-relaxed">
            Every astrologer prediction, dated and tracked against real-world outcome documents.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono">
            {[
              { label: "Tracked", value: stats.total },
              { label: "Verified", value: stats.verified, accent: "text-emerald-400" },
              { label: "Active", value: stats.active, accent: "text-amber-400" },
              { label: "Accuracy", value: `${stats.accuracy}%`, accent: "text-cyan-300" },
            ].map(s => (
              <div key={s.label} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-bold">{s.label}</p>
                <p className={`text-xl font-bold tabular-nums mt-0.5 ${s.accent || "text-white"}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content — Unified Dark Glass Container */}
      <div className="px-6 py-8 md:px-10 bg-[#080C14]">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Action banner */}
          {needsVerification.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">
                    {needsVerification.length} prediction{needsVerification.length > 1 ? "s" : ""} need your confirmation
                  </p>
                  <p className="text-[11px] text-[#9CA3AF] font-mono mt-0.5">Window closed — did it happen?</p>
                </div>
              </div>
              <Button size="sm" className="rounded-xl shrink-0 bg-amber-500 text-black font-bold hover:bg-amber-400 font-mono text-xs cursor-pointer" onClick={() => setVerifyTarget(needsVerification[0])}>
                Verify Now
              </Button>
            </motion.div>
          )}

          {/* Needs verification */}
          {needsVerification.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                Needs Verification
              </h2>
              <div className="space-y-3">
                {needsVerification.map(p => (
                  <div key={p.id}>
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
            <section className="space-y-3">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] font-bold">
                Active Predictions
              </h2>
              <div className="space-y-3">
                {active.map(p => (
                  <div key={p.id}>
                    <PredictionReceiptCard prediction={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Verified */}
          {verified.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
                Verified Outcomes
              </h2>
              <div className="space-y-3">
                {verified.map(p => (
                  <div key={p.id}>
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
            <div className="text-center py-16 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-8">
              <BookOpen className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
              <h3 className="text-base font-bold text-white">Your prediction ledger is empty</h3>
              <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto font-mono">
                Book a consultation. Every prediction becomes a dated receipt you can verify later.
              </p>
              <Button onClick={() => navigate("/app/match")} className="rounded-xl bg-amber-500 text-black font-bold font-mono text-xs">
                <Plus className="w-4 h-4 mr-1" /> Book Consultation
              </Button>
            </div>
          )}

          {/* Footer Area */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
            <p className="text-[#9CA3AF]">
              {stats.total} receipts · {user.sunSign} Sun · {user.ascendant} Ascendant
            </p>
            <Button size="sm" className="rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 font-mono text-xs cursor-pointer" onClick={() => navigate("/app/match")}>
              <Plus className="w-4 h-4 mr-1" /> New Consultation
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
