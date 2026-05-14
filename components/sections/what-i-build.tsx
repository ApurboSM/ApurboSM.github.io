'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Layout,
  Server,
  Database,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * SEO-targeted "What I Build" section.
 *
 * Each card is a semantic H3 with keyword-rich heading + supporting body —
 * the exact subsections requested in the SEO brief:
 *
 *   1. Frontend Development
 *   2. Backend Development
 *   3. Database & API Development
 *   4. Authentication, Dashboard & Admin Panels
 *
 * Each card links to the most relevant service page for internal-link
 * weight (the strongest on-page SEO signal Google reads after content).
 */

type Capability = {
  Icon: typeof Layout;
  heading: string;
  body: string;
  bullets: string[];
  href: string;
  cta: string;
};

const capabilities: Capability[] = [
  {
    Icon: Layout,
    heading: 'Frontend Development',
    body: 'Pixel-perfect, type-safe React and Next.js interfaces with smooth motion, accessibility baked in, and Core Web Vitals tuned for green.',
    bullets: [
      'React 18 · Next.js 14 (App Router)',
      'TypeScript · Tailwind CSS',
      'Framer Motion · ShadCN UI',
    ],
    href: '/services/full-stack-developer/',
    cta: 'Full-stack development',
  },
  {
    Icon: Server,
    heading: 'Backend Development',
    body: 'Node.js, Express, and Python services that scale. Clean architecture, observability, queue-driven workflows, and integrations that just work.',
    bullets: [
      'Node.js · Express · FastAPI',
      'REST · tRPC · WebSockets',
      'Background jobs · Cron · Queues',
    ],
    href: '/services/mern-stack-developer/',
    cta: 'MERN stack development',
  },
  {
    Icon: Database,
    heading: 'Database & API Development',
    body: 'Schema design, query optimization, and API surfaces engineered for the long haul — across PostgreSQL, MongoDB, and modern ORMs.',
    bullets: [
      'PostgreSQL · MongoDB · MySQL',
      'Prisma · Mongoose · Drizzle',
      'OpenAPI · GraphQL · tRPC',
    ],
    href: '/services/full-stack-developer/',
    cta: 'Full-stack development',
  },
  {
    Icon: ShieldCheck,
    heading: 'Authentication, Dashboards & Admin Panels',
    body: 'Secure auth flows, role-based access, audit trails, and production-ready admin panels — so your team can ship to real users on day one.',
    bullets: [
      'OAuth · JWT · Sessions',
      'RBAC · Audit logs · 2FA',
      'Stripe · Polar · Custom billing',
    ],
    href: '/services/ai-ml-engineer/',
    cta: 'AI / ML engineering',
  },
];

export function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      className="relative scroll-mt-24 border-t border-line py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="02"
          label="What I Build"
          title="From frontend to backend to AI — shipped end-to-end."
          description="Four focused service areas. One engineer who owns the whole stack. Pick a path, or hand off the whole product — I cover it."
        />

        <ul className="grid gap-5 md:grid-cols-2">
          {capabilities.map((c, i) => (
            <motion.li
              key={c.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-line-2 sm:p-8"
            >
              {/* Soft accent ring on hover */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg/40 text-accent-hi">
                <c.Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
              </div>

              <h3 className="mt-5 font-sans text-xl font-semibold tracking-tight text-fg sm:text-[22px]">
                {c.heading}
              </h3>

              <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-fg-muted">
                {c.body}
              </p>

              <ul className="mt-5 space-y-1.5">
                {c.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 font-mono text-[11.5px] uppercase tracking-[0.08em] text-fg-faint"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={c.href}
                className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-fg transition-colors hover:text-accent-hi"
              >
                <span className="border-b border-line transition-colors group-hover:border-accent/40">
                  Read more — {c.cta}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </MaxWidth>
    </section>
  );
}
