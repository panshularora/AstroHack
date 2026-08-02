import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, ArrowLeft, Star, Shield, Compass, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockAstrologers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const concerns = [
  { id: "career", label: "Career & Tech Growth", icon: "💼", detail: "Jupiter 10th House transit focus" },
  { id: "relationships", label: "Synastry & Marriage", icon: "💍", detail: "Kundli Matching & 7th House" },
  { id: "finance", label: "Wealth & Investment", icon: "📈", detail: "Rahu Mahadasha financial timing" },
  { id: "health", label: "Vitality & Energy", icon: "🌿", detail: "Ayurvedic planetary alignment" },
  { id: "education", label: "Higher Studies & Abroad", icon: "🎓", detail: "9th House & Mercury strength" },
  { id: "spirituality", label: "Life Path & Karma", icon: "☸️", detail: "Saturn Sade Sati & Moksha" },
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
  const navigate = useNavigate()

  const matches = mockAstrologers

  return (
    <div className="page-container max-w-4xl pb-28">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-10 border-b border-line/60 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
            <Compass className="w-4 h-4 text-brand" />
          </div>
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">AI Smart Matcher</p>
        </div>
        <h1 className="text-h1 font-display text-ink tracking-tight">Match with Verified Vedic Experts</h1>
        <p className="text-sm text-ink-secondary mt-1">Algorithmic matching based on your birth chart transits, Dasha cycles, and specific life questions.</p>
      </div>

      {/* ── Progress Indicator ─────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-10">
        {["1. Select Focus", "2. Choose Format", "3. Verified Matches"].map((label, idx) => (
          <div key={label} className="flex-1 space-y-1.5">
            <div className={cn("h-1 rounded-sm transition-all duration-300", idx <= step ? "bg-brand" : "bg-surface-3")} />
            <p className={cn("text-[11px] font-mono font-semibold", idx <= step ? "text-ink" : "text-ink-tertiary")}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Steps ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-h2 font-display text-ink">What is your primary consultation focus?</h2>
                <p className="text-caption mt-1">We align your selection with active transits in Arjun's Kundli.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {concerns.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setConcern(c.id)}
                    className={cn(
                      "p-5 rounded-lg border cursor-pointer transition-all duration-150 relative space-y-2",
                      concern === c.id
                        ? "border-brand bg-surface-2 text-ink shadow-md"
                        : "border-line bg-surface/50 text-ink-secondary hover:border-line-strong hover:bg-surface-2/40"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{c.icon}</span>
                      {concern === c.id && <CheckCircle2 className="w-4 h-4 text-brand" />}
                    </div>
                    <p className="text-body-sm font-bold text-ink">{c.label}</p>
                    <p className="text-xs font-mono text-ink-tertiary">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-h2 font-display text-ink">Select your preferred session depth</h2>
                <p className="text-caption mt-1">All sessions include audio recording and verified transcript in Cosmic Memory.</p>
              </div>

              <div className="space-y-4">
                {budgets.map(b => (
                  <div
                    key={b.id}
                    onClick={() => setBudget(b.id)}
                    className={cn(
                      "p-5 rounded-lg border cursor-pointer transition-all duration-150 flex items-center justify-between",
                      budget === b.id
                        ? "border-brand bg-surface-2 text-ink shadow-md"
                        : "border-line bg-surface/50 text-ink-secondary hover:border-line-strong hover:bg-surface-2/40"
                    )}
                  >
                    <div>
                      <p className="text-body-sm font-bold text-ink font-mono">{b.label}</p>
                      <p className="text-caption mt-1">{b.detail}</p>
                    </div>
                    {budget === b.id && <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-h2 font-display text-ink">Top Verified Astrologer Matches</h2>
                <p className="text-caption mt-1">Calculated from 94%+ verified accuracy records and Dasha compatibility.</p>
              </div>

              <div className="space-y-4">
                {matches.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => navigate(`/app/astrologer/${a.id}`)}
                    className="p-5 rounded-lg bg-surface border border-line hover:border-brand/40 shadow-xs transition-all duration-150 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md bg-surface-2 border border-brand/30 text-brand flex items-center justify-center font-mono font-bold text-sm shrink-0">
                        {a.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-body font-bold text-ink">{a.name}</p>
                          {a.trustScore >= 95 && <Shield className="w-4 h-4 text-success shrink-0" />}
                        </div>
                        <p className="text-caption mt-0.5">{a.specialties.join(" · ")} · {a.yearsExperience}y experience</p>
                        <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                          <span className="text-gold-bright font-bold flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-gold-bright text-gold-bright" /> {a.rating}
                          </span>
                          <span className="text-ink-tertiary">({a.consultationCount} sessions)</span>
                          <Badge variant="success" size="sm">{a.verifiedAccuracy}% Accuracy</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-line/60">
                      <div className="text-right">
                        <p className="text-base font-bold font-mono text-ink">₹{a.pricePerMinute * 45}</p>
                        <p className="text-[10px] font-mono text-ink-tertiary">45 min session</p>
                      </div>
                      <Button size="sm" className="font-mono font-bold" onClick={e => { e.stopPropagation(); navigate(`/app/room/${a.id}`) }}>
                        Connect Live Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Navigation Buttons ──────────────────────────────────── */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-line/60">
        {step > 0 ? (
          <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        ) : <div />}

        {step < 2 ? (
          <Button size="sm" onClick={() => setStep(step + 1)}>
            View Verified Matches <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={() => navigate("/app/verified")}>
            Browse All Astrologers
          </Button>
        )}
      </div>
    </div>
  )
}