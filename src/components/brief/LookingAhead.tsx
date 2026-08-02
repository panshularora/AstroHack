import { ArrowRight, Sparkles } from "lucide-react"

export function LookingAhead() {
  return (
    <div className="text-center py-16 border-t border-line/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10" />
      
      <div className="w-12 h-12 mx-auto bg-brand/20 rounded-full flex items-center justify-center mb-6">
        <Sparkles className="w-5 h-5 text-brand" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">Looking Ahead to Tomorrow</h2>
      <p className="text-[#9CA3AF] max-w-lg mx-auto mb-8 leading-relaxed">
        Tomorrow brings the start of your Jupiter transit. Get a good night's rest, the cosmic energy will be heavily focused on expansion and learning.
      </p>
      
      <button className="mx-auto flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-full bg-surface-2 border border-line hover:bg-surface-3 transition-colors">
        View Full Week Forecast <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
