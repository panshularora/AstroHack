import { motion, useReducedMotion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function KineticWords({
  text,
  className = "",
  delay = 0,
  italic = false,
}: {
  text: string
  className?: string
  delay?: number
  italic?: boolean
}) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${text}-${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className={`inline-block ${italic ? "italic" : ""}`}
              initial={reduce ? { opacity: 0 } : { y: "108%", opacity: 1 }}
              animate={reduce ? { opacity: 1 } : { y: "0%" }}
              transition={{ duration: 0.72, delay: delay + i * 0.042, ease }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  )
}
