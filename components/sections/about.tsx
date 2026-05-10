import { MapPin, Mail, Calendar } from 'lucide-react';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';
import { Reveal } from '@/components/reveal';
import { site } from '@/lib/data/site';

const stats = [
  { label: 'Years building', value: '3+' },
  { label: 'Projects shipped', value: '15+' },
  { label: 'Startup team', value: '11' },
  { label: 'Technologies', value: '30+' },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-32 sm:py-40">
      <MaxWidth>
        <SectionTitle
          index="03"
          label="About"
          title="A short introduction, no buzzwords."
        />

        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <div className="space-y-7">
            <Reveal>
              <p className="text-pretty text-lg leading-relaxed text-fg sm:text-xl">
                I'm a CS senior at BRAC University and a Founding Software Engineer at
                ClassTablet — a Bangladesh-first edtech platform we co-founded with a
                small, high-trust team. I work where product, infrastructure, and AI
                meet; I write the code that has to survive a real production incident at
                3 AM, not the code that wins a demo.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
                I'm also Founding Software Engineer &amp; Technical Lead at PlayerLagbe
                — Bangladesh's first digital platform for finding players and booking
                turfs. Before that, I shipped Bangladesh's first AI background-removal
                tool, trained ML models for lip reading and plant disease detection, and
                built full-stack apps across healthcare, campus commerce, and real-time
                multiplayer. I treat every problem the same way: understand it deeply,
                design it honestly, build it carefully, ship it, and watch what it does
                in the real world.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-2 flex flex-wrap gap-2 pt-2">
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
