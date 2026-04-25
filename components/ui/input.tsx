import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded bg-bg px-4 py-3 text-sm text-text outline-none transition-colors duration-hover ease-brand placeholder:text-subtle focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
