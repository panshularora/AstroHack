import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Magnetic({ children, pull = 14 }: { children: ReactNode; pull?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.35 })

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-flex"
      onMouseMove={(e) => {
        const box = ref.current?.getBoundingClientRect()
        if (!box) return
        x.set(((e.clientX - box.left) / box.width - 0.5) * pull)
        y.set(((e.clientY - box.top) / box.height - 0.5) * pull)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
