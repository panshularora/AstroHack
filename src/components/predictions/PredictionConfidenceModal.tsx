import { motion, AnimatePresence } from "framer-motion"
import { X, Target, ShieldCheck, Sparkles, TrendingUp, CheckCircle2, Info, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"

interface PredictionConfidenceModalProps {
  isOpen: boolean
  onClose: () => void
  confidenceScore?: number
  predictionTitle?: string
}

export function PredictionConfidenceModal({ isOpen, onClose, confidenceScore = 88, predictionTitle = "Tech Sector Executive Offer" }: PredictionConfidenceModalProps) {
  if (!isOpen) return null

  const breakdown = [
    { factor: "Astrologer Historical Accuracy", weight: "+35%", score: 97.4, detail: "Acharya Ananya Sharma's career prediction accuracy in last 50 sessions." },
    { factor: "Natal Transit Alignment", weight: "+38%", score: 95.0, detail: "Jupiter 120° Sun Trine forming in 10th House (Executive Authority)." },
    { factor: "Dasha Period Compatibility", weight: "+15%", score: 84.0, detail: "Rahu-Jupiter Dasha sub-period active, favoring technological elevation." },
    { factor: "Cohort Verification Data", weight: "+12%", score: 82.0, detail: "N=412 verified users with identical Leo Sun & Rahu transits achieved offer." },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-surface border border-line rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gold/15 border border-gold/30 flex items-center justify-center text-gold-bright">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold font-display text-ink">Confidence Engine Analysis</h2>
                  <Badge variant="gold" size="sm" className="font-mono">{confidenceScore}% Confidence</Badge>
                </div>
                <p className="text-xs font-mono text-ink-tertiary mt-0.5">Explaining the mathematical & celestial derivation of prediction accuracy</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-surface-2 text-ink-tertiary hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <div className="p-4 rounded-md bg-surface-2/60 border border-line text-xs font-mono text-ink">
            <span className="text-[10px] text-ink-tertiary uppercase font-bold block mb-0.5">Target Prediction</span>
            <span className="font-bold text-sm text-gold-bright">"{predictionTitle}"</span>
          </div>

          {/* Mathematical Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-ink uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-brand" /> Why is this prediction calculated at {confidenceScore}%?
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {breakdown.map((item) => (
                <div key={item.factor} className="p-3.5 rounded-md bg-surface-2/40 border border-line/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{item.factor}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gold-bright font-bold">{item.weight}</span>
                      <span className="text-ink-tertiary text-[10px]">({item.score}% match)</span>
                    </div>
                  </div>
                  <Progress value={item.score} color="brand" className="h-1.5" />
                  <p className="text-[11px] font-sans text-ink-secondary leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-line/60 flex items-center justify-between font-mono text-xs text-ink-tertiary">
            <span className="flex items-center gap-1.5 text-success font-bold"><ShieldCheck className="w-4 h-4 text-success" /> Immutable Proof Model</span>
            <Button size="sm" className="rounded-md font-mono font-bold" onClick={onClose}>
              Got It <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
