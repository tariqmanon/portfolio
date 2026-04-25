"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { stack } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Stack() {
  return (
    <section id="stack" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I reach for."
          description="The languages, frameworks and platforms I work with day-to-day."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded md:grid-cols-2 lg:grid-cols-3" style={{ border: "0.5px solid rgb(var(--line))", background: "rgb(var(--line))" }}>
          {stack.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.04 }}
              className="flex flex-col gap-4 bg-panel p-6"
            >
              <span className="label-eyebrow">{g.group}</span>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <li
                    key={t}
                    className="rounded-sm px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-subtle transition-colors duration-hover ease-brand hover:text-accent"
                    style={{ border: "0.5px solid rgb(var(--line))" }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
