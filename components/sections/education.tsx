"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { education, development } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Education() {
  return (
    <section id="education" className="section">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Education & Development"
            title="Formal training and ongoing learning."
          />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-10">
          <div>
            <h3 className="label-eyebrow mb-4">Education</h3>
            <ul className="flex flex-col">
              {education.map((e) => (
                <motion.li
                  key={e.school}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease }}
                  className="hairline-t hairline-b py-5 flex flex-col gap-1"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="text-base font-medium md:text-lg">{e.school}</h4>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                      {e.period}
                    </span>
                  </div>
                  <div className="text-sm text-subtle">{e.degree}</div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-eyebrow mb-4">Professional Development</h3>
            <ul className="flex flex-col gap-3">
              {development.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.04 }}
                  className="flex gap-3 text-sm leading-relaxed text-text/90 md:text-base"
                >
                  <span className="mt-2 inline-block h-px w-3 shrink-0 bg-accent/60" />
                  <span className="text-pretty">{d}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
