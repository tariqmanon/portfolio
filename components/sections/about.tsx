"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { about } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="About" title="A bit about me." />
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

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded md:grid-cols-4" style={{ border: "0.5px solid rgb(var(--line))", background: "rgb(var(--line))" }}>
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
