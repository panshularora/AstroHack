import { Sparkles } from 'lucide-react'

export function AISummaryCard({ summary, period }: { summary: string, period: string }) {
  return (
    <div className="bg-surface border border-line rounded-lg p-8 relative overflow-hidden group shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-blue-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center border border-brand/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Sparkles className="w-6 h-6 text-brand" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Your {period} Story</h3>
            <p className="text-sm text-brand">Synthesized by your AI Companion</p>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
          "{summary}"
        </p>
      </div>
    </div>
  )
}
