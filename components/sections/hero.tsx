"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { hero, site } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-8 md:pt-44 md:pb-12 lg:pb-14">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_top,white,transparent_70%)]",
          "fill-accent/15"
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 0%, rgb(var(--accent) / 0.10), transparent 70%), radial-gradient(50% 50% at 80% 10%, rgb(var(--accent) / 0.05), transparent 70%)",
        }}
      />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-panel/60 px-3.5 py-1.5 backdrop-blur-sm transition-colors duration-hover ease-brand hover:bg-panel"
            style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }}
          >
            <Sparkles className="h-3 w-3 text-accent" />
            <AnimatedShinyText className="font-mono text-[11px] uppercase tracking-widest">
              {hero.eyebrow}
            </AnimatedShinyText>
            <ArrowRight className="h-3 w-3 text-subtle transition-transform duration-hover ease-brand group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="mt-8 max-w-5xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-subtle md:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="#work">
              See Selected Work
              <ArrowDownRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href={site.resume.href} download>
              {site.resume.label}
              <Download className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-10 md:mt-16"
        >
          {hero.meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-1 hairline-t pt-4">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                {m.label}
              </dt>
              <dd className="text-sm md:text-base text-text">{m.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
