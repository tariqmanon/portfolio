"use client";

import * as React from "react";
import Link from "next/link";
import CalEmbed, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { Button, type ButtonProps } from "@/components/ui/button";
import { site } from "@/lib/data";

const { namespace, link, origin } = site.cta.cal;

// Cal paints its own chrome inside the iframe, so it has to be told which
// theme the site is in — otherwise a light embed lands in the dark layout.
function useCalTheme() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "light" : "dark";

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace });
      if (cancelled) return;
      cal("ui", { hideEventTypeDetails: false, layout: "month_view", theme });
    })();
    return () => {
      cancelled = true;
    };
  }, [theme]);

  return theme;
}

/**
 * Booking link that opens Cal in a modal. Renders a real anchor, so it keeps
 * working (as a plain navigation) if the embed script never loads.
 */
export function BookACallButton({
  children,
  onNavigate,
  ...props
}: ButtonProps & { onNavigate?: () => void }) {
  useCalTheme();

  return (
    <Button asChild {...props}>
      <Link
        href={site.cta.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        data-cal-namespace={namespace}
        data-cal-link={link}
        data-cal-origin={origin}
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      >
        {children ?? site.cta.label}
      </Link>
    </Button>
  );
}

/** Full month-view booking calendar, embedded in the page. */
export function CalInline({ className }: { className?: string }) {
  const theme = useCalTheme();

  return (
    <div className={className}>
      <CalEmbed
        namespace={namespace}
        calLink={link}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme }}
      />
    </div>
  );
}
