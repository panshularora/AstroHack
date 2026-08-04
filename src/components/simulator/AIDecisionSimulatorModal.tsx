import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Brain, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw, Scale, Plus
} from "lucide-react"

interface AIDecisionSimulatorProps {
  isOpen: boolean
  onClose: () => void
}

export function AIDecisionSimulatorModal({ isOpen, onClose }: AIDecisionSimulatorProps) {
  const [selectedPreset, setSelectedPreset] = useState<number>(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [customInput, setCustomInput] = useState("")

  const [presets, setPresets] = useState([
    {
      title: "Career Pivot: Accept Tech Lead Offer vs Stay & Upskill",
      optionA: {
        title: "Option A: Accept VP / Lead Offer at Tech Corp",
        score: 92,
        badge: "Strong Cosmic Alignment",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        transitImpact: "Jupiter transiting 10th house directly aligns with this move (Aug 20 – 25 window).",
        memoryEvidence: "Consultation with Guruji Vikram Sharma (July 15) predicted an 88% confidence tech offer.",
        predictions: ["Job Offer in Tech Sector (88% confidence)"],
        opportunities: [
          "High professional visibility & salary expansion",
          "Rahu Mahadasha cycle favors tech innovation"
        ],
        risks: [
          "Initial workload strain during Mercury direct station in early August"
        ],
        recommendedAction: "Proceed with final offer negotiation between Aug 20 and Aug 25 after Mercury station."
      },
      optionB: {
        title: "Option B: Stay at Current Firm & Request Promotion",
        score: 64,
        badge: "Moderate Friction Window",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        transitImpact: "Saturn return placement creates continued friction in current management structure.",
        memoryEvidence: "Guruji Vikram Sharma noted mid-level delays in current firm's structural hierarchy.",
        predictions: ["Career advancement delayed past Q4"],
        opportunities: [
          "Familiar environment & stable daily routine"
        ],
        risks: [
          "Missed Jupiter 10th house peak transition window",
          "Increased burnout during upcoming Mars transit"
        ],
        recommendedAction: "Use as backup leverage if Option A negotiation stalls."
      }
    },
    {
      title: "Finance & Wealth: Re-invest Bonus vs Real Estate Fund",
      optionA: {
        title: "Option A: Re-invest Earnings into High-Growth Equity",
        score: 88,
        badge: "Favorable Wealth Transit",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        transitImpact: "Venus & Mercury alignment in 11th house of gains favors equity markets.",
        memoryEvidence: "Financial reading with Elena Rostova (May 2) verified investment returns bonus.",
        predictions: ["Financial breakthrough via investment (94% confidence)"],
        opportunities: [
          "Compounded growth during late Q3 market transit"
        ],
        risks: [
          "Short-term volatility during August retrograde period"
        ],
        recommendedAction: "Deploy capital systematically across 3 tranches in August."
      },
      optionB: {
        title: "Option B: Lock Funds into Physical Real Estate Deposit",
        score: 72,
        badge: "Delayed Maturity Window",
        badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        transitImpact: "Saturn 4th house aspect slows real estate transaction speed.",
        memoryEvidence: "Elena Rostova advised against immediate real estate locking before Q4.",
        predictions: ["Real estate valuation peak expected late 2027"],
        opportunities: [
          "Long-term capital security"
        ],
        risks: [
          "Illiquidity during upcoming tech career transition"
        ],
        recommendedAction: "Postpone real estate deposit until November 2026."
      }
    }
  ])

  const currentScenario = presets[selectedPreset]

  const handleSimulateNew = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
    }, 1200)
  }

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customInput.trim()) return

    setIsSimulating(true)
    setTimeout(() => {
      const newScenario = {
        title: `Custom: ${customInput}`,
        optionA: {
          title: `Option A: ${customInput}`,
          score: 89,
          badge: "High Cosmic Synergy",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          transitImpact: "Active Leo Sun & 10th House Jupiter Trine boosts success likelihood.",
          memoryEvidence: `Custom simulation aligned with Arjun's natal Dasha calculations.`,
          predictions: [`Positive outcome for "${customInput}"`],
          opportunities: ["Accelerated personal growth", "Favorable planetary window"],
          risks: ["Requires disciplined execution"],
          recommendedAction: "Proceed within the current transit aperture."
        },
        optionB: {
          title: `Option B: Maintain Current Status Quo`,
          score: 58,
          badge: "Stagnant Transit",
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          transitImpact: "Passing up the transit aperture delays momentum.",
          memoryEvidence: `Delaying choices misses the 120° Sun trine.`,
          predictions: ["Delayed outcome"],
          opportunities: ["Low immediate effort"],
          risks: ["Opportunity cost"],
          recommendedAction: "Re-evaluate during the next cycle."
        }
      }
      setPresets(prev => [newScenario, ...prev])
      setSelectedPreset(0)
      setCustomInput("")
      setIsSimulating(false)
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-[#090A0F] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-lg">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  AI Decision Simulator <Scale className="w-4 h-4 text-amber-400" />
                </h2>
                <p className="text-xs font-mono text-[#9CA3AF]">
                  Side-by-side life choice simulation powered by Arjun's Cosmic Memory & Transits
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Custom Decision Input Bar */}
          <form onSubmit={handleAddCustom} className="mb-6 flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={e => setCustomInput(e.target.value)}
              placeholder="Type any custom life decision (e.g., 'Relocate to London' or 'Launch AI Startup')..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#9CA3AF] focus:outline-none focus:border-amber-500/50 font-sans"
            />
            <button
              type="submit"
              disabled={isSimulating || !customInput.trim()}
              className="px-5 py-2.5 bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl text-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-md shrink-0 font-mono"
            >
              <Plus className="w-4 h-4" /> Simulate Decision
            </button>
          </form>

          {/* Preset Scenario Selector */}
          <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPreset(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedPreset === idx
                      ? "bg-amber-500 text-black shadow-md"
                      : "bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {p.title.slice(0, 28)}...
                </button>
              ))}
            </div>

            <button
              onClick={handleSimulateNew}
              disabled={isSimulating}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin text-amber-400" : ""}`} />
              {isSimulating ? "Calculating Transits..." : "Recalculate Transits"}
            </button>
          </div>

          {/* Side-by-Side Comparative Grid */}
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="grid md:grid-cols-2 gap-6 relative">
              {/* Option A */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${currentScenario.optionA.badgeColor}`}>
                      {currentScenario.optionA.badge}
                    </span>
                    <div className="text-right">
                      <span className="text-3xl font-mono font-extrabold text-white">{currentScenario.optionA.score}%</span>
                      <span className="text-[10px] text-[#9CA3AF] block font-mono font-bold uppercase">Alignment</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{currentScenario.optionA.title}</h3>

                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider block">Planetary Transit Alignment</span>
                    <p className="text-xs text-white/90 leading-relaxed">{currentScenario.optionA.transitImpact}</p>
                  </div>

                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider block">Cosmic Memory Evidence</span>
                    <p className="text-xs text-white/90 leading-relaxed italic">"{currentScenario.optionA.memoryEvidence}"</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">Key Opportunities</span>
                    {currentScenario.optionA.opportunities.map((o, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-red-400 font-mono font-bold uppercase tracking-wider block">Identified Risks</span>
                    {currentScenario.optionA.risks.map((r, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 bg-emerald-500/10 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">Recommended Action</span>
                  <p className="text-xs font-bold text-white">{currentScenario.optionA.recommendedAction}</p>
                </div>
              </div>

              {/* Option B */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between hover:border-amber-500/40 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${currentScenario.optionB.badgeColor}`}>
                      {currentScenario.optionB.badge}
                    </span>
                    <div className="text-right">
                      <span className="text-3xl font-mono font-extrabold text-white">{currentScenario.optionB.score}%</span>
                      <span className="text-[10px] text-[#9CA3AF] block font-mono font-bold uppercase">Alignment</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{currentScenario.optionB.title}</h3>

                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider block">Planetary Transit Alignment</span>
                    <p className="text-xs text-white/90 leading-relaxed">{currentScenario.optionB.transitImpact}</p>
                  </div>

                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider block">Cosmic Memory Evidence</span>
                    <p className="text-xs text-white/90 leading-relaxed italic">"{currentScenario.optionB.memoryEvidence}"</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">Key Opportunities</span>
                    {currentScenario.optionB.opportunities.map((o, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-red-400 font-mono font-bold uppercase tracking-wider block">Identified Risks</span>
                    {currentScenario.optionB.risks.map((r, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 bg-amber-500/10 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">Recommended Action</span>
                  <p className="text-xs font-bold text-white">{currentScenario.optionB.recommendedAction}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="border-t border-white/10 pt-4 mt-6 flex justify-between items-center shrink-0 font-mono text-xs text-[#9CA3AF]">
            <span>Simulated using Arjun's Lahiri Chart, Jupiter Transits & Past 14 Sessions</span>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-amber-500 text-black font-bold rounded-xl text-xs transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              Apply Simulation Insights <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
