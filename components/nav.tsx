"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Monogram } from "./monogram";
import { ThemeToggle } from "./theme-toggle";
import { nav } from "@/lib/data";
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
          <Link
            href="#contact"
            className="hidden btn-primary md:inline-flex"
          >
            Book a Call
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-subtle transition-colors duration-hover ease-brand hover:text-accent"
            style={{ border: "0.5px solid rgb(var(--line))" }}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
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
            <Link href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-fit">
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
