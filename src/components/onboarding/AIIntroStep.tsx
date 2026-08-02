import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Brain, Send } from 'lucide-react'
import type { OnboardingData } from './OnboardingOrchestrator'

export function AIIntroStep({ onNext, data }: { onNext: () => void, data: OnboardingData }) {
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([])
  const [showNext, setShowNext] = useState(false)
  const firstName = data.name ? data.name.split(' ')[0] : 'there'
  
  const aiGreeting = `Hi ${firstName}! I'm your AI Companion. I noticed you're interested in ${data.goals.length > 0 ? data.goals.join(' and ') : 'exploring your journey'}. I'll be here to help you navigate those areas. Every time you have a consultation or log a journal entry, I learn more about you so my advice gets better and better.`

  useEffect(() => {
    // Simulate AI typing
    const timer = setTimeout(() => {
      setMessages([{ role: 'ai', text: aiGreeting }])
      setTimeout(() => setShowNext(true), 1500)
    }, 1000)
    return () => clearTimeout(timer)
  }, [aiGreeting])

  return (
    <div className="flex-1 flex flex-col p-6 max-w-3xl mx-auto w-full relative min-h-screen pt-12 md:pt-24">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Meet Your Companion</h2>
        <p className="text-[#9CA3AF]">Say hello to intelligent, personalized guidance.</p>
      </div>

      <div className="bg-surface border border-line rounded-[32px] p-6 relative overflow-hidden flex-1 max-h-[500px] flex flex-col shadow-2xl">
        <div className="flex-1 overflow-y-auto space-y-4">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[#9CA3AF] text-sm"
              >
                <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-brand animate-pulse" />
                </div>
                Typing...
              </motion.div>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-brand" />
                </div>
                <div className="bg-surface-2 border border-line rounded-lg rounded-tl-none p-4 text-white text-sm leading-relaxed">
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showNext && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              <button className="px-4 py-2 bg-surface-2 border border-line rounded-full text-xs text-white hover:bg-surface-3 transition-colors">
                How do you use my memory?
              </button>
              <button className="px-4 py-2 bg-surface-2 border border-line rounded-full text-xs text-white hover:bg-surface-3 transition-colors">
                What can you do?
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 relative">
          <input 
            type="text" 
            placeholder="Type a message..." 
            disabled 
            className="w-full bg-black/40 border border-line rounded-full pl-4 pr-12 py-3 text-sm text-[#9CA3AF] cursor-not-allowed"
          />
          <button disabled className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-[#9CA3AF]">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="pt-8 pb-8 flex justify-center relative z-10 mt-auto">
        <AnimatePresence>
          {showNext && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button onClick={onNext} className="px-8">
                Generate My First Daily Brief
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
