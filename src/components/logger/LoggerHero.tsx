import { motion } from "framer-motion"
import { CheckCircle, Clock, Calendar } from "lucide-react"
import { mockLatestSession } from "@/lib/mock-data"

export function LoggerHero() {
  const session = mockLatestSession
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-surface/60 border border-line rounded-lg p-6 md:p-8 mb-12 overflow-hidden backdrop-blur-xl"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        <div className="relative">
          <img src={session.astrologer.avatar} alt={session.astrologer.name} className="w-20 h-20 rounded-full border-2 border-card object-cover shadow-xl" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-2 border-card"
          >
            <CheckCircle className="w-4 h-4" />
          </motion.div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] md:text-xs font-bold text-green-400 uppercase tracking-wider mb-2 md:mb-3">
            Session Completed
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Consultation with {session.astrologer.name}</h1>
          <p className="text-[#9CA3AF] text-sm mb-4">You just took a powerful step in your cosmic journey.</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-xs font-medium text-[#9CA3AF]">
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md"><Clock className="w-3.5 h-3.5" /> {session.duration} mins</span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md"><Calendar className="w-3.5 h-3.5" /> {new Date(session.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md text-white font-bold">${session.amountPaid}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
