import { CalendarDays, ArrowRight } from "lucide-react"

export function WeeklyReflection() {
  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/40 transition-colors cursor-pointer h-full flex flex-col justify-center">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/30 transition-colors" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Your Week So Far</h3>
        </div>
        <ArrowRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-white transition-transform group-hover:translate-x-1" />
      </div>
      
      <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-xl">
        You've maintained your Sun Meditation streak and updated 1 prediction outcome. Your emotional trends show increasing confidence as your tech job prediction window approaches.
      </p>

      <div className="flex flex-wrap gap-3">
        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white">4 Remedies Done</span>
        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white">2 AI Check-ins</span>
      </div>
    </div>
  )
}
