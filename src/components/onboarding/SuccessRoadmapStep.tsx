import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Sun, Database, Brain, Target, Sparkles } from 'lucide-react'
import type { OnboardingData } from './OnboardingOrchestrator'

export function SuccessRoadmapStep({ onNext, data }: { onNext: () => void, data: OnboardingData }) {
  const steps = [
    { icon: <Sun className="w-5 h-5 text-gold" />, title: "Daily Brief", desc: "Start each day with personalized insights." },
    { icon: <Database className="w-5 h-5 text-blue-400" />, title: "Automatic Memory", desc: "Your consultations are logged automatically." },
    { icon: <Target className="w-5 h-5 text-green-400" />, title: "Prediction Tracking", desc: "We track outcomes to ensure accuracy." },
    { icon: <Brain className="w-5 h-5 text-brand" />, title: "AI Evolution", desc: "Your AI gets smarter with every interaction." }
  ]

  return (
    <div className="flex-1 flex flex-col p-6 max-w-xl mx-auto w-full relative min-h-screen justify-center">
      <div className="text-center mb-12 relative z-10">
        <div className="w-20 h-20 mx-auto bg-brand/20 rounded-full flex items-center justify-center mb-6 animate-[pulse_3s_ease-in-out_infinite]">
          <Sparkles className="w-10 h-10 text-brand" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">You're All Set, {data.name?.split(' ')[0] || 'Explorer'}!</h2>
        <p className="text-[#9CA3AF]">Here is what your lifelong journey looks like.</p>
      </div>

      <div className="bg-surface border border-line rounded-[32px] p-8 md:p-12 relative z-10 shadow-2xl">
        <div className="absolute left-12 md:left-16 top-16 bottom-16 w-0.5 bg-gradient-to-b from-gold via-blue-400 to-primary" />
        
        <div className="space-y-8 relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-6"
            >
              <div className="w-10 h-10 rounded-full bg-black border-2 border-line-strong flex items-center justify-center z-10 shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-white">{step.title}</h3>
                <p className="text-xs text-[#9CA3AF] mt-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-12 pb-8 flex justify-center relative z-10 mt-auto">
        <Button onClick={onNext} size="lg" className="px-12 w-full max-w-md shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] group">
          Enter AstroLive <Sparkles className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
