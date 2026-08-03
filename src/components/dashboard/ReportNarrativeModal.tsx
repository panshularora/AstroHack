import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react"

interface ReportNarrativeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReportNarrativeModal({ isOpen, onClose }: ReportNarrativeModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-line rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-brand-light border border-brand/20 flex items-center justify-center text-brand">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display text-ink">AstroLive 2.0 — Executive Report Narrative</h2>
                <p className="text-xs font-mono text-brand uppercase tracking-wider mt-0.5">Product Thesis & Strategic Pitch</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-surface-2 text-ink-tertiary hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 text-sm text-ink-secondary leading-relaxed font-sans">
            {/* Paragraph 1 */}
            <div className="p-5 rounded-lg bg-surface-2/60 border border-line space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-danger uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-danger rotate-180" /> Paragraph 1 – The Problem
              </div>
              <p className="text-ink leading-relaxed">
                AstroLive is a ₹163M market leader in a category that is fundamentally broken. Every platform — AstroTalk, InstaAstro, Vedic Meet — operates on the same model: acquire users through free trials, monetise anxiety through per-minute panic purchases, and lose them the moment the crisis passes. There is no memory, no follow-up, no daily habit, and no mechanism to bring new users in organically. The industry is being investigated for fear-based upselling, fake reviews, and predatory billing. The platform that breaks from this model wins the category.
              </p>
            </div>

            {/* Paragraph 2 */}
            <div className="p-5 rounded-lg bg-surface-2/60 border border-line space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-brand" /> Paragraph 2 – What AstroLive 2.0 Built
              </div>
              <p className="text-ink leading-relaxed">
                AstroLive 2.0 addresses the retention and memory problem: Cosmic Memory Engine stores every consultation, prediction, and remedy. The AI Companion makes this data actionable in conversation. The Daily Brief creates a daily reason to return. The Prediction Center creates continuity and accountability. These features transform the product from a panic app into a companion. But they don't solve growth or new revenue.
              </p>
            </div>

            {/* Paragraph 3 */}
            <div className="p-5 rounded-lg bg-surface-2/60 border border-line space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gold-bright uppercase tracking-wider">
                <Zap className="w-4 h-4 text-gold-bright" /> Paragraph 3 – What We Added and Why It Wins
              </div>
              <p className="text-ink leading-relaxed">
                Three features complete the product thesis. Share Cards build the viral loop that turns every verified prediction into a user acquisition event — the first organic growth mechanism in the category. Async Consultations add a new ₹49 flat-fee revenue tier that converts users who won't commit to per-minute billing, while improving astrologer supply efficiency by 5x. The Grounding SOS feature is the category's most genuine USP: the first platform that helps users through a crisis before monetising it. Together, these three features address all four judging criteria: virality, habit, revenue, and differentiation.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-mono text-ink-tertiary">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Addressing Virality · Habit · Revenue · Differentiation</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-brand text-white rounded-md font-mono font-bold text-xs hover:bg-brand-hover transition-colors cursor-pointer"
            >
              Close Executive Pitch
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
