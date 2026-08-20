import { cn } from "@/lib/utils"
import { LAYER_META, type StrandLayerId } from "@/lib/loop"

const ORDER: StrandLayerId[] = ["M", "D", "C", "A"]

interface LayerChipsProps {
  active: Set<StrandLayerId>
  onToggle: (id: StrandLayerId) => void
  className?: string
}

export function LayerChips({ active, onToggle, className }: LayerChipsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-tertiary mr-1">
        Show
      </span>
      {ORDER.map((id) => {
        const meta = LAYER_META[id]
        const on = active.has(id)
        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-none border px-2.5 py-1.5 font-mono text-[11px] font-semibold transition-colors",
              on
                ? cn(meta.bg, meta.border, meta.text)
                : "bg-surface border-line text-ink-tertiary hover:text-ink-secondary"
            )}
            title={meta.full}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", on ? meta.color : "bg-ink-quaternary")} />
            <span>{id}</span>
            <span className="hidden sm:inline font-sans font-medium opacity-80">{meta.name}</span>
          </button>
        )
      })}
    </div>
  )
}
