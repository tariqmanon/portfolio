import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors duration-hover ease-brand",
  {
    variants: {
      variant: {
        default: "text-subtle",
        accent: "text-accent",
        solid: "bg-accent text-bg",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      style={
        variant === "solid"
          ? undefined
          : { borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }
      }
      {...props}
    />
  );
}

export { Badge, badgeVariants };
