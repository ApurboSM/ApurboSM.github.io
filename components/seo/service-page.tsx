import Link from 'next/link';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MaxWidth } from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { site } from '@/lib/data/site';
import type { ServicePageData } from '@/lib/data/service-pages';

/**
 * Shared layout for /services/* and /location/* SEO landing pages.
 *
 * Page anatomy (semantic HTML matters for search engines):
 *
 *   <h1>          — visible primary heading (only one per page)
 *   <h2> Overview / Capabilities / Tech Stack / Featured Work / Contact
 *   <h3>          — capability headings inside Capabilities
 *
 * Internal links: every page links back to the homepage, the other
 * service pages, and the contact section — Google uses these as
 * relevance signals.
 */
export function ServicePage({ data }: { data: ServicePageData }) {
  const otherServices = data.kind === 'service'
    ? [
        { label: 'MERN Stack Development', href: '/services/mern-stack-developer/' },
        { label: 'Full-Stack Development',  href: '/services/full-stack-developer/'  },
        { label: 'AI / ML Engineering',     href: '/services/ai-ml-engineer/'        },
      ].filter(s => !s.href.includes(data.slug.split('/').pop() ?? ''))
    : [
        { label: 'Full-Stack Development',  href: '/services/full-stack-developer/' },
        { label: 'MERN Stack Development',  href: '/services/mern-stack-developer/' },
        { label: 'AI / ML Engineering',     href: '/services/ai-ml-engineer/'       },
      ];

  return (
    <article className="relative">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative border-b border-line pb-20 pt-32 sm:pb-28 sm:pt-40">
        <MaxWidth>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint"
          >
            <Link href="/" className="transition-colors hover:text-fg">
              Home
            </Link>
            <span>/</span>
            <span className="text-fg-muted">
              {data.kind === 'service' ? 'Services' : 'Location'}
            </span>
            <span>/</span>
            <span className="text-fg">{data.h1}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-hi">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {data.kind === 'service' ? 'Service' : 'Location'}
            </div>

            <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              {data.h1}
            </h1>

            <p className="mt-5 text-pretty text-lg font-medium text-fg-muted sm:text-xl">
              {data.hook}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="accent">
                <a href={`mailto:${site.email}`}>
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/#work">
                  See my work
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </MaxWidth>
      </section>

      {/* ─── Overview ─────────────────────────────────────────────── */}
      <section className="border-b border-line py-20 sm:py-28">
        <MaxWidth>
          <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-16">
            <div>
              <div className="flex items-center gap-3 text-fg-faint">
                <span className="font-mono text-xs tracking-widest">01</span>
                <span className="h-px w-8 bg-line" />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">
                  Overview
                </span>
              </div>
              <h2 className="mt-5 font-sans text-2xl font-semibold tracking-tight text-fg">
                What I do
              </h2>
            </div>
            <div className="space-y-5">
              {data.overview.map((p, i) => (
                <p
                  key={i}
                  className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </MaxWidth>
      </section>

      {/* ─── Capabilities ─────────────────────────────────────────── */}
      <section className="border-b border-line py-20 sm:py-28">
        <MaxWidth>
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 text-fg-faint">
              <span className="font-mono text-xs tracking-widest">02</span>
              <span className="h-px w-8 bg-line" />
              <span className="font-mono text-xs uppercase tracking-[0.18em]">
                Capabilities
              </span>
            </div>
            <h2 className="mt-5 max-w-2xl font-sans text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              How I help teams ship.
            </h2>
          </div>

          <ul className="grid gap-6 md:grid-cols-2">
            {data.capabilities.map((c) => (
              <li
                key={c.heading}
                className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-2 sm:p-7"
              >
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" strokeWidth={2} />
                  <h3 className="font-sans text-lg font-medium text-fg">
                    {c.heading}
                  </h3>
                </div>
                <p className="text-pretty text-[14.5px] leading-relaxed text-fg-muted">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        </MaxWidth>
      </section>

      {/* ─── Tech Stack ───────────────────────────────────────────── */}
      <section className="border-b border-line py-20 sm:py-28">
        <MaxWidth>
          <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-16">
            <div>
              <div className="flex items-center gap-3 text-fg-faint">
                <span className="font-mono text-xs tracking-widest">03</span>
                <span className="h-px w-8 bg-line" />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">
                  Tech Stack
                </span>
              </div>
              <h2 className="mt-5 font-sans text-2xl font-semibold tracking-tight text-fg">
                Tools I use
              </h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-md border border-line bg-bg/40 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </MaxWidth>
      </section>

      {/* ─── Featured Work — link back to home ────────────────────── */}
      <section className="border-b border-line py-20 sm:py-28">
        <MaxWidth>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3 text-fg-faint">
                <span className="font-mono text-xs tracking-widest">04</span>
                <span className="h-px w-8 bg-line" />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">
                  Featured Work
                </span>
              </div>
              <h2 className="mt-5 max-w-2xl font-sans text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                Real products. Real impact.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
                Each project below is a shipped product — not a demo. See the
                full case studies with problem, approach, and outcome.
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/projects/">
                View all projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </MaxWidth>
      </section>

      {/* ─── Related services internal links ─────────────────────── */}
      <section className="border-b border-line py-20 sm:py-28">
        <MaxWidth>
          <h2 className="mb-8 font-sans text-2xl font-semibold tracking-tight text-fg">
            Explore related services
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex items-center justify-between rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span className="font-sans text-[15px] font-medium text-fg">
                  {s.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-fg-faint transition-colors group-hover:text-accent-hi" />
              </Link>
            ))}
          </div>
        </MaxWidth>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <MaxWidth>
          <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-gradient-to-b from-surface to-bg p-10 text-center sm:p-14">
            <h2 className="font-sans text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {data.cta.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
              {data.cta.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="accent">
                <a href={`mailto:${site.email}`}>
                  Email me
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/#contact">
                  All contact options
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

/** Page-level <script type="application/ld+json"> for a Service schema. */
export function ServiceJsonLd({ data }: { data: ServicePageData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}/${data.slug}/#service`,
    name: data.h1,
    description: data.description,
    url: `${site.url}/${data.slug}/`,
    serviceType: data.serviceType,
    areaServed: data.areaServed.map((name) => ({ '@type': 'Place', name })),
    provider: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      url: site.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
