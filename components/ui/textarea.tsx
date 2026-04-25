import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex w-full rounded bg-bg px-4 py-3 text-sm text-text outline-none transition-colors duration-hover ease-brand placeholder:text-subtle focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
