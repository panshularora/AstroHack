import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CalendarCheck, Brain, BookOpen, Sparkles, Bell, ShieldCheck, Infinity as InfinityIcon,
  Star, CheckCircle2, Clock, ArrowRight, Zap, TrendingUp, Heart
} from "lucide-react"

/* ─── Step definitions ─────────────────────────────────────────────────── */
const steps = [
  {
    id: "consult",
    number: "01",
    icon: CalendarCheck,
    label: "Book Consultation",
    color: "text-blue-400",
    border: "border-blue-400/40",
    bg: "bg-blue-400/10",
    activeBg: "bg-blue-400/20",
    glow: "shadow-blue-400/30",
    connectorColor: "#60A5FA",
    description: "You choose a verified astrologer based on speciality, accuracy score, and availability. AstroLive records every detail of the booking.",
    artifact: {
      title: "Live Consultation",
      component: "ConsultCard",
    },
  },
  {
    id: "extract",
    number: "02",
    icon: Brain,
    label: "AI Extracts Predictions",
    color: "text-primary",
    border: "border-primary/40",
    bg: "bg-primary/10",
    activeBg: "bg-primary/20",
    glow: "shadow-primary/30",
    connectorColor: "#7C3AED",
    description: "After each session, the AI reads your notes and automatically extracts structured predictions, remedies, and key insights.",
    artifact: {
      title: "AI Extraction",
      component: "PredictionExtract",
    },
  },
  {
    id: "memory",
    number: "03",
    icon: BookOpen,
    label: "Saved to Cosmic Memory",
    color: "text-emerald-400",
    border: "border-emerald-400/40",
    bg: "bg-emerald-400/10",
    activeBg: "bg-emerald-400/20",
    glow: "shadow-emerald-400/30",
    connectorColor: "#34D399",
    description: "Every prediction, remedy, and observation becomes a permanent memory node — searchable, filterable, and cross-referenced with your entire life timeline.",
    artifact: {
      title: "Memory Saved",
      component: "MemoryCard",
    },
  },
  {
    id: "brief",
    number: "04",
    icon: Sparkles,
    label: "Daily Personalized Brief",
    color: "text-gold",
    border: "border-gold/40",
    bg: "bg-gold/10",
    activeBg: "bg-gold/20",
    glow: "shadow-gold/30",
    connectorColor: "#F59E0B",
    description: "Every morning, the AI reads your Cosmic Memory and generates a brief tailored entirely to you — no generic horoscopes.",
    artifact: {
      title: "Today's Brief",
      component: "BriefCard",
    },
  },
  {
    id: "reminders",
    number: "05",
    icon: Bell,
    label: "Smart Follow-Ups",
    color: "text-rose-400",
    border: "border-rose-400/40",
    bg: "bg-rose-400/10",
    activeBg: "bg-rose-400/20",
    glow: "shadow-rose-400/30",
    connectorColor: "#FB7185",
    description: "Predictions don't disappear. AstroLive proactively reminds you as target windows approach and tracks whether each prediction comes true.",
    artifact: {
      title: "Active Reminders",
      component: "ReminderCard",
    },
  },
  {
    id: "trust",
    number: "06",
    icon: ShieldCheck,
    label: "Trust Score Updates",
    color: "text-teal-400",
    border: "border-teal-400/40",
    bg: "bg-teal-400/10",
    activeBg: "bg-teal-400/20",
    glow: "shadow-teal-400/30",
    connectorColor: "#2DD4BF",
    description: "When a prediction resolves, the astrologer's AstroVerified score is updated transparently — creating real accountability powered by real outcomes.",
    artifact: {
      title: "AstroVerified Score",
      component: "TrustCard",
    },
  },
  {
    id: "companion",
    number: "07",
    icon: InfinityIcon,
    label: "Lifelong Companion",
    color: "text-lavender",
    border: "border-lavender/40",
    bg: "bg-lavender/10",
    activeBg: "bg-lavender/20",
    glow: "shadow-lavender/30",
    connectorColor: "#A78BFA",
    description: "The cycle never ends. Every new consultation adds to your memory, improves your AI, sharpens predictions, and deepens your cosmic story.",
    artifact: {
      title: "Your Journey",
      component: "JourneyCard",
    },
  },
]

/* ─── Artifact panels ────────────────────────────────────────────────── */
function ConsultCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-white/5 border border-blue-400/20 rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-primary flex items-center justify-center text-lg font-bold text-white shrink-0">S</div>
        <div>
          <p className="font-bold text-white">Dr. Sarah Chen</p>
          <p className="text-xs text-[#9CA3AF]">Vedic · Career · Transits</p>
        </div>
        <span className="ml-auto text-[10px] font-bold px-2 py-1 bg-green-400/10 border border-green-400/30 text-green-400 rounded-full">Online</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[["Trust Score", "98%", "text-primary"], ["Accuracy", "94%", "text-gold"], ["Consultations", "1,250", "text-blue-400"]].map(([l, v, c]) => (
          <div key={l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className={`text-lg font-bold ${c}`}>{v}</p>
            <p className="text-[10px] text-[#9CA3AF]">{l}</p>
          </div>
        ))}
      </div>
      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-0.5 bg-gradient-to-r from-blue-400 to-primary rounded-full" />
      <p className="text-xs text-[#9CA3AF] text-center">Session booked · 45 min · Career focus</p>
    </div>
  )
}

function PredictionExtract() {
  const predictions = [
    { text: "Job offer in tech sector", timeframe: "Late Aug–Sep", conf: 88, cat: "Career", catColor: "text-blue-400 bg-blue-400/10 border-blue-400/30" },
    { text: "Financial windfall via investment", timeframe: "October", conf: 75, cat: "Finance", catColor: "text-gold bg-gold/10 border-gold/30" },
    { text: "Key relationship opportunity", timeframe: "November", conf: 81, cat: "Relations", catColor: "text-pink-400 bg-pink-400/10 border-pink-400/30" },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-4 h-4 text-primary animate-pulse" />
        <p className="text-xs font-bold text-primary uppercase tracking-wider">AI Extracting from session notes…</p>
      </div>
      {predictions.map((p, i) => (
        <motion.div key={p.text} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.25 }}
          className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
          <Zap className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium">{p.text}</p>
            <p className="text-[10px] text-[#9CA3AF]">{p.timeframe} · {p.conf}% confidence</p>
          </div>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${p.catColor}`}>{p.cat}</span>
        </motion.div>
      ))}
      <div className="flex items-center gap-2 p-3 bg-primary/8 border border-primary/20 rounded-xl">
        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
        <p className="text-[11px] text-white/80">3 predictions + 2 remedies extracted and structured</p>
      </div>
    </div>
  )
}

function MemoryCard() {
  return (
    <div className="space-y-3">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative p-4 bg-emerald-400/5 border border-emerald-400/25 rounded-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full blur-2xl" />
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Memory Node Created</p>
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 ml-auto" />
        </div>
        <p className="text-sm font-bold text-white mb-1">Career Consultation · Dr. Sarah Chen</p>
        <p className="text-[11px] text-[#9CA3AF] leading-relaxed mb-3">Saturn causing friction. Rahu Mahadasha starts next month favouring tech and innovation. 3 predictions locked in.</p>
        <div className="flex flex-wrap gap-1.5">
          {["Career", "Rahu Mahadasha", "Saturn Transit", "3 Predictions", "2 Remedies"].map(t => (
            <span key={t} className="text-[9px] font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[#9CA3AF]">{t}</span>
          ))}
        </div>
      </motion.div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[["Total Memories", "48"], ["Predictions", "11"], ["Remedies", "6"]].map(([l, v]) => (
          <div key={l} className="bg-white/5 border border-white/10 rounded-xl py-3">
            <p className="text-base font-bold text-white">{v}</p>
            <p className="text-[10px] text-[#9CA3AF]">{l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BriefCard() {
  return (
    <div className="space-y-3">
      <div className="p-4 bg-gold/5 border border-gold/25 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-gold" />
          <p className="text-xs font-bold text-gold uppercase tracking-wider">Today's Brief · Generated for Arjun</p>
        </div>
        <p className="text-sm text-white/90 leading-relaxed">
          Jupiter transits your 10th house forming a trine with your natal Sun — one of the strongest career windows in 3 years. Mercury is now direct, clearing the communication blocks from last month. Your Venus remedy is working.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-primary/8 border border-primary/20 rounded-xl">
          <div className="flex items-center gap-1.5 mb-1"><Zap className="w-3 h-3 text-primary" /><p className="text-[10px] font-bold text-primary">Opportunity</p></div>
          <p className="text-[11px] text-white/80">Assert leadership in today's meeting. Bold moves carry momentum.</p>
        </div>
        <div className="p-3 bg-amber-500/8 border border-amber-500/20 rounded-xl">
          <div className="flex items-center gap-1.5 mb-1"><Clock className="w-3 h-3 text-amber-400" /><p className="text-[10px] font-bold text-amber-400">Watch Out</p></div>
          <p className="text-[11px] text-white/80">Avoid investment decisions until Mercury fully stabilises Aug 4.</p>
        </div>
      </div>
      <p className="text-[10px] text-center text-[#6B7280]">Generated from 48 memories · Updated daily at 6:00 AM</p>
    </div>
  )
}

function ReminderCard() {
  const reminders = [
    { icon: "🌙", title: "Venus Remedy · Day 11/21", sub: "108 repetitions · Today 7:00 AM", urgent: true },
    { icon: "⭐", title: "Career Window Opens", sub: "Prediction enters active window in 3 days", urgent: true },
    { icon: "⚡", title: "Mercury Direct · Aug 4", sub: "Ideal window for contract signing", urgent: false },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Bell className="w-4 h-4 text-rose-400" />
        <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">3 Smart Reminders</p>
      </div>
      {reminders.map((r, i) => (
        <motion.div key={r.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
          className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl transition-colors group cursor-default">
          <span className="text-lg shrink-0">{r.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold">{r.title}</p>
            <p className="text-[10px] text-[#9CA3AF]">{r.sub}</p>
          </div>
          {r.urgent && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-400/10 border border-red-400/30 text-red-400 rounded-full shrink-0">Urgent</span>}
        </motion.div>
      ))}
    </div>
  )
}

function TrustCard() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-teal-400/5 border border-teal-400/25 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-sm font-bold text-white">S</div>
          <div>
            <p className="font-bold text-white text-sm">Dr. Sarah Chen</p>
            <p className="text-[10px] text-[#9CA3AF]">AstroVerified · Career Specialist</p>
          </div>
          <ShieldCheck className="w-5 h-5 text-teal-400 ml-auto" />
        </div>
        {[["Prediction Accuracy", 94, "text-gold", "bg-gold"], ["Trust Score", 98, "text-teal-400", "bg-teal-400"], ["Response Time", 97, "text-primary", "bg-primary"]].map(([l, v, tc, bc]) => (
          <div key={l} className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-[10px] text-[#9CA3AF]">{l}</span>
              <span className={`text-[10px] font-bold ${tc}`}>{v}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className={`h-full rounded-full ${bc}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 bg-green-400/8 border border-green-400/20 rounded-xl">
        <TrendingUp className="w-4 h-4 text-green-400 shrink-0" />
        <p className="text-[11px] text-white/80">Prediction verified → Trust score updated transparently</p>
      </div>
    </div>
  )
}

function JourneyCard() {
  const milestones = [
    { icon: CalendarCheck, label: "First Consultation", date: "Jan 2024", color: "text-blue-400 bg-blue-400/10" },
    { icon: Brain, label: "AI Memory Starts", date: "Jan 2024", color: "text-primary bg-primary/10" },
    { icon: CheckCircle2, label: "8 Predictions Verified", date: "By Jul 2026", color: "text-green-400 bg-green-400/10" },
    { icon: Heart, label: "Relationship Milestone", date: "Feb 2026", color: "text-pink-400 bg-pink-400/10" },
    { icon: InfinityIcon, label: "Journey Continues…", date: "Forever", color: "text-lavender bg-lavender/10" },
  ]
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <InfinityIcon className="w-4 h-4 text-lavender" />
        <p className="text-xs font-bold text-lavender uppercase tracking-wider">Arjun's Life Journey · 2½ Years</p>
      </div>
      {milestones.map((m, i) => (
        <motion.div key={m.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
          className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.color}`}>
            <m.icon className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 h-px bg-white/10" />
          <p className="text-xs text-white font-medium">{m.label}</p>
          <span className="text-[10px] text-[#9CA3AF]">{m.date}</span>
        </motion.div>
      ))}
      <div className="mt-3 p-3 bg-lavender/8 border border-lavender/25 rounded-xl text-center">
        <p className="text-xs text-lavender font-medium">48 memories · 14 consultations · 8 verified predictions</p>
        <p className="text-[10px] text-[#9CA3AF] mt-0.5">AstroLive remembers everything so you don't have to.</p>
      </div>
    </div>
  )
}

const artifactComponents: Record<string, React.ComponentType> = {
  ConsultCard, PredictionExtract, MemoryCard, BriefCard, ReminderCard, TrustCard, JourneyCard,
}

/* ─── Main Section ─────────────────────────────────────────────────────── */
export function EcosystemTimeline() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const advance = useCallback(() => {
    setActive(prev => (prev + 1) % steps.length)
  }, [])

  // Auto-advance every 3.5 s when not paused
  useEffect(() => {
    if (isPaused) return
    const t = setTimeout(advance, 3500)
    return () => clearTimeout(t)
  }, [active, isPaused, advance])

  const step = steps[active]
  const ArtifactComponent = artifactComponents[step.artifact.component]

  return (
    <section className="py-28 relative overflow-hidden" id="how-it-works">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow matching active step */}
      <motion.div
        key={step.connectorColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `${step.connectorColor}18` }}
      />

      <div className="container px-6 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            The{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">continuous loop</span>
            {" "}of your cosmic journey.
          </h2>
          <p className="text-[#9CA3AF] text-lg">Click any step to see the data flowing through the AstroLive ecosystem.</p>
        </motion.div>

        {/* ── Step selector ─────────────────────────────────────────────── */}
        <div className="relative mb-12">
          {/* Connector track */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-white/8 z-0" />

          {/* Active progress line */}
          <div className="hidden lg:block absolute top-6 left-0 h-px z-0 bg-gradient-to-r from-blue-400 to-lavender"
            style={{ width: `${(active / (steps.length - 1)) * 100}%`, transition: "width 0.5s ease" }} />

          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 relative z-10">
            {steps.map((s, i) => {
              const Icon = s.icon
              const isActive = i === active
              const isPast = i < active
              return (
                <button
                  key={s.id}
                  onClick={() => { setActive(i); setIsPaused(true) }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="flex flex-row lg:flex-col items-center lg:items-center gap-3 lg:gap-0 group"
                >
                  {/* Node */}
                  <motion.div
                    animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center lg:mb-3 shrink-0 transition-all duration-300
                      ${isActive
                        ? `${s.activeBg} ${s.border} shadow-lg ${s.glow}`
                        : isPast
                        ? "bg-white/10 border-white/20"
                        : "bg-white/4 border-white/10 group-hover:bg-white/8 group-hover:border-white/20"
                      }`}
                  >
                    {/* Pulsing ring on active */}
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className={`absolute inset-0 rounded-full border ${s.border}`}
                      />
                    )}
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? s.color : isPast ? "text-white/50" : "text-white/30 group-hover:text-white/60"}`} />
                    {/* Past checkmark */}
                    {isPast && <CheckCircle2 className="absolute -top-1 -right-1 w-3.5 h-3.5 text-green-400 bg-navy rounded-full" />}
                  </motion.div>

                  {/* Label */}
                  <div className="lg:text-center">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 transition-colors ${isActive ? s.color : "text-[#6B7280]"}`}>
                      {s.number}
                    </p>
                    <p className={`text-xs font-bold leading-tight transition-colors lg:max-w-[90px] ${isActive ? "text-white" : "text-[#9CA3AF] group-hover:text-white/70"}`}>
                      {s.label}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Detail panel ──────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${active}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col justify-center gap-6"
            >
              <div className={`inline-flex items-center gap-3 w-fit px-4 py-2 rounded-full ${step.bg} border ${step.border}`}>
                <step.icon className={`w-5 h-5 ${step.color}`} />
                <span className={`text-sm font-bold ${step.color}`}>{step.label}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Step {step.number}
              </h3>

              <p className="text-[#9CA3AF] text-lg leading-relaxed">{step.description}</p>

              {/* Auto-advance progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#6B7280]">Next step in</span>
                  <div className="flex gap-1">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setActive(i); setIsPaused(true) }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === active ? `${step.bg} w-4` : "bg-white/15"}`}
                        style={i === active ? { backgroundColor: step.connectorColor + "66" } : {}}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
                  {!isPaused && (
                    <motion.div
                      key={`progress-${active}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5, ease: "linear" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: step.connectorColor }}
                    />
                  )}
                </div>
                {isPaused && (
                  <button onClick={() => setIsPaused(false)} className="text-xs text-[#6B7280] hover:text-white transition-colors flex items-center gap-1">
                    ▶ Resume auto-play
                  </button>
                )}
              </div>

              {/* Navigate between steps */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setActive(Math.max(0, active - 1)); setIsPaused(true) }}
                  disabled={active === 0}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#9CA3AF] border border-white/10 rounded-xl hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => { setActive((active + 1) % steps.length); setIsPaused(true) }}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-all`}
                  style={{ background: step.connectorColor + "33", border: `1px solid ${step.connectorColor}55` }}
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: live artifact panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`artifact-${active}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`bg-card/80 backdrop-blur-xl border rounded-3xl p-6 shadow-2xl relative overflow-hidden`}
              style={{ borderColor: step.connectorColor + "33" }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-30"
                style={{ background: step.connectorColor }} />

              <div className="flex items-center gap-2 mb-5 relative z-10">
                <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: step.connectorColor }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: step.connectorColor }}>
                  {step.artifact.title}
                </span>
                <span className="ml-auto text-[10px] text-[#6B7280] bg-white/5 px-2 py-1 rounded-md">Live Preview</span>
              </div>

              <div className="relative z-10">
                <ArtifactComponent />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
