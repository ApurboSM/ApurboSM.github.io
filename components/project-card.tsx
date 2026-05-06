'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { type Project } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      className={cn(
        'group relative flex flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-500 sm:p-9',
        'hover:border-line-2 hover:bg-surface-2',
        featured && 'lg:p-12',
      )}
    >
      {/* Featured ribbon line */}
      {featured && (
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-60" />
      )}

      {/* Top meta row */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
          {project.year}
        </span>
        <span className="h-px w-6 bg-line" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          {project.role}
        </span>
        {featured && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-hi">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={cn(
          'font-sans font-medium leading-[1.1] tracking-tight text-fg',
          featured ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl',
        )}
      >
        {project.title}
      </h3>

      {/* Category */}
      <div className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
        {project.category}
      </div>

      {/* Body */}
      <div className="mt-7 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <DataField label="Problem" value={project.problem} />
        <DataField label="Approach" value={project.approach} />
      </div>

      <div className="mt-6">
        <DataField
          label="Impact"
          value={project.impact}
          accent
        />
      </div>

      {/* Stack */}
      <div className="mt-8 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-line bg-bg/50 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.links.length > 0 && (
        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <span className="border-b border-transparent transition-colors group-hover/link:border-line-2">
                {link.label}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}

function DataField({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-faint">
        {label}
      </div>
      <p
        className={cn(
          'mt-2 text-pretty text-[15px] leading-relaxed',
          accent ? 'text-accent-hi' : 'text-fg-muted',
        )}
      >
        {value}
      </p>
    </div>
  );
}
