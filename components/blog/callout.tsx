import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  tone?: "accent" | "warn";
  children: React.ReactNode;
  className?: string;
};

export function Callout({ label = "Note", tone = "accent", children, className }: Props) {
  return (
    <aside
      className={cn(
        "my-6 rounded p-5",
        tone === "warn" ? "bg-panel" : "bg-panel",
        className
      )}
      style={{
        borderWidth: "0.5px",
        borderStyle: "solid",
        borderColor: tone === "warn" ? "rgb(var(--destructive) / 0.5)" : "rgb(var(--accent) / 0.45)",
      }}
    >
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
        {label}
      </div>
      <div className="text-[14.5px] leading-relaxed text-subtle">{children}</div>
    </aside>
  );
}
