import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, TrendingUp, Cpu, Lightbulb, ShieldCheck, ArrowRight, Brain, Zap, Activity } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

interface AIPatternDiscoveryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AIPatternDiscoveryModal({ isOpen, onClose }: AIPatternDiscoveryModalProps) {
  if (!isOpen) return null

  const patterns = [
    {
      id: "pat-1",
      title: "Career Promotion & Jupiter 10th House Correlation",
      correlation: "100% Match (3/3 Cycles)",
      impact: "+88% Promotion Probability",
      type: "Career & Leadership",
      badge: "Highest Confidence",
      description: "AI synthesized your past 5 years of consultation logs and verified career milestones. All major job switches and salary bumps (2022, 2024, 2026) occurred within 18 days of Jupiter entering your 10th House (Sun Trine).",
      dataPoints: [
        { date: "Oct 2022", event: "Senior Dev Offer", transit: "Jupiter 10th House" },
        { date: "Nov 2024", event: "Lead Architect Promotion", transit: "Jupiter Trine Sun" },
        { date: "Aug 2026", event: "Executive Offer Window", transit: "Jupiter Direct Transit" }
      ],
      aiAction: "Recommendation: Lock executive contract negotiations between Aug 20–25."
    },
    {
      id: "pat-2",
      title: "Relationship Stress Spikes During Mercury Retrograde",
      correlation: "3.2x Multiplier",
      impact: "High Vulnerability",
      type: "Emotional Dynamics",
      badge: "Cautionary Pattern",
      description: "Cross-referencing your private journal sentiment scores with astronomical ephemeris data reveals that interpersonal friction increases 3.2x during Mercury Retrograde in Scorpio.",
      dataPoints: [
        { date: "Mar 2025", event: "Synastry Friction", transit: "Mercury Retrograde" },
        { date: "Jul 2025", event: "Communication Gap", transit: "Mercury Shadow Phase" }
      ],
      aiAction: "Recommendation: Delay critical relationship conversations until Mercury stations direct."
    },
    {
      id: "pat-3",
      title: "Venus Beej Mantra & Mental Clarity Jump",
      correlation: "+42% Score Growth",
      impact: "Sustained High Performance",
      type: "Spiritual Remedies",
      badge: "Habit Win",
      description: "Your daily energy alignment score jumps from 64 to 92 whenever your Venus Beej Mantra streak exceeds 10 consecutive days at sunrise.",
      dataPoints: [
        { date: "Current", event: "Day 11 Streak", transit: "Venus 12th House Balance" }
      ],
      aiAction: "Recommendation: Maintain current 21-day practice for maximum decision speed."
    }
  ]

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
              <div className="w-10 h-10 rounded-md bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-display text-ink">AI Proactive Pattern Discovery Engine</h2>
                  <Badge variant="brand" size="sm" className="font-mono">Unasked Insights</Badge>
                </div>
                <p className="text-xs font-mono text-ink-tertiary mt-0.5">
                  Proactively uncovering unasked correlations between transits, decisions, & outcomes
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-surface-2 text-ink-tertiary hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner Explanation */}
          <div className="p-4 rounded-md bg-brand-light border border-brand/20 flex items-start gap-3 text-xs text-ink-secondary">
            <Sparkles className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-ink block mb-0.5">Autonomous Life Intelligence</span>
              Instead of waiting for you to ask questions, AstroLive 2.0 constantly scans your natal Kundli transits, decision history, and mood logs to discover deep structural patterns in your life.
            </div>
          </div>

          {/* Patterns List */}
          <div className="space-y-4">
            {patterns.map((p) => (
              <div key={p.id} className="p-5 rounded-lg bg-surface-2/60 border border-line space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-ink">{p.title}</h3>
                      <Badge variant="gold" size="sm" className="font-mono">{p.badge}</Badge>
                    </div>
                    <p className="text-[11px] font-mono text-ink-tertiary">{p.type} · Correlation: {p.correlation}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shrink-0">
                    {p.impact}
                  </span>
                </div>

                <p className="text-xs text-ink-secondary leading-relaxed font-sans">{p.description}</p>

                {/* Micro Data Points Table */}
                <div className="p-3 rounded bg-surface border border-line/60 space-y-2 font-mono text-[11px]">
                  <span className="text-[10px] text-ink-tertiary uppercase font-bold block mb-1">Historical Evidence Log</span>
                  <div className="grid grid-cols-3 gap-2 text-ink-secondary">
                    {p.dataPoints.map((dp, idx) => (
                      <div key={idx} className="p-2 rounded bg-surface-2/40 border border-line/40 space-y-0.5">
                        <span className="text-gold-bright font-bold block">{dp.date}</span>
                        <span className="text-ink font-semibold block truncate">{dp.event}</span>
                        <span className="text-[9px] text-ink-tertiary block truncate">{dp.transit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Actionable Guidance */}
                <div className="p-3 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-purple-300 font-semibold">{p.aiAction}</span>
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-line/60 flex items-center justify-between font-mono text-xs text-ink-tertiary">
            <span>Scanning 4,120 celestial transit data points...</span>
            <Button size="sm" className="rounded-md font-mono" onClick={onClose}>
              Acknowledge Patterns <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
