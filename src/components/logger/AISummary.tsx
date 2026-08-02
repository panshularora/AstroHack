import { motion } from "framer-motion"
import { Sparkles, MessageSquare, Compass, CheckSquare } from "lucide-react"
import { mockLatestSession } from "@/lib/mock-data"

export function AISummary() {
  const { summary, topic } = mockLatestSession
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-12"
    >
      <div className="text-center md:text-left mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Let's Save What Matters</h2>
        <p className="text-[#9CA3AF]">AstroLive automatically remembers important guidance so you never have to.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <Sparkles className="w-32 h-32" />
        </div>
        
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">AI Consultation Summary</h3>
            <p className="text-sm text-primary font-medium mt-1">Topic: {topic}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div>
            <h4 className="flex items-center gap-2 text-white font-bold mb-4">
              <MessageSquare className="w-4 h-4 text-secondary" /> Key Discussion Points
            </h4>
            <ul className="space-y-4">
              {summary.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#9CA3AF] leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-8">
            <div>
              <h4 className="flex items-center gap-2 text-white font-bold mb-4">
                <Compass className="w-4 h-4 text-gold" /> Important Life Advice
              </h4>
              <div className="bg-gold/5 border border-gold/10 p-5 rounded-xl text-sm text-white/90 leading-relaxed italic">
                "{summary.advice}"
              </div>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 text-white font-bold mb-4">
                <CheckSquare className="w-4 h-4 text-green-400" /> Suggested Actions
              </h4>
              <ul className="space-y-3">
                {summary.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#9CA3AF] leading-relaxed">
                    <CheckSquare className="w-4 h-4 text-green-400/50 shrink-0 mt-0.5" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
