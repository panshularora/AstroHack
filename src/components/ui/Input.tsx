import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-line bg-surface-2/50 px-3.5 py-2 text-sm text-ink",
          "placeholder:text-ink-quaternary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-offset-0 focus-visible:border-brand focus-visible:bg-surface",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }