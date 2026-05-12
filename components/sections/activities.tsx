'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';

const ease = [0.16, 1, 0.3, 1] as const;

const activities = [
  {
    role: 'Executive, Creative Team',
    org: 'BRAC University Computer Club (BUCC)',
    orgUrl: 'https://www.linkedin.com/company/brac-university-computer-club/',
    period: '2023 – Present',
    description:
      "Leading creative direction and visual content production for one of the largest university tech clubs in Bangladesh.",
    monogram: 'BC',
  },
  {
    role: 'Senior Executive, Photography',
    org: 'BRAC University Computer Club (BUCC)',
    orgUrl: 'https://www.linkedin.com/company/brac-university-computer-club/',
    period: '2023 – Present',
    description:
      "Overseeing photography operations, event coverage, and building the visual narrative of the club's activities.",
    monogram: 'BC',
  },
];

export function Activities() {
  return (
    <section
      id="activities"
      className="relative scroll-mt-24 border-t border-line py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="07"
          label="Community"
          title="Activities & Leadership"
          description="Volunteer roles, club leadership, and creative contributions outside of professional work."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              className="group relative flex gap-4 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-line-2 hover:bg-surface-2"
            >
              {/* Monogram */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-bg/60 font-mono text-xs font-semibold text-accent-hi">
                {a.monogram}
              </div>

              {/* Content */}
              <div className="min-w-0 space-y-1.5">
                <p className="font-sans text-sm font-semibold text-fg">{a.role}</p>
                <a
                  href={a.orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-accent-hi transition-opacity hover:opacity-80"
                >
                  {a.org}
                  <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                </a>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">
                  🗓 {a.period}
                </p>
                <p className="pt-1 text-sm leading-relaxed text-fg-muted">
                  {a.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </MaxWidth>
    </section>
  );
}
