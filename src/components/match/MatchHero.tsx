import { motion } from "framer-motion"

interface MatchHeroProps {
  currentStep: number
  totalSteps: number
}

export function MatchHero({ currentStep, totalSteps }: MatchHeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-3xl mx-auto mb-12"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-line text-xs font-bold text-ink-secondary uppercase tracking-wider mb-6">
        Step {currentStep} of {totalSteps}
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Let's Find the Right Astrologer for You</h1>
      <p className="text-[#9CA3AF] text-lg">
        AstroLive uses your current concerns, birth chart, consultation history, and astrologer expertise to recommend the perfect cosmic guide.
      </p>
    </motion.div>
  )
}
