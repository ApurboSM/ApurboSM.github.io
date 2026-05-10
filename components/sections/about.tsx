import { MapPin, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';
import { Reveal } from '@/components/reveal';
import { site } from '@/lib/data/site';

const stats = [
  { label: 'Years building', value: '3+', sub: 'since 2023' },
  { label: 'Projects shipped', value: '15+', sub: 'to production' },
  { label: 'ClassTablet tables', value: '100+', sub: 'Postgres schema' },
  { label: 'User roles built', value: '6', sub: 'in ClassTablet' },
];

const highlights = [
  "Co-founded ClassTablet — Bangladesh's first all-in-one edtech SaaS (team of 11).",
  "Technical Lead on PlayerLagbe — Bangladesh's first sports matchmaking platform.",
  "Built Bangladesh's first AI background-removal tool, BGRemover.",
  'Trained ML models for lip reading (LipNet) and crop disease detection (CNN).',
  'Full-stack across React, Next.js, Node.js, PostgreSQL, AWS, and Python AI stacks.',
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-32 sm:py-40">
      <MaxWidth>
        <SectionTitle
          index="03"
          label="About"
          title="The brief version."
        />

        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <div className="space-y-8">
            <Reveal>
              <p className="text-pretty text-lg leading-relaxed text-fg sm:text-xl">
                CS senior at BRAC University. Founding Software Engineer at{' '}
                <a
                  href="https://classtablet.com/en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-2 transition-colors hover:border-accent hover:text-accent-hi"
                >
                  ClassTablet
                </a>
                {' '}and Technical Lead at{' '}
                <a
                  href="https://playerlagbe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-2 transition-colors hover:border-accent hover:text-accent-hi"
                >
                  PlayerLagbe
                </a>
                . I write code that survives production — not code that wins demos.
              </p>
            </Reveal>

            {/* Highlights */}
            <Reveal delay={0.06}>
              <ul className="space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex flex-wrap gap-2 pt-1">
                <Pill icon={<MapPin className="h-3.5 w-3.5" />}>
                  {site.location}
                </Pill>
                <Pill
                  icon={<Mail className="h-3.5 w-3.5" />}
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </Pill>
                <Pill
                  icon={<Calendar className="h-3.5 w-3.5" />}
                  href={site.calendar}
                  external
                >
                  Schedule a call
                </Pill>
              </div>
            </Reveal>
          </div>

          {/* Stats */}
          <Reveal delay={0.12}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:gap-x-8">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-line pt-5">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-faint">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-sans text-3xl font-medium tracking-tight text-fg sm:text-4xl">
                    {s.value}
                  </dd>
                  {s.sub && (
                    <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                      {s.sub}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </MaxWidth>
    </section>
  );
}

function Pill({
  icon,
  children,
  href,
  external,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-line-2 hover:text-fg">
      <span className="text-fg-faint">{icon}</span>
      {children}
    </span>
  );

  if (!href) return content;
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  );
}
