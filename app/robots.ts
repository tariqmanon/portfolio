import type { MetadataRoute } from "next";

const SITE_URL = "https://www.tariqmanon.com";

// Assistants increasingly answer questions like "how do I migrate WooCommerce
// to Shopify?" from crawled pages, and being cited there is the point of the
// blog. The wildcard rule already allows these, but naming them makes the
// policy explicit rather than something a crawler has to infer.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
