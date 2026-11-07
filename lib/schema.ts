import { site, services, type Post } from "@/lib/data";

const sameAs = [site.social.linkedin, site.social.github];

// Stable @id nodes so references resolve within a page's @graph. Reusing one
// Person entity across author/publisher/website strengthens author authority.
export const personId = `${site.url}/#person`;
export const websiteId = `${site.url}/#website`;

// --- Node builders (no @context — they live inside a @graph) ---

function personNode() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    jobTitle: "Senior Web Developer & Software Engineer",
    email: `mailto:${site.email}`,
    image: `${site.url}/apple-touch-icon.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    knowsAbout: [
      "Shopify",
      "WooCommerce",
      "Next.js",
      "Magento",
      "E-commerce development",
      "Web performance",
    ],
    sameAs,
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description:
      "Senior Web Developer and Software Engineer building high-performing e-commerce and SaaS products with Shopify, Next.js and Magento.",
    inLanguage: "en-GB",
    publisher: { "@id": personId },
  };
}

// No Offer node: prices are no longer shown on the page, and structured
// prices must match what a human sees.
function serviceNodes() {
  return services.map((service) => ({
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    provider: { "@id": personId },
    areaServed: ["United Kingdom", "United States", "Europe"],
  }));
}

function blogPostingNode(post: Post) {
  const url = `${site.url}${post.href}`;
  const image = post.image ? `${site.url}${post.image}` : undefined;

  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    inLanguage: "en-GB",
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { "@id": personId },
    publisher: { "@id": personId },
    isPartOf: { "@id": websiteId },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image ? { image: [image] } : {}),
  };
}

function breadcrumbNode(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// --- Page-level @graph documents ---

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), websiteNode(), ...serviceNodes()],
  };
}

export function blogPostGraph(post: Post) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      blogPostingNode(post),
      breadcrumbNode([
        { name: "Home", url: site.url },
        { name: "Writing", url: `${site.url}/blog` },
        { name: post.title, url: `${site.url}${post.href}` },
      ]),
    ],
  };
}