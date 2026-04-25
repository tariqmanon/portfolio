---
name: frontend-ui
description: Brand-compliant frontend UI work for the Tariq Manon portfolio. Trigger when the user asks to add, edit, restyle, or refactor a section, layout, component, animation, or piece of copy on the site. Also trigger for accessibility, responsiveness, or motion concerns.
---

# Frontend UI — Tariq Manon portfolio

The portfolio is a one-page Next.js 14 site at `tariqmanon.com` (planned domain), built against the **Tariq Manon Brand Guidelines 2026**. Every UI decision should defer to the brand spec — precision, craftsmanship, understated confidence.

## Brand non-negotiables

**Color** — single accent only:
- Dark mode: Gold `#B09060` on Obsidian `#0D0D0D`. Body text Cream `#F0EAE0`, secondary Muted `#888888`, panels Surface `#1A1A18`, lines Border `#2A2A28`.
- Light mode: Amber `#8A6E40` on Parchment `#FAFAF8`. Body text Ink `#1A1A1A`, secondary Slate `#666666`, panels White `#FFFFFF`, lines Stone `#E0DDD6`.
- Use Tailwind tokens (`bg-bg`, `text-text`, `text-accent`, `text-subtle`, `border-line`, `bg-panel`) which switch automatically. Never hardcode hex.
- Never use both gold values together. Never pure white or pure black for body text.

**Typography:**
- Inter (sans) for everything except labels and tech tags.
- JetBrains Mono for: section eyebrows, tech badges, dates, hex values, "AVAILABLE FOR WORK"-style labels.
- Already wired via `next/font` in `app/layout.tsx`.
- Hierarchy (relative — interpret brand book sizes as ratios, not absolute px on web):
  - Display (hero h1): `text-4xl md:text-6xl lg:text-7xl` semibold tracking-tight
  - H2 (section heading): `text-3xl md:text-4xl lg:text-[40px]` semibold
  - Body: `text-base md:text-lg` leading-relaxed
  - Label: `font-mono text-[11px] uppercase tracking-widest`

**Spacing:** 4 / 8 / 16 / 24 / 40 / 80 px rhythm. The repo defines `spacing.section = 5rem (80px)` and `spacing.section-lg = 7.5rem`. Use `py-section md:py-section-lg` for major sections.

**Borders:** All UI borders are 0.5px. There is no Tailwind utility for 0.5px, so set them inline:
```tsx
style={{ borderWidth: "0.5px", borderStyle: "solid", borderColor: "rgb(var(--line))" }}
```
Or use the project utility classes `.hairline` / `.hairline-t` / `.hairline-b`. Never use `border` (1px) or thicker.

**Radius:** `rounded-sm` (4px) for buttons/tags. `rounded` (8px default) for cards/inputs. `rounded-lg` (`var(--radius)`, 8px) for panels.

**Motion:**
- Hover: 150ms (`duration-hover`)
- Transition: 300ms (`duration-page`)
- Easing: `ease-brand` (`cubic-bezier(0.4, 0, 0.2, 1)`)
- **No bounce, no spring.** If using Framer Motion, pass `transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}`.

## Voice rules (apply when writing copy)

- **Precise:** "20% increase in conversion rate", not "significantly improved results".
- **Ownership-forward:** First person, active. "I built X", "I led Y", "I take ownership". Never agency-speak.
- **Understated confidence:** No hype. Let metrics and clients speak. Copy is calm and direct.
- **Human but professional:** Warm, never slang, never corporate.

## Project layout

- Content lives in `lib/data.ts` (one source of truth for projects, services, stack, experience, education, posts). When adding a new project or role, update the typed export there — sections render automatically.
- Sections in `components/sections/`: `hero`, `work`, `services`, `stack`, `about`, `experience`, `education`, `blog`, `contact`, `footer`. Wired in order in `app/page.tsx`.
- Shared UI: `components/ui/` (shadcn primitives), `components/magicui/` (Magic UI), `components/section-heading.tsx`, `components/nav.tsx`, `components/monogram.tsx`, `components/theme-toggle.tsx`.
- API: `app/api/contact/route.ts` (Resend-powered).

## Accessibility

- All interactive elements use semantic HTML (`<button>`, `<a>`) or are wrapped in `<Button asChild>`.
- Color contrast: Cream-on-Obsidian and Ink-on-Parchment both clear AA. Never put body text on a Gold/Amber field.
- Theme toggle has explicit `aria-label`. Mobile menu uses `aria-expanded`.
- Form fields use `<Label htmlFor>` linked to inputs.
- Maintain `prefers-reduced-motion` respect when adding new animations — wrap heavy motion in a `useReducedMotion()` check.

## Responsiveness

Breakpoints used: `sm` (640), `md` (768), `lg` (1024). Container is `max-w-container` (72rem) with `px-6 md:px-10 lg:px-16` (`.container-x`). Always test layouts at 375px (mobile), 768px (tablet), 1280px (laptop).

## When asked to "redesign" or "improve" a section

1. Read the current section file in `components/sections/<name>.tsx`.
2. Confirm: which brand rules is the user trying to flex? If they want "more flair", push back briefly — the brand is intentionally restrained. Suggest motion or hierarchy changes before color changes.
3. Don't break the token system. If you need a new color, add a token in `app/globals.css` (both `:root` and `.dark`), then reference it via Tailwind.

## When asked to add a new section

1. Add typed content to `lib/data.ts`.
2. Create `components/sections/<name>.tsx` — start from an existing section (Services or Education are good templates) so you inherit the spacing, eyebrow, headline pattern.
3. Wire it into `app/page.tsx` in the right order.
4. Add an entry in the `nav` array in `lib/data.ts` if it should be linkable from the top nav.

## Build & test

```bash
npm run dev        # local dev (port 3000)
npm run build      # production build (also runs lint + type-check)
npm run lint       # eslint
```

Always run `npm run build` after structural changes — it catches TS errors that the IDE may miss.
