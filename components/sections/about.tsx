"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { about, site } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="About" title="A bit about me." />

          <motion.figure
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mt-8 max-w-sm md:mt-10"
          >
            <div
              className="relative aspect-[3/4] overflow-hidden rounded bg-panel"
              style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }}
            >
              <Image
                src="/images/manon.jpeg"
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
                priority={false}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgb(var(--bg) / 0.55) 100%)",
                }}
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="text-sm text-text">{site.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                {site.location}
              </span>
            </figcaption>
          </motion.figure>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col gap-6">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                className="text-pretty text-base leading-relaxed text-text/90 md:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded md:mt-12 md:grid-cols-4" style={{ border: "0.5px solid rgb(var(--line))", background: "rgb(var(--line))" }}>
            {about.quickFacts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 bg-panel p-5">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                  {f.label}
                </dt>
                <dd className="font-mono text-2xl text-accent">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
