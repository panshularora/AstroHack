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
        "inline-flex items-center gap-1 rounded-full font-medium tracking-wide select-none",
        {
          "bg-zinc-900 text-zinc-400 border-zinc-700": variant === "default",
          "bg-zinc-100 text-zinc-950 border-zinc-100": variant === "brand" || variant === "gold",
          "bg-zinc-800 text-zinc-200 border-zinc-600": variant === "warning",
          "bg-emerald-950 text-emerald-400 border-emerald-800": variant === "success",
          "bg-red-950 text-red-400 border-red-800": variant === "danger",
          "bg-transparent text-zinc-200 border-zinc-600": variant === "outline",
        },
        {
          "px-1.5 py-0.5 text-[10px]": size === "sm",
          "px-2 py-0.5 text-[11px]": size === "md",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
