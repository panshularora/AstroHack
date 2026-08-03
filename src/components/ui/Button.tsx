import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger" | "ivory"
  size?: "xs" | "sm" | "md" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none cursor-pointer",
          "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-40",
          {
            "bg-brand text-white hover:bg-brand-hover active:bg-brand-active active:scale-[0.97] shadow-sm hover:shadow-md": variant === "primary",
            "bg-white/10 text-white hover:bg-white/15 active:scale-[0.97] border border-white/15 shadow-xs": variant === "secondary",
            "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 active:scale-[0.97] shadow-xs": variant === "outline",
            "bg-transparent text-ink-secondary hover:text-white hover:bg-white/10 active:scale-[0.97]": variant === "ghost",
            "bg-gold-bright text-white hover:bg-gold active:scale-[0.97] shadow-sm hover:shadow-glow-gold": variant === "gold",
            "bg-danger text-white hover:bg-danger/90 active:scale-[0.97] shadow-sm": variant === "danger",
            "bg-white text-[#1C1917] border border-[#D6D0C2] hover:bg-[#F1EEE7] hover:border-[#1C1917]/30 active:scale-[0.97] shadow-xs font-semibold": variant === "ivory",
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