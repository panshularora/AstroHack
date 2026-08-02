import { ShieldCheck, Target, TrendingUp } from "lucide-react"

export function AstroVerifiedTrust() {
  return (
    <div className="mt-20 py-12 border-t border-line/60 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20 text-secondary mb-6 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
        <ShieldCheck className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">The AstroVerified Promise</h3>
      <p className="text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto mb-10">
        We don't rank astrologers by popularity or paid placement. The AstroVerified system uses transparent, data-driven metrics including prediction accuracy, vetted credentials, and long-term user outcomes to ensure you connect with genuine experts.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 text-left">
        <div className="bg-surface/80 border border-line-subtle rounded-lg p-6">
          <Target className="w-6 h-6 text-brand mb-4" />
          <h4 className="font-bold text-white mb-2">Tracked Accuracy</h4>
          <p className="text-sm text-secondary-text">Every prediction made on AstroLive is tracked and verified against reality by the user.</p>
        </div>
        <div className="bg-surface/80 border border-line-subtle rounded-lg p-6">
          <ShieldCheck className="w-6 h-6 text-secondary mb-4" />
          <h4 className="font-bold text-white mb-2">Rigorous Vetting</h4>
          <p className="text-sm text-secondary-text">Only practitioners with proven experience and authenticated credentials earn the badge.</p>
        </div>
        <div className="bg-surface/80 border border-line-subtle rounded-lg p-6">
          <TrendingUp className="w-6 h-6 text-gold mb-4" />
          <h4 className="font-bold text-white mb-2">Long-Term Outcomes</h4>
          <p className="text-sm text-secondary-text">We prioritize astrologers whose clients report meaningful, long-term life improvements.</p>
        </div>
      </div>
    </div>
  )
}
