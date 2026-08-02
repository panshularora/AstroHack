import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'


export function InteractiveTourOverlay({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const tours = [
    { title: "Personalized Dashboard", desc: "Your daily control center. It updates based on planetary movements and your life events." },
    { title: "Cosmic Memory", desc: "Every consultation and prediction is automatically saved here. No more forgetting important advice." },
    { title: "AI Companion", desc: "Your intelligent guide. It remembers your journey and provides instant, personalized insights." }
  ]

  const isLast = step === tours.length - 1

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-surface border border-line rounded-lg p-8 max-w-md w-full relative overflow-hidden text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-blue-500/10 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-brand">{step + 1}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{tours[step].title}</h3>
            <p className="text-[#9CA3AF] mb-8">{tours[step].desc}</p>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex justify-between items-center mt-4">
          <div className="flex gap-2">
            {tours.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-brand' : 'bg-white/20'}`} />
            ))}
          </div>
          <Button onClick={() => isLast ? onComplete() : setStep(s => s + 1)}>
            {isLast ? "Enter AstroLive" : "Next"}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
