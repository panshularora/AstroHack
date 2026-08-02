import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Brain, Database, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react'

export function FeatureSlidesStep({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  const [slide, setSlide] = useState(0)

  const slides = [
    {
      icon: <Database className="w-12 h-12 text-blue-400" />,
      title: "Cosmic Memory",
      desc: "Traditional apps forget you after a chat. AstroLive automatically builds a secure, lifelong timeline of your consultations and predictions.",
      color: "from-blue-500/10 to-transparent border-blue-500/20"
    },
    {
      icon: <Brain className="w-12 h-12 text-brand" />,
      title: "AI Companion",
      desc: "An intelligent assistant that remembers your entire journey, ready to answer questions and provide daily guidance instantly.",
      color: "from-brand/10 to-transparent border-brand/20"
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-green-400" />,
      title: "AstroVerified",
      desc: "Trust built on results. We evaluate astrologers based on verified prediction outcomes, not just marketing claims.",
      color: "from-green-500/10 to-transparent border-green-500/20"
    }
  ]

  const isLast = slide === slides.length - 1

  const handleNext = () => {
    if (isLast) onNext()
    else setSlide(s => s + 1)
  }

  const handleBack = () => {
    if (slide === 0) onBack()
    else setSlide(s => s - 1)
  }

  return (
    <div className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full relative min-h-screen">
      <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-20">
        <button onClick={handleBack} className="text-[#9CA3AF] hover:text-white transition-colors p-2 flex items-center gap-1">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`w-12 h-1 rounded-full transition-colors ${i === slide ? 'bg-brand' : 'bg-white/20'}`} />
          ))}
        </div>
        <div className="w-[72px]" /> {/* Spacer for centering */}
      </div>

      <div className="flex-1 flex items-center justify-center mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            <div className={`bg-gradient-to-b ${slides[slide].color} border rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden backdrop-blur-sm`}>
              <div className="w-24 h-24 mx-auto bg-black/40 rounded-lg flex items-center justify-center mb-8 border border-line-subtle shadow-xl backdrop-blur-md">
                {slides[slide].icon}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{slides[slide].title}</h2>
              <p className="text-lg md:text-xl text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
                {slides[slide].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="py-8 flex justify-center">
        <Button size="lg" className="w-full sm:w-auto px-12 group" onClick={handleNext}>
          {isLast ? "Create Account" : "Continue"} <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
