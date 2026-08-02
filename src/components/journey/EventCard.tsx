import { Target, MessageSquare, ShieldCheck, Sun, Book, Brain } from 'lucide-react'
import type { JourneyEvent } from '@/lib/mock-data'

export function EventCard({ event }: { event: JourneyEvent }) {
  const getIcon = () => {
    switch(event.type) {
      case 'Prediction': return <Target className="w-4 h-4 text-blue-400" />
      case 'Consultation': return <MessageSquare className="w-4 h-4 text-brand" />
      case 'Verified Outcome': return <ShieldCheck className="w-4 h-4 text-green-400" />
      case 'Remedy': return <Sun className="w-4 h-4 text-gold" />
      case 'Journal Entry': return <Book className="w-4 h-4 text-pink-400" />
      case 'AI Reflection': return <Brain className="w-4 h-4 text-purple-400" />
    }
  }

  const getStatusColor = () => {
    switch(event.status) {
      case 'completed': return 'border-green-500/50 bg-green-500/10 text-green-400'
      case 'active': return 'border-blue-500/50 bg-blue-500/10 text-blue-400'
      case 'verified': return 'border-brand/50 bg-brand-light text-brand'
      default: return 'border-line/60 bg-white/5 text-[#9CA3AF]'
    }
  }

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-line-subtle bg-black/40 hover:bg-white/5 transition-colors">
      <div className="mt-1">{getIcon()}</div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h5 className="text-white font-medium text-sm">{event.title}</h5>
          <span className="text-xs text-[#9CA3AF] whitespace-nowrap ml-2">{event.date}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">{event.type}</span>
          {event.status && (
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${getStatusColor()}`}>
              {event.status}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
