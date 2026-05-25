import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Prose({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        className,
        "max-w-none text-[15px] leading-[1.75] text-text md:text-base",
        "[&>p]:my-5 [&>p]:text-pretty",
        "[&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:text-balance [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight md:[&>h2]:text-3xl",
        "[&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:tracking-tight",
        "[&>h4]:mt-8 [&>h4]:mb-2 [&>h4]:text-base [&>h4]:font-semibold",
        "[&>ul]:my-5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:my-2",
        "[&>ol]:my-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol>li]:my-2",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80",
        "[&_strong]:font-semibold [&_strong]:text-text",
        "[&_code]:font-mono [&_code]:text-[0.86em] [&_code]:rounded-sm [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-accent",
        "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-subtle"
      )}
      style={{
        // inline border for code chips so it respects --line token
        ["--tw-prose-bg" as never]: "rgb(var(--panel))",
      }}
      {...props}
    >
      <style>{`
        .prose-body code:not(pre code) {
          background: rgb(var(--panel));
          border: 0.5px solid rgb(var(--line));
        }
      `}</style>
      <div className="prose-body">{children}</div>
    </div>
  );
}
