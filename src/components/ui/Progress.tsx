import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  color?: "brand" | "gold" | "success" | "danger"
}

const colorMap = {
  brand: "bg-brand-gradient",
  gold: "bg-gold-gradient",
  success: "bg-success",
  danger: "bg-danger",
}

export function Progress({ value, max = 100, className, barClassName, color = "brand" }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cn("h-1.5 w-full rounded-full bg-surface-3 overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn("h-full rounded-full", colorMap[color], barClassName)}
      />
    </div>
  )
}
