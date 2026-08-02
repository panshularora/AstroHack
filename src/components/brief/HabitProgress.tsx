import { Activity, Flame, Book, MessageSquare, Target } from "lucide-react"
import { mockHabitProgress } from "@/lib/mock-data"

export function HabitProgress() {
  const stats = [
    { icon: <Flame className="w-5 h-5 text-orange-400" />, label: "Remedy Streak", value: `${mockHabitProgress.remedyStreak} Days` },
    { icon: <Book className="w-5 h-5 text-blue-400" />, label: "Journal Streak", value: `${mockHabitProgress.journalStreak} Days` },
    { icon: <MessageSquare className="w-5 h-5 text-brand" />, label: "AI Check-ins", value: mockHabitProgress.aiCheckIns },
    { icon: <Target className="w-5 h-5 text-green-400" />, label: "Predictions Tracked", value: mockHabitProgress.predictionsTracked },
  ]

  return (
    <div className="bg-surface border border-line rounded-lg p-6 md:p-8 h-full">
      <div className="flex items-center gap-2 mb-8">
        <Activity className="w-5 h-5 text-brand" />
        <h2 className="text-xl font-bold text-white">Consistency & Growth</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5 border border-line-subtle text-center group hover:bg-surface-3 transition-colors cursor-default">
            <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
