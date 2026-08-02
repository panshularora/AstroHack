import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CosmicHeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "content"> {
  eyebrow: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
  /** Rendered inside the dark hero band */
  visualization?: React.ReactNode
  /** Rendered below the seam, in the ivory band */
  content?: React.ReactNode
}

/**
 * AstroLive's signature identity: a cinematic dark cosmic hero with
 * orbital motion, transitioning into a clean ivory editorial content area.
 */
export function CosmicHero({
  eyebrow,
  title,
  subtitle,
  visualization,
  content,
  children,
  className,
  ...props
}: CosmicHeroProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {/* ── Dark Cosmic Hero Band ─────────────────────────────────────── */}
      <section className="cosmic-hero">
        <div className="absolute inset-0 bg-stars opacity-40 pointer-events-none" data-starfield />
        <div className="absolute -top-40 -right-32 w-[34rem] h-[34rem] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-48 -left-32 w-[30rem] h-[30rem] rounded-full bg-[#0EA5E9]/8 blur-[110px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-16 md:pb-24">
          {/* Eyebrow — Geist Mono, always */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-overline text-gold-bright/90 flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-gold-bright/60" />
            {eyebrow}
          </motion.p>

          {/* Title — Instrument Serif, always */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-ink text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] max-w-3xl"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-base md:text-lg text-ink-secondary max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>

        {/* Visualization layer — fills the hero below the headline */}
        {visualization && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {visualization}
          </motion.div>
        )}

        {/* Soft fade to ivory */}
        <div className="h-10 bg-gradient-to-b from-transparent to-[#F7F5F0] relative z-10 -mb-px" />
      </section>

      {/* ── Ivory Content Band ────────────────────────────────────────── */}
      <section className="ivory-content">
        <div className="cosmic-seam" />
        {content && (
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
            {content}
          </div>
        )}
      </section>
    </div>
  )
}

/**
 * Orbital field — animated planet nodes on rotating orbital rings.
 * Used as the dashboard's Cosmic Field signature.
 */
export function OrbitalField({ active, sizes = [84, 114, 144, 174] }: { active?: number; sizes?: number[] }) {
  const planets = [
    { name: "Sun", color: "#F59E0B", angle: 30 },
    { name: "Jupiter", color: "#D97706", angle: 120 },
    { name: "Venus", color: "#EC4899", angle: 210 },
    { name: "Mercury", color: "#38BDF8", angle: 300 },
  ]
  const cx = 200
  const cy = 200

  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-square select-none">
      {/* Glowing core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,#FDE68A,#F59E0B_45%,#B45309_80%)] shadow-[0_0_50px_rgba(245,158,11,0.45)] flex items-center justify-center flex-col">
        <span className="text-[10px] font-mono text-white/80 uppercase tracking-[0.2em]">Alignment</span>
        <span className="font-metric text-3xl font-bold text-white tabular-nums leading-none">{active ?? 88}</span>
      </div>

      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        {planets.map((p, idx) => {
          const rad = (p.angle * Math.PI) / 180
          const px = cx + sizes[idx] * Math.cos(rad)
          const py = cy + sizes[idx] * Math.sin(rad)
          return (
            <g key={p.name}>
              <circle
                cx={cx} cy={cy} r={sizes[idx]}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray={idx % 2 === 0 ? "3 5" : "none"}
              />
              <circle cx={px} cy={py} r="5" fill={p.color} stroke="#0F1623" strokeWidth="2" />
              <circle cx={px} cy={py} r="10" fill={p.color} opacity="0.15">
                <animate attributeName="r" values="8;14;8" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}
      </svg>
    </div>
  )
}