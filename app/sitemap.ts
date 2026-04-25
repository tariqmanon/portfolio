import type { MetadataRoute } from "next";

const SITE_URL = "https://tariqmanon.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ["", "#work", "#services", "#about", "#blog", "#contact"];
  return sections.map((s) => ({
    url: `${SITE_URL}/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: s === "" ? 1 : 0.7,
  }));
}
