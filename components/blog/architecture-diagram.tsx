type Block = {
  title: string;
  subtitle?: string;
  items: string[];
};

type Props = {
  title?: string;
  blocks: Block[];
};

export function ArchitectureDiagram({ title, blocks }: Props) {
  return (
    <figure
      className="my-8 overflow-hidden rounded bg-panel"
      style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }}
    >
      {title && (
        <figcaption
          className="hairline-b px-4 py-2.5"
          style={{ background: "rgb(var(--muted-bg))" }}
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            {title}
          </span>
        </figcaption>
      )}
      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3 md:gap-5 md:p-7">
        {blocks.map((block, i) => (
          <div
            key={block.title}
            className="flex flex-col gap-3 rounded p-4 md:p-5"
            style={{
              borderWidth: "0.5px",
              borderStyle: "solid",
              borderColor: "rgb(var(--line))",
              background: "rgb(var(--bg))",
            }}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold tracking-tight">{block.title}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {block.subtitle && (
              <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                {block.subtitle}
              </span>
            )}
            <ul className="flex flex-col gap-1.5 pt-1">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[12.5px] leading-snug text-text"
                >
                  <span className="mr-2 text-accent" aria-hidden>
                    ›
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
}
