type Node = {
  name: string;
  note?: string;
  children?: Node[];
};

type Props = {
  title?: string;
  root: Node;
};

function renderTree(node: Node, depth = 0, isLast = true, prefix = ""): React.ReactNode[] {
  const lines: React.ReactNode[] = [];
  const isDir = !!node.children?.length;
  const connector = depth === 0 ? "" : isLast ? "└─ " : "├─ ";
  const name = isDir ? `${node.name}/` : node.name;

  lines.push(
    <div key={`${prefix}${node.name}-${depth}`} className="flex">
      <span className="select-none whitespace-pre text-subtle">{prefix + connector}</span>
      <span className={isDir ? "text-accent" : "text-text"}>{name}</span>
      {node.note && (
        <span className="ml-3 text-subtle">
          <span className="text-subtle/70">{"// "}</span>
          {node.note}
        </span>
      )}
    </div>
  );

  if (isDir && node.children) {
    const newPrefix = depth === 0 ? "" : prefix + (isLast ? "   " : "│  ");
    node.children.forEach((child, i) => {
      const last = i === node.children!.length - 1;
      lines.push(...renderTree(child, depth + 1, last, newPrefix));
    });
  }
  return lines;
}

export function FileTree({ title, root }: Props) {
  return (
    <figure
      className="my-6 overflow-hidden rounded bg-panel"
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
      <div className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.7]">
        {renderTree(root)}
      </div>
    </figure>
  );
}
