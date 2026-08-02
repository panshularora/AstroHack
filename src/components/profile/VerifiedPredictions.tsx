import { CheckCircle2, ShieldCheck, Search } from "lucide-react"
import { mockAnonymizedPredictions } from "@/lib/mock-data"

export function VerifiedPredictions() {
  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Verified Predictions</h2>
          <p className="text-[#9CA3AF]">Real, anonymized outcomes validated by users.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search predictions..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#9CA3AF]/70 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        {mockAnonymizedPredictions.map(prediction => (
          <div key={prediction.id} className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-colors">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-[#9CA3AF] text-[10px] font-bold uppercase tracking-wider">{prediction.category}</span>
              <span className="text-sm text-white/20">•</span>
              <span className="text-sm text-[#9CA3AF]">Expected: {prediction.timeframe}</span>
              <span className="text-sm text-white/20">•</span>
              <span className="text-sm text-primary font-bold">{prediction.confidence}% Confidence</span>
              
              <div className="ml-0 md:ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-green-400/10 border border-green-400/20 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Outcome
              </div>
            </div>

            <div className="flex items-start gap-4 bg-green-400/5 rounded-2xl p-5 border border-green-400/10">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-base leading-relaxed mb-2 font-medium">"{prediction.outcome}"</p>
                <p className="text-xs text-[#9CA3AF]">Verified by user on {new Date(prediction.completedDate).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
