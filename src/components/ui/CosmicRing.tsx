import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CosmicRingProps {
  className?: string
  intensity?: "low" | "medium" | "high"
}

export function CosmicRing({ className, intensity = "medium" }: CosmicRingProps) {
  const glowVariants = {
    low: { opacity: [0.3, 0.5, 0.3], scale: [0.95, 1, 0.95] },
    medium: { opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.05, 0.9] },
    high: { opacity: [0.6, 1, 0.6], scale: [0.85, 1.1, 0.85] }
  }

  return (
    <div className={cn("relative flex items-center justify-center w-64 h-64", className)}>
      {/* Outer Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
        animate={glowVariants[intensity]}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner Ring */}
      <motion.div
        className="absolute inset-4 rounded-full border border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-secondary/40 border-dashed"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      {/* Core */}
      <motion.div
        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50"
        animate={glowVariants[intensity]}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  )
}
