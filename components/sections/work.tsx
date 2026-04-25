"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/magicui/border-beam";
import { projects } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected Work"
          title="A few things I&apos;ve built recently."
          description="A selection of e-commerce, SaaS and marketing builds shipped between 2022 and 2025 — most under Tuliptech, a few from earlier freelance work."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.04 }}
            >
              <Card className="group relative flex flex-col overflow-hidden h-full hover:[border-color:rgb(var(--accent)/0.5)]">
                {i === 0 && <BorderBeam duration={8} size={220} />}

                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(var(--panel)) 0%, rgb(var(--bg)) 100%)",
                    borderBottom: "0.5px solid rgb(var(--line))",
                  }}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.title} — ${p.category}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-page ease-brand group-hover:scale-[1.02]"
                      priority={i < 2}
                    />
                  ) : (
                    <>
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-60"
                        style={{
                          background:
                            "radial-gradient(60% 60% at 30% 30%, rgb(var(--accent) / 0.12), transparent 70%)",
                        }}
                      />
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="font-mono text-3xl tracking-widest text-accent/80">
                          {p.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-bg/70 backdrop-blur-sm">{p.category}</Badge>
                  </div>
                  <div className="absolute right-4 top-4">
                    <span className="rounded-sm bg-bg/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-subtle backdrop-blur-sm">
                      {p.year}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {p.title}
                    </h3>
                    {p.href && (
                      <Link
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${p.title}`}
                        className="text-subtle transition-colors duration-hover ease-brand group-hover:text-accent"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </Link>
                    )}
                  </div>

                  <p className="text-pretty text-sm leading-relaxed text-subtle md:text-base">
                    {p.summary}
                  </p>

                  {p.metrics && (
                    <ul className="flex flex-col gap-1">
                      {p.metrics.map((m) => (
                        <li
                          key={m}
                          className="font-mono text-[12px] tracking-wide text-accent"
                        >
                          — {m}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {p.stack.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>

                  {p.caseStudy && (
                    <div className="hairline-t pt-4">
                      <Link
                        href={p.caseStudy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent transition-opacity duration-hover ease-brand hover:opacity-80"
                      >
                        Read Case Study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {more.length > 0 && (
          <div className="mt-16">
            <h3 className="label-eyebrow mb-6">Also Built</h3>
            <ul className="flex flex-col">
              {more.map((p) => (
                <li
                  key={p.title}
                  className="hairline-t group flex flex-wrap items-center justify-between gap-4 py-5 transition-colors duration-hover ease-brand last:hairline-b"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <h4 className="text-base font-medium md:text-lg">{p.title}</h4>
                      <Badge>{p.category}</Badge>
                    </div>
                    <p className="max-w-2xl text-sm text-subtle">{p.summary}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] tracking-widest text-subtle">
                      {p.year}
                    </span>
                    {p.caseStudy && (
                      <Link
                        href={p.caseStudy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] uppercase tracking-widest text-accent transition-opacity duration-hover ease-brand hover:opacity-80"
                      >
                        Case Study
                      </Link>
                    )}
                    {p.href && (
                      <Link
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${p.title}`}
                        className="text-subtle transition-colors duration-hover ease-brand group-hover:text-accent"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
