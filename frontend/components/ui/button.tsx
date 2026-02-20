import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const buttonVariants = {
  default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20",
  outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white",
  ghost: "hover:bg-white/10 text-white hover:text-indigo-400",
};

const buttonSizes = {
  default: "h-11 px-6 py-2",
  sm: "h-9 rounded-md px-3 text-xs",
  lg: "h-12 rounded-full px-8 text-base",
  icon: "h-10 w-10 flex items-center justify-center",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          buttonVariants[variant], 
          buttonSizes[size], 
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export { Button }