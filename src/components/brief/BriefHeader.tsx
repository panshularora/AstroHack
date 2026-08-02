import { Sparkles, Sun, AlertTriangle, ArrowRight } from "lucide-react"
import { mockDailyBriefData } from "@/lib/mock-data"

export function BriefHeader() {
  const { greeting, energyScore, summary, opportunities, cautions, reflection } = mockDailyBriefData

  return (
    <div className="mb-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
        {greeting}
      </h1>

      <div className="bg-gradient-to-br from-[#1a1b26] to-[#12131c] border border-line rounded-[2rem] p-6 md:p-10 relative overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light rounded-full blur-[100px] -z-10 group-hover:bg-brand/20 transition-colors duration-1000" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-colors duration-1000" />

        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-brand/20 text-brand border border-brand/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" /> Today's Energy
              </span>
              <span className="text-sm font-bold text-white/80">{energyScore}/100</span>
            </div>
            
            <p className="text-xl md:text-2xl text-white font-medium leading-snug mb-8">
              {summary}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-400" /> Opportunities
                </h4>
                <ul className="space-y-2">
                  {opportunities.map((opp, i) => (
                    <li key={i} className="text-sm text-white/90 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-gold" /> Cautions
                </h4>
                <ul className="space-y-2">
                  {cautions.map((cau, i) => (
                    <li key={i} className="text-sm text-white/90 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{cau}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Reflection Sidebar */}
          <div className="w-full md:w-72 shrink-0 bg-surface-2 border border-line rounded-lg p-6 backdrop-blur-sm">
            <h4 className="text-[10px] font-bold text-brand uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Cosmic Memory Insight
            </h4>
            <p className="text-sm text-white/90 italic leading-relaxed mb-4">
              "{reflection}"
            </p>
            <button className="text-xs font-bold text-white hover:text-brand transition-colors flex items-center gap-1">
              View Consultation <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
