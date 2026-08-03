import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function AnimatedHero() {
  const navigate = useNavigate()

  return (
    <section className="cosmic-hero min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center relative overflow-hidden bg-stars">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 blur-[100px]" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light border border-brand/25 rounded-md font-mono text-[11px] text-brand tracking-[0.14em] uppercase mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        The Prediction Ledger
      </div>

      <h1 className="font-display text-display text-ink max-w-4xl mx-auto text-balance mb-6">
        Astrology with{" "}
        <span className="text-gradient-gold">receipts.</span>
      </h1>

      <p className="text-subtitle text-ink-secondary max-w-2xl mx-auto mb-10 text-pretty">
        Every consultation becomes a dated, trackable prediction. When the window closes, you confirm if it happened.
        Astrologers earn trust through proof — not star ratings.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <button
          onClick={() => navigate('/app/ledger')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand hover:bg-brand-hover text-white font-medium text-sm rounded-md transition-soft shadow-glow-gold"
        >
          Open Your Ledger <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/app/consult')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-ink border border-line hover:border-line-strong font-medium text-sm rounded-md transition-soft"
        >
          Book a Session
        </button>
      </div>

      {/* Demo receipt preview */}
      <div className="w-full max-w-md mx-auto">
        <div className="p-5 rounded-lg bg-surface/80 border border-line backdrop-blur-sm text-left space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand">Prediction Receipt</p>
            <span className="font-mono text-[9px] px-2 py-0.5 bg-success/15 text-success border border-success/25 rounded-[2px]">Verified ✓</span>
          </div>
          <p className="font-display text-lg text-ink font-bold">Job offer in tech sector</p>
          <p className="text-xs font-mono text-ink-secondary">Acharya Ananya Sharma · 88% confidence · Window closed Jul 28</p>
          <p className="text-xs text-ink-tertiary border-t border-line/60 pt-3">Evidence: Offer letter received Oct 14</p>
        </div>
      </div>
    </section>
  )
}
