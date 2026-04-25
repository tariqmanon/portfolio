---
name: shadcn-ui
description: Add, customize and use shadcn/ui primitives + Magic UI components in this project. Trigger when the user asks for buttons, cards, inputs, dialogs, toasts, marquees, border beams, shiny text, dot patterns, or any "shadcn" / "magic ui" component.
---

# shadcn/ui + Magic UI in this project

This portfolio uses **shadcn/ui (Radix preset)** + **Magic UI** components, with **brand tokens mapped over the default shadcn CSS variables**. Do not run `npx shadcn@latest init` — it will overwrite the brand mapping. Add new components manually or via `npx shadcn@latest add <name>`, then audit the diff.

## Token mapping (already wired in `app/globals.css`)

shadcn's tokens are aliases on top of the Tariq Manon brand palette:

| shadcn token | brand token | dark | light |
| --- | --- | --- | --- |
| `--background` | `--bg` | `13 13 13` (Obsidian) | `250 250 248` (Parchment) |
| `--foreground` | `--text` | `240 234 224` (Cream) | `26 26 26` (Ink) |
| `--card`, `--popover` | `--panel` | `26 26 24` (Surface) | `255 255 255` (White) |
| `--primary` | `--accent` | `176 144 96` (Gold) | `138 110 64` (Amber) |
| `--border-token`, `--input` | `--line` | `42 42 40` | `224 221 214` (Stone) |
| `--muted-foreground` | `--subtle` | `136 136 136` (Muted) | `102 102 102` (Slate) |
| `--ring` | `--accent` | (same as primary) | (same as primary) |

**Rule:** When adding new shadcn components, never hard-code colors. Use `bg-background`, `text-foreground`, `border-border`, `bg-primary text-primary-foreground`, etc. — they will theme correctly via the CSS variables.

## Existing primitives

Live in `components/ui/`:
- `button.tsx` (cva variants: `default`, `outline`, `ghost`, `link`, `destructive`, `secondary` — sizes: `default`, `sm`, `lg`, `icon`). Default variant uses uppercase + 0.06em letter-spacing per brand CTA spec.
- `card.tsx` (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
- `input.tsx`, `textarea.tsx`, `label.tsx` (Radix Label primitive)
- `badge.tsx` (variants: `default` (outlined), `accent`, `solid`)
- `sonner.tsx` — themed toaster, mounted in `app/layout.tsx`. Use via `import { toast } from "sonner"`.

**Brand-specific overrides on shadcn defaults:**
- Border weight is `0.5px` (set inline as `style={{ borderWidth: "0.5px", ... }}` because Tailwind has no built-in 0.5px utility). Never use thicker borders.
- Default radius is `4px` (buttons/tags) or `8px` (cards). The shadcn `--radius` is wired to 0.5rem (8px).
- Transitions are 150ms (`duration-hover`) for hover, 300ms (`duration-page`) for transitions, all with `ease-brand` cubic-bezier. No bounce/spring.

## Magic UI components

Live in `components/magicui/`:
- `marquee.tsx` — horizontal/vertical scrolling list. Used in `Stack` section for tech ribbon. Props: `pauseOnHover`, `reverse`, `vertical`, `repeat`, `[--duration:Xs]`, `[--gap:Xrem]`.
- `border-beam.tsx` — animated gradient border beam. Used on the first featured project card. Place inside a `relative` parent. Default colors pull from `--accent`.
- `animated-shiny-text.tsx` — gradient shimmer over text. Used on the Hero "Available for Work" pill.
- `blur-fade.tsx` — IntersectionObserver-driven fade + blur reveal. Useful for section reveals if you want stagger.
- `dot-pattern.tsx` — SVG dot grid background. Used in Hero. Pair with a radial mask for fade-out.

## Adding a new component

```bash
# Adds the file to components/ui/
npx shadcn@latest add dialog
```

After running, **audit the generated file**:
1. Replace any color that uses oklch with the existing shadcn token names (which map to brand tokens).
2. If it uses `border-input` or similar, that already works — the Tailwind config wires those.
3. If it imports from `@base-ui/react`, the CLI used the wrong preset — rewrite it to use `@radix-ui/react-*` primitives (already installed: `react-slot`, `react-label`, `react-dialog`, `react-toast`).
4. Run `npm run build` to confirm.

For Magic UI, copy the source from <https://magicui.design/docs/components> into `components/magicui/`, then:
- Replace any `slate-*`/`gray-*`/`white`/`black` Tailwind colors with brand tokens (`bg-bg`, `text-text`, `text-accent`, `text-subtle`, `border-line`).
- Use `rgb(var(--accent))` in custom keyframes / inline styles if the component uses CSS-in-JS gradients.

## Voice + UX rules (brand)

When adding UI:
- Single accent color (gold/amber). Never two accents.
- Hairline borders (0.5px), never thicker.
- 150ms hover, 300ms transition, no bounce.
- Buttons that act as CTAs: uppercase, 0.06em tracking, weight 500.
- Typography: Inter for sans, JetBrains Mono for labels/monospace UI bits — already wired via `next/font` in `app/layout.tsx`.

## Common pitfalls

- **Never run `npx shadcn@latest init` again** — the default preset (`base-nova`) targets Tailwind v4 + Base UI and corrupts the brand mapping. If you must re-init, use `-b radix --no-monorepo --css-variables` and reset `app/globals.css`, `app/layout.tsx`, `tailwind.config.ts`, `lib/utils.ts` from git afterwards.
- Don't use `text-white` or `text-black` — use `text-text` (theme-aware) or `text-bg` (inverse of background).
- Don't add `border-2` or thicker — use the inline `0.5px` style or `border-hairline` Tailwind utility.
