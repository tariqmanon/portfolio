"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked."
        />

        <ol className="mt-10 flex flex-col md:mt-12">
          {experience.map((role, i) => (
            <motion.li
              key={role.company}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              className="grid grid-cols-1 gap-4 py-8 hairline-t lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-4">
                <div className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                  {role.period}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                  {role.company}
                </h3>
                <div className="mt-1 text-sm text-accent">{role.role}</div>
                <div className="mt-1 text-sm text-subtle">{role.location}</div>
              </div>

              <ul className="lg:col-span-8 flex flex-col gap-3">
                {role.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-text/90 md:text-base">
                    <span className="mt-2 inline-block h-px w-3 shrink-0 bg-accent/60" />
                    <span className="text-pretty">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
          <li className="hairline-t" aria-hidden />
        </ol>
      </div>
    </section>
  );
}
