"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { posts } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Blog() {
  return (
    <section id="blog" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from shipping real client work."
          description="Short, practical posts on Shopify, WooCommerce and performance — informed by the day-to-day. CMS launching soon."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              className="card group flex h-full flex-col gap-4 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-subtle" style={{ border: "0.5px solid rgb(var(--line))" }}>
                  {p.tag}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                  {p.readingTime}
                </span>
              </div>

              <h3 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">
                {p.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-subtle">
                {p.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between pt-3 hairline-t">
                <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                  {p.date}
                </span>
                <ArrowUpRight className="h-4 w-4 text-subtle transition-colors duration-hover ease-brand group-hover:text-accent" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
