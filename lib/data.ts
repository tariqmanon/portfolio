export const site = {
  name: "Tariq Manon",
  shortName: "TM",
  role: "Senior Web Developer · Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "tmanon007@gmail.com",
  phone: "+880 168 580 9188",
  url: "https://tariqmanon.com",
  social: {
    linkedin: "https://linkedin.com/in/tariqmanon",
    github: "https://github.com/tariqmanon",
  },
  cta: {
    label: "Book a Call",
    href: "https://calendly.com/webpexbd/web-design-workshop?month=2026-04",
  },
  resume: {
    label: "Download CV",
    href: "/MD%20TARIQUL%20ISLAM%20MANON-01685809188.pdf",
  },
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Available for Work",
  title: "Elegant, high-performing websites that captivate and convert.",
  subtitle:
    "I'm Tariq — a Software Engineer with 6+ years specialising in Shopify and WooCommerce stores, plus Next.js, Framer and Magento builds, for clients across the UK, US and Europe.",
  meta: [
    { label: "Based in", value: "Dhaka, Bangladesh" },
    { label: "Currently at", value: "Tuliptech Ltd, Leicester" },
    { label: "Experience", value: "6+ years" },
  ],
} as const;

export type Project = {
  title: string;
  client?: string;
  category: string;
  year: string;
  summary: string;
  metrics?: string[];
  stack: string[];
  href?: string;
  caseStudy?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Stateside Distribution",
    client: "Stateside Distribution",
    category: "E-commerce Migration",
    year: "2024",
    summary:
      "Led WooCommerce-to-Shopify migration with rebuilt store architecture and theme customisation. Set up Shopify Flow automations to block fraudulent addresses and improved Core Web Vitals across the storefront.",
    metrics: ["20% increase in conversion rate", "Faster LCP, fewer render-blocking resources"],
    stack: ["Shopify", "Liquid", "Shopify Flow", "Klaviyo"],
    href: "https://statesidedistribution.com",
    image: "/images/projects/stateside.png",
    featured: true,
  },
  {
    title: "Catered by Clink",
    client: "Catered by Clink",
    category: "Custom WooCommerce Build",
    year: "2024",
    summary:
      "Built from scratch with a fully custom checkout designed for scale and easy backend management. Integrated payments, shipping and CRM workflows.",
    stack: ["WooCommerce", "WordPress", "PHP", "Custom Checkout"],
    href: "https://cateredbyclink.org",
    image: "/images/projects/clink.png",
    featured: true,
  },
  {
    title: "VelaOps",
    category: "SaaS / Warehouse Automation",
    year: "2024",
    summary:
      "Set up CI/CD via GitHub Actions and Vercel for the VelaOps Next.js platform — cutting deploy time by ~50% and stabilising release cadence.",
    metrics: ["Deploy time cut by ~50%"],
    stack: ["Next.js", "Vercel", "GitHub Actions"],
    href: "https://velaops.ai",
    image: "/images/projects/velaops.png",
    featured: true,
  },
  {
    title: "Gafbros Limited",
    category: "Magento (Adobe Commerce)",
    year: "2025",
    summary:
      "Leading the Magento 2 migration from scratch — store architecture, theming, and integration with the existing operations stack.",
    stack: ["Magento 2", "Adobe Commerce", "PHP"],
    href: "https://www.gafbros.co.uk",
    image: "/images/projects/gafbros.png",
    featured: true,
  },
  {
    title: "CareApps",
    category: "Framer CMS Build",
    year: "2025",
    summary: "Marketing site built on Framer CMS with custom interactions and content modelling.",
    stack: ["Framer", "Framer CMS"],
    href: "https://careapps.co.uk",
  },
  {
    title: "Empathika",
    category: "Framer CMS Build",
    year: "2025",
    summary: "Brand site delivered on Framer CMS with content-managed sections and case studies.",
    stack: ["Framer", "Framer CMS"],
    href: "https://empathika.com",
  },
  {
    title: "Kerusso",
    category: "Shopify Theme",
    year: "2023–2024",
    summary: "Shopify theme work and ongoing customisation for a US-based apparel brand.",
    stack: ["Shopify", "Liquid"],
    href: "http://kerusso.com/",
  },
  {
    title: "Charnwood Supplies",
    category: "Shopify E-commerce",
    year: "2022–2023",
    summary:
      "Brought Charnwood Supplies online with a Shopify storefront — set up product catalogue, online purchasing and admin-panel sales data access for the team.",
    stack: ["Shopify", "Liquid"],
    href: "https://www.charnwoodsupplies.co.uk/",
  },
  {
    title: "BlueFrog (JW Player)",
    category: "React / Vite Frontend",
    year: "2025",
    summary:
      "Frontend development on a JW Player–powered video product, delivering responsive UI and integrating with media APIs.",
    stack: ["React", "Vite", "TypeScript"],
    href: "https://bluefrogplus.com",
  },
];

export const services = [
  {
    name: "Shopify Development",
    from: "$3,500",
    description:
      "Theme builds, migrations from WooCommerce or Magento, custom checkout extensions and Shopify Flow automation.",
    bullets: ["Theme + storefront", "Migrations & data sync", "Flow automations", "Klaviyo + 3rd-party APIs"],
  },
  {
    name: "WordPress / WooCommerce",
    from: "$2,000",
    description:
      "Custom WordPress and WooCommerce builds with bespoke checkouts, plugin work and performance tuning.",
    bullets: ["Custom WooCommerce", "Plugin development", "PageSpeed 90+", "REST API integrations"],
  },
  {
    name: "Next.js / React",
    from: "$3,000",
    description:
      "Marketing sites, SaaS frontends and headless storefronts built on Next.js with CI/CD on Vercel.",
    bullets: ["App Router + TS", "Vercel + GitHub Actions", "Headless commerce", "Animations & interaction"],
  },
  {
    name: "Magento (Adobe Commerce)",
    from: "On request",
    description:
      "Adobe Commerce builds and migrations — store architecture, theming and integration with operations.",
    bullets: ["Magento 2 theming", "Migrations", "Module work", "B2B / multi-store"],
  },
];

export const stack = [
  { group: "Frontend", items: ["HTML5", "CSS3", "Tailwind", "JavaScript", "TypeScript", "React", "Next.js 14", "Vite"] },
  { group: "CMS & E-commerce", items: ["Shopify", "WordPress", "WooCommerce", "Framer", "Magento (Adobe Commerce)"] },
  { group: "Design", items: ["Figma", "Adobe Photoshop", "Adobe Illustrator"] },
  { group: "Backend & Deploy", items: ["PHP", "MySQL", "REST APIs", "GitHub Actions", "Vercel", "CI/CD"] },
  { group: "AI & Productivity", items: ["Claude AI", "OpenAI", "MCP Workflows", "Postman"] },
];

export const about = {
  paragraphs: [
    "I'm a Software Engineer and Senior Web Developer based in Dhaka, working onsite for Tuliptech Ltd in Leicester, UK. Over the last six years I've built e-commerce and SaaS products for clients across the UK, US and Europe.",
    "I work across the full stack — Shopify, WooCommerce, React, Next.js, Framer, and now Magento — and pick up new technologies fast by applying them directly to live projects. I take ownership of what I build and enjoy working closely with teams to get things done properly.",
  ],
  quickFacts: [
    { label: "Years building", value: "6+" },
    { label: "Projects shipped", value: "50+" },
    { label: "Upwork JSS", value: "95%+" },
    { label: "Students mentored", value: "500+" },
  ],
};

export type Role = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "Tuliptech Ltd",
    role: "Software Engineer",
    location: "Leicester, UK · Onsite Dhaka",
    period: "Apr 2022 – Present",
    bullets: [
      "Led WooCommerce-to-Shopify migration for Stateside Distribution, delivering a 20% increase in conversion rate.",
      "Built Shopify Flow automation to block fraudulent addresses and improved LCP / cleared render-blocking resources.",
      "Developed Catered by Clink (cateredbyclink.org) WooCommerce site from scratch with a fully custom checkout.",
      "Integrated 8+ third-party APIs (payments, shipping, CRM, Klaviyo, One Click Upsell) — cutting onboarding time by ~30%.",
      "Delivered React and Vite frontend work for BlueFrog (JW Player) and the Tuliptech site; built CareApps and Empathika on Framer CMS.",
      "Leading Magento (Adobe Commerce) migration for Gafbros from scratch; set up CI/CD via GitHub Actions and Vercel for VelaOps (Next.js), cutting deploy time by ~50%.",
    ],
  },
  {
    company: "CodersTrust Bangladesh Ltd",
    role: "Lead Code Mentor",
    location: "Dhaka",
    period: "Oct 2018 – Apr 2022",
    bullets: [
      "Taught and mentored 500+ students in web design, WordPress and Shopify; many went on to work locally or freelance.",
      "Wrote course materials, ran assessments and provided 1-to-1 coaching; reported weekly progress to upper management.",
    ],
  },
  {
    company: "Upwork & Fiverr",
    role: "Freelance Web Developer",
    location: "Remote",
    period: "Sep 2017 – 2021",
    bullets: [
      "Completed 50+ WordPress and Shopify projects across the USA, UK, Australia and Europe with a 95%+ Upwork JSS.",
      "Improved multiple WordPress sites from PageSpeed ~40 to 90+ (5× gain); clients regularly returned for follow-up work.",
    ],
  },
];

export const education = [
  {
    school: "American International University Bangladesh",
    degree: "B.Sc. in Electrical & Electronic Engineering",
    period: "2011 – 2015",
  },
];

export const development = [
  "Web Design & Freelancing Certification — CodersTrust Bangladesh Ltd (2017)",
  "Magento 2 Theming — M.Academy (in progress, alongside live Gafbros project)",
  "AI-driven Shopify development — using Claude AI and OpenAI to accelerate builds",
  "MCP-based workflow automation and SEO / digital marketing with AI tooling",
];

export type Post = {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tag: string;
  href?: string;
};

export const posts: Post[] = [
  {
    title: "Migrating WooCommerce to Shopify without losing SEO",
    excerpt:
      "What I learned moving Stateside Distribution to Shopify — URL mapping, structured data, and the redirect strategy that protected the conversion rate during the cutover.",
    date: "2026 — Coming soon",
    readingTime: "8 min",
    tag: "Shopify",
  },
  {
    title: "Shopify Flow recipes that actually save time",
    excerpt:
      "The handful of automations I reach for on every store: blocking fraudulent addresses, tagging high-LTV customers, and routing wholesale orders to a dedicated fulfilment workflow.",
    date: "2026 — Coming soon",
    readingTime: "6 min",
    tag: "Automation",
  },
  {
    title: "Hitting PageSpeed 90+ on a real WordPress site",
    excerpt:
      "How I take a typical WooCommerce install from PageSpeed ~40 to 90+ without breaking the theme — render-blocking cleanup, image strategy, and the plugins worth keeping.",
    date: "2026 — Coming soon",
    readingTime: "10 min",
    tag: "Performance",
  },
];
