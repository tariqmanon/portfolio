"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalInline } from "@/components/cal";
import { site } from "@/lib/data";

const ease = [0.4, 0, 0.2, 1] as const;

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contact"
            title="Have a project in mind? Let&apos;s talk."
            description="Pick a time that suits you and we'll talk it through. If you'd rather write first, email me — I usually reply within a working day."
          />

          <ul className="mt-8 flex flex-col gap-6 md:mt-10">
            <ContactRow icon={<Mail className="h-4 w-4 text-accent" />} label="Email">
              <Link
                href={`mailto:${site.email}`}
                className="transition-colors duration-hover ease-brand hover:text-accent"
              >
                {site.email}
              </Link>
            </ContactRow>

            <ContactRow icon={<Phone className="h-4 w-4 text-accent" />} label="Phone">
              <Link
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="transition-colors duration-hover ease-brand hover:text-accent"
              >
                {site.phone}
              </Link>
            </ContactRow>

            <ContactRow icon={<MapPin className="h-4 w-4 text-accent" />} label="Based in">
              <span>{site.location}</span>
            </ContactRow>
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
          <Card className="overflow-hidden p-1 md:p-2">
            <CalInline className="h-[640px] w-full md:h-[700px]" />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">{label}</span>
      <span className="flex items-center gap-3 text-base text-text/90 md:text-lg">
        {icon}
        {children}
      </span>
    </li>
  );
}
