import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 active:scale-98",
  {
    variants: {
      variant: {
        default: "bg-stone-900 text-stone-50 shadow-sm hover:bg-stone-800",
        destructive: "bg-rose-600 text-white shadow-sm hover:bg-rose-500",
        outline: "border border-stone-300 bg-white/90 text-stone-800 hover:bg-stone-100 shadow-xs",
        secondary: "bg-stone-200 text-stone-900 hover:bg-stone-300",
        ghost: "text-stone-700 hover:bg-stone-200/60 hover:text-stone-900",
        link: "text-amber-700 underline-offset-4 hover:underline",
        glow: "bg-stone-900 text-amber-300 shadow-md hover:bg-stone-800 hover:text-amber-200",
        glass: "glass-card text-stone-900 border-stone-200 hover:bg-stone-100 shadow-xs",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-2xl px-6 text-sm",
        icon: "h-10 w-10 rounded-xl",
        pill: "h-9 px-4 rounded-full text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }