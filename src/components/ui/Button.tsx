import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger" | "ivory"
  size?: "xs" | "sm" | "md" | "lg" | "icon"
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none cursor-pointer",
          "transition-[background-color,color,border-color,transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-zinc-300",
          "disabled:pointer-events-none disabled:opacity-40",
          "rounded-full",
          {
            "bg-zinc-100 text-zinc-950 hover:bg-white active:bg-zinc-200": variant === "primary" || variant === "ivory",
            "bg-[#E8C872] text-[#1a1408] hover:bg-[#F0D78A]": variant === "gold",
            "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700": variant === "secondary",
            "bg-transparent text-zinc-100 border border-zinc-700 hover:bg-zinc-900 hover:border-zinc-500": variant === "outline",
            "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-500": variant === "danger",
          },
          {
            "h-7 px-2.5 text-xs": size === "xs",
            "h-8 px-3 text-xs": size === "sm",
            "h-9 px-4 text-sm": size === "md",
            "h-11 px-5 text-sm": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
