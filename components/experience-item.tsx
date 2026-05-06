'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { type Experience } from '@/lib/data/experience';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

export function ExperienceItem({
  item,
  index,
  isLast = false,
}: {
  item: Experience;
  index: number;
  isLast?: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      className="relative grid grid-cols-[44px_1fr] gap-5 sm:grid-cols-[60px_1fr] sm:gap-7"
    >
      {/* Left rail */}
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            'relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-xs font-mono font-semibold text-fg',
            item.highlighted && 'border-accent/40 bg-accent/5 text-accent-hi',
          )}
        >
          {item.monogram}
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-line" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'relative rounded-2xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-line-2 sm:p-8',
          item.highlighted && 'border-accent/30 bg-gradient-to-br from-surface to-surface-2',
        )}
      >
        {/* Top line accent on highlighted */}
        {item.highlighted && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        )}

        {/* Founder banner */}
        {item.highlighted && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent-hi">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Co-founded · Founding Engineer
          </div>
        )}

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h3 className="font-sans text-xl font-medium tracking-tight text-fg sm:text-2xl">
            {item.role}
          </h3>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-fg-faint">
            {item.period}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group inline-flex items-center gap-1 text-base font-medium transition-colors',
                item.highlighted ? 'text-accent-hi hover:text-accent' : 'text-fg hover:text-accent-hi',
              )}
            >
              {item.company}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all duration-300 group-hover:opacity-100" />
            </a>
          ) : (
            <span className="text-base font-medium text-fg">{item.company}</span>
          )}
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">
            · {item.type}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-fg-faint">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> {item.location}
          </span>
        </div>

        <p className="mt-5 text-pretty text-sm leading-relaxed text-fg-muted sm:text-[15px]">
          {item.description}
        </p>

        {/* Stats (ClassTablet) */}
        {item.stats && item.stats.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-5">
            {item.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface px-3 py-3.5 text-center"
              >
                <div className="font-sans text-base font-medium text-accent-hi sm:text-lg">
                  {stat.value}
                </div>
                <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        {item.links && item.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted transition-colors hover:text-accent-hi"
              >
                <span className="border-b border-line transition-colors group-hover:border-accent/40">
                  {link.label}
                </span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}

        {/* Bullets */}
        <ul className="mt-7 space-y-3 border-l border-line pl-5">
          {item.bullets.map((b, i) => (
            <li
              key={i}
              className="text-pretty text-sm leading-relaxed text-fg-muted before:mr-3 before:text-fg-faint before:content-['—']"
            >
              {b}
            </li>
          ))}
        </ul>

        {/* Stack */}
        {item.stack.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-1.5 border-t border-line pt-5">
            {item.stack.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-md border border-line bg-bg/40 px-2 py-0.5 font-mono text-[11px] text-fg-muted"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
}
