import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger" | "ivory"
  size?: "xs" | "sm" | "md" | "lg" | "icon"
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none cursor-pointer",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C14]",
          "disabled:pointer-events-none disabled:opacity-40",
          {
            "bg-amber-500 text-black font-bold hover:bg-amber-400 active:bg-amber-600 shadow-md shadow-amber-500/10": variant === "primary",
            "bg-white/10 text-white hover:bg-white/15 border border-white/15 shadow-xs": variant === "secondary",
            "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 shadow-xs": variant === "outline",
            "bg-transparent text-[#9CA3AF] hover:text-white hover:bg-white/10": variant === "ghost",
            "bg-amber-400 text-black font-bold hover:bg-amber-300 shadow-md shadow-amber-500/20": variant === "gold",
            "bg-red-500 text-white font-bold hover:bg-red-600 shadow-md": variant === "danger",
            "bg-white text-[#1C1917] border border-[#D6D0C2] hover:bg-[#F1EEE7] hover:border-[#1C1917]/30 shadow-xs font-semibold": variant === "ivory",
          },
          {
            "h-7 px-2.5 text-xs rounded-lg": size === "xs",
            "h-8 px-3 text-xs rounded-xl": size === "sm",
            "h-9.5 px-4 text-xs rounded-xl": size === "md",
            "h-11 px-5 text-sm rounded-xl": size === "lg",
            "h-9 w-9 rounded-xl": size === "icon",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button }