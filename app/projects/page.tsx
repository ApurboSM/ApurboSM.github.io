import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { MaxWidth } from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data/projects';
import { site } from '@/lib/data/site';

export const metadata: Metadata = {
  title: 'Projects — Full-Stack & AI Work by S M Apurbo',
  description:
    'A complete archive of products S M Apurbo has shipped — full-stack web applications, AI/ML systems, and MERN-stack platforms. ClassTablet, PlayerLagbe, UIUBookNest, and more.',
  alternates: { canonical: `${site.url}/projects/` },
  openGraph: {
    title: 'Projects by S M Apurbo',
    description:
      'Full-stack web applications, AI/ML systems, and MERN-stack platforms shipped to real users.',
    url: `${site.url}/projects/`,
    siteName: `${site.name} — Portfolio`,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: 'Projects' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects by S M Apurbo',
    description:
      'Full-stack web applications, AI/ML systems, and MERN-stack platforms shipped to real users.',
    images: [site.ogImage],
  },
};

export default function ProjectsPage() {
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
            <span className="text-fg">Projects</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-hi">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Project Archive
            </div>

            <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              Projects.
            </h1>
            <p className="mt-5 text-pretty text-lg font-medium text-fg-muted sm:text-xl">
              Every product I&apos;ve shipped — full-stack web apps, AI / ML
              systems, and founding-engineer work. Each one with a clear
              problem, an approach, and a measurable outcome.
            </p>
          </div>
        </MaxWidth>
      </section>

      {/* ─── Project list ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <MaxWidth>
          <ol className="space-y-4">
            {projects.map((p, i) => {
              const primaryLink = p.links[0]?.href;
              return (
                <li key={p.slug}>
                  <div className="group relative grid gap-6 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-2 sm:grid-cols-[80px_1fr_140px] sm:items-center sm:gap-8 sm:p-7">
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <span className="ml-2">{p.year}</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="font-sans text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                          {p.title}
                        </h2>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
                          {p.category}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-hi">
                        {p.role}
                      </p>
                      <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-fg-muted">
                        {p.problem}
                      </p>
                      <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-fg">
                        <span className="font-medium">Approach — </span>
                        {p.approach}
                      </p>
                      <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-fg-muted">
                        <span className="font-medium text-fg">Impact — </span>
                        {p.impact}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center rounded-md border border-line bg-bg/40 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {p.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                          {p.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-muted transition-colors hover:text-accent-hi"
                            >
                              <span className="border-b border-line transition-colors hover:border-accent/40">
                                {l.label}
                              </span>
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {primaryLink && (
                      <a
                        href={primaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden self-start justify-self-end text-fg-faint transition-colors hover:text-accent-hi sm:flex"
                        aria-label={`Visit ${p.title}`}
                      >
                        <ArrowUpRight className="h-6 w-6" strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </MaxWidth>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-line py-24 sm:py-32">
        <MaxWidth>
          <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-gradient-to-b from-surface to-bg p-10 text-center sm:p-14">
            <h2 className="font-sans text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Want one of these for your team?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              I take on full-stack and AI / ML engagements. Send me what
              you&apos;re building and where you&apos;re stuck.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="accent">
                <a href={`mailto:${site.email}`}>
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/services/full-stack-developer/">
                  Full-stack services
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
