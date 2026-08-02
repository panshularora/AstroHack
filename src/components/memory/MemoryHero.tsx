import { motion } from "framer-motion"
import { Database, Download, CalendarCheck, Target, Moon, Flame } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { mockMemoryStats } from "@/lib/mock-data"

export function MemoryHero() {
  const stats = mockMemoryStats

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-bold text-secondary uppercase tracking-wider mb-4">
            <Database className="w-3.5 h-3.5" /> Intelligence Center
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Your Cosmic Memory</h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl">
            Every consultation, prediction, remedy, and reflection is permanently organized here to continuously improve your future guidance.
          </p>
        </div>
        
        <Button variant="outline" className="gap-2 border-line-strong hover:bg-white/5 text-white whitespace-nowrap">
          <Download className="w-4 h-4" /> Export to PDF
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-line rounded-lg p-5"
        >
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium">
            <CalendarCheck className="w-4 h-4 text-brand" /> Consultations
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalConsultations}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-line rounded-lg p-5"
        >
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium">
            <Target className="w-4 h-4 text-secondary" /> Predictions Won
          </div>
          <div className="text-3xl font-bold text-white">{stats.completedPredictions}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-line rounded-lg p-5"
        >
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium">
            <Moon className="w-4 h-4 text-ink-secondary" /> Active Remedies
          </div>
          <div className="text-3xl font-bold text-white">{stats.activeRemedies}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-line rounded-lg p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-2 text-[#9CA3AF] mb-2 font-medium relative z-10">
            <Flame className="w-4 h-4 text-gold" /> Month Streak
          </div>
          <div className="text-3xl font-bold text-white relative z-10">{stats.consultationStreak}</div>
        </motion.div>
      </div>
    </div>
  )
}
