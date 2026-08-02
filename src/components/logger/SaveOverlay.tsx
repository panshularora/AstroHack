import { useEffect } from "react"
import { motion } from "framer-motion"
import { Database, CheckCircle2 } from "lucide-react"

interface SaveOverlayProps {
  onComplete: () => void
}

export function SaveOverlay({ onComplete }: SaveOverlayProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 4500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
    >
      <div className="text-center relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative w-32 h-32 mx-auto mb-8"
        >
          {/* Animated rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-primary/30 border-t-primary"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-secondary/30 border-b-secondary"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Database className="w-10 h-10 text-white" />
          </div>

          {/* Particles flying in */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400, opacity: 0, scale: 0 }}
              animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0, 1, 0.5] }}
              transition={{ duration: 1.5, delay: i * 0.15 + 0.5, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-lavender rounded-full shadow-[0_0_10px_#A78BFA]"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">Saving to Cosmic Memory</h2>
          <p className="text-[#9CA3AF]">Extracting predictions, remedies, and notes...</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3 }}
          className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10 rounded-2xl"
        >
          <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Saved Successfully</h2>
          <p className="text-[#9CA3AF]">Returning to dashboard...</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
