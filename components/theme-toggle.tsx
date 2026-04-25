"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "dark";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full text-subtle transition-colors duration-hover ease-brand hover:text-accent"
      style={{ border: "0.5px solid rgb(var(--line))" }}
    >
      <Sun
        className={`h-4 w-4 transition-all duration-page ease-brand ${
          isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-page ease-brand ${
          isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
    </button>
  );
}
