import type { MetadataRoute } from "next";
import { posts } from "@/lib/data";

const SITE_URL = "https://tariqmanon.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ["", "#work", "#services", "#about", "#blog", "#contact"];

  const sectionEntries: MetadataRoute.Sitemap = sections.map((s) => ({
    url: `${SITE_URL}/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: s === "" ? 1 : 0.7,
  }));

  const blogIndexEntry: MetadataRoute.Sitemap = [
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

  return [...sectionEntries, ...blogIndexEntry, ...postEntries];
}
