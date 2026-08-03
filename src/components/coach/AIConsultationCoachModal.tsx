import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Sparkles, Brain, Target, CheckCircle2, ShieldCheck, Copy, Check, ListOrdered, Bell
} from "lucide-react"
import { mockVerifiedAstrologers, mockConsultations } from "@/lib/mock-data"

interface AIConsultationCoachProps {
  isOpen: boolean
  onClose: () => void
  astrologerId?: string
}

export function AIConsultationCoachModal({ isOpen, onClose, astrologerId }: AIConsultationCoachProps) {
  const [activeTab, setActiveTab] = useState<"pre" | "post">("pre")
  const [copiedAgenda, setCopiedAgenda] = useState(false)
  const [syncedReminders, setSyncedReminders] = useState(false)

  const selectedAstro = mockVerifiedAstrologers.find(a => a.id === astrologerId) || mockVerifiedAstrologers[0]
  const lastConsultation = mockConsultations[0]

  if (!isOpen) return null

  const suggestedQuestions = [
    "How does the upcoming Rahu Mahadasha transition impact my salary negotiation window between Aug 4 and Aug 15?",
    "What specific transits should I monitor before signing my new Tech Lead offer contract?",
    "Should I extend my Venus Beej Mantra remedy cycle past 21 days to sustain social harmony?",
    "Is my synastry alignment with my partner favorable for joint investment during Q4?"
  ]

  const preAgenda = [
    { num: 1, topic: "Jupiter 10th House Career Transit", notes: "Review timing strategy for Tech VP/Lead offer window." },
    { num: 2, topic: "Unresolved Gap from July 15 Session", notes: "Clarify equity vesting terms & corporate relocation timing." },
    { num: 3, topic: "Venus Remedy Evaluation", notes: "Assess social clarity improvement after 11 days of Beej Mantra." },
    { num: 4, topic: "Financial Forecast for Q4", notes: "Review Saturn 2nd house placement regarding equity investments." }
  ]

  const postActionPlan = [
    { id: "ap1", step: "Finalize tech offer negotiation during Mercury direct station (Aug 4 – Aug 15).", status: "Priority 1", date: "Aug 15" },
    { id: "ap2", step: "Complete remaining 10 days of Venus Beej Mantra morning routine.", status: "Active Remedy", date: "Aug 10" },
    { id: "ap3", step: "Update LinkedIn & professional resume highlighting corporate lead projects.", status: "Action Item", date: "Aug 08" },
    { id: "ap4", step: "Schedule 30-min monthly check-in with Dr. Sarah Chen.", status: "Follow-up", date: "Aug 25" }
  ]

  const handleCopyAgenda = () => {
    setCopiedAgenda(true)
    setTimeout(() => setCopiedAgenda(false), 2000)
  }

  const handleSyncReminders = () => {
    setSyncedReminders(true)
    setTimeout(() => setSyncedReminders(false), 2500)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-surface border border-line rounded-lg p-6 md:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-lg">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  AI Consultation Coach <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                </h2>
                <p className="text-xs text-[#9CA3AF]">
                  Pre-session briefing, custom agenda generator & post-session action plan engine
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-surface-3 flex items-center justify-center text-[#9CA3AF] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Controls */}
          <div className="flex border-b border-line/60 mb-6 shrink-0">
            <button
              onClick={() => setActiveTab("pre")}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
                activeTab === "pre"
                  ? "border-brand text-white"
                  : "border-transparent text-[#9CA3AF] hover:text-white"
              }`}
            >
              <ListOrdered className="w-4 h-4 text-brand" /> Pre-Session Briefing & Agenda
            </button>
            <button
              onClick={() => setActiveTab("post")}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
                activeTab === "post"
                  ? "border-brand text-white"
                  : "border-transparent text-[#9CA3AF] hover:text-white"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Post-Session Action Plan & Reminders
            </button>
          </div>

          {/* Tab 1: Pre-Session Briefing */}
          {activeTab === "pre" && (
            <div className="space-y-6 overflow-y-auto pr-1 flex-1">
              {/* Target Astrologer Brief */}
              <div className="p-4 bg-surface-2 border border-line/60 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedAstro.avatar} alt={selectedAstro.name} className="w-12 h-12 rounded-full border border-line object-cover" />
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Upcoming Session with {selectedAstro.name} <ShieldCheck className="w-4 h-4 text-brand" />
                    </h3>
                    <p className="text-xs text-[#9CA3AF]">
                      {selectedAstro.specialization.join(" · ")} · {selectedAstro.accuracy}% Verified Accuracy
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                  Instant Prep Ready
                </span>
              </div>

              {/* Active Prediction Highlight */}
              <div className="p-4 bg-brand-light border border-brand/20 rounded-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider mb-1">
                  <Target className="w-4 h-4" /> Target Prediction Focus
                </div>
                <p className="text-sm font-bold text-white">Job Offer in Tech Sector (88% confidence)</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Target Window: Late August 2026 (Opening in 3 days)</p>
              </div>

              {/* AI Suggested Questions */}
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">
                  AI Suggested Questions for {selectedAstro.name}
                </label>
                <div className="space-y-2">
                  {suggestedQuestions.map((q, idx) => (
                    <div key={idx} className="p-3 bg-surface-2 border border-line/60 rounded-xl flex items-start gap-2 text-xs text-white/90">
                      <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Agenda */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                    Generated Personalized Consultation Agenda
                  </label>
                  <button
                    onClick={handleCopyAgenda}
                    className="text-xs text-brand font-bold hover:text-ink-secondary flex items-center gap-1 cursor-pointer"
                  >
                    {copiedAgenda ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedAgenda ? "Agenda Copied!" : "Copy Agenda for Session"}
                  </button>
                </div>

                <div className="space-y-2">
                  {preAgenda.map(item => (
                    <div key={item.num} className="p-3.5 bg-surface-2 border border-line/60 rounded-xl flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center text-xs font-bold text-brand shrink-0">
                        {item.num}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.topic}</h4>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{item.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Post-Session Action Plan */}
          {activeTab === "post" && (
            <div className="space-y-6 overflow-y-auto pr-1 flex-1">
              {/* Post-Session Summary Card */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Completed Session Synthesis
                  </span>
                  <h3 className="text-base font-bold text-white">{lastConsultation.topic}</h3>
                  <p className="text-xs text-[#9CA3AF]">With {lastConsultation.astrologerName} · July 15, 2026</p>
                </div>
                <button
                  onClick={handleSyncReminders}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  {syncedReminders ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  {syncedReminders ? "Reminders Synced!" : "Sync to Calendar & Reminders"}
                </button>
              </div>

              {/* Prioritized Action Plan */}
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">
                  Prioritized Action Plan
                </label>
                <div className="space-y-3">
                  {postActionPlan.map(a => (
                    <div key={a.id} className="p-4 bg-surface-2 border border-line/60 rounded-lg flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-white">{a.step}</p>
                          <span className="text-[10px] text-[#9CA3AF]">Target Completion: {a.date}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-brand/20 text-ink-secondary border border-brand/30 shrink-0">
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Follow-up */}
              <div className="p-4 bg-surface-2 border border-line/60 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-1">Recommended Follow-up Schedule</span>
                  <h4 className="text-xs font-bold text-white">Monthly Check-in with Dr. Sarah Chen</h4>
                  <p className="text-xs text-[#9CA3AF]">Optimal Window: August 25, 2026 (During active job offer window)</p>
                </div>
                <button className="px-4 py-2 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-xs transition-colors shadow-md">
                  Book Follow-up
                </button>
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="border-t border-line/60 pt-4 mt-6 flex justify-between items-center shrink-0">
            <span className="text-xs text-[#9CA3AF]">Powered by Arjun's Cosmic Memory & Lahiri Transits</span>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-xs transition-colors shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
