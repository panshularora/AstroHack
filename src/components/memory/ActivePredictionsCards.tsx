import { motion } from "framer-motion"
import { Target, MoreHorizontal, MessageSquare, CheckCircle2 } from "lucide-react"
import { mockPredictions } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"

export function ActivePredictionsCards() {
  const active = mockPredictions.filter(p => p.status === 'pending')

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Active Predictions</h2>
          <p className="text-[#9CA3AF]">Tracking your cosmic forecasts in real-time.</p>
        </div>
        <button className="text-sm font-bold text-brand hover:text-ink-secondary transition-colors cursor-pointer">View All</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {active.map((p, i) => {
          // Calculate mock progress
          const start = new Date(p.dateGiven).getTime()
          const end = new Date(p.targetDate).getTime()
          const now = new Date().getTime()
          const progress = Math.min(Math.max(((now - start) / (end - start)) * 100, 5), 100)

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-line rounded-lg p-6 md:p-8 hover:border-line-strong transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-1 bg-white/5 text-[#9CA3AF] rounded-md uppercase tracking-wider">{p.astrologerName}</span>
                    <span className="text-[10px] font-bold px-2 py-1 bg-brand/20 text-ink-secondary rounded-md uppercase tracking-wider flex items-center gap-1"><Target className="w-3 h-3" /> {p.confidenceLevel}% Conf</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 leading-tight">{p.content}</h3>
                </div>
                <button className="text-[#9CA3AF] hover:text-white transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"><MoreHorizontal className="w-5 h-5" /></button>
              </div>

              <div className="mb-6 relative z-10">
                <div className="flex justify-between text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  <span>Progress</span>
                  <span className="text-white">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-brand to-lavender rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#9CA3AF] font-medium mt-2">
                  <span>Given: {new Date(p.dateGiven).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                  <span>Target: {new Date(p.targetDate).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})}</span>
                </div>
              </div>

              <div className="flex gap-2 relative z-10">
                <Button className="flex-1 h-10 text-xs font-bold gap-2 bg-brand/20 text-ink-secondary hover:bg-brand/30"><CheckCircle2 className="w-4 h-4" /> Update Outcome</Button>
                <Button variant="outline" className="flex-1 h-10 text-xs font-bold gap-2 border-line/60 hover:bg-white/5 text-white"><MessageSquare className="w-4 h-4" /> Add Note</Button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
