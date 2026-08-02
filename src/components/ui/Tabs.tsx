import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabItem {
  value: string
  label: string
}

interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
  layoutId?: string
}

export function Tabs({ items, value, onChange, className, layoutId = "tabs" }: TabsProps) {
  return (
    <div className={cn("inline-flex items-center gap-0.5 rounded-lg bg-surface-2 p-1 border border-line shadow-xs", className)}>
      {items.map(item => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            "relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-200",
            value === item.value ? "text-ink" : "text-ink-tertiary hover:text-ink-secondary"
          )}
        >
          {value === item.value && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-surface rounded-md shadow-sm"
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </button>
      ))}
    </div>
  )
}