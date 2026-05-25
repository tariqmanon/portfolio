type Row = {
  criterion: string;
  a: string;
  b: string;
};

type Props = {
  caption?: string;
  headerA: string;
  headerB: string;
  rows: Row[];
};

export function CompareTable({ caption, headerA, headerB, rows }: Props) {
  return (
    <figure
      className="my-6 overflow-hidden rounded bg-panel"
      style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }}
    >
      {caption && (
        <figcaption
          className="hairline-b px-4 py-2.5"
          style={{ background: "rgb(var(--muted-bg))" }}
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            {caption}
          </span>
        </figcaption>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ background: "rgb(var(--muted-bg))" }}>
              <th className="hairline-b px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-subtle">
                Criterion
              </th>
              <th className="hairline-b px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-subtle">
                {headerA}
              </th>
              <th className="hairline-b px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-accent">
                {headerB}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.criterion} className={i !== rows.length - 1 ? "hairline-b" : undefined}>
                <td className="px-4 py-3 align-top font-medium text-text">{row.criterion}</td>
                <td className="px-4 py-3 align-top text-subtle">{row.a}</td>
                <td className="px-4 py-3 align-top text-text">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
