"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Contact() {
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      message: String(data.get("message") || "").trim(),
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
      toast.success("Message sent.", {
        description: "I&apos;ll get back to you within a working day.",
      });
      form.reset();
    } catch (err) {
      toast.error("Couldn&apos;t send.", {
        description: err instanceof Error ? err.message : "Please email me directly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contact"
            title="Have a project in mind? Let&apos;s talk."
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
              <Link
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="transition-colors duration-hover ease-brand hover:text-accent"
              >
                {site.phone}
              </Link>
            </li>
            <li className="flex items-center gap-3 text-text/90">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{site.location}</span>
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <Button asChild variant="outline" size="icon" aria-label="LinkedIn">
              <Link href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" aria-label="GitHub">
              <Link href={site.social.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="lg:col-span-7"
        >
          <Card className="p-6 md:p-8">
            <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field id="name" label="Name" required autoComplete="name" />
                <Field id="email" label="Email" type="email" required autoComplete="email" />
              </div>
              <Field id="company" label="Company (optional)" autoComplete="organization" />
              <FieldTextarea id="message" label="Project details" required rows={6} />

              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} required={required} autoComplete={autoComplete} />
    </div>
  );
}

function FieldTextarea({
  id,
  label,
  rows = 4,
  required,
}: {
  id: string;
  label: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={id} rows={rows} required={required} />
    </div>
  );
}
