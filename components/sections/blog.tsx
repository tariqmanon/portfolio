"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
            >
              <Card className="group flex h-full flex-col gap-4 p-6 hover:[border-color:rgb(var(--accent)/0.5)]">
                <div className="flex items-center justify-between">
                  <Badge>{p.tag}</Badge>
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
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
