import { cn } from "@/lib/utils";

type Props = {
  language?: string;
  filename?: string;
  children: string;
  className?: string;
};

export function CodeBlock({ language, filename, children, className }: Props) {
  return (
    <figure
      className={cn(
        "my-6 overflow-hidden rounded bg-panel",
        className
      )}
      style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }}
    >
      {(filename || language) && (
        <figcaption
          className="hairline-b flex items-center justify-between px-4 py-2.5"
          style={{ background: "rgb(var(--muted-bg))" }}
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            {filename || language}
          </span>
          {language && filename && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              {language}
            </span>
          )}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-[1.7] md:text-[13.5px]">
        <code className="font-mono text-text">{children}</code>
      </pre>
    </figure>
  );
}
