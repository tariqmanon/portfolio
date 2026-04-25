"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Monogram } from "./monogram";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-page ease-brand",
        scrolled ? "backdrop-blur-md" : ""
      )}
      style={{
        background: scrolled ? "rgb(var(--bg) / 0.72)" : "transparent",
        borderBottom: scrolled ? "0.5px solid rgb(var(--line))" : "0.5px solid transparent",
      }}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Monogram />

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[12px] uppercase tracking-wider text-subtle transition-colors duration-hover ease-brand hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden md:inline-flex">
            <Link href={site.cta.href} target="_blank" rel="noopener noreferrer">
              {site.cta.label}
            </Link>
          </Button>
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{ borderTop: "0.5px solid rgb(var(--line))", background: "rgb(var(--bg))" }}
        >
          <div className="container-x flex flex-col gap-4 py-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-subtle transition-colors duration-hover ease-brand hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-fit">
              <Link
                href={site.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                {site.cta.label}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
