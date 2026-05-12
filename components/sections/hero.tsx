'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { MaxWidth } from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { site } from '@/lib/data/site';

const ease = [0.16, 1, 0.3, 1] as const;

const heroLines = ['SHIP PRODUCTS,', 'NOT PROMISES.'];

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
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-32"
    >
      {/* Spotlight */}
      <div className="hero-spotlight pointer-events-none absolute inset-0 -z-10" />
      {/* Subtle grid */}
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />

      <MaxWidth className="relative z-10">
        {/*
          Layout:
          - xs/sm  (<lg) : single column, text on top, photo below (hidden on xs landscape)
          - lg+          : two columns, text left, photo right
        */}
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_280px] lg:gap-14 xl:grid-cols-[1fr_320px] xl:gap-16">

          {/* ── Text ── */}
          <div className="order-1 min-w-0">
            {/* Available pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
              className="mb-6 flex sm:mb-8"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3 py-1.5 backdrop-blur-sm sm:px-3.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted sm:text-[11px] sm:tracking-[0.18em]">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <h1 className="font-sans font-semibold leading-[0.92] tracking-tightest-2 text-balance text-[clamp(2.2rem,8vw,5.25rem)] sm:text-[clamp(2.6rem,7vw,5.25rem)] lg:text-[clamp(2.4rem,4.5vw,5.25rem)]">
              {heroLines.map((line, i) => (
                <span key={i} className="block" style={{ paddingBottom: '0.05em' }}>
                  <SplitWords
                    line={line}
                    delay={0.2 + i * 0.08}
                    accent={i === heroLines.length - 1}
                  />
                </span>
              ))}
            </h1>

            {/* Sub-line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.5 }}
              className="mt-5 sm:mt-7"
            >
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-fg-muted sm:text-base lg:text-lg">
                Full-stack engineer building production software end-to-end. Founding
                Software Engineer at{' '}
                <a
                  href="https://classtablet.com/en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-2 text-fg transition-colors hover:border-accent hover:text-accent-hi"
                >
                  ClassTablet
                </a>{' '}
                &amp; Technical Lead at{' '}
                <a
                  href="https://playerlagbe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-2 text-fg transition-colors hover:border-accent hover:text-accent-hi"
                >
                  PlayerLagbe
                </a>
                {' '}— co-creator of Bangladesh&apos;s first AI tools, CS senior at BRAC University.
              </p>
            </motion.div>

            {/* Quick meta strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.55 }}
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 sm:mt-6"
            >
              <MetaItem label="Based in" value="Dhaka, BD" />
              <span className="h-3 w-px bg-line-2" />
              <MetaItem label="Focus" value="Full-Stack · AI" />
              <span className="h-3 w-px bg-line-2" />
              <MetaItem label="Active since" value="2023" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.62 }}
              className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
            >
              <Button asChild size="lg" variant="accent">
                <a href="#experience">
                  View My Work
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
          </div>

          {/* ── Photo — hidden on small landscape, shown from sm portrait + lg ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.14 }}
            className="order-2 mx-auto hidden w-full max-w-[200px] sm:block sm:max-w-[240px] lg:max-w-none"
          >
            <div
              className="group relative overflow-hidden rounded-2xl border border-line shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] sm:rounded-3xl"
              style={{ aspectRatio: '4/5' }}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-bg/75 via-transparent to-transparent" />
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Image
                src="/images/hero.jpg"
                alt={site.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 320px"
                priority
              />
              {/* Name card overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-3 pb-3 pt-6 sm:px-4 sm:pb-4">
                <div>
                  <p className="font-sans text-xs font-medium text-white/90 sm:text-sm">{site.name}</p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/55 sm:text-[10px]">
                    {site.role}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-0.5 backdrop-blur-sm sm:px-2.5 sm:py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/70 sm:text-[9px]">
                    Open
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </MaxWidth>

      {/* Mouse scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-0 flex -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <svg
          width="22"
          height="36"
          viewBox="0 0 22 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-fg-faint"
        >
          <rect
            x="1"
            y="1"
            width="20"
            height="34"
            rx="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.rect
            x="9.5"
            y="7"
            width="3"
            height="6"
            rx="1.5"
            fill="currentColor"
            animate={{ y: [7, 13, 7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-fg-faint">
          Scroll
        </span>
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
    <span className="inline-flex items-baseline flex-wrap">
      {words.map((word, wi) => {
        const isLast = wi === words.length - 1;
        return (
          <span key={wi} className="inline-block">
            {/* overflow-hidden per word clips the slide-up letter animation */}
            <span className="inline-block overflow-hidden" style={{ paddingBottom: '0.06em' }}>
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
            </span>
            {/*
              Accent dot lives INSIDE the last word's outer span so it is
              always on the same flex line as "PROMISES." and never wraps.
              align-baseline = vertical-align:baseline → dot's bottom edge
              sits at the text baseline (same level as the period ".").
            */}
            {isLast && accent && (
              <motion.span
                initial={{ y: -900 }}
                animate={{ y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 13,
                  mass: 1.2,
                  delay: delay + words.length * 0.08 + 0.3,
                }}
                className="ml-1.5 inline-block h-2.5 w-2.5 align-baseline rounded-full bg-accent sm:h-3 sm:w-3"
              />
            )}
            {wi < words.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </span>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
        {label}:
      </span>
      <span className="text-fg-muted">{value}</span>
    </div>
  );
}
