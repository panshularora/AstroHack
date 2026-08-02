import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function BreathingCircle() {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale')
  const [timeLeft, setTimeLeft] = useState(4)

  useEffect(() => {
    let isActive = true
    let timeout: ReturnType<typeof setTimeout>

    const runCycle = () => {
      if (!isActive) return
      
      setPhase('Inhale')
      setTimeLeft(4)
      
      timeout = setTimeout(() => {
        if (!isActive) return
        setPhase('Hold')
        setTimeLeft(7)
        
        timeout = setTimeout(() => {
          if (!isActive) return
          setPhase('Exhale')
          setTimeLeft(8)
          
          timeout = setTimeout(runCycle, 8000)
        }, 7000)
      }, 4000)
    }

    runCycle()
    return () => {
      isActive = false
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(1, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [phase]) // reset interval on phase change

  const circleVariants: any = {
    Inhale: { scale: 1.5, opacity: 0.8, transition: { duration: 4, ease: "easeInOut" } },
    Hold: { scale: 1.5, opacity: 0.8, transition: { duration: 7, ease: "linear" } },
    Exhale: { scale: 1, opacity: 0.3, transition: { duration: 8, ease: "easeInOut" } }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 relative">
      <div className="w-64 h-64 relative flex items-center justify-center">
        <motion.div
          variants={circleVariants}
          animate={phase}
          className="absolute w-40 h-40 rounded-full bg-teal-500/20 blur-xl"
        />
        <motion.div
          variants={circleVariants}
          animate={phase}
          className="absolute w-32 h-32 rounded-full border-2 border-teal-400/50"
        />
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <p className="text-teal-100 text-lg font-medium tracking-widest uppercase mb-1">{phase}</p>
          <p className="text-4xl font-bold text-white">{timeLeft}</p>
        </div>
      </div>
      <p className="text-sm text-teal-200/60 mt-8 text-center max-w-xs">
        Breathe in sync with the circle to naturally lower your heart rate.
      </p>
    </div>
  )
}
