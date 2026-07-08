"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  const pathname = usePathname();
  // On the homepage, smooth-scroll to the top. On any other route, navigate home.
  const href = pathname === "/" ? "#top" : "/";

  return (
    <Link
      href={href}
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
