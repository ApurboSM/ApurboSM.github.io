'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, GitCommit, GitPullRequest, Star } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';
import { site } from '@/lib/data/site';

// react-github-calendar uses window — load on client only
const GitHubCalendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
  loading: () => <CalendarSkeleton />,
});

const ease = [0.16, 1, 0.3, 1] as const;

const USERNAME = (() => {
  try {
    const u = new URL(site.socials.github);
    return u.pathname.replace(/\//g, '') || 'ApurboSM';
  } catch {
    return 'ApurboSM';
  }
})();

export function GithubActivity() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="github"
      className="relative scroll-mt-24 border-t border-line py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="07"
          label="GitHub Activity"
          title="Code I ship, in the open."
          description="Live contribution graph from GitHub. Updated daily. Most of my work happens in private repositories — this captures the public surface."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease }}
          className="overflow-hidden rounded-3xl border border-line bg-surface/60"
        >
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg/30 px-5 py-3 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted">
                <Github className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
                  github.com/{USERNAME}
                </div>
                <div className="text-[13px] font-medium text-fg">Public contributions</div>
              </div>
            </div>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-muted transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-accent-hi"
            >
              View profile
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Calendar */}
          <div className="px-4 py-7 sm:px-7 sm:py-9">
            <div className="github-calendar-wrap mx-auto max-w-full overflow-x-auto">
              <GitHubCalendar
                username={USERNAME}
                colorScheme={isDark ? 'dark' : 'light'}
                blockSize={11}
                blockMargin={3}
                blockRadius={2}
                fontSize={11}
                theme={{
                  light: ['rgb(244 244 244)', '#bfd6ff', '#7aaaff', '#4f46e5', '#3730a3'],
                  dark:  ['rgb(22 22 22)', '#2a2f80', '#4f46e5', '#818cf8', '#c7d2fe'],
                }}
                style={{
                  // Force colors using vars
                  color: 'rgb(var(--fg) / 0.65)',
                }}
                hideColorLegend={false}
                hideMonthLabels={false}
                hideTotalCount={false}
              />
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-px border-t border-line bg-line">
            <Stat
              icon={<GitCommit className="h-3.5 w-3.5" />}
              label="Languages"
              value="TS · Py · Go"
            />
            <Stat
              icon={<GitPullRequest className="h-3.5 w-3.5" />}
              label="Style"
              value="Trunk-based"
            />
            <Stat
              icon={<Star className="h-3.5 w-3.5" />}
              label="Cadence"
              value="Daily-ish"
            />
          </div>
        </motion.div>
      </MaxWidth>

      <style jsx global>{`
        .github-calendar-wrap text {
          fill: rgb(var(--fg) / 0.55) !important;
          font-family: var(--font-geist-mono), ui-monospace, monospace !important;
        }
        .github-calendar-wrap .react-activity-calendar__count,
        .github-calendar-wrap .react-activity-calendar__legend-colors {
          color: rgb(var(--fg) / 0.55) !important;
          font-family: var(--font-geist-mono), ui-monospace, monospace !important;
        }
      `}</style>
    </section>
  );
}

function CalendarSkeleton() {
  return (
    <div className="px-4 py-7 sm:px-7 sm:py-9">
      <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-1">
        {Array.from({ length: 7 * 53 }).map((_, i) => (
          <div
            key={i}
            className="h-2.5 w-2.5 rounded-[2px] bg-line animate-pulse"
            style={{ animationDelay: `${(i % 53) * 18}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-surface px-4 py-4 text-center sm:px-6">
      <div className="mx-auto mb-1.5 flex h-6 w-6 items-center justify-center rounded-md border border-line bg-bg/40 text-fg-muted">
        {icon}
      </div>
      <div className="font-sans text-[13.5px] font-medium text-fg">{value}</div>
      <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-faint">
        {label}
      </div>
    </div>
  );
}
