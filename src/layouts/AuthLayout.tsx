import { Outlet, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Brain, Shield, Star, Sparkles, Compass } from "lucide-react"

const features = [
  { icon: Brain, text: "AI remembers your entire life journey & chart transits" },
  { icon: Shield, text: "Verified Vedic astrologers with 94%+ accuracy outcomes" },
  { icon: Star, text: "Daily personalized cosmic briefs & Dasha tracking" },
  { icon: Sparkles, text: "Prediction proof engine & remedy accountability" },
]

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink flex overflow-hidden">
      {/* ── Left Panel — Brand / Cosmic Visual ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-night">
        {/* Subtle star field */}
        <div className="absolute inset-0 bg-stars opacity-40" />

        {/* Soft glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-9 h-9 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Compass className="w-5 h-5 text-brand" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display tracking-tight text-white">AstroLive</span>
              <span className="text-[10px] text-ink-tertiary tracking-widest uppercase font-mono">Lifelong Companion</span>
            </div>
          </Link>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl xl:text-5xl font-display leading-tight mb-4 text-white tracking-tight">
              Your cosmic journey starts here.
            </h1>
            <p className="text-ink-secondary text-base leading-relaxed mb-10 font-sans">
              Transform astrology into a continuous, intelligent life companion grounded in real Vedic chart transits.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="space-y-3">
            {features.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3.5 rounded-md border border-line bg-surface-2/60 px-4 py-3"
              >
                <div className="w-7 h-7 rounded-md bg-brand-light border border-brand/20 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-brand" />
                </div>
                <span className="text-ink text-xs font-medium font-sans">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel — Auth Forms ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative bg-canvas">
        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Compass className="w-4 h-4 text-brand" />
            </div>
            <span className="text-lg font-bold font-display text-ink">AstroLive</span>
          </Link>
        </div>

        <div className="w-full max-w-md pt-16 lg:pt-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}