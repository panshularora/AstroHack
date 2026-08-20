import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export type Chapter = {
  era: "Past" | "Now" | "Next"
  title: string
  detail: string
  href?: string
}

export function TimeChapters({ chapters }: { chapters: Chapter[] }) {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10">
      {chapters.map((c, i) => {
        const live = c.era === "Now"
        const Tag = c.href ? "button" : "div"
        return (
          <Tag
            key={c.era}
            type={c.href ? "button" : undefined}
            onClick={c.href ? () => navigate(c.href!) : undefined}
            className={`relative text-left px-3 sm:px-5 py-4 sm:py-5 transition-colors ${
              live ? "bg-zinc-950/40" : "bg-zinc-950/70 hover:bg-zinc-950/50"
            }`}
          >
            {live && (
              <motion.span
                className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            )}
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500 pl-3">{c.era}</p>
            <p className={`mt-2 font-display leading-tight ${live ? "text-xl sm:text-2xl text-zinc-50" : "text-lg sm:text-xl text-zinc-200"}`}>
              {c.title}
            </p>
            <p className="mt-1.5 text-[12px] text-zinc-500 leading-snug">{c.detail}</p>
            {i < chapters.length - 1 && (
              <span className="pointer-events-none absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-white/10 sm:block" />
            )}
          </Tag>
        )
      })}
    </div>
  )
}
