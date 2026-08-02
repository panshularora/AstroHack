import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, BookOpen, Target, ChevronRight, Sparkles } from "lucide-react"

const demos = [
  {
    id: "memory",
    icon: BookOpen,
    label: "Cosmic Memory",
    title: "Everything Remembered",
    description: "See how every consultation becomes a permanent node in your life timeline.",
    preview: (
      <div className="space-y-3">
        {[
          { label: "Career Consultation", date: "Oct 1", status: "Verified", color: "text-green-400 bg-green-400/10 border-green-400/30" },
          { label: "Health Check-in", date: "Aug 6", status: "Remedy Active", color: "text-amber-400 bg-amber-400/10 border-amber-400/30" },
          { label: "Relationship Reading", date: "Apr 10", status: "Prediction Pending", color: "text-blue-400 bg-blue-400/10 border-blue-400/30" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-surface-2 border border-line rounded-xl px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-brand shrink-0" />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{item.label}</p>
              <p className="text-[#9CA3AF] text-xs">{item.date}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "ai",
    icon: Brain,
    label: "AI Companion",
    title: "Knows Your Entire Story",
    description: "The AI has full awareness of your history and speaks to you personally.",
    preview: (
      <div className="space-y-3">
        <div className="bg-brand-light border border-brand/20 rounded-lg rounded-tl-sm px-4 py-3 max-w-xs">
          <p className="text-sm text-white/90">Good morning, Arjun. Based on your Mercury retrograde consultation and the Jupiter transit active today, I recommend delaying the contract signing until Thursday.</p>
          <p className="text-[10px] text-brand mt-2">AI Companion · Reading your Cosmic Memory</p>
        </div>
        <div className="bg-surface-2 border border-line rounded-lg rounded-tr-sm px-4 py-3 max-w-xs ml-auto text-right">
          <p className="text-sm text-white/90">What about the career prediction from October?</p>
          <p className="text-[10px] text-[#9CA3AF] mt-2">You · Just now</p>
        </div>
        <div className="bg-brand-light border border-brand/20 rounded-lg rounded-tl-sm px-4 py-3 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3 h-3 text-brand animate-pulse" />
            <p className="text-xs text-brand font-medium">Typing…</p>
          </div>
          <div className="flex gap-1">
            {[0, 0.2, 0.4].map(d => (
              <motion.div key={d} className="w-2 h-2 bg-brand/60 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: d }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "predictions",
    icon: Target,
    label: "Prediction Tracking",
    title: "Living Predictions",
    description: "Every prediction gets its own lifecycle — pending, verified, or disputed.",
    preview: (
      <div className="space-y-4">
        {[
          { title: "Career advancement by Q4", progress: 100, status: "Verified", astrologer: "Dr. Sarah Jenkins", color: "bg-green-400", statusColor: "text-green-400 bg-green-400/10 border-green-400/30" },
          { title: "New relationship opportunity", progress: 55, status: "In Progress", astrologer: "Rajesh Kumar", color: "bg-brand", statusColor: "text-brand bg-brand-light border-brand/30" },
          { title: "Financial windfall in Nov", progress: 20, status: "Upcoming", astrologer: "Elena Vance", color: "bg-blue-400", statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/30" },
        ].map((p) => (
          <div key={p.title} className="bg-surface-2 border border-line rounded-xl p-4">
            <div className="flex justify-between items-start mb-3">
              <p className="text-white text-sm font-medium flex-1 pr-2">{p.title}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${p.statusColor}`}>{p.status}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${p.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className={`h-full rounded-full ${p.color}`}
              />
            </div>
            <p className="text-[10px] text-[#9CA3AF]">{p.astrologer}</p>
          </div>
        ))}
      </div>
    ),
  },
]

export function ProductDemo() {
  const [active, setActive] = useState("memory")
  const current = demos.find(d => d.id === active)!

  return (
    <section id="demo" className="py-28 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand mb-4">Interactive Preview</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            See AstroLive in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-secondary">action.</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg">Click a feature to explore how it works.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Tab switchers */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
            {demos.map(d => {
              const Icon = d.icon
              const isActive = d.id === active
              return (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg border text-left transition-all shrink-0 lg:shrink w-64 lg:w-auto ${
                    isActive
                      ? "bg-brand-light border-brand/40 shadow-[0_0_20px_rgba(107,33,168,0.2)]"
                      : "bg-surface-2 border-line/60 hover:bg-white/5 hover:border-line-strong"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-brand/20" : "bg-white/5"}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-brand" : "text-[#9CA3AF]"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold text-sm ${isActive ? "text-white" : "text-[#9CA3AF]"}`}>{d.label}</p>
                    <p className="text-xs text-[#6B7280] truncate">{d.description.slice(0, 36)}…</p>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-brand ml-auto shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-surface/70 backdrop-blur-xl border border-line rounded-lg p-6 lg:p-8 shadow-2xl"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{current.title}</h3>
                  <p className="text-[#9CA3AF] text-sm">{current.description}</p>
                </div>
                {current.preview}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
