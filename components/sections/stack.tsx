"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/magicui/marquee";
import { stack } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.4, 0, 0.2, 1] as const;

const allTech = stack.flatMap((g) => g.items);

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
                  <Badge
                    key={t}
                    className="px-2.5 py-1 transition-colors duration-hover ease-brand hover:text-accent hover:[border-color:rgb(var(--accent)/0.5)]"
                  >
                    {t}
                  </Badge>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className={cn(
          "relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden rounded",
        )}
        style={{ border: "0.5px solid rgb(var(--line))" }}
        >
          <Marquee pauseOnHover className="[--duration:40s]">
            {allTech.map((t) => (
              <span
                key={`${t}-a`}
                className="mx-2 font-mono text-[12px] uppercase tracking-widest text-subtle transition-colors duration-hover ease-brand hover:text-accent"
              >
                {t}
              </span>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {allTech.slice().reverse().map((t) => (
              <span
                key={`${t}-b`}
                className="mx-2 font-mono text-[12px] uppercase tracking-widest text-subtle/70 transition-colors duration-hover ease-brand hover:text-accent"
              >
                {t}
              </span>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg to-transparent" />
        </div>
      </div>
    </section>
  );
}
