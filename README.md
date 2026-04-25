# Tariq Manon — Portfolio

Personal portfolio for [Tariq Manon](https://tariqmanon.com) — Senior Web Developer & Software Engineer. One-page Next.js 14 site built against the Tariq Manon brand guidelines (2026).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with brand tokens (colors, spacing, motion) wired via CSS variables
- **next-themes** for dark / light mode (dark is default)
- **Framer Motion** for subtle, brand-compliant motion (150ms hover, 300ms transitions, no bounce)
- **Resend** for the contact form
- **lucide-react** for icons
- **Inter** + **JetBrains Mono** via `next/font`

## Local development

```bash
npm install
cp .env.example .env.local
# fill in RESEND_API_KEY (get one at resend.com)
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

| Name | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes (in prod) | Resend API key for the contact form. Without it the API route returns a friendly 500. |
| `CONTACT_TO_EMAIL` | No | Inbox that receives enquiries. Defaults to `tmanon007@gmail.com`. |
| `CONTACT_FROM_EMAIL` | No | Verified sender. Defaults to the Resend onboarding sender for testing. |

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New → Project → Import Git Repository** and select the repo.
3. Framework preset auto-detects as **Next.js**. Root directory: `./`.
4. Add the environment variables above under **Settings → Environment Variables**.
5. Click **Deploy**. Every push to `main` will trigger a production deploy; pull requests get preview URLs automatically.

### Custom domain

Once `tariqmanon.com` is purchased:
1. Vercel → **Settings → Domains → Add** → enter `tariqmanon.com` and `www.tariqmanon.com`.
2. Point the apex `A` record to `76.76.21.21` and the `www` `CNAME` to `cname.vercel-dns.com` (Vercel will show the exact records).
3. Update `metadataBase` in [app/layout.tsx](app/layout.tsx) if it ever changes.

### Resend setup

1. Create a Resend account, generate an API key.
2. Verify the sending domain (`tariqmanon.com`) under **Domains** in Resend, add the DNS records.
3. Once verified, set `CONTACT_FROM_EMAIL` to e.g. `"Tariq Manon <hello@tariqmanon.com>"`.

## Project structure

```
app/
  api/contact/route.ts   # Resend-powered contact endpoint
  globals.css            # Brand CSS variables + base styles
  layout.tsx             # Theme provider + fonts + metadata
  page.tsx               # One-page composition
components/
  nav.tsx, monogram.tsx, theme-toggle.tsx, section-heading.tsx, theme-provider.tsx
  sections/              # Hero, Work, Services, Stack, About, Experience, Education, Blog, Contact, Footer
lib/
  data.ts                # All content (projects, experience, services, posts)
  utils.ts               # cn() helper
public/
  (project images live here when added)
```

## Brand notes

Edits should respect the brand guidelines:
- Single accent: gold `#B09060` (dark) / amber `#8A6E40` (light). Never both.
- Borders are 0.5px hairlines (1px on hover). Never thicker.
- Motion: 150ms / 300ms ease, no bounce.
- Voice: precise (metrics over claims), ownership-forward, understated.

## Blog (CMS)

The Blog section ships as static placeholder cards in [lib/data.ts](lib/data.ts). When the CMS is added, swap the `posts` array for a fetcher (Sanity / Contentlayer / MDX — TBD) and the section will render the same.
