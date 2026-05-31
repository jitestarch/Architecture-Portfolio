import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-[11px] uppercase tracking-widest font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#111111] text-white hover:bg-[#2563EB]",
        destructive: "bg-red-500 text-white hover:bg-red-500/90",
        outline: "border border-gray-200 bg-transparent text-[#111111] hover:border-black",
        secondary: "bg-gray-100 text-[#111111] hover:bg-gray-200",
        ghost: "hover:text-[#2563EB]",
        link: "text-[#2563EB] border-b border-[#2563EB] pb-1 hover:text-gray-400 hover:border-gray-400",
        accent: "bg-[#2563EB] text-white hover:bg-[#111111]",
      },
      size: {
        default: "px-8 py-4",
        sm: "h-9 px-4",
        lg: "px-10 py-5",
        icon: "h-10 w-10",
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
