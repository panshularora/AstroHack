import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Sparkles, Calendar, MessageCircle, Moon, ChevronRight, Zap } from "lucide-react"
import type { Reminder } from "@/lib/mock-data"

export function SmartReminders({ reminders }: { reminders: Reminder[] }) {
  const navigate = useNavigate()

  const getIcon = (type: string) => {
    switch (type) {
      case 'remedy': return <Moon className="w-4 h-4 text-ink-secondary" />
      case 'prediction': return <Sparkles className="w-4 h-4 text-gold" />
      case 'consultation': return <MessageCircle className="w-4 h-4 text-brand" />
      case 'transit': return <Zap className="w-4 h-4 text-blue-400" />
      default: return <Calendar className="w-4 h-4 text-secondary" />
    }
  }

  const getIconBg = (type: string, priority: string) => {
    if (priority === 'high') {
      if (type === 'remedy') return 'bg-lavender/15 border-lavender/25'
      if (type === 'prediction') return 'bg-gold/15 border-gold/25'
      return 'bg-brand/15 border-brand/25'
    }
    return 'bg-white/5 border-line/60'
  }

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high') return <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-full uppercase tracking-wider">Urgent</span>
    return <span className="text-[9px] font-bold px-1.5 py-0.5 bg-surface-2 border border-line text-[#9CA3AF] rounded-full uppercase tracking-wider">Today</span>
  }

  return (
    <div className="bg-surface border border-line rounded-lg p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-white">Smart Reminders</h2>
          <p className="text-xs text-[#9CA3AF]">{reminders.length} active for you today</p>
        </div>
        <button
          onClick={() => navigate("/app/memory")}
          className="text-xs font-bold text-brand hover:text-ink-secondary transition-colors flex items-center gap-1"
        >
          All <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-3">
        {reminders.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="flex items-start gap-3 p-3.5 bg-surface-2 hover:bg-surface-2 border border-white/6 hover:border-white/12 rounded-lg cursor-pointer group transition-all"
          >
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${getIconBg(r.iconType, r.priority)}`}>
              {getIcon(r.iconType)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1 mb-1">
                <h3 className="text-white text-xs font-bold leading-tight">{r.title}</h3>
                {getPriorityBadge(r.priority)}
              </div>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed line-clamp-2 mb-1.5">{r.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6B7280]">{r.timestamp}</span>
                <span className="text-[10px] font-bold text-brand opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  Act <ChevronRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
