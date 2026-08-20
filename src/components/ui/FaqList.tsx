import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div>
      {items.map((item, i) => {
        const on = open === i
        return (
          <div key={item.q} className="py-5 border-t border-zinc-800/80 first:border-t-0">
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? null : i)}
              className="w-full text-left flex items-start justify-between gap-4"
            >
              <span className="font-display text-xl sm:text-2xl text-zinc-50">{item.q}</span>
              <span className="text-zinc-500 text-lg leading-none mt-1">{on ? "–" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 text-[15px] text-zinc-400 max-w-xl leading-relaxed"
                >
                  {item.a}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
