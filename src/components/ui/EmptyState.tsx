import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-16 px-6", className)}>
      {icon && (
        <div className="w-14 h-14 rounded-lg bg-surface-2 border border-line flex items-center justify-center mb-5 text-ink-tertiary shadow-xs">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-ink mb-1.5 tracking-tight">{title}</h3>
      {description && <p className="text-sm text-ink-tertiary max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
