import { site, services, posts, about } from "@/lib/data";

// https://llmstxt.org — an H1, a blockquote summary, then ## sections of
// markdown links. Generated from lib/data so it can't drift from the site.
export const dynamic = "force-static";

function servicesSection() {
  return services
    .map((s) => `- [${s.name}](${site.url}/#services): ${s.description}`)
    .join("\n");
}

function writingSection() {
  return posts
    .map((p) => `- [${p.title}](${site.url}${p.href}): ${p.description}`)
    .join("\n");
}

export function GET() {
  const body = `# ${site.name}

> ${site.role} in ${site.location}, building e-commerce and SaaS products with Shopify, WooCommerce, Next.js and Magento for clients across the UK, US and Europe.

${about.paragraphs[0]}

This site is a portfolio and a technical blog. The writing covers e-commerce
replatforming, Shopify automation and theme development, and is written from
client work rather than generalities.

## Services

${servicesSection()}

## Writing

${writingSection()}

## Pages

- [Home](${site.url}/): work, services, stack, experience and contact
- [Writing](${site.url}/blog): all posts

## Contact

- Email: ${site.email}
- [Book a call](${site.cta.href})
- [LinkedIn](${site.social.linkedin})
- [GitHub](${site.social.github})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
