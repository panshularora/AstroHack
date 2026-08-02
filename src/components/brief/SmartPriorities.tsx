import { HeartPulse, Target, BookOpen } from "lucide-react"
import { mockSmartPriorities } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"

export function SmartPriorities() {
  const getIcon = (type: string) => {
    switch(type) {
      case 'remedy': return <HeartPulse className="w-5 h-5 text-green-400" />
      case 'prediction': return <Target className="w-5 h-5 text-brand" />
      default: return <BookOpen className="w-5 h-5 text-blue-400" />
    }
  }

  const getGradient = (type: string) => {
    switch(type) {
      case 'remedy': return 'from-green-400/10 to-transparent border-green-400/20'
      case 'prediction': return 'from-brand/10 to-transparent border-brand/20'
      default: return 'from-blue-400/10 to-transparent border-blue-400/20'
    }
  }

  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-white" />
        <h2 className="text-xl font-bold text-white">Smart Priorities</h2>
        <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">Top 3 Actions</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {mockSmartPriorities.map((priority) => (
          <div key={priority.id} className={`bg-gradient-to-br ${getGradient(priority.type)} bg-surface border rounded-lg p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300`}>
            <div className="w-10 h-10 rounded-lg bg-black/40 border border-line-subtle flex items-center justify-center mb-4 shadow-inner">
              {getIcon(priority.type)}
            </div>
            <h3 className="text-base font-bold text-white mb-2 leading-snug">{priority.title}</h3>
            <p className="text-xs text-[#9CA3AF] mb-6 flex-grow leading-relaxed">{priority.reason}</p>
            <Button variant="outline" className="w-full h-10 text-xs font-bold border-line/60 hover:bg-white/5">
              {priority.actionText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
