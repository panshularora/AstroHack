import { ShieldCheck } from "lucide-react"

export function VerifiedHero() {
  return (
    <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light border border-brand/20 text-xs font-bold text-brand uppercase tracking-wider mb-6">
          <ShieldCheck className="w-4 h-4" /> AstroVerified
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Trust Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">Results.</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
          We evaluate astrologers using verified prediction outcomes, long-term consistency, and real user success—not just marketing and ratings. Find an expert you can truly trust.
        </p>
      </div>
      
      <div className="hidden md:flex flex-1 justify-end">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 bg-brand/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-4 bg-gradient-to-tr from-brand to-blue-500 rounded-full opacity-20" />
          <div className="absolute inset-0 border border-line rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-8 border border-line-subtle rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck className="w-24 h-24 text-brand drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
