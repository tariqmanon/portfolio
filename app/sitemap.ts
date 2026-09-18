import type { MetadataRoute } from "next";
import { posts } from "@/lib/data";

const SITE_URL = "https://www.tariqmanon.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Only real, crawlable URLs belong in a sitemap — fragment links (/#work) are
  // ignored by search engines and just duplicate the homepage entry.
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}${p.href}`,
    lastModified: new Date(p.dateISO),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...postEntries];
}
