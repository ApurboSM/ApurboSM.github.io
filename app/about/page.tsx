import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, MapPin, Mail, Calendar } from 'lucide-react';
import { MaxWidth } from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { site } from '@/lib/data/site';

export const metadata: Metadata = {
  title: 'About S M Apurbo — Software Engineer & AI/ML Developer in Dhaka',
  description:
    'About S M Apurbo — a software engineer, full-stack developer, and AI/ML engineer based in Dhaka, Bangladesh. Founding Engineer at ClassTablet, Technical Lead at PlayerLagbe, CS senior at BRAC University.',
  alternates: { canonical: `${site.url}/about/` },
  openGraph: {
    title: 'About S M Apurbo — Software Engineer & AI/ML Developer',
    description:
      'Full-stack engineer and AI/ML developer based in Dhaka, Bangladesh. Founding Engineer at ClassTablet, Technical Lead at PlayerLagbe.',
    url: `${site.url}/about/`,
    siteName: `${site.name} — Portfolio`,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    type: 'profile',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About S M Apurbo',
    description:
      'Full-stack engineer and AI/ML developer based in Dhaka, Bangladesh.',
    images: [site.ogImage],
  },
};

export default function AboutPage() {
  return (
    <article className="relative">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative border-b border-line pb-20 pt-32 sm:pb-28 sm:pt-40">
        <MaxWidth>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint"
          >
            <Link href="/" className="transition-colors hover:text-fg">
              Home
            </Link>
            <span>/</span>
            <span className="text-fg">About</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_280px] lg:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-hi">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                About
              </div>

              <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
                S M Apurbo
              </h1>
              <p className="mt-5 text-pretty text-lg font-medium text-fg-muted sm:text-xl">
                Software Engineer · Full-Stack Developer · AI / ML Engineer.
                Based in Dhaka, working with teams worldwide.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-fg-faint" />
                  Dhaka, Bangladesh
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-fg-faint" />
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-accent-hi"
                  >
                    {site.email}
                  </a>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-fg-faint" />
                  Available now
                </span>
              </div>
            </div>

            <div className="order-first mx-auto w-full max-w-[220px] lg:order-last lg:max-w-none">
              <div
                className="relative overflow-hidden rounded-2xl border border-line"
                style={{ aspectRatio: '4/5' }}
              >
                <Image
                  src="/images/hero.jpg"
                  alt={`${site.name} — Software Engineer`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 220px, 280px"
                />
              </div>
            </div>
          </div>
        </MaxWidth>
      </section>

      {/* ─── Bio ──────────────────────────────────────────────────── */}
      <section className="border-b border-line py-20 sm:py-28">
        <MaxWidth>
          <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-16">
            <div>
              <div className="flex items-center gap-3 text-fg-faint">
                <span className="font-mono text-xs tracking-widest">01</span>
                <span className="h-px w-8 bg-line" />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">
                  Bio
                </span>
              </div>
              <h2 className="mt-5 font-sans text-2xl font-semibold tracking-tight text-fg">
                Who I am
              </h2>
            </div>

            <div className="space-y-5 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              <p>
                I&apos;m S M Apurbo — a full-stack software engineer and AI/ML
                developer based in Dhaka, Bangladesh. I build production
                software end-to-end: clean React and Next.js frontends, Node
                and Python services, real databases, working auth, and
                infrastructure that doesn&apos;t fall over at 3 a.m.
              </p>
              <p>
                I&apos;m the{' '}
                <a
                  href="https://classtablet.com/en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-2 text-fg transition-colors hover:border-accent hover:text-accent-hi"
                >
                  Founding Software Engineer at ClassTablet
                </a>{' '}
                — co-building Bangladesh&apos;s first comprehensive edtech
                platform — and{' '}
                <a
                  href="https://playerlagbe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-2 text-fg transition-colors hover:border-accent hover:text-accent-hi"
                >
                  Technical Lead at PlayerLagbe
                </a>
                , Bangladesh&apos;s first AI-powered sports recruitment
                platform. I split my time between those roles and focused
                freelance engagements with teams in Bangladesh, the United
                States, the United Kingdom, and beyond.
              </p>
              <p>
                Computer Science senior at BRAC University. Alumnus of{' '}
                <Link
                  href="/#activities"
                  className="border-b border-line-2 text-fg transition-colors hover:border-accent hover:text-accent-hi"
                >
                  BRAC University Computer Club (BUCC)
                </Link>{' '}
                with active leadership roles. I write{' '}
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-2 text-fg transition-colors hover:border-accent hover:text-accent-hi"
                >
                  open source code on GitHub
                </a>{' '}
                and ship real products in public.
              </p>
            </div>
          </div>
        </MaxWidth>
      </section>

      {/* ─── What I work on ──────────────────────────────────────── */}
      <section className="border-b border-line py-20 sm:py-28">
        <MaxWidth>
          <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-16">
            <div>
              <div className="flex items-center gap-3 text-fg-faint">
                <span className="font-mono text-xs tracking-widest">02</span>
                <span className="h-px w-8 bg-line" />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">
                  Focus
                </span>
              </div>
              <h2 className="mt-5 font-sans text-2xl font-semibold tracking-tight text-fg">
                What I work on
              </h2>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  href: '/services/full-stack-developer/',
                  label: 'Full-Stack Development',
                  body: 'React, Next.js, Node, Python, Postgres, MongoDB.',
                },
                {
                  href: '/services/mern-stack-developer/',
                  label: 'MERN Stack Development',
                  body: 'MongoDB, Express, React, Node — JavaScript end-to-end.',
                },
                {
                  href: '/services/ai-ml-engineer/',
                  label: 'AI / ML Engineering',
                  body: 'Computer vision, NLP, data pipelines, model deployment.',
                },
                {
                  href: '/location/dhaka-full-stack-developer/',
                  label: 'Dhaka Engagements',
                  body: 'On-site, hybrid, or remote work for Bangladesh-based teams.',
                },
              ].map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[15px] font-medium text-fg">
                        {s.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-fg-faint transition-colors group-hover:text-accent-hi" />
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                      {s.body}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </MaxWidth>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <MaxWidth>
          <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-gradient-to-b from-surface to-bg p-10 text-center sm:p-14">
            <h2 className="font-sans text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Let&apos;s build something.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              I&apos;m taking on new projects right now — full-stack web apps,
              AI/ML features, founding-engineer collaborations.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="accent">
                <a href={`mailto:${site.email}`}>
                  Email me
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/projects/">
                  See my projects
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </MaxWidth>
      </section>
    </article>
  );
}
