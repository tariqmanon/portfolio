type Step = {
  label: string;
  sub?: string;
};

type Props = {
  title?: string;
  steps: Step[];
};

export function WorkflowDiagram({ title, steps }: Props) {
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
      <div className="overflow-x-auto p-5 md:p-7">
        <ol
          className="flex min-w-max items-stretch gap-2 md:gap-3"
          aria-label={title || "Workflow diagram"}
        >
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <li key={step.label} className="flex items-stretch gap-2 md:gap-3">
                <div
                  className="flex w-44 flex-col justify-center rounded p-3 md:w-52 md:p-4"
                  style={{
                    borderWidth: "0.5px",
                    borderStyle: "solid",
                    borderColor: "rgb(var(--line))",
                    background: "rgb(var(--bg))",
                  }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-sm font-semibold leading-snug">
                    {step.label}
                  </span>
                  {step.sub && (
                    <span className="mt-1 font-mono text-[11px] leading-snug text-subtle">
                      {step.sub}
                    </span>
                  )}
                </div>
                {!isLast && (
                  <div
                    className="flex items-center text-accent"
                    aria-hidden
                  >
                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                      <path
                        d="M0 7 H18 M14 2 L20 7 L14 12"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
