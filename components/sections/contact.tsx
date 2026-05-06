'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Facebook,
  Mail,
  Calendar,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { site } from '@/lib/data/site';

const ease = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 border-t border-line py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="06"
          label="Contact"
          title="Let's build something."
          description="Open to founding-engineer roles, freelance work, and meaningful collaborations. The fastest way to reach me is email."
        />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Big email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease }}
            className="space-y-6"
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
                Email
              </div>
              <a
                href={`mailto:${site.email}`}
                className="group mt-3 inline-flex items-baseline gap-3 font-sans text-2xl font-medium tracking-tight text-fg transition-colors hover:text-accent-hi sm:text-3xl md:text-4xl"
              >
                <span className="border-b border-line-2 group-hover:border-accent">
                  {site.email}
                </span>
                <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="accent">
                <a href={`mailto:${site.email}`}>
                  <Mail className="h-4 w-4" />
                  Send an email
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href={site.calendar} target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-4 w-4" />
                  Schedule a call
                </a>
              </Button>
              <Button onClick={copyEmail} size="lg" variant="ghost">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-success" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy email
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Social + meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            className="space-y-7"
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
                Elsewhere
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <SocialButton
                  href={site.socials.github}
                  icon={<Github className="h-4 w-4" />}
                  label="GitHub"
                />
                <SocialButton
                  href={site.socials.linkedin}
                  icon={<Linkedin className="h-4 w-4" />}
                  label="LinkedIn"
                />
                <SocialButton
                  href={site.socials.facebook}
                  icon={<Facebook className="h-4 w-4" />}
                  label="Facebook"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 border-t border-line pt-6">
              <Meta label="Based in" value={site.location} />
              <Meta label="Phone" value={site.phone} />
              <Meta label="Card" value="/card" link="/card" />
              <Meta label="Status" value="Available" success />
            </div>
          </motion.div>
        </div>
      </MaxWidth>
    </section>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-fg-muted transition-all duration-300 hover:border-line-2 hover:bg-surface-2 hover:text-fg"
    >
      {icon}
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </a>
  );
}

function Meta({
  label,
  value,
  link,
  success,
}: {
  label: string;
  value: string;
  link?: string;
  success?: boolean;
}) {
  const inner = (
    <div className="space-y-1">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
        {label}
      </div>
      <div className="flex items-center gap-2 text-sm">
        {success && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
        <span className={success ? 'text-success' : 'text-fg'}>{value}</span>
      </div>
    </div>
  );
  if (link) {
    return (
      <a href={link} className="transition-colors hover:opacity-80">
        {inner}
      </a>
    );
  }
  return inner;
}
