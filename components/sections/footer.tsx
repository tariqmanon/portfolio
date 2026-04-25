import Link from "next/link";
import { Monogram } from "@/components/monogram";
import { nav, site } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="hairline-t mt-24">
      <div className="container-x flex flex-col gap-10 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4 max-w-md">
            <Monogram />
            <p className="text-pretty text-sm leading-relaxed text-subtle">
              Senior Web Developer & Software Engineer building elegant, high-performing
              websites and SaaS products. Based in {site.location}, working worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="label-eyebrow">Sections</span>
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-sm text-subtle transition-colors duration-hover ease-brand hover:text-accent"
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="label-eyebrow">Elsewhere</span>
              <Link
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-subtle transition-colors duration-hover ease-brand hover:text-accent"
              >
                LinkedIn
              </Link>
              <Link
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-subtle transition-colors duration-hover ease-brand hover:text-accent"
              >
                GitHub
              </Link>
              <Link
                href={`mailto:${site.email}`}
                className="text-sm text-subtle transition-colors duration-hover ease-brand hover:text-accent"
              >
                Email
              </Link>
            </div>
            <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
              <span className="label-eyebrow">Contact</span>
              <span className="text-sm text-subtle">{site.email}</span>
              <span className="text-sm text-subtle">{site.phone}</span>
              <span className="text-sm text-subtle">{site.location}</span>
            </div>
          </div>
        </div>

        <div className="hairline-t flex flex-col items-start justify-between gap-2 pt-6 md:flex-row md:items-center">
          <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            © {year} {site.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
