import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors duration-hover ease-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-bg hover:opacity-90 uppercase tracking-cta text-[12px]",
        outline:
          "bg-transparent text-text uppercase tracking-cta text-[12px] [border-width:0.5px] [border-style:solid] [border-color:rgb(var(--line))] hover:[border-color:rgb(var(--accent))] hover:text-accent",
        ghost: "text-subtle hover:text-accent",
        link: "text-accent underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        secondary:
          "bg-secondary text-secondary-foreground hover:opacity-90",
      },
      size: {
        default: "h-11 px-5 py-3",
        sm: "h-9 px-4 py-2 text-[11px]",
        lg: "h-12 px-6 py-3.5",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
