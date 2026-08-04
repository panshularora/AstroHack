import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, ArrowLeft, Star, Shield, Compass, CheckCircle2, Zap, Briefcase, Heart, TrendingUp, Activity, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { AsyncConsultationModal } from "@/components/consultation/AsyncConsultationModal"
import { mockAstrologers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useUser } from "@/context/UserContext"

const concerns = [
  { id: "career", label: "Career & Tech Growth", icon: Briefcase, detail: "Jupiter 10th House transit focus" },
  { id: "relationships", label: "Synastry & Marriage", icon: Heart, detail: "Kundli Matching & 7th House" },
  { id: "finance", label: "Wealth & Investment", icon: TrendingUp, detail: "Rahu Mahadasha financial timing" },
  { id: "health", label: "Vitality & Energy", icon: Activity, detail: "Ayurvedic planetary alignment" },
  { id: "education", label: "Higher Studies & Abroad", icon: GraduationCap, detail: "9th House & Mercury strength" },
  { id: "spirituality", label: "Life Path & Karma", icon: Compass, detail: "Saturn Sade Sati & Moksha" },
]

const budgets = [
  { id: "b1", label: "₹500 – ₹1,500 / session", detail: "Standard Consultation (20 mins)" },
  { id: "b2", label: "₹1,500 – ₹3,000 / session", detail: "Deep Transit & Dasha Reading (45 mins)" },
  { id: "b3", label: "₹3,000 – ₹5,000 / session", detail: "Comprehensive Life Chart & Remedies (60 mins)" },
]

export function SmartMatch() {
  const [step, setStep] = useState(0)
  const [concern, setConcern] = useState("career")
  const [budget, setBudget] = useState("b2")
  const [asyncModalOpen, setAsyncModalOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useUser()

  const matches = mockAstrologers

  return (
    <div className="page-container max-w-4xl pb-28 font-sans">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-10 border-b border-white/10 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 font-mono text-[11px] text-[#9CA3AF] hover:text-white transition-colors mb-5 group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-display text-white">36 Gunas Astrologer Matchmaker</h1>
              <Badge variant="gold" size="sm" className="font-mono">Vedic Matching</Badge>
            </div>
            <p className="text-xs font-mono text-[#9CA3AF] mt-1">
              Select your consultation focus to match with top 1% verified astrologers.
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="rounded-xl border-amber-500/30 text-amber-300 font-mono text-xs hover:bg-amber-500/10 cursor-pointer"
            onClick={() => setAsyncModalOpen(true)}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 mr-1" /> Ask Async Query (₹300)
          </Button>
        </div>
      </div>

      {/* ── Progress Indicator ──────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {["1. Select Focus", "2. Session Depth", "3. Verified Matches"].map((label, idx) => (
          <div key={label} className="flex-1 space-y-1.5">
            <div className={cn("h-1 rounded-full transition-all duration-300", idx <= step ? "bg-amber-500" : "bg-white/10")} />
            <p className={cn("text-[11px] font-mono font-semibold", idx <= step ? "text-white" : "text-[#9CA3AF]")}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Steps ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">What is your primary consultation focus?</h2>
                <p className="text-xs text-[#9CA3AF] font-mono mt-1">We align your selection with active transits in {user.name}'s Kundli.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {concerns.map(c => {
                  const IconComp = c.icon
                  const isSelected = concern === c.id
                  return (
                    <div
                      key={c.id}
                      onClick={() => setConcern(c.id)}
                      className={cn(
                        "p-5 rounded-2xl border cursor-pointer transition-all duration-150 relative space-y-3",
                        isSelected
                          ? "border-amber-500 bg-white/10 text-white shadow-xl"
                          : "border-white/10 bg-[#090A0F]/80 text-[#9CA3AF] hover:border-white/20 hover:text-white"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border", isSelected ? "bg-amber-500/20 border-amber-400 text-amber-300" : "bg-white/5 border-white/10 text-[#9CA3AF]")}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{c.label}</p>
                        <p className="text-xs font-mono text-[#9CA3AF] mt-0.5">{c.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Select your preferred session depth</h2>
                <p className="text-xs text-[#9CA3AF] font-mono mt-1">All sessions include audio recording and verified notes in Past Consultations Archive.</p>
              </div>

              <div className="space-y-4">
                {budgets.map(b => (
                  <div
                    key={b.id}
                    onClick={() => setBudget(b.id)}
                    className={cn(
                      "p-5 rounded-2xl border cursor-pointer transition-all duration-150 flex items-center justify-between",
                      budget === b.id
                        ? "border-amber-500 bg-white/10 text-white shadow-xl"
                        : "border-white/10 bg-[#090A0F]/80 text-[#9CA3AF] hover:border-white/20 hover:text-white"
                    )}
                  >
                    <div>
                      <p className="text-sm font-bold text-white font-mono">{b.label}</p>
                      <p className="text-xs font-mono text-[#9CA3AF] mt-0.5">{b.detail}</p>
                    </div>
                    {budget === b.id && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Top Verified Astrologer Matches</h2>
                <p className="text-xs text-[#9CA3AF] font-mono mt-1">Calculated from 94%+ verified accuracy records and Dasha compatibility.</p>
              </div>

              <div className="space-y-4">
                {matches.map((a) => (
                  <div key={a.id} className="p-5 rounded-2xl bg-[#090A0F] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={a.avatar} alt={a.name} className="w-14 h-14 rounded-2xl object-cover border border-amber-500/30" />
                      <div>
                        <h3 className="text-sm font-bold text-white">{a.name}</h3>
                        <p className="text-xs font-mono text-amber-400">{a.specialty}</p>
                        <p className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">{a.experienceYears} Years Exp · {a.rating} ★ ({a.reviewCount} reviews)</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl font-mono text-xs" onClick={() => navigate(`/app/astrologer/${a.id}`)}>
                      Book Session
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Footer Navigation Controls ─────────────────────────── */}
      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep(prev => prev - 1)}
          disabled={step === 0}
          className="rounded-xl border-white/10 text-white font-mono text-xs"
        >
          Previous Step
        </Button>

        {step < 2 ? (
          <Button
            size="sm"
            onClick={() => setStep(prev => prev + 1)}
            className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl font-mono text-xs"
          >
            Next Step <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => navigate("/app/dashboard")}
            className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl font-mono text-xs"
          >
            Return to Dashboard
          </Button>
        )}
      </div>

      <AsyncConsultationModal
        isOpen={asyncModalOpen}
        onClose={() => setAsyncModalOpen(false)}
      />
    </div>
  )
}