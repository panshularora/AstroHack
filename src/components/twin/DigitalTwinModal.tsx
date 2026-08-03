import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Sparkles, Brain, Target, Cpu, Activity, Zap
} from "lucide-react"
import { mockUser, mockMemoryStats, mockReminders } from "@/lib/mock-data"

interface DigitalTwinModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DigitalTwinModal({ isOpen, onClose }: DigitalTwinModalProps) {
  const [activeTab, setActiveTab] = useState<"personality" | "goals" | "memory">("personality")
  
  const [scores, setScores] = useState<number[]>([94, 86, 90, 88])

  if (!isOpen) return null

  const personalityVectors = [
    { name: "Leadership Drive & Vision", color: "bg-amber-500 text-black", desc: "Driven by Sun in Leo & Jupiter 10th house transit." },
    { name: "Emotional Resilience", color: "bg-emerald-500 text-black", desc: "Elevated through daily Venus Beej Mantra remedy routines." },
    { name: "Strategic Timing & Patience", color: "bg-cyan-400 text-black", desc: "Refined over 14 consultations with Guruji Vikram Sharma." },
    { name: "Intuition & Subconscious Clarity", color: "bg-blue-400 text-black", desc: "Scorpio Ascendant & active Rahu Mahadasha placement." }
  ]

  const twinInsights = [
    { title: "Career Timing Optimization", text: "Your Digital Twin identifies a 92% compatibility with tech leadership roles during August's Jupiter trine." },
    { title: "Remedy Consistency Impact", text: "Completing 11 days of Venus Beej Mantra has improved your stress resilience metrics by +24%." },
    { title: "Astrologer Affinity Match", text: "Strongest resonance detected with Guruji Vikram Sharma (Vedic Transits) & Elena Rostova (Finance)." }
  ]

  const handleScoreChange = (index: number, val: number) => {
    setScores(prev => {
      const next = [...prev]
      next[index] = val
      return next
    })
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-[#090A0F] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Cpu className="w-5 h-5 text-cyan-300 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Personal Digital Twin <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                </h2>
                <p className="text-xs font-mono text-[#9CA3AF]">
                  Living persona model evolving from 14 consultations, 15 predictions & daily remedies
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

          {/* Living Persona Twin Header Card */}
          <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-6 shrink-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={mockUser.avatar} alt={mockUser.name} className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover shadow-xl" />
                  <div className="absolute -bottom-1 -right-1 bg-cyan-500 p-1 rounded-full text-black border border-white/20">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{mockUser.name}'s Digital Twin</h3>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      100% Synced
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#9CA3AF] mt-0.5">
                    Sun in Leo · Scorpio Ascendant · Moon in 10th House · Lahiri Ayanamsha
                  </p>
                </div>
              </div>

              <div className="flex gap-3 text-center font-mono border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                <div className="px-3 py-1 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-base font-extrabold text-cyan-400 block">{mockMemoryStats.totalConsultations}</span>
                  <span className="text-[9px] text-[#9CA3AF] uppercase font-bold">Sessions</span>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-base font-extrabold text-amber-400 block">{mockMemoryStats.verifiedAccurate}</span>
                  <span className="text-[9px] text-[#9CA3AF] uppercase font-bold">Verified</span>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-base font-extrabold text-emerald-400 block">84 / 100</span>
                  <span className="text-[9px] text-[#9CA3AF] uppercase font-bold">Clarity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 mb-6 shrink-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab("personality")}
              className={`pb-3 px-4 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === "personality"
                  ? "border-cyan-400 text-white"
                  : "border-transparent text-[#9CA3AF] hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-400" /> Interactive Vector Tuning
            </button>
            <button
              onClick={() => setActiveTab("goals")}
              className={`pb-3 px-4 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === "goals"
                  ? "border-cyan-400 text-white"
                  : "border-transparent text-[#9CA3AF] hover:text-white"
              }`}
            >
              <Target className="w-4 h-4 text-amber-400" /> Life Goals & Habits
            </button>
            <button
              onClick={() => setActiveTab("memory")}
              className={`pb-3 px-4 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === "memory"
                  ? "border-cyan-400 text-white"
                  : "border-transparent text-[#9CA3AF] hover:text-white"
              }`}
            >
              <Brain className="w-4 h-4 text-emerald-400" /> Memory Timeline
            </button>
          </div>

          {/* Tab 1: Interactive Personality Vectors */}
          {activeTab === "personality" && (
            <div className="space-y-6 overflow-y-auto pr-1 flex-1">
              <div>
                <label className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">
                  Interactive Astrological Vector Sliders
                </label>
                <div className="space-y-4">
                  {personalityVectors.map((pv, idx) => (
                    <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white">{pv.name}</span>
                        <span className={`font-mono font-extrabold px-2.5 py-0.5 rounded-full text-xs ${pv.color}`}>
                          {scores[idx]}%
                        </span>
                      </div>

                      {/* Real Interactive Slider */}
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={scores[idx]}
                        onChange={e => handleScoreChange(idx, parseInt(e.target.value))}
                        className="w-full accent-cyan-400 bg-white/10 h-2 rounded-lg cursor-pointer"
                      />

                      <p className="text-[11px] text-[#9CA3AF] font-mono">{pv.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">
                  Digital Twin Personalized Recommendations
                </label>
                <div className="space-y-2">
                  {twinInsights.map((ti, idx) => (
                    <div key={idx} className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{ti.title}</h4>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{ti.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Life Goals & Habits */}
          {activeTab === "goals" && (
            <div className="space-y-6 overflow-y-auto pr-1 flex-1">
              <div>
                <label className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">
                  Active Life Goals (Tracked by Digital Twin)
                </label>
                <div className="space-y-3">
                  {[
                    { goal: "VP / Tech Lead Career Transition", progress: 88, status: "Active Window in 3 Days", color: "text-emerald-400" },
                    { goal: "Financial Investment Bonus Realization", progress: 100, status: "Verified Accurate (May 15)", color: "text-amber-400" },
                    { goal: "Synastry Relationship Milestones", progress: 75, status: "Tracking Smoothly", color: "text-cyan-400" },
                  ].map((g, idx) => (
                    <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-4 font-mono">
                      <div>
                        <h4 className="text-xs font-bold text-white">{g.goal}</h4>
                        <span className={`text-[10px] font-semibold ${g.color}`}>{g.status}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-extrabold text-white">{g.progress}%</span>
                        <span className="text-[9px] text-[#9CA3AF] block font-bold">Progress</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">
                  Active Remedy & Habit Loops
                </label>
                <div className="space-y-2 font-mono">
                  {mockReminders.slice(0, 2).map(r => (
                    <div key={r.id} className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">{r.title}</h4>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{r.description}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                        {r.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Memory Evolution Timeline */}
          {activeTab === "memory" && (
            <div className="space-y-4 overflow-y-auto pr-1 flex-1 font-mono">
              <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider block mb-2">
                Digital Twin Learning Timeline
              </label>
              {[
                { date: "May 2, 2026", title: "Twin Ingested Session #12 (Elena Rostova)", learn: "Learned Saturn financial risk tolerance & investment bonus window." },
                { date: "June 10, 2026", title: "Twin Ingested Session #13 (Marcus Thorne)", learn: "Updated synastry compatibility model for Leo + Aries partnership." },
                { date: "July 15, 2026", title: "Twin Ingested Session #14 (Guruji Vikram Sharma)", learn: "Integrated Rahu Mahadasha tech VP leadership prediction (88% confidence)." },
              ].map((m, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0">
                    {idx + 12}
                  </div>
                  <div>
                    <span className="text-[10px] text-cyan-400">{m.date}</span>
                    <h4 className="text-xs font-bold text-white mt-0.5">{m.title}</h4>
                    <p className="text-xs text-[#9CA3AF] mt-1 italic">"{m.learn}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Bar */}
          <div className="border-t border-white/10 pt-4 mt-6 flex justify-between items-center shrink-0 font-mono text-xs text-[#9CA3AF]">
            <span>Digital Twin updates automatically after every consultation & journal entry</span>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-cyan-400 text-black font-extrabold rounded-xl text-xs transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              Sync Twin Profile
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
