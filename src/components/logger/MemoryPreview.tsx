import { Database } from "lucide-react"

export function MemoryPreview() {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Database className="w-5 h-5 text-secondary" /> Cosmic Memory Integration
        </h2>
        <p className="text-[#9CA3AF]">See how today's consultation permanently connects to your cosmic journey.</p>
      </div>

      <div className="relative max-w-2xl mx-auto pl-8 md:pl-0">
        {/* Vertical Line */}
        <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2" />

        <div className="space-y-8 relative z-10">
          {/* Past */}
          <div className="relative flex md:justify-end md:pr-12 items-center md:w-1/2 ml-10 md:ml-0">
            <div className="absolute left-[-3.35rem] md:right-[-3.35rem] md:left-auto w-4 h-4 bg-white/10 rounded-full flex items-center justify-center shrink-0 z-10 backdrop-blur-md border border-line-strong">
              <div className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full" />
            </div>
            <div className="text-left md:text-right w-full">
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1">June 15, 2026</p>
              <h4 className="text-sm font-bold text-white/70">Previous Consultation</h4>
            </div>
          </div>

          {/* Present */}
          <div className="relative flex md:justify-start md:pl-12 items-center md:w-1/2 ml-10 md:ml-auto">
            <div className="absolute left-[-3.35rem] md:left-[-3.35rem] w-4 h-4 bg-brand/30 rounded-full flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(124,58,237,0.6)] backdrop-blur-md border border-brand/50">
              <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            </div>
            <div className="bg-brand-light border border-brand/20 rounded-lg p-4 md:p-5 w-full shadow-[0_0_20px_rgba(124,58,237,0.1)]">
              <p className="text-xs text-brand font-bold uppercase tracking-wider mb-1">Today</p>
              <h4 className="text-base font-bold text-white mb-1">Career Transition Guidance</h4>
              <p className="text-xs text-ink-secondary">2 Predictions • 2 Remedies • Audio Note</p>
            </div>
          </div>

          {/* Future */}
          <div className="relative flex md:justify-end md:pr-12 items-center md:w-1/2 ml-10 md:ml-0 opacity-80">
            <div className="absolute left-[-3.35rem] md:right-[-3.35rem] md:left-auto w-4 h-4 bg-gold/20 rounded-full flex items-center justify-center shrink-0 z-10 backdrop-blur-md border border-gold/30">
              <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            </div>
            <div className="text-left md:text-right w-full">
              <p className="text-xs text-gold font-bold uppercase tracking-wider mb-1">Late August</p>
              <h4 className="text-sm font-bold text-white">Prediction Window Opens</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
