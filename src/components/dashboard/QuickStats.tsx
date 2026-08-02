import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Activity, Star, MessageSquare, BookOpen, ArrowRight } from "lucide-react"

export function QuickStats() {
  const navigate = useNavigate()

  const stats = [
    {
      label: "Consultations",
      value: 14,
      sub: "+2 this month",
      icon: MessageSquare,
      color: "text-blue-400",
      bg: "bg-blue-400/10 border-blue-400/20",
      glow: "shadow-blue-400/10",
      route: "/app/logger"
    },
    {
      label: "Active Predictions",
      value: 3,
      sub: "1 window opening soon",
      icon: Activity,
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
      glow: "shadow-primary/10",
      route: "/app/predictions"
    },
    {
      label: "Verified Accurate",
      value: 8,
      sub: "of 11 resolved",
      icon: Star,
      color: "text-gold",
      bg: "bg-gold/10 border-gold/20",
      glow: "shadow-gold/10",
      route: "/app/predictions"
    },
    {
      label: "Cosmic Memories",
      value: 47,
      sub: "Consultations + entries",
      icon: BookOpen,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/20",
      glow: "shadow-emerald-400/10",
      route: "/app/memory"
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.button
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          onClick={() => navigate(stat.route)}
          className={`relative bg-card border rounded-2xl p-5 text-left hover:-translate-y-1 transition-all duration-200 shadow-lg ${stat.glow} ${stat.bg} group`}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 bg-white/5 border border-white/10`}>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="text-3xl font-bold text-white mb-0.5"
          >
            {stat.value}
          </motion.p>
          <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">{stat.label}</p>
          <p className="text-[11px] text-[#6B7280]">{stat.sub}</p>
          <ArrowRight className={`absolute top-4 right-4 w-3.5 h-3.5 ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </motion.button>
      ))}
    </div>
  )
}
