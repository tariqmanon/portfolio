import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { posts, site } from "@/lib/data";

const BLOG_URL = `${site.url}/blog`;
const BLOG_TITLE = "Writing — Shopify, WooCommerce and performance notes";
const BLOG_DESCRIPTION =
  "Practical writing from Tariq Manon on Shopify theme architecture, Shopify CLI + CI/CD, WooCommerce, and web performance — informed by day-to-day client work.";

export const metadata: Metadata = {
  title: "Writing",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: BLOG_URL },
  keywords: [
    "Tariq Manon blog",
    "Shopify development blog",
    "Shopify CLI",
    "Shopify CI/CD",
    "Shopify theme architecture",
    "WooCommerce",
    "web performance",
  ],
  openGraph: {
    type: "website",
    url: BLOG_URL,
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_URL,
    url: BLOG_URL,
    name: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    inLanguage: "en-GB",
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${site.url}${p.href}`,
      datePublished: p.dateISO,
      dateModified: p.dateISO,
      keywords: p.keywords.join(", "),
      author: { "@type": "Person", name: site.name, url: site.url },
      ...(p.image ? { image: [`${site.url}${p.image}`] } : {}),
    })),
  };

  return (
    <>
      <Nav />
      <main className="relative pt-24 md:pt-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="container-x">
          <div className="mb-8 flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-subtle transition-colors duration-hover ease-brand hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to home
            </Link>
          </div>

          <SectionHeading
            eyebrow="Writing"
            title="Notes from shipping real client work."
            description="Short, practical posts on Shopify, WooCommerce and web performance — informed by day-to-day client work for UK, US and EU brands."
          />

          <div className="hairline-t mt-10 flex items-center justify-between py-4 font-mono text-[11px] uppercase tracking-widest text-subtle">
            <span>
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
            <span>Latest first</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <Link key={p.slug} href={p.href} className="block h-full">
                <Card className="group flex h-full flex-col overflow-hidden hover:[border-color:rgb(var(--accent)/0.5)]">
                  {p.image ? (
                    <div className="hairline-b relative aspect-[16/10] overflow-hidden bg-panel">
                      <Image
                        src={p.image}
                        alt={p.imageAlt || p.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-page ease-brand group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div
                      className="hairline-b relative flex aspect-[16/10] items-center justify-center bg-panel"
                      aria-hidden
                    >
                      <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                        {p.tag}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <Badge>{p.tag}</Badge>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                        {p.readingTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">
                      {p.title}
                    </h2>
                    <p className="text-pretty text-sm leading-relaxed text-subtle">
                      {p.excerpt}
                    </p>

                    <div className="hairline-t mt-auto flex items-center justify-between pt-3">
                      <time
                        dateTime={p.dateISO}
                        className="font-mono text-[11px] uppercase tracking-widest text-subtle"
                      >
                        {p.date}
                      </time>
                      <ArrowUpRight className="h-4 w-4 text-subtle transition-colors duration-hover ease-brand group-hover:text-accent" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
