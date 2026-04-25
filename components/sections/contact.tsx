"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      message: String(data.get("message") || "").trim(),
      // honeypot
      website: String(data.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contact"
            title="Have a project in mind? Let's talk."
            description="The fastest way to reach me is the form — or by email. I usually reply within a working day."
          />

          <ul className="mt-10 flex flex-col gap-4 text-sm">
            <li className="flex items-center gap-3 text-text/90">
              <Mail className="h-4 w-4 text-accent" />
              <Link href={`mailto:${site.email}`} className="transition-colors duration-hover ease-brand hover:text-accent">
                {site.email}
              </Link>
            </li>
            <li className="flex items-center gap-3 text-text/90">
              <Phone className="h-4 w-4 text-accent" />
              <span>{site.phone}</span>
            </li>
            <li className="flex items-center gap-3 text-text/90">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{site.location}</span>
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-subtle transition-colors duration-hover ease-brand hover:text-accent"
              style={{ border: "0.5px solid rgb(var(--line))" }}
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-subtle transition-colors duration-hover ease-brand hover:text-accent"
              style={{ border: "0.5px solid rgb(var(--line))" }}
            >
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="lg:col-span-7 card flex flex-col gap-5 p-6 md:p-8"
          noValidate
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
          </div>
          <Field label="Company (optional)" name="company" autoComplete="organization" />
          <FieldTextarea label="Project details" name="message" required rows={6} />

          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
              {status === "submitting" ? "Sending…" : "Send Message"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            {status === "success" && (
              <span className="font-mono text-[12px] uppercase tracking-widest text-accent">
                Message sent — I&apos;ll be in touch.
              </span>
            )}
            {status === "error" && (
              <span className="font-mono text-[12px] uppercase tracking-widest text-subtle">
                {errorMsg ?? "Couldn't send. Try email instead."}
              </span>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="rounded bg-bg px-4 py-3 text-sm text-text outline-none transition-colors duration-hover ease-brand focus:border-accent"
        style={{ border: "0.5px solid rgb(var(--line))" }}
      />
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  rows = 4,
  required,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">{label}</span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="rounded bg-bg px-4 py-3 text-sm text-text outline-none transition-colors duration-hover ease-brand focus:border-accent"
        style={{ border: "0.5px solid rgb(var(--line))" }}
      />
    </label>
  );
}
