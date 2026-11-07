export const site = {
  name: "Tariq Manon",
  shortName: "TM",
  role: "Senior Web Developer · Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "tmanon007@gmail.com",
  phone: "+880 168 580 9188",
  url: "https://www.tariqmanon.com",
  social: {
    linkedin: "https://linkedin.com/in/tariqmanon",
    github: "https://github.com/tariqmanon",
  },
  cta: {
    label: "Book a Call",
    // The Cal.com embed upgrades these links into a modal on click. `href`
    // stays a real booking URL so crawlers, llms.txt and no-JS visitors all
    // still land somewhere useful.
    href: "https://cal.com/tariq-webpex/tariq-webpex-project",
    cal: {
      namespace: "tariq-webpex-project",
      link: "tariq-webpex/tariq-webpex-project",
      origin: "https://app.cal.com",
    },
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
    "I'm Tariq, a Software Engineer with 6+ years specialising in Shopify and WooCommerce stores, plus Next.js, Framer and Magento builds for clients across the UK, US and Europe.",
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
  repo?: string;
  caseStudy?: string;
  extraLink?: { label: string; href: string };
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "AutoAgent: Social Media Posts",
    client: "Web-pex",
    category: "Shopify App",
    year: "2026",
    summary:
      "Published Shopify app that writes and posts a product promo daily to Facebook, Instagram and Pinterest, plus a weekly SEO blog article to the store's blog. Merchants preview, edit or skip every post before it goes out.",
    metrics: ["5.0 rating on the Shopify App Store", "Launched September 2026"],
    stack: ["Shopify App", "Shopify Admin API", "AI content", "Social APIs"],
    href: "https://apps.shopify.com/autoagent",
  },
  {
    title: "OrderSpec: Custom Order Check",
    client: "Web-pex",
    category: "Shopify App",
    year: "2026",
    summary:
      "Published Shopify app that catches personalised orders arriving blank, over-length or off-list, and flags likely typos. Reads fields from Zepto, Infinite Options, Globo, Easify and Zakeke, and produces run sheets, packing slips and CSV exports.",
    metrics: ["Launched October 2026"],
    stack: ["Shopify App", "Shopify Admin API", "Order validation"],
    href: "https://apps.shopify.com/orderspec",
  },
  {
    title: "StretchSense Gaming",
    client: "StretchSense",
    category: "Shopify Custom Landing",
    year: "2025",
    summary:
      "Built the StretchSense Gaming launch experience — an immersive, animated product landing for their VR motion-capture gloves. Gesture-driven hero visuals, a pre-order flow and a fully responsive Shopify storefront.",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS Animation"],
    href: "https://shop.stretchsense.com/",
    repo: "https://github.com/tariqmanon/stretchsense-gaming/",
    image: "/images/projects/strech-sense.png",
    featured: true,
  },
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
      "Set up CI/CD via GitHub Actions and Vercel for the VelaOps Next.js platform, cutting deploy time by ~50% and stabilising release cadence.",
    metrics: ["Deploy time cut by ~50%"],
    stack: ["Next.js", "Vercel", "GitHub Actions"],
    href: "https://velaops.ai",
    image: "/images/projects/velaops.png",
    featured: true,
  },
  {
    title: "Gafbros Limited",
    category: "Magento B2B Trade Portal",
    year: "2026",
    summary:
      "Built the front end and the Merlin ERP integration on this Magento 2 trade portal, one of a team of three. Pricing mirrors locally over SOAP so pages never wait on the ERP, and it shipped with customer self-service, a tablet portal for reps on the road and a B2C storefront, kickoff to soft launch in under six months.",
    metrics: [
      "Price refresh from 9.3 hours to about two minutes",
      "Zero price differences across 29,652 prices checked",
      "Create Order page from seconds to under 0.1s",
    ],
    stack: ["Magento 2.4.8", "PHP", "MySQL", "Merlin ERP", "SOAP API"],
    href: "https://www.gafbros.co.uk",
    extraLink: { label: "Trade Portal", href: "https://portal.gafbros.co.uk/" },
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
      "Brought Charnwood Supplies online with a Shopify storefront, product catalogue, online purchasing and admin-panel sales data access for the team.",
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
  {
    title: "SwitchGrid",
    category: "Next.js Marketing Site",
    year: "2025",
    summary:
      "Marketing site for a UK energy consultancy serving restaurants, care homes and hospitality — built on Next.js with a free-audit lead flow and a fast, content-managed frontend.",
    stack: ["Next.js", "React", "TypeScript"],
    href: "https://switchgrid.co.uk",
    repo: "https://github.com/Tulip-Tech/switchgrid",
  },
];

export const services = [
  {
    name: "Shopify Development",
    description:
      "Theme builds, migrations from WooCommerce or Magento, custom checkout extensions and Shopify Flow automation.",
    bullets: ["Theme + storefront", "Migrations & data sync", "Flow automations", "Klaviyo + 3rd-party APIs"],
  },
  {
    name: "WordPress / WooCommerce",
    description:
      "Custom WordPress and WooCommerce builds with bespoke checkouts, plugin work and performance tuning.",
    bullets: ["Custom WooCommerce", "Plugin development", "PageSpeed 90+", "REST API integrations"],
  },
  {
    name: "Next.js / React",
    description:
      "Marketing sites, SaaS frontends and headless storefronts built on Next.js with CI/CD on Vercel.",
    bullets: ["App Router + TS", "Vercel + GitHub Actions", "Headless commerce", "Animations & interaction"],
  },
  {
    name: "Magento (Adobe Commerce)",
    description:
      "Adobe Commerce builds and migrations covering store architecture, theming and integration with operations.",
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
    "I work across the full stack with Shopify, WooCommerce, React, Next.js, Framer, and now Magento. I pick up new technologies fast by applying them directly to live projects, take ownership of what I build, and enjoy working closely with teams to get things done properly.",
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
      "Integrated 8+ third-party APIs for payments, shipping, CRM, Klaviyo and One Click Upsell, cutting onboarding time by ~30%.",
      "Delivered React and Vite frontend work for BlueFrog (JW Player) and the Tuliptech site; built CareApps and Empathika on Framer CMS.",
      "Built the front end and Merlin ERP integration for the Gafbros Magento 2 trade portal, soft-launched Oct 2026; set up CI/CD via GitHub Actions and Vercel for VelaOps (Next.js), cutting deploy time by ~50%.",
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
  "Web Design & Freelancing Certification, CodersTrust Bangladesh Ltd (2017)",
  "Magento 2 Theming, M.Academy (in progress, alongside live Gafbros project)",
  "AI-driven Shopify development using Claude AI and OpenAI to accelerate builds",
  "MCP-based workflow automation and SEO / digital marketing with AI tooling",
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  dateISO: string;
  readingTime: string;
  tag: string;
  keywords: string[];
  href: string;
  image?: string;
  imageAlt?: string;
};

export const posts: Post[] = [
  {
    slug: "woocommerce-to-shopify-migration-seo-conversions",
    title:
      "Migrating WooCommerce to Shopify without losing SEO or conversions",
    excerpt:
      "The process I use to replatform a store from WooCommerce to Shopify — redirect mapping, data migration and the conversion work — the way I ran it for Stateside Distribution for a 20% conversion lift.",
    description:
      "A practical WooCommerce-to-Shopify migration playbook: auditing URLs, migrating product and customer data, building the 301 redirect map that protects SEO, and the conversion work behind a real 20% lift.",
    date: "Jul 10, 2026",
    dateISO: "2026-07-10",
    readingTime: "10 min",
    tag: "Migration",
    keywords: [
      "WooCommerce to Shopify migration",
      "Shopify migration SEO",
      "301 redirects Shopify",
      "WooCommerce Shopify redirects",
      "Shopify replatform",
      "Matrixify",
      "ecommerce migration",
      "Shopify URL structure",
    ],
    href: "/blog/woocommerce-to-shopify-migration-seo-conversions",
    image: "/images/blog/woo-to-shopify-migration.png",
    imageAlt:
      "WooCommerce to Shopify migration — how conversion rate increased 20% without losing rankings, showing the audit, migrate, redirect and launch steps",
  },
  {
    slug: "shopify-flow-block-fraudulent-orders",
    title: "Blocking fraudulent orders with Shopify Flow",
    excerpt:
      "How I built a native Shopify Flow automation to catch high-risk and mismatched-address orders the moment they're placed — tag, hold fulfillment and review before anything ships.",
    description:
      "A real Shopify Flow recipe for fraud prevention: the Order created trigger, risk and address-mismatch conditions, and tag / hold-fulfillment / internal-email actions — with the Liquid templates and the reasons not to auto-cancel.",
    date: "Jul 7, 2026",
    dateISO: "2026-07-07",
    readingTime: "7 min",
    tag: "Automation",
    keywords: [
      "Shopify Flow",
      "Shopify fraud prevention",
      "block fraudulent orders Shopify",
      "Shopify Flow automation",
      "Shopify chargebacks",
      "Shopify order risk",
      "hold fulfillment Shopify",
      "Shopify Flow Liquid",
    ],
    href: "/blog/shopify-flow-block-fraudulent-orders",
    image: "/images/blog/shopify-flow.png",
    imageAlt:
      "Blocking fraudulent orders with Shopify Flow — a workflow moving from order created to evaluate risk to tag and hold fulfillment",
  },
  {
    slug: "shopify-product-template-variant-tabs-accordion",
    title:
      "Building a modern Shopify product template with variant tabs and a specification accordion",
    excerpt:
      "How to ship a premium product page in Shopify — variant tabs instead of dropdowns, a clean spec accordion, and the Liquid + CSS + JS split that keeps it maintainable.",
    description:
      "A practical walkthrough of building a modern Shopify product page: variant tabs instead of dropdowns, a clean specification accordion, and the professional Liquid + CSS + JS split that scales across stores.",
    date: "May 25, 2026",
    dateISO: "2026-05-25",
    readingTime: "9 min",
    tag: "Shopify",
    keywords: [
      "Shopify product template",
      "Shopify variant tabs",
      "Shopify accordion",
      "Liquid",
      "Shopify theme architecture",
      "Shopify product page",
      "Dawn theme",
      "Online Store 2.0",
    ],
    href: "/blog/shopify-product-template-variant-tabs-accordion",
    image: "/images/blog/shopify-product-template.png",
    imageAlt:
      "Modern Shopify product page for a lounge chair with variant tabs (Small, Medium, Large, XL) and an expanded specifications accordion",
  },
  {
    slug: "shopify-cli-github-cicd-pipeline",
    title: "Shopify CLI, GitHub and CI/CD — a professional theme workflow",
    excerpt:
      "How I run Shopify theme work in 2026 — Shopify CLI for local dev, GitHub for version control, and GitHub Actions for safe, automated deploys to live and staging themes.",
    description:
      "A professional Shopify development workflow with Shopify CLI, GitHub branches, pull requests and GitHub Actions CI/CD — including a real deploy.yml, project structure, and the guardrails that keep live themes safe.",
    date: "May 25, 2026",
    dateISO: "2026-05-25",
    readingTime: "8 min",
    tag: "DevOps",
    keywords: [
      "Shopify CLI",
      "Shopify GitHub integration",
      "Shopify CI/CD",
      "GitHub Actions Shopify",
      "Shopify theme deploy",
      "shopify theme dev",
      "Shopify staging theme",
    ],
    href: "/blog/shopify-cli-github-cicd-pipeline",
    image: "/images/blog/shopify-cicd-workflow.png",
    imageAlt:
      "Infographic of the Shopify theme CI/CD workflow — Shopify CLI plus GitHub plus GitHub Actions, showing the six-step pipeline from local development to auto-deploy",
  },
];
