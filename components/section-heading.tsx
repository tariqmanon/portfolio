import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-4 max-w-3xl", className)}>
      <span className="label-eyebrow">{eyebrow}</span>
      <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-[40px]">
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-base leading-relaxed text-subtle md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
