import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger"
  size?: "xs" | "sm" | "md" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none",
          "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          "disabled:pointer-events-none disabled:opacity-40",
          {
            "bg-brand text-white hover:bg-brand-hover active:bg-brand-active active:scale-[0.97] shadow-sm hover:shadow-md": variant === "primary",
            "bg-surface-2 text-ink hover:bg-surface-3 active:scale-[0.97] border border-line shadow-xs": variant === "secondary",
            "bg-surface text-ink hover:bg-surface-2 border border-line-strong active:scale-[0.97] shadow-xs": variant === "outline",
            "bg-transparent text-ink-secondary hover:text-ink hover:bg-surface-2/60 active:scale-[0.97]": variant === "ghost",
            "bg-gold-bright text-white hover:bg-gold active:scale-[0.97] shadow-sm hover:shadow-glow-gold": variant === "gold",
            "bg-danger text-white hover:bg-danger/90 active:scale-[0.97] shadow-sm": variant === "danger",
          },
          {
            "h-7 px-2.5 text-button rounded-sm": size === "xs",
            "h-8 px-3 text-button rounded-md": size === "sm",
            "h-9 px-4 text-button rounded-md": size === "md",
            "h-11 px-5 text-button-lg rounded-md": size === "lg",
            "h-9 w-9 rounded-md": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }