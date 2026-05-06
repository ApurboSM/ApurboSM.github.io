'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────
   GRAPH DATA
───────────────────────────────────────── */

type Group = 'frontend' | 'backend' | 'ai' | 'cloud' | 'language' | 'data';

type Node = {
  id: string;
  label: string;
  group: Group;
  /** position in 0..1 normalized space */
  x: number;
  y: number;
  /** radius weight — used as a node size hint */
  weight?: number;
};

type Edge = { a: string; b: string };

const GROUP_LABEL: Record<Group, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  ai: 'AI / ML',
  cloud: 'Cloud / DevOps',
  language: 'Languages',
  data: 'Data',
};

const NODES: Node[] = [
  // Languages (center)
  { id: 'ts',         label: 'TypeScript',  group: 'language', x: 0.50, y: 0.52, weight: 1.6 },
  { id: 'py',         label: 'Python',      group: 'language', x: 0.20, y: 0.30, weight: 1.3 },
  { id: 'js',         label: 'JavaScript',  group: 'language', x: 0.62, y: 0.78, weight: 1.2 },

  // Frontend cluster (top-right)
  { id: 'next',       label: 'Next.js',     group: 'frontend', x: 0.78, y: 0.30, weight: 1.5 },
  { id: 'react',      label: 'React',       group: 'frontend', x: 0.86, y: 0.55, weight: 1.4 },
  { id: 'tailwind',   label: 'Tailwind',    group: 'frontend', x: 0.92, y: 0.32, weight: 1.0 },
  { id: 'fm',         label: 'Framer Motion', group: 'frontend', x: 0.84, y: 0.74, weight: 0.95 },

  // Backend cluster (top-left)
  { id: 'node',       label: 'Node.js',     group: 'backend',  x: 0.30, y: 0.55, weight: 1.4 },
  { id: 'express',    label: 'Express',     group: 'backend',  x: 0.16, y: 0.70, weight: 1.0 },
  { id: 'drizzle',    label: 'Drizzle ORM', group: 'backend',  x: 0.36, y: 0.78, weight: 0.95 },

  // AI/ML (bottom-left)
  { id: 'gpt4',       label: 'GPT-4o',      group: 'ai',       x: 0.10, y: 0.50, weight: 1.0 },
  { id: 'gemini',     label: 'Gemini',      group: 'ai',       x: 0.06, y: 0.30, weight: 0.9 },
  { id: 'tf',         label: 'TensorFlow',  group: 'ai',       x: 0.30, y: 0.12, weight: 0.95 },

  // Cloud (bottom-right)
  { id: 'aws',        label: 'AWS',         group: 'cloud',    x: 0.70, y: 0.10, weight: 1.2 },
  { id: 'docker',     label: 'Docker',      group: 'cloud',    x: 0.92, y: 0.78, weight: 1.0 },
  { id: 'redis',      label: 'Redis',       group: 'cloud',    x: 0.50, y: 0.10, weight: 0.9 },

  // Data
  { id: 'pg',         label: 'PostgreSQL',  group: 'data',     x: 0.50, y: 0.92, weight: 1.3 },
  { id: 'mongo',      label: 'MongoDB',     group: 'data',     x: 0.20, y: 0.92, weight: 1.0 },
];

const EDGES: Edge[] = [
  // TS as a hub
  ['ts', 'next'], ['ts', 'react'], ['ts', 'node'], ['ts', 'drizzle'],
  ['ts', 'express'], ['ts', 'fm'], ['ts', 'tailwind'],
  // Frontend cluster
  ['next', 'react'], ['next', 'tailwind'], ['react', 'fm'], ['react', 'tailwind'],
  ['next', 'aws'], ['next', 'docker'],
  // Backend cluster
  ['node', 'express'], ['node', 'drizzle'], ['drizzle', 'pg'], ['express', 'mongo'],
  ['node', 'js'], ['express', 'js'],
  // AI / ML
  ['py', 'tf'], ['py', 'gpt4'], ['py', 'gemini'], ['gpt4', 'gemini'],
  ['next', 'gpt4'], ['ts', 'gpt4'],
  // Cloud
  ['aws', 'docker'], ['aws', 'redis'], ['node', 'docker'], ['node', 'redis'],
  // Data
  ['pg', 'redis'], ['pg', 'aws'], ['mongo', 'aws'],
].map(([a, b]) => ({ a, b }));

const GROUP_COLOR: Record<Group, string> = {
  frontend: 'rgb(var(--accent))',
  backend: 'rgb(99 102 241)',
  ai: 'rgb(168 85 247)',
  cloud: 'rgb(14 165 233)',
  language: 'rgb(var(--fg))',
  data: 'rgb(34 197 94)',
};

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */

export function TechNetwork() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Group | 'all'>('all');

  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const n of NODES) map.set(n.id, new Set());
    for (const { a, b } of EDGES) {
      map.get(a)!.add(b);
      map.get(b)!.add(a);
    }
    return map;
  }, []);

  function isHighlighted(nodeId: string): boolean {
    if (!hovered) return activeFilter === 'all' ? true : nodeId.length > 0;
    return hovered === nodeId || (adjacency.get(hovered)?.has(nodeId) ?? false);
  }

  function isEdgeActive(a: string, b: string): boolean {
    if (!hovered) return true;
    return hovered === a || hovered === b;
  }

  function passesFilter(group: Group): boolean {
    return activeFilter === 'all' || activeFilter === group;
  }

  const W = 1000;
  const H = 560;

  return (
    <section
      id="tech-network"
      className="relative scroll-mt-24 border-t border-line py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="05"
          label="Stack Network"
          title="How my stack connects."
          description="Hover any node to highlight its connections. Each link represents a technology I've shipped together in production projects."
        />

        {/* Filter chips */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-1.5">
          <FilterChip active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
            All
          </FilterChip>
          {(Object.keys(GROUP_LABEL) as Group[]).map((g) => (
            <FilterChip
              key={g}
              active={activeFilter === g}
              onClick={() => setActiveFilter(g)}
              color={GROUP_COLOR[g]}
            >
              {GROUP_LABEL[g]}
            </FilterChip>
          ))}
        </div>

        {/* Graph container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface/60 to-surface-2/40"
        >
          {/* Subtle grid backdrop */}
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="relative h-[420px] w-full sm:h-[500px] md:h-[560px]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(var(--accent) / 0.4)" />
                <stop offset="100%" stopColor="rgb(var(--accent) / 0)" />
              </radialGradient>
            </defs>

            {/* Edges */}
            <g>
              {EDGES.map((e, i) => {
                const a = NODES.find((n) => n.id === e.a);
                const b = NODES.find((n) => n.id === e.b);
                if (!a || !b) return null;
                const active = isEdgeActive(e.a, e.b);
                const visible = passesFilter(a.group) || passesFilter(b.group);
                return (
                  <line
                    key={i}
                    x1={a.x * W}
                    y1={a.y * H}
                    x2={b.x * W}
                    y2={b.y * H}
                    stroke="rgb(var(--fg))"
                    strokeOpacity={!visible ? 0.02 : active ? 0.32 : 0.08}
                    strokeWidth={active ? 1.4 : 1}
                    style={{ transition: 'stroke-opacity 280ms ease, stroke-width 280ms ease' }}
                  />
                );
              })}
            </g>

            {/* Nodes */}
            <g>
              {NODES.map((n) => {
                const active = isHighlighted(n.id);
                const visible = passesFilter(n.group);
                const r = (n.weight ?? 1) * 18;
                return (
                  <g
                    key={n.id}
                    transform={`translate(${n.x * W}, ${n.y * H})`}
                    onMouseEnter={() => setHovered(n.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(n.id)}
                    onBlur={() => setHovered(null)}
                    tabIndex={0}
                    aria-label={`${n.label} — ${GROUP_LABEL[n.group]}`}
                    style={{
                      cursor: 'pointer',
                      opacity: !visible ? 0.18 : active ? 1 : 0.4,
                      transition: 'opacity 280ms ease',
                      outline: 'none',
                    }}
                  >
                    {/* Glow on hover */}
                    {hovered === n.id && (
                      <circle r={r + 14} fill={GROUP_COLOR[n.group]} opacity={0.18} />
                    )}
                    <circle
                      r={r}
                      fill="rgb(var(--surface))"
                      stroke={GROUP_COLOR[n.group]}
                      strokeWidth={hovered === n.id ? 2 : 1.2}
                      strokeOpacity={active ? 1 : 0.45}
                      style={{ transition: 'stroke-opacity 280ms ease, stroke-width 280ms ease' }}
                    />
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      fill="rgb(var(--fg))"
                      fontSize={11.5}
                      fontFamily="var(--font-geist-sans), Inter, system-ui, sans-serif"
                      fontWeight={500}
                      style={{ pointerEvents: 'none' }}
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Legend / metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-bg/30 px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint sm:px-7">
            <span>
              {NODES.length} technologies · {EDGES.length} connections
            </span>
            <span className="hidden sm:inline">
              {hovered ? (
                <>
                  <span className="text-fg-muted">Hovered:</span>{' '}
                  <span className="text-fg">{NODES.find((n) => n.id === hovered)?.label}</span>{' '}
                  · {adjacency.get(hovered)?.size ?? 0} connections
                </>
              ) : (
                'Hover a node to inspect'
              )}
            </span>
          </div>
        </motion.div>
      </MaxWidth>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  color,
  children,
}: {
  active: boolean;
  onClick: () => void;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-all',
        active
          ? 'border-line-2 bg-surface-2 text-fg'
          : 'border-line bg-surface/40 text-fg-muted hover:border-line-2 hover:text-fg',
      )}
    >
      {color && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: color }}
        />
      )}
      {children}
    </button>
  );
}
