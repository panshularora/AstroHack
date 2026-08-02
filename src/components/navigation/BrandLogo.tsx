import { cn } from "@/lib/utils"

/**
 * AstroLive — Astrolabe Emblem
 * A hand-drawn astronomical instrument mark: graduated ring, horizon arc,
 * and a rising celestial node. Sharp, architectural, no pill containers.
 */
export function BrandLogo({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="AstroLive"
    >
      {/* Outer graduated ring */}
      <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.35" />
      {/* Ticks — astronomical graduations */}
      {Array.from({ length: 24 }).map((_, i) => {
        const rad = (i * 15 * Math.PI) / 180
        const r1 = i % 6 === 0 ? 16 : 15
        const r2 = 17
        return (
          <line
            key={i}
            x1={18 + r1 * Math.cos(rad)}
            y1={18 + r1 * Math.sin(rad)}
            x2={18 + r2 * Math.cos(rad)}
            y2={18 + r2 * Math.sin(rad)}
            stroke="currentColor"
            strokeWidth="0.7"
            opacity={i % 6 === 0 ? 0.7 : 0.35}
          />
        )
      })}
      {/* Horizon arc */}
      <path d="M5 27 Q18 20 31 27" stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.55" />
      {/* Rising celestial node — the golden mark */}
      <circle cx="18" cy="12" r="2.6" fill="#F59E0B" />
      <circle cx="18" cy="12" r="5" stroke="#F59E0B" strokeWidth="0.7" opacity="0.4" />
      {/* Axis needle */}
      <line x1="18" y1="6" x2="18" y2="26" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />
    </svg>
  )
}

/**
 * Wordmark — AstroLive in Instrument Serif with Geist Mono subtitle.
 */
export function AstroLiveWordmark({ className, subtitle = "Lifelong Companion" }: { className?: string; subtitle?: string }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="font-display text-lg tracking-tight text-current">AstroLive</span>
      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[currentColor]/55">
        {subtitle}
      </span>
    </span>
  )
}