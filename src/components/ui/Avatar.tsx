import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  fallback: string
  size?: "xs" | "sm" | "md" | "lg"
}

const sizeMap = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
}

export function Avatar({ src, fallback, size = "md", className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center font-semibold overflow-hidden shrink-0",
        "bg-gradient-to-br from-brand-light to-brand-tint text-brand ring-1 ring-line shadow-xs",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={fallback} className="w-full h-full object-cover" />
      ) : (
        fallback.slice(0, 2).toUpperCase()
      )}
    </div>
  )
}
