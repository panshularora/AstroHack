import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"

export function RecommendationPanel() {
  const navigate = useNavigate()

  return (
    <div className="mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 via-[#1a1b26] to-secondary/20 border border-primary/30 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.1)]"
      >
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Next Best Action</h3>
            <p className="text-[#9CA3AF] max-w-2xl text-base leading-relaxed">
              You have active predictions in your career window. Taking a moment to update their outcomes or log a daily journal entry will significantly improve your overall accuracy analytics and future AI insights.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/app/logger")}
          className="relative z-10 w-full lg:w-auto whitespace-nowrap bg-white text-black font-bold px-8 py-5 rounded-full hover:bg-white/90 transition-colors flex items-center justify-center gap-3 shadow-xl group text-lg cursor-pointer shrink-0"
        >
          Update Session Logs 
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  )
}
