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
        "inline-flex items-center gap-1 rounded-full font-mono font-bold uppercase tracking-wider transition-all duration-200 border shadow-xs select-none",
        {
          "bg-white/5 text-[#9CA3AF] border-white/10": variant === "default",
          "bg-amber-500/20 text-amber-300 border-amber-500/30": variant === "brand" || variant === "gold" || variant === "warning",
          "bg-emerald-500/20 text-emerald-300 border-emerald-500/30": variant === "success",
          "bg-red-500/20 text-red-300 border-red-500/30": variant === "danger",
          "bg-transparent text-white border-white/20": variant === "outline",
        },
        {
          "px-2.5 py-0.5 text-[9px]": size === "sm",
          "px-3 py-1 text-[10px]": size === "md",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }