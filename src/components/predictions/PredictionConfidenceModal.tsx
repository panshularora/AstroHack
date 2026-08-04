import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Target, ShieldCheck, Info, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"

interface PredictionConfidenceModalProps {
  isOpen: boolean
  onClose: () => void
  confidenceScore?: number
  predictionTitle?: string
}

export function PredictionConfidenceModal({ 
  isOpen, 
  onClose, 
  confidenceScore = 88, 
  predictionTitle = "Tech Sector Executive Offer" 
}: PredictionConfidenceModalProps) {
  const [proofAttached, setProofAttached] = useState(true)
  const [transitVerified, setTransitVerified] = useState(true)

  if (!isOpen) return null

  const currentScore = (proofAttached ? 10 : 0) + (transitVerified ? 0 : -10) + confidenceScore

  const breakdown = [
    { factor: "Astrologer Historical Accuracy", weight: "+35%", score: 97.4, detail: "Guruji Vikram Sharma's career prediction accuracy across last 50 sessions." },
    { factor: "Natal Transit Alignment", weight: "+38%", score: 95.0, detail: "Jupiter 120° Sun Trine forming in 10th House (Executive Authority)." },
    { factor: "Dasha Period Compatibility", weight: "+15%", score: 84.0, detail: "Rahu-Jupiter Dasha sub-period active, favoring technological elevation." },
    { factor: "Document Proof Receipt", weight: proofAttached ? "+10%" : "0%", score: proofAttached ? 100 : 0, detail: proofAttached ? "Offer_Letter_TechExec_2026.pdf verified in Cosmic Vault." : "No PDF proof attached yet." },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-[#090A0F] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold font-display text-white">Confidence Engine Analysis</h2>
                  <Badge variant="gold" size="sm" className="font-mono">{currentScore}% Calculated</Badge>
                </div>
                <p className="text-xs font-mono text-[#9CA3AF] mt-0.5">Mathematical & celestial derivation of prediction confidence</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#9CA3AF] uppercase font-bold block mb-0.5">Target Prediction</span>
              <span className="font-bold text-sm text-amber-300">"{predictionTitle}"</span>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] uppercase">
              Live Transit Trine
            </Badge>
          </div>

          {/* Interactive Calculation Toggles */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Interactive Proof Simulation</span>
            
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white">Attach Verified PDF Document (+10% Boost)</span>
              <input
                type="checkbox"
                checked={proofAttached}
                onChange={e => setProofAttached(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white">Include Jupiter 10th House Transit Sync</span>
              <input
                type="checkbox"
                checked={transitVerified}
                onChange={e => setTransitVerified(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </label>
          </div>

          {/* Mathematical Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" /> Mathematical Score Breakdown:
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {breakdown.map((item) => (
                <div key={item.factor} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{item.factor}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-300 font-bold">{item.weight}</span>
                      <span className="text-[#9CA3AF] text-[10px]">({item.score}% match)</span>
                    </div>
                  </div>
                  <Progress value={item.score} color="brand" className="h-1.5" />
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#9CA3AF]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Immutable Proof Model</span>
            <Button size="sm" className="rounded-xl font-mono font-bold bg-amber-500 text-black hover:bg-amber-400" onClick={onClose}>
              Apply & Close <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
