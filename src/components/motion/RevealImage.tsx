import { motion, useReducedMotion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function RevealImage({
  src,
  alt = "",
  className = "",
  delay = 0,
}: {
  src: string
  alt?: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="astro-face absolute inset-0 h-full w-full object-cover"
        initial={reduce ? { opacity: 0 } : { scale: 1.12, opacity: 1 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.05, delay, ease }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-zinc-950"
        initial={reduce ? { opacity: 1 } : { y: "0%" }}
        whileInView={reduce ? { opacity: 0 } : { y: "-101%" }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.85, delay, ease }}
      />
    </div>
  )
}
