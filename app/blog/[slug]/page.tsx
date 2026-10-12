import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookACallButton } from "@/components/cal";

import { posts, site } from "@/lib/data";
import { postContent } from "@/lib/posts";
import { JsonLd } from "@/components/json-ld";
import { blogPostGraph } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const url = `${site.url}${post.href}`;
  const image = post.image ? `${site.url}${post.image}` : undefined;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    authors: [{ name: site.name, url: site.url }],
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: site.name,
      locale: "en_GB",
      publishedTime: post.dateISO,
      authors: [site.name],
      tags: post.keywords,
      images: image ? [{ url: image, alt: post.imageAlt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: image ? [image] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const Content = postContent[post.slug];
  if (!Content) notFound();

  const otherPosts = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <Nav />
      <main className="relative pt-24 md:pt-28">
        {/* JSON-LD structured data */}
        <JsonLd data={blogPostGraph(post)} />

        <article className="container-x">
          {/* Breadcrumb / back */}
          <div className="mb-8 flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-subtle transition-colors duration-hover ease-brand hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All writing
            </Link>
          </div>

          {/* Header */}
          <header className="mx-auto flex max-w-3xl flex-col gap-5">
            <div className="flex items-center gap-3">
              <Badge>{post.tag}</Badge>
              <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                Article
              </span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight md:text-4xl lg:text-[44px]">
              {post.title}
            </h1>

            <p className="text-pretty text-base leading-relaxed text-subtle md:text-lg">
              {post.excerpt}
            </p>

            <div className="hairline-t hairline-b flex flex-wrap items-center gap-x-6 gap-y-3 py-4 font-mono text-[11px] uppercase tracking-widest text-subtle">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.dateISO}>{post.date}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
              <span className="ml-auto">
                By <span className="text-accent">{site.name}</span>
              </span>
            </div>
          </header>

          {/* Featured image */}
          {post.image && (
            <figure
              className="mx-auto mt-10 max-w-4xl overflow-hidden rounded"
              style={{
                borderWidth: "0.5px",
                borderStyle: "solid",
                borderColor: "rgb(var(--line))",
              }}
            >
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                width={1600}
                height={1000}
                priority
                sizes="(min-width: 1024px) 896px, (min-width: 768px) 80vw, 100vw"
                className="h-auto w-full"
              />
            </figure>
          )}

          {/* Body */}
          <div className="mx-auto mt-12 max-w-3xl">
            <Content />
          </div>

          {/* CTA card */}
          <aside
            className="mx-auto mt-16 max-w-3xl rounded p-6 md:p-8"
            style={{
              borderWidth: "0.5px",
              borderStyle: "solid",
              borderColor: "rgb(var(--line))",
              background: "rgb(var(--panel))",
            }}
          >
            <span className="label-eyebrow">Work with me</span>
            <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
              Need this on your store?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-subtle md:text-base">
              I build Shopify, WooCommerce and Next.js storefronts for clients
              across the UK, US and Europe. If you want a setup like this on your
              own store, book a call and we&apos;ll talk through it.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <BookACallButton />
              <Button asChild variant="outline">
                <Link href="/#work">See recent work</Link>
              </Button>
            </div>
          </aside>

          {/* Related */}
          {otherPosts.length > 0 && (
            <section className="mx-auto mt-20 max-w-3xl">
              <span className="label-eyebrow">Keep reading</span>
              <div className="mt-5 grid grid-cols-1 gap-4">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    className="group flex items-start justify-between gap-6 rounded p-5 transition-colors duration-hover ease-brand hover:[border-color:rgb(var(--accent)/0.5)]"
                    style={{
                      borderWidth: "0.5px",
                      borderStyle: "solid",
                      borderColor: "rgb(var(--line))",
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <Badge>{p.tag}</Badge>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                          {p.readingTime}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold leading-snug tracking-tight md:text-lg">
                        {p.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-subtle">
                        {p.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-subtle transition-colors duration-hover ease-brand group-hover:text-accent" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
