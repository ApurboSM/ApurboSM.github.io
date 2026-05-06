'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const hasDetails = item.bullets.length > 0 || item.stack.length > 0 || (item.links && item.links.length > 0) || (item.stats && item.stats.length > 0);

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
      className="relative grid grid-cols-[36px_1fr] gap-4 sm:grid-cols-[44px_1fr] sm:gap-5"
    >
      {/* Left rail */}
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-[10.5px] font-mono font-semibold text-fg sm:h-11 sm:w-11 sm:rounded-xl sm:text-xs',
            item.highlighted && 'border-accent/40 bg-accent/5 text-accent-hi',
          )}
        >
          {item.monogram}
        </div>
        {!isLast && <div className="mt-1.5 w-px flex-1 bg-line" />}
      </div>

      {/* Content card */}
      <div
        className={cn(
          'group relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-2',
          item.highlighted && 'border-accent/30 bg-gradient-to-br from-surface to-surface-2',
        )}
      >
        {item.highlighted && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        )}

        {/* Compact header — always visible */}
        <button
          type="button"
          onClick={() => hasDetails && setOpen((v) => !v)}
          className={cn(
            'flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6',
            !hasDetails && 'cursor-default',
          )}
          aria-expanded={open}
        >
          <div className="min-w-0 flex-1 space-y-1.5">
            {item.highlighted && (
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-accent-hi">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Founding Engineer
              </div>
            )}

            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <h3 className="font-sans text-[17px] font-medium tracking-tight text-fg sm:text-lg">
                {item.role}
              </h3>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
                · {item.type}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]">
              {item.url ? (
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-0.5 font-medium transition-colors',
                    item.highlighted ? 'text-accent-hi hover:text-accent' : 'text-fg hover:text-accent-hi',
                  )}
                >
                  {item.company}
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </a>
              ) : (
                <span className="font-medium text-fg">{item.company}</span>
              )}
              <span className="text-fg-faint">·</span>
              <span className="inline-flex items-center gap-1 text-fg-muted">
                <MapPin className="h-3 w-3" /> {item.location}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
              {item.period}
            </span>
            {hasDetails && (
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-fg-faint transition-all duration-300',
                  open && 'rotate-180 text-fg',
                )}
              />
            )}
          </div>
        </button>

        {/* Description — always shown, but compact */}
        <div className="border-t border-line px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <p className="text-pretty text-[13.5px] leading-relaxed text-fg-muted">
            {item.description}
          </p>

          {/* Inline stack chips on collapsed state (truncated) */}
          {!open && item.stack.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1">
              {item.stack.slice(0, 6).map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-md border border-line bg-bg/40 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
                >
                  {s}
                </span>
              ))}
              {item.stack.length > 6 && (
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 font-mono text-[10px] text-fg-faint">
                  +{item.stack.length - 6} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Expandable details */}
        <motion.div
          initial={false}
          animate={{
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease }}
          className="overflow-hidden"
        >
          <div className="space-y-5 border-t border-line p-5 sm:p-6">
            {/* Stats grid (ClassTablet) */}
            {item.stats && item.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-5">
                {item.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-surface px-2.5 py-3 text-center"
                  >
                    <div className="font-sans text-[15px] font-medium text-accent-hi">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bullets */}
            {item.bullets.length > 0 && (
              <ul className="space-y-2 border-l border-line pl-4">
                {item.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="text-pretty text-[13px] leading-relaxed text-fg-muted before:mr-2 before:text-fg-faint before:content-['—']"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {/* Stack */}
            {item.stack.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.stack.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-md border border-line bg-bg/40 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            {item.links && item.links.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-4">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/link inline-flex items-center gap-1 font-mono text-[11px] text-fg-muted transition-colors hover:text-accent-hi"
                  >
                    <span className="border-b border-line transition-colors group-hover/link:border-accent/40">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.li>
  );
}
