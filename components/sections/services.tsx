"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="What I build for clients."
          description="Most engagements start with a Shopify build or migration, a custom WooCommerce site, or a Next.js project. Pricing below is a starting point — every project is scoped to fit."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.04 }}
            >
              <Card className="flex flex-col gap-5 p-7 h-full hover:[border-color:rgb(var(--accent)/0.5)]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {s.name}
                  </h3>
                  <span className="font-mono text-[12px] uppercase tracking-widest text-accent">
                    from {s.from}
                  </span>
                </div>
                <p className="text-pretty text-sm leading-relaxed text-subtle md:text-base">
                  {s.description}
                </p>
                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-text">
                      <Check className="h-3.5 w-3.5 text-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
