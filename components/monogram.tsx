import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <Link
      href="#top"
      aria-label="Tariq Manon home"
      className={cn(
        "group inline-flex items-center transition-opacity duration-hover ease-brand hover:opacity-80",
        className
      )}
    >
      <Image
        src="/images/brand/logo-light@2x.png"
        alt="Tariq Manon"
        width={640}
        height={160}
        priority
        className="block h-8 w-auto dark:hidden"
        sizes="160px"
      />
      <Image
        src="/images/brand/logo-dark@2x.png"
        alt="Tariq Manon"
        width={640}
        height={160}
        priority
        className="hidden h-8 w-auto dark:block"
        sizes="160px"
      />
    </Link>
  );
}
