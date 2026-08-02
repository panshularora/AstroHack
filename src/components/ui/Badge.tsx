import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "gold" | "success" | "warning" | "danger" | "outline"
  size?: "sm" | "md"
}

function Badge({ className, variant = "default", size = "sm", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-sm font-mono font-semibold transition-all duration-150 border border-line/40",
        {
          "bg-surface-2 text-ink-secondary": variant === "default",
          "bg-brand-light text-brand": variant === "brand",
          "bg-gold-light text-gold": variant === "gold",
          "bg-success-light text-success": variant === "success",
          "bg-warning-light text-warning": variant === "warning",
          "bg-danger-light text-danger": variant === "danger",
          "bg-transparent text-ink-secondary border border-line": variant === "outline",
        },
        {
          "px-2 py-0.5 text-[11px]": size === "sm",
          "px-2.5 py-1 text-xs": size === "md",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }