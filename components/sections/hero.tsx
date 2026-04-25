"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { hero, site } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative pt-36 md:pt-44 pb-section md:pb-section-lg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 0%, rgb(var(--accent) / 0.08), transparent 70%), radial-gradient(50% 50% at 80% 10%, rgb(var(--accent) / 0.05), transparent 70%)",
        }}
      />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3"
        >
          <span className="relative inline-flex h-2 w-2 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="label-eyebrow">{hero.eyebrow}</span>
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
          <Link href="#contact" className="btn-primary">
            {site.cta.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="#work" className="btn-ghost">
            See Selected Work
            <ArrowDownRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-10"
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
