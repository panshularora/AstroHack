import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface JourneyEvent {
  id: string
  type: "consultation" | "prediction" | "remedy" | "milestone" | "journal"
  title?: string
  date?: string
}

// ── Spiral Math ─────────────────────────────────────────────────────────────

function spiralPoint(cx: number, cy: number, a: number, b: number, theta: number) {
  const r = a + b * theta
  return { x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta), r }
}

function spiralPath(cx: number, cy: number, a: number, b: number, maxAngle: number, steps: number) {
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * maxAngle
    const { x, y } = spiralPoint(cx, cy, a, b, theta)
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(" ")
}

// ── Node Colors ─────────────────────────────────────────────────────────────

const nodeStyles: Record<string, { stroke: string; fill: string; glow: string }> = {
  consultation: { stroke: "var(--color-brand)", fill: "var(--color-brand-light)", glow: "var(--color-brand)" },
  prediction: { stroke: "var(--color-gold-bright)", fill: "var(--color-gold-tint)", glow: "var(--color-gold-bright)" },
  remedy: { stroke: "var(--color-success)", fill: "var(--color-success-light)", glow: "var(--color-success)" },
  milestone: { stroke: "var(--color-brand)", fill: "var(--brand)", glow: "var(--color-brand)" },
  journal: { stroke: "var(--color-ink-tertiary)", fill: "var(--color-surface-2)", glow: "var(--color-ink-tertiary)" },
}

// ── JourneySpiral ───────────────────────────────────────────────────────────

interface SpiralProps {
  size?: number
  events?: JourneyEvent[]
  className?: string
  animate?: boolean
  showLabels?: boolean
}

export function JourneySpiral({
  size = 360,
  events = [],
  className,
  animate = true,
  showLabels = false,
}: SpiralProps) {
  const cx = size / 2
  const cy = size / 2
  const a = 8
  const b = 14
  const maxAngle = 3.5 * Math.PI * 2 // ~3.5 turns
  const steps = 300
  const path = spiralPath(cx, cy, a, b, maxAngle, steps)

  // Generate node positions along the spiral
  const defaultEvents: JourneyEvent[] = [
    { id: "n1", type: "milestone", title: "Birth Chart", date: "Jan 2024" },
    { id: "n2", type: "consultation", title: "First Reading", date: "Jan 2024" },
    { id: "n3", type: "remedy", title: "Sun Meditation", date: "Feb 2024" },
    { id: "n4", type: "prediction", title: "Career Window", date: "Mar 2024" },
    { id: "n5", type: "consultation", title: "Dr. Sarah", date: "May 2024" },
    { id: "n6", type: "milestone", title: "Verified", date: "May 2024" },
    { id: "n7", type: "remedy", title: "Venus Mantra", date: "Jul 2024" },
    { id: "n8", type: "prediction", title: "Job Offer", date: "Aug 2024" },
  ]
  const allEvents = events.length > 0 ? events : defaultEvents

  const nodePositions = allEvents.map((evt, i) => {
    const theta = (i / (allEvents.length - 1)) * maxAngle * 0.9 + 0.3
    return { ...spiralPoint(cx, cy, a, b, theta), event: evt, index: i }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={cn("w-full h-full", className)}>
      <defs>
        <radialGradient id="spiral-bg-gradient">
          <stop offset="0%" stopColor="var(--color-brand-tint)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--color-brand-tint)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx={cx} cy={cy} r={size * 0.48} fill="url(#spiral-bg-gradient)" />

      {/* Spiral path */}
      <motion.path
        d={path}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Center dot — represents birth / start of journey */}
      <motion.circle
        cx={cx}
        cy={cy}
        r="5"
        fill="var(--color-brand)"
        filter="url(#node-glow)"
        initial={animate ? { scale: 0 } : undefined}
        animate={animate ? { scale: [1, 1.15, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <circle cx={cx} cy={cy} r="2" fill="var(--color-surface)" />

      {/* Event nodes */}
      {nodePositions.map((node) => {
        const style = nodeStyles[node.event.type] || nodeStyles.journal
        const isMilestone = node.event.type === "milestone"
        const nodeR = isMilestone ? 6 : 4.5

        return (
          <motion.g
            key={node.event.id}
            initial={animate ? { opacity: 0, scale: 0 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ delay: 0.8 + node.index * 0.18, duration: 0.4, ease: "backOut" }}
          >
            {/* Glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={nodeR + 6}
              fill={style.glow}
              opacity="0.15"
              filter="url(#node-glow)"
              animate={animate ? { scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.index * 0.3 }}
            />
            {/* Node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={nodeR}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth="2"
            />
            {/* Inner dot */}
            <circle cx={node.x} cy={node.y} r="1.5" fill={style.stroke} />

            {/* Label */}
            {showLabels && node.event.title && (
              <text
                x={node.x + 12}
                y={node.y + 4}
                fill="var(--color-ink-secondary)"
                fontSize="10"
                fontFamily="var(--font-sans)"
              >
                {node.event.title}
              </text>
            )}
          </motion.g>
        )
      })}
    </svg>
  )
}

// ── JourneyArc ──────────────────────────────────────────────────────────────

interface ArcProps {
  size?: number
  events?: JourneyEvent[]
  progress?: number // 0-1
  className?: string
  animate?: boolean
}

export function JourneyArc({
  size = 180,
  events = [],
  progress = 1,
  className,
  animate = true,
}: ArcProps) {
  const cx = size / 2
  const cy = size * 0.72
  const r = size * 0.38
  const startAngle = Math.PI // 180°
  const endAngle = 0 // 0°
  const totalAngle = startAngle - endAngle

  // Arc path
  const startX = cx + r * Math.cos(startAngle)
  const startY = cy + r * Math.sin(startAngle)
  const endX = cx + r * Math.cos(endAngle)
  const endY = cy + r * Math.sin(endAngle)
  const arcPath = `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`

  // Progress arc path
  const progressAngle = startAngle - totalAngle * progress
  const progressX = cx + r * Math.cos(progressAngle)
  const progressY = cy + r * Math.sin(progressAngle)
  const largeArc = totalAngle * progress > Math.PI ? 1 : 0
  const progressPath = `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${progressX} ${progressY}`

  // Node positions
  const defaultEvents: JourneyEvent[] = [
    { id: "a1", type: "milestone" },
    { id: "a2", type: "consultation" },
    { id: "a3", type: "prediction" },
    { id: "a4", type: "remedy" },
    { id: "a5", type: "milestone" },
  ]
  const allEvents = events.length > 0 ? events : defaultEvents
  const nodePositions = allEvents.map((evt, i) => {
    const theta = startAngle - (i / (allEvents.length - 1)) * totalAngle
    return { x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta), event: evt, index: i }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size * 0.85}`} className={cn("w-full h-full", className)}>
      <defs>
        <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background arc */}
      <path d={arcPath} fill="none" stroke="var(--color-line)" strokeWidth="2" strokeLinecap="round" />

      {/* Progress arc */}
      <motion.path
        d={progressPath}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Nodes */}
      {nodePositions.map((node) => {
        const style = nodeStyles[node.event.type] || nodeStyles.journal
        const reached = node.index / (allEvents.length - 1) <= progress
        return (
          <motion.g
            key={node.event.id}
            initial={animate ? { opacity: 0, scale: 0 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ delay: 0.3 + node.index * 0.12, duration: 0.3 }}
          >
            {reached && (
              <circle cx={node.x} cy={node.y} r="8" fill={style.glow} opacity="0.15" filter="url(#arc-glow)" />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={reached ? 4 : 3}
              fill={reached ? style.fill : "var(--color-surface)"}
              stroke={reached ? style.stroke : "var(--color-line)"}
              strokeWidth="2"
            />
          </motion.g>
        )
      })}
    </svg>
  )
}

// ── JourneyRing ──────────────────────────────────────────────────────────────

interface RingProps {
  size?: number
  value?: number // 0-100
  label?: string
  sublabel?: string
  className?: string
  animate?: boolean
}

export function JourneyRing({
  size = 120,
  value = 75,
  label,
  sublabel,
  className,
  animate = true,
}: RingProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="100%" stopColor="var(--color-gold-bright)" />
          </linearGradient>
          <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-surface-3)" strokeWidth="6" />

        {/* Progress ring */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animate ? { strokeDashoffset: circumference } : undefined}
          animate={animate ? { strokeDashoffset: offset } : undefined}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          filter="url(#ring-glow)"
        />

        {/* End dot */}
        <motion.circle
          cx={cx + r}
          cy={cy}
          r="4"
          fill="var(--color-gold-bright)"
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2, duration: 0.3 }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-2xl font-semibold text-ink tabular-nums">{label}</span>}
        {sublabel && <span className="text-[11px] text-ink-tertiary uppercase tracking-wider">{sublabel}</span>}
      </div>
    </div>
  )
}

// ── JourneyMini ──────────────────────────────────────────────────────────────
// A tiny spiral icon for use in nav, headers, etc.

interface MiniProps {
  size?: number
  className?: string
}

export function JourneyMini({ size = 24, className }: MiniProps) {
  const cx = size / 2
  const cy = size / 2
  const path = spiralPath(cx, cy, 1, 2.5, 3 * Math.PI * 2, 60)

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={cn("w-full h-full", className)}>
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="1.5" fill="currentColor" />
    </svg>
  )
}