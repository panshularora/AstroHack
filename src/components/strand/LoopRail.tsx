import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { LOOP_STAGES, type LoopStageId } from "@/lib/loop"

interface LoopRailProps {
  active?: LoopStageId | null
  compact?: boolean
  className?: string
  onSelect?: (id: LoopStageId) => void
}

export function LoopRail({ active, compact = false, className, onSelect }: LoopRailProps) {
  const navigate = useNavigate()

  return (
    <div className={cn("w-full", className)}>
      {!compact && (
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-mono uppercase tracking-wide text-zinc-500">Your journey</p>
          <p className="text-[10px] text-zinc-600 hidden sm:block">Talk → save → check results</p>
        </div>
      )}
      <div className="flex items-stretch gap-0 overflow-x-auto no-scrollbar border border-zinc-800">
        {LOOP_STAGES.map((stage, i) => {
          const isActive = active === stage.id
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                onSelect?.(stage.id)
                navigate(stage.href)
              }}
              title={stage.description}
              className={cn(
                "flex flex-col items-start px-3 py-2 min-w-[4.75rem] border-r border-zinc-800 last:border-r-0 transition-colors",
                isActive
                  ? "bg-zinc-100 text-zinc-950"
                  : "bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              )}
            >
              <span className={cn("text-[9px] font-mono", isActive ? "text-zinc-500" : "text-zinc-600")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-medium mt-0.5">{stage.short}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
