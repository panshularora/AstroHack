import { motion } from "framer-motion"
import type { Prediction } from "@/lib/mock-data"
import { Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"

export function ActivePredictions({ predictions }: { predictions: Prediction[] }) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Active Predictions</h2>
        <button className="text-sm font-medium text-brand hover:text-ink-secondary transition-colors cursor-pointer">View All</button>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {predictions.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex-none w-[300px] md:w-[360px] snap-start"
          >
            <div className="bg-surface border border-line rounded-lg p-6 hover:border-line-strong hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="text-xs font-semibold px-2 py-1 bg-brand-light border border-brand/20 text-ink-secondary rounded-md">
                  {p.confidenceLevel}% Confidence
                </div>
                {p.status === "pending" ? (
                  <div className="bg-white/5 p-1.5 rounded-full" title="Pending">
                    <Clock className="w-4 h-4 text-[#9CA3AF]" />
                  </div>
                ) : p.status === "accurate" ? (
                  <div className="bg-green-500/10 p-1.5 rounded-full" title="Accurate">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                ) : (
                  <div className="bg-red-500/10 p-1.5 rounded-full" title="Inaccurate">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{p.content}</h3>
              <p className="text-sm text-[#9CA3AF] mb-6">By {p.astrologerName}</p>
              
              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#9CA3AF]">Target Window</span>
                  <span className="font-medium text-white">{new Date(p.targetDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand to-secondary w-2/3 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button className="text-xs font-medium py-2 rounded-lg bg-white/5 hover:bg-surface-3 text-white transition-colors cursor-pointer">Update Status</button>
                  <button className="text-xs font-medium py-2 rounded-lg bg-brand-light hover:bg-brand/20 text-brand transition-colors flex items-center justify-center gap-1 cursor-pointer">Details <ArrowRight className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
