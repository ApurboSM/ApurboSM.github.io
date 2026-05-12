'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  ArrowUpRight,
} from 'lucide-react';
import { site } from '@/lib/data/site';
import { MaxWidth } from '@/components/max-width';
import { Button } from '@/components/ui/button';

const ease = [0.16, 1, 0.3, 1] as const;

const VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `FN:${site.name}`,
  `N:Apurbo;S. M.;;;`,
  `TITLE:${site.role}`,
  `ORG:ClassTablet`,
  `EMAIL;TYPE=INTERNET:${site.email}`,
  `TEL;TYPE=CELL:${site.phone}`,
  `URL:${site.url}`,
  `URL:${site.socials.github}`,
  `URL:${site.socials.linkedin}`,
  `ADR;TYPE=WORK:;;Dhaka;;;;Bangladesh`,
  'END:VCARD',
].join('\n');

export function CardClient() {
  function downloadVCard() {
    const blob = new Blob([VCARD], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'S-M-Apurbo.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&bgcolor=ffffff&color=0a0a0a&data=${encodeURIComponent(
    site.url,
  )}`;

  return (
    <div className="relative min-h-[100svh] overflow-hidden pb-24 pt-32 sm:pt-36">
      {/* Subtle background grid */}
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />

      <MaxWidth>
        {/* Back link */}
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to portfolio</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 space-y-3"
        >
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-faint">
            <span className="h-px w-10 bg-line-2" />
            <span>Virtual Business Card</span>
          </div>
          <h1 className="text-balance text-3xl font-medium tracking-tight text-fg sm:text-[2.25rem]">
            Save my contact in a tap.
          </h1>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          {/* Top accent bar */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            {/* Left pane */}
            <div className="relative border-b border-line p-8 sm:p-12 lg:border-b-0 lg:border-r">
              {/* Pulse */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Available
              </div>

              <div className="flex items-start gap-5">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-line bg-surface-2 sm:h-20 sm:w-20">
                  <Image
                    src="/images/hero.jpg"
                    alt={site.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-sans text-3xl font-medium tracking-tight text-fg sm:text-4xl">
                    {site.name}
                  </h2>
                  <p className="mt-2 text-sm text-fg-muted sm:text-base">
                    {site.role}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-fg-faint">
                    Founding Engineer · ClassTablet
                  </p>
                </div>
              </div>

              {/* Tagline */}
              <p className="mt-9 max-w-md text-pretty text-base leading-relaxed text-fg-muted">
                Building software that actually ships — full-stack, AI-assisted,
                production-grade. Based in Dhaka. Open to work.
              </p>

              {/* Tags */}
              <div className="mt-7 flex flex-wrap gap-1.5">
                {[
                  'Founding Engineer',
                  'Full-Stack',
                  'AI / ML',
                  'TypeScript',
                  'Next.js',
                  'PostgreSQL',
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-md border border-line bg-bg/40 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="mt-9 flex flex-wrap gap-3">
                <Button onClick={downloadVCard} variant="accent">
                  <Download className="h-4 w-4" />
                  Save Contact (.vcf)
                </Button>
                <Button asChild variant="ghost">
                  <a href={`mailto:${site.email}`}>
                    <Mail className="h-4 w-4" />
                    Email me
                  </a>
                </Button>
              </div>
            </div>

            {/* Right pane */}
            <div className="space-y-7 p-8 sm:p-12">
              {/* Contact list */}
              <div className="space-y-5">
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                />
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={site.phone}
                  href={`tel:${site.phone}`}
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value={site.location}
                />
              </div>

              {/* QR + socials */}
              <div className="border-t border-line pt-7">
                <div className="grid grid-cols-[auto_1fr] items-start gap-5">
                  <div className="overflow-hidden rounded-xl border border-line bg-white p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrUrl}
                      alt="QR code to portfolio"
                      width={104}
                      height={104}
                      className="h-[104px] w-[104px]"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-faint">
                        Portfolio
                      </div>
                      <a
                        href={site.url}
                        className="mt-1 inline-flex items-center gap-1 text-sm text-fg transition-colors hover:text-accent-hi"
                      >
                        smapurbo.com
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <SocialIcon
                        href={site.socials.github}
                        icon={<Github className="h-4 w-4" />}
                        label="GitHub"
                      />
                      <SocialIcon
                        href={site.socials.linkedin}
                        icon={<Linkedin className="h-4 w-4" />}
                        label="LinkedIn"
                      />
                      <SocialIcon
                        href={site.socials.facebook}
                        icon={<Facebook className="h-4 w-4" />}
                        label="Facebook"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-bg/30 px-8 py-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint sm:px-12">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <span>Built in Dhaka, Bangladesh</span>
          </div>
        </motion.div>
      </MaxWidth>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-bg/40 text-fg-muted">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-faint">
          {label}
        </div>
        <div className="mt-0.5 truncate text-sm text-fg">{value}</div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group flex items-center gap-3.5 rounded-lg p-1.5 -m-1.5 transition-colors hover:bg-surface-2"
      >
        {inner}
        <ArrowUpRight className="h-3.5 w-3.5 text-fg-faint opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    );
  }

  return <div className="flex items-center gap-3.5 p-1.5 -m-1.5">{inner}</div>;
}

function SocialIcon({
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
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg/40 text-fg-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent-hi"
    >
      {icon}
    </a>
  );
}
