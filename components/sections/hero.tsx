'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { MaxWidth } from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { site } from '@/lib/data/site';

const ease = [0.16, 1, 0.3, 1] as const;

const heroLines = ['SHIPPING SOFTWARE', 'FROM DHAKA.'];

export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section
      ref={wrapRef}
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32 sm:pt-36"
    >
      {/* Spotlight */}
      <div className="hero-spotlight pointer-events-none absolute inset-0 -z-10" />
      {/* Subtle grid */}
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />

      <MaxWidth className="relative z-10">
        {/* Available pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="mb-10 flex"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <h1 className="font-sans font-semibold leading-[0.9] tracking-tightest-2 text-balance text-[clamp(3.25rem,9vw,8rem)]">
          {heroLines.map((line, i) => (
            <span
              key={i}
              className="block overflow-hidden"
              style={{ paddingBottom: '0.05em' }}
            >
              <SplitWords line={line} delay={0.2 + i * 0.08} accent={i === 1} />
            </span>
          ))}
        </h1>

        {/* Sub-line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.5 }}
          className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end"
        >
          <p className="max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            Full-stack engineer building production software end-to-end. Founding
            Software Engineer at{' '}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-line-2 text-fg transition-colors hover:border-accent hover:text-accent-hi"
            >
              ClassTablet
            </a>
            , co-creator of Bangladesh's first AI background-removal platform, and a
            CS senior at BRAC University.
          </p>

          {/* Quick meta grid */}
          <div className="grid grid-cols-2 gap-y-4 text-sm md:justify-self-end md:text-right">
            <MetaItem label="Based in" value="Dhaka, BD" />
            <MetaItem label="Focus" value="Full-Stack · AI" />
            <MetaItem label="Active since" value="2023" />
            <MetaItem label="Team" value="ClassTablet" />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg" variant="accent">
            <a href="#work">
              View Selected Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href="#contact">
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </MaxWidth>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="pointer-events-none absolute bottom-10 left-1/2 z-0 -translate-x-1/2"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Scroll
        </div>
      </motion.div>
    </section>
  );
}

function SplitWords({
  line,
  delay,
  accent = false,
}: {
  line: string;
  delay: number;
  accent?: boolean;
}) {
  const words = line.split(' ');
  return (
    <span className="inline-block">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.85,
              ease,
              delay: delay + wi * 0.08,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {wi < words.length - 1 && '\u00A0'}
          {wi === words.length - 1 && accent && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease, delay: delay + 0.6 }}
              className="ml-0.5 inline-block h-2 w-2 rounded-full bg-accent align-baseline sm:h-3 sm:w-3"
            />
          )}
        </span>
      ))}
    </span>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
        {label}
      </div>
      <div className="mt-1 text-fg">{value}</div>
    </div>
  );
}
