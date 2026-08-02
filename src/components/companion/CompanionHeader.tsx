import { Sparkles, BrainCircuit, Activity } from "lucide-react"
import { mockDailyCheckIn } from "@/lib/mock-data"

export function CompanionHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 mt-4 md:mt-8 px-4 md:px-0">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-brand/20 rounded-lg blur-xl animate-pulse" />
          <div className="relative w-14 h-14 bg-gradient-to-tr from-brand to-blue-500 rounded-lg flex items-center justify-center border border-line-strong shadow-lg">
            <Sparkles className="w-7 h-7 text-white drop-shadow-md" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5">{mockDailyCheckIn.greeting}</h1>
          <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider">
            <BrainCircuit className="w-3.5 h-3.5" /> Memory Active
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-surface border border-line rounded-lg p-3 w-full md:w-auto overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
            <Activity className="w-4 h-4 text-brand" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">Cosmic Streak</span>
            <span className="text-sm font-bold text-white">{mockDailyCheckIn.streak} Days</span>
          </div>
        </div>
        
        <div className="w-px h-8 bg-white/10 mx-2 shrink-0" />
        
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <div className="flex flex-col pr-4">
            <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">Action Items</span>
            <span className="text-sm font-bold text-white">{mockDailyCheckIn.pendingRemedies} Remedy Due</span>
          </div>
        </div>
      </div>
    </div>
  )
}
