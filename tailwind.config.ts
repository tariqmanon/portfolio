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
        obsidian: "#0D0D0D",
        surface: "#1A1A18",
        border: "#2A2A28",
        gold: "#B09060",
        cream: "#F0EAE0",
        muted: "#888888",
        parchment: "#FAFAF8",
        white: "#FFFFFF",
        stone: "#E0DDD6",
        amber: "#8A6E40",
        ink: "#1A1A1A",
        slate: "#666666",
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
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
        lg: "12px",
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
  plugins: [],
};
export default config;
