import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Sparkles } from 'lucide-react'

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/20 rounded-full blur-[100px] opacity-50 mix-blend-screen animate-pulse" />
      </div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-24 h-24 mx-auto border-4 border-brand/30 rounded-full flex items-center justify-center mb-8 relative"
        >
          <div className="absolute inset-0 border border-brand rounded-full animate-[spin_10s_linear_infinite]" />
          <Sparkles className="w-10 h-10 text-brand" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Your Journey Doesn't End After <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">One Consultation</span>.
        </h1>
        
        <p className="text-lg text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
          AstroLive combines AI, personalized memory, and verified astrologers to provide intelligent, lifelong guidance that grows with you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button size="lg" className="w-full sm:w-auto px-12 shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]" onClick={onNext}>
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 border-line-strong text-white hover:bg-white/5">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  )
}
