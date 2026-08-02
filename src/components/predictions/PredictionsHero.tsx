import { motion } from "framer-motion"
import { Target, CheckCircle2, Clock, Activity, CalendarClock } from "lucide-react"
import { mockPredictionStats } from "@/lib/mock-data"

export function PredictionsHero() {
  const stats = mockPredictionStats

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light border border-brand/20 text-xs font-bold text-brand uppercase tracking-wider mb-4">
            <Target className="w-3.5 h-3.5" /> Intelligence Center
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Track Every Prediction</h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl">
            AstroLive continuously follows every prediction made by your astrologers, helping you measure progress and evaluate accuracy over time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-line rounded-lg p-5"
        >
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium">
            <Target className="w-4 h-4 text-white" /> Total
          </div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-line rounded-lg p-5"
        >
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-green-400" /> Completed
          </div>
          <div className="text-3xl font-bold text-white">{stats.completed}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-line rounded-lg p-5"
        >
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium">
            <Clock className="w-4 h-4 text-secondary" /> Pending
          </div>
          <div className="text-3xl font-bold text-white">{stats.pending}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-line rounded-lg p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light rounded-full blur-2xl" />
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium relative z-10">
            <Activity className="w-4 h-4 text-brand" /> Accuracy
          </div>
          <div className="text-3xl font-bold text-white relative z-10">{stats.accuracy}%</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface border border-line rounded-lg p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium relative z-10">
            <CalendarClock className="w-4 h-4 text-gold" /> Windows
          </div>
          <div className="text-3xl font-bold text-white relative z-10">{stats.upcomingWindows}</div>
        </motion.div>
      </div>
    </div>
  )
}
