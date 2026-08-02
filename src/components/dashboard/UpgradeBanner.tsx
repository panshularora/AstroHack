import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function UpgradeBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-card to-card border border-primary/30 p-8 md:p-10 mb-12 shadow-[0_0_30px_rgba(107,33,168,0.15)]"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lavender/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold text-lavender uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            AstroLive+ Premium
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Unlock Unlimited Cosmic Memory
          </h2>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            Upgrade to AstroLive+ to enjoy unlimited active prediction tracking, highly personalized daily briefs tailored to your unique journey, AI-powered contextual reminders, and priority booking discounts.
          </p>
        </div>
        
        <div className="flex-shrink-0 w-full md:w-auto">
          <Button className="w-full md:w-auto h-12 px-8 bg-white text-primary hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold">
            Upgrade for $12/mo <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
