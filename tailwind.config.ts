import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette (literal hexes — kept for reference / direct use)
        obsidian: "#0D0D0D",
        surface: "#1A1A18",
        gold: "#B09060",
        cream: "#F0EAE0",
        parchment: "#FAFAF8",
        stone: "#E0DDD6",
        amber: "#8A6E40",
        ink: "#1A1A1A",

        // Brand tokens (theme-aware via CSS vars)
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",

        // shadcn aliases (mapped to brand tokens in globals.css)
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        border: "rgb(var(--border-token) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted-bg) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
      },
      spacing: {
        section: "5rem",
        "section-lg": "7.5rem",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "var(--radius)",
        xl: "12px",
      },
      borderWidth: {
        hairline: "0.5px",
      },
      transitionDuration: {
        hover: "150ms",
        page: "300ms",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      letterSpacing: {
        cta: "0.06em",
        wider: "0.08em",
        widest: "0.12em",
      },
      maxWidth: {
        prose: "62ch",
        container: "72rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
