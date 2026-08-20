import { useRef, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function ProofPaper({
  kicker,
  title,
  body,
  footer,
  stamp,
  className = "",
  delay = 0.12,
}: {
  kicker: string
  title: string
  body?: string
  footer?: string
  stamp?: "yes" | "partial" | "no"
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.4 })
  const rotateY = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = root.current
    if (!el || reduce) return
    const box = el.getBoundingClientRect()
    const px = (e.clientX - box.left) / box.width - 0.5
    const py = (e.clientY - box.top) / box.height - 0.5
    rx.set(py * -10)
    ry.set(px * 12)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      ref={root}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, rotate: 7 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: -2.2 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative bg-[#f3eee4] text-zinc-900 rounded-[24px] px-7 py-8 sm:px-9 sm:py-10 shadow-[0_40px_90px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-white/70" />
      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{kicker}</p>
      <p className="mt-4 font-display text-3xl sm:text-4xl leading-[1.08]">{title}</p>
      {body && <p className="mt-4 text-sm text-zinc-600 leading-relaxed">{body}</p>}
      {footer && <p className="mt-8 text-xs text-zinc-500 leading-relaxed">{footer}</p>}
      {stamp && (
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.35, rotate: -18 }}
          animate={{ opacity: 0.92, scale: 1, rotate: -12 }}
          transition={{ duration: 0.55, delay: delay + 0.35, ease }}
          className={`pointer-events-none absolute right-5 bottom-8 sm:right-8 sm:bottom-10 font-display text-2xl sm:text-3xl tracking-wide uppercase border-[3px] px-3 py-1 ${
            stamp === "yes"
              ? "text-emerald-800 border-emerald-800"
              : stamp === "no"
                ? "text-red-800 border-red-800"
                : "text-amber-900 border-amber-900"
          }`}
        >
          {stamp === "yes" ? "Came true" : stamp === "no" ? "Did not" : "Partly"}
        </motion.p>
      )}
    </motion.article>
  )
}
