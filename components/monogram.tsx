import Link from "next/link";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <Link
      href="#top"
      aria-label="Tariq Manon — home"
      className={cn(
        "group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-text transition-colors duration-hover ease-brand hover:text-accent",
        className
      )}
    >
      <span
        className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-medium tracking-wider text-accent"
        style={{ border: "0.5px solid rgb(var(--line))" }}
      >
        TM
      </span>
      <span className="hidden sm:inline text-text/90">Tariq Manon</span>
    </Link>
  );
}
