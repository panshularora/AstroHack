import { motion } from "framer-motion"
import { Moon, Flame, CheckCircle, PauseCircle, Settings2 } from "lucide-react"

const remedies = [
  { id: "r1", title: "Morning Sun Meditation", provider: "Dr. Sarah Chen", streak: 7, lastCompleted: "Today, 8:00 AM", status: "completed" },
  { id: "r2", title: "Donate to Education Fund", provider: "Dr. Alara Vance", streak: 3, lastCompleted: "Last Thursday", status: "pending" },
]

export function RemediesProgress() {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Remedies Dashboard</h2>
          <p className="text-[#9CA3AF]">Tracking your daily progress and consistency.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {remedies.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-card border ${r.status === 'completed' ? 'border-green-500/30' : 'border-white/10'} rounded-3xl p-6 md:p-8 relative overflow-hidden group`}
          >
            {r.status === 'completed' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
            )}

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="w-4 h-4 text-lavender" />
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">via {r.provider}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">{r.title}</h3>
              </div>
              <div className="flex flex-col items-end shrink-0 ml-4">
                <div className="flex items-center gap-1.5 text-gold font-bold bg-gold/10 px-2 py-1 rounded-md mb-1.5 border border-gold/20">
                  <Flame className="w-3.5 h-3.5 fill-gold" /> {r.streak} Days
                </div>
                <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">{r.status === 'completed' ? 'Done for now' : 'Due'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-6 relative z-10">
              <span className="text-xs text-[#9CA3AF] font-medium">Last: {r.lastCompleted}</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                  <Settings2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                  <PauseCircle className="w-4 h-4" />
                </button>
                <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${r.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary hover:bg-primary hover:text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'}`}>
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
