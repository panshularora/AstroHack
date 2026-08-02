import { Sun, CheckCircle2, Flame } from "lucide-react"
import { mockDailyCheckIn } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"

export function DailyCheckIn() {
  return (
    <div className="bg-gradient-to-r from-brand/10 via-blue-500/10 to-transparent border border-brand/20 rounded-lg p-6 md:p-8 relative overflow-hidden mb-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-3xl -z-10 animate-pulse" />
      
      <div className="flex items-center gap-2 mb-4">
        <Sun className="w-5 h-5 text-gold" />
        <h2 className="text-lg font-bold text-white">Daily Cosmic Check-In</h2>
      </div>
      
      <p className="text-xl md:text-2xl font-bold text-white mb-6 max-w-2xl leading-snug">
        "{mockDailyCheckIn.prompt}"
      </p>

      <div className="flex flex-wrap gap-4 items-center">
        <Button className="h-10 px-6 font-bold text-sm bg-brand hover:bg-brand/90 text-white shadow-lg shadow-primary/20">
          Reflect Now
        </Button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-line">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-white">{mockDailyCheckIn.streak} Day Streak</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-line">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-sm font-bold text-white">{mockDailyCheckIn.pendingRemedies} Remedy Due</span>
        </div>
      </div>
    </div>
  )
}
