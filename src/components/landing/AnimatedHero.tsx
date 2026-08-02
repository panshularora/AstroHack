import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Sparkles, Compass } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function AnimatedHero() {
  const navigate = useNavigate()

  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden bg-canvas text-ink">
      {/* Background starlight & grid */}
      <div className="absolute inset-0 bg-stars opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Astrolabe Hero Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-16 h-16 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand mx-auto mb-6 shadow-lg"
        >
          <Compass className="w-9 h-9 text-brand" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-line bg-surface text-xs font-mono font-bold tracking-wider uppercase text-gold-light mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span>Vedic Astrological Intelligence</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight text-ink leading-[1.05] mb-6 text-balance"
        >
          Your cosmic journey,
          <br />
          <span className="text-gradient-brand font-display">continuously intelligent.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto mb-8 font-sans"
        >
          AstroLive turns Vedic astrology from one-time readings into a lifelong companion. Track prediction proof, log remedies, and stay aligned with live planetary transits.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" onClick={() => navigate("/app/dashboard")} className="w-full sm:w-auto rounded-md font-sans font-bold">
            Enter Live Field <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/login")} className="w-full sm:w-auto rounded-md font-mono">
            Try Demo Account
          </Button>
        </motion.div>
      </div>

      {/* Live Feature Showcase Card (Replaces old skeleton wireframe) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative max-w-4xl mx-auto mt-16"
      >
        <div className="rounded-lg border border-line bg-surface p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-line/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink">Active Kundli Transit Alignment</span>
            </div>
            <span className="text-xs font-mono font-bold text-gold-light">Arjun's Chart · Leo Sun · Scorpio Ascendant</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-md bg-surface-2 border border-line space-y-1">
              <p className="text-ink-tertiary uppercase text-[10px]">Active Transit</p>
              <p className="text-sm font-bold text-ink">Jupiter 10th House</p>
              <p className="text-caption text-gold-light">Career Trine Active</p>
            </div>
            <div className="p-4 rounded-md bg-surface-2 border border-line space-y-1">
              <p className="text-ink-tertiary uppercase text-[10px]">Prediction Confidence</p>
              <p className="text-sm font-bold text-ink">88% Verified</p>
              <p className="text-caption text-success">Target: Aug 25, 2026</p>
            </div>
            <div className="p-4 rounded-md bg-surface-2 border border-line space-y-1">
              <p className="text-ink-tertiary uppercase text-[10px]">Active Remedy</p>
              <p className="text-sm font-bold text-ink">Venus Beej Mantra</p>
              <p className="text-caption text-brand">Day 11 of 21</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}