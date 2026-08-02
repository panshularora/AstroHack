import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function AnimatedHero() {
  const navigate = useNavigate()

  return (
    <section className="cosmic-hero min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center relative overflow-hidden bg-stars">

      {/* Subtle radial glow — use existing design token colors only */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 blur-[100px]" />
      </div>

      {/* Eyebrow pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light border border-brand/25 rounded-md font-mono text-[11px] text-brand tracking-[0.14em] uppercase mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        Vedic Astrological Intelligence
      </div>

      {/* Main headline — use font-display (Instrument Serif) */}
      <h1 className="font-display text-display text-ink max-w-4xl mx-auto text-balance mb-6">
        Your cosmic journey,{" "}
        <span className="text-gradient-gold">continuously intelligent.</span>
      </h1>

      {/* Subtext */}
      <p className="text-subtitle text-ink-secondary max-w-2xl mx-auto mb-10 text-pretty">
        AstroLive turns Vedic astrology from one-time readings into a lifelong companion.
        Track prediction proof, log remedies, and stay aligned with live planetary transits.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
        <button
          onClick={() => navigate('/app/dashboard')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand hover:bg-brand-hover text-white font-medium text-sm rounded-md transition-soft shadow-glow-gold"
        >
          Enter Live Field <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/app/dashboard')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-ink border border-line hover:border-line-strong font-medium text-sm rounded-md transition-soft"
        >
          Try Demo Account
        </button>
      </div>

      {/* Live status bar */}
      <div className="w-full max-w-2xl mx-auto px-5 py-3 bg-surface/60 border border-line backdrop-blur-sm rounded-lg flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2 text-brand">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-ink-secondary uppercase tracking-[0.12em]">Active Kundli Transit Alignment</span>
        </div>
        <span className="text-ink-tertiary">Arjun's Chart · Leo Sun · Scorpio Ascendant</span>
      </div>

    </section>
  )
}