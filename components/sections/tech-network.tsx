'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

type Group = 'frontend' | 'backend' | 'ai' | 'cloud' | 'language' | 'data';

type NodeDef = {
  id: string;
  label: string;
  group: Group;
  x: number; // 0..1 normalized initial position
  y: number;
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

const GROUP_COLOR: Record<Group, string> = {
  frontend: 'rgb(99 102 241)',
  backend: 'rgb(59 130 246)',
  ai: 'rgb(168 85 247)',
  cloud: 'rgb(14 165 233)',
  language: 'rgb(249 115 22)',
  data: 'rgb(34 197 94)',
};

const NODES: NodeDef[] = [
  // Languages (center-ish)
  { id: 'ts',       label: 'TypeScript',    group: 'language', x: 0.50, y: 0.50, weight: 1.6 },
  { id: 'py',       label: 'Python',        group: 'language', x: 0.22, y: 0.28, weight: 1.3 },
  { id: 'js',       label: 'JavaScript',    group: 'language', x: 0.62, y: 0.78, weight: 1.2 },
  // Frontend (top-right)
  { id: 'next',     label: 'Next.js',       group: 'frontend', x: 0.78, y: 0.28, weight: 1.5 },
  { id: 'react',    label: 'React',         group: 'frontend', x: 0.88, y: 0.52, weight: 1.4 },
  { id: 'tailwind', label: 'Tailwind',      group: 'frontend', x: 0.93, y: 0.30, weight: 0.95 },
  { id: 'fm',       label: 'Framer Motion', group: 'frontend', x: 0.84, y: 0.74, weight: 0.9 },
  // Backend (left)
  { id: 'node',     label: 'Node.js',       group: 'backend',  x: 0.30, y: 0.56, weight: 1.4 },
  { id: 'express',  label: 'Express',       group: 'backend',  x: 0.16, y: 0.70, weight: 1.0 },
  { id: 'drizzle',  label: 'Drizzle ORM',   group: 'backend',  x: 0.36, y: 0.80, weight: 0.9 },
  // AI / ML (top-left)
  { id: 'gpt4',     label: 'GPT-4o',        group: 'ai',       x: 0.10, y: 0.50, weight: 1.0 },
  { id: 'gemini',   label: 'Gemini',        group: 'ai',       x: 0.06, y: 0.28, weight: 0.9 },
  { id: 'tf',       label: 'TensorFlow',    group: 'ai',       x: 0.28, y: 0.12, weight: 0.95 },
  // Cloud (top-right area)
  { id: 'aws',      label: 'AWS',           group: 'cloud',    x: 0.68, y: 0.10, weight: 1.2 },
  { id: 'docker',   label: 'Docker',        group: 'cloud',    x: 0.92, y: 0.78, weight: 1.0 },
  { id: 'redis',    label: 'Redis',         group: 'cloud',    x: 0.50, y: 0.10, weight: 0.9 },
  // Data (bottom)
  { id: 'pg',       label: 'PostgreSQL',    group: 'data',     x: 0.50, y: 0.92, weight: 1.3 },
  { id: 'mongo',    label: 'MongoDB',       group: 'data',     x: 0.20, y: 0.90, weight: 1.0 },
];

const EDGES: Edge[] = [
  ['ts', 'next'], ['ts', 'react'], ['ts', 'node'], ['ts', 'drizzle'],
  ['ts', 'express'], ['ts', 'fm'], ['ts', 'tailwind'],
  ['next', 'react'], ['next', 'tailwind'], ['react', 'fm'], ['react', 'tailwind'],
  ['next', 'aws'], ['next', 'docker'],
  ['node', 'express'], ['node', 'drizzle'], ['drizzle', 'pg'], ['express', 'mongo'],
  ['node', 'js'], ['express', 'js'],
  ['py', 'tf'], ['py', 'gpt4'], ['py', 'gemini'], ['gpt4', 'gemini'],
  ['next', 'gpt4'], ['ts', 'gpt4'],
  ['aws', 'docker'], ['aws', 'redis'], ['node', 'docker'], ['node', 'redis'],
  ['pg', 'redis'], ['pg', 'aws'], ['mongo', 'aws'],
].map(([a, b]) => ({ a, b }));

/* ─────────────────────────────────────────
   LIVE NODE (mutable ref data)
───────────────────────────────────────── */

interface LiveNode extends NodeDef {
  bx: number;   // base x (drag anchor, in SVG units)
  by: number;   // base y
  cx: number;   // current animated x
  cy: number;   // current animated y
  phase: number; // float animation phase offset
}

const W = 1000;
const H = 520;

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */

export function TechNetwork() {
  const svgRef = useRef<SVGSVGElement>(null);
  const liveNodesRef = useRef<LiveNode[]>([]);
  const nodeGroupRefs = useRef<Map<string, SVGGElement>>(new Map());
  const edgeLineRefs = useRef<Map<string, SVGLineElement>>(new Map());
  const glowCircleRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const animFrameRef = useRef<number>(0);

  const dragRef = useRef<{
    id: string;
    svgStartX: number;
    svgStartY: number;
    nodeStartBX: number;
    nodeStartBY: number;
    moved: boolean;
  } | null>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Group | 'all'>('all');
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  /* adjacency map */
  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const n of NODES) map.set(n.id, new Set());
    for (const { a, b } of EDGES) {
      map.get(a)!.add(b);
      map.get(b)!.add(a);
    }
    return map;
  }, []);

  /* ── initialise live nodes ── */
  useEffect(() => {
    liveNodesRef.current = NODES.map((n, i) => ({
      ...n,
      bx: n.x * W,
      by: n.y * H,
      cx: n.x * W,
      cy: n.y * H,
      phase: i * 0.618 * Math.PI, // golden-ratio spread
    }));
  }, []);

  /* ── animation loop: float + update DOM directly ── */
  useEffect(() => {
    const startTime = performance.now();

    function tick(now: number) {
      const t = (now - startTime) / 1000;

      for (const node of liveNodesRef.current) {
        const isDragged = dragRef.current?.id === node.id;
        if (!isDragged) {
          node.cx = node.bx + Math.sin(t * 0.32 + node.phase) * 7;
          node.cy = node.by + Math.cos(t * 0.27 + node.phase * 1.3) * 5;
        }
        const gEl = nodeGroupRefs.current.get(node.id);
        if (gEl) {
          gEl.setAttribute('transform', `translate(${node.cx.toFixed(1)},${node.cy.toFixed(1)})`);
        }
      }

      for (const edge of EDGES) {
        const a = liveNodesRef.current.find((n) => n.id === edge.a);
        const b = liveNodesRef.current.find((n) => n.id === edge.b);
        const line = edgeLineRefs.current.get(`${edge.a}-${edge.b}`);
        if (a && b && line) {
          line.setAttribute('x1', a.cx.toFixed(1));
          line.setAttribute('y1', a.cy.toFixed(1));
          line.setAttribute('x2', b.cx.toFixed(1));
          line.setAttribute('y2', b.cy.toFixed(1));
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    }

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  /* ── SVG coordinate helper ── */
  const toSVGPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    try {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      return pt.matrixTransform(ctm.inverse());
    } catch {
      return null;
    }
  }, []);

  /* ── pointer-down: starts drag or click ── */
  const handlePointerDown = useCallback(
    (nodeId: string, e: React.PointerEvent<SVGGElement>) => {
      e.preventDefault();
      const node = liveNodesRef.current.find((n) => n.id === nodeId);
      if (!node) return;
      const pt = toSVGPoint(e.clientX, e.clientY);
      if (!pt) return;

      dragRef.current = {
        id: nodeId,
        svgStartX: pt.x,
        svgStartY: pt.y,
        nodeStartBX: node.bx,
        nodeStartBY: node.by,
        moved: false,
      };

      const gEl = nodeGroupRefs.current.get(nodeId);
      if (gEl) gEl.style.cursor = 'grabbing';

      const onMove = (ev: PointerEvent) => {
        if (!dragRef.current) return;
        const p = toSVGPoint(ev.clientX, ev.clientY);
        if (!p) return;
        const dx = p.x - dragRef.current.svgStartX;
        const dy = p.y - dragRef.current.svgStartY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
        const n = liveNodesRef.current.find((n) => n.id === dragRef.current!.id);
        if (!n) return;
        n.bx = dragRef.current.nodeStartBX + dx;
        n.by = dragRef.current.nodeStartBY + dy;
      };

      const onUp = () => {
        if (dragRef.current) {
          const el = nodeGroupRefs.current.get(dragRef.current.id);
          if (el) el.style.cursor = 'grab';
          if (!dragRef.current.moved) {
            const id = dragRef.current.id;
            setSelected((prev) => (prev === id ? null : id));
          }
          dragRef.current = null;
        }
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [toSVGPoint],
  );

  /* ── opacity helpers (computed per React render on selected/filter change) ── */
  function nodeOpacity(nodeId: string, group: Group): number {
    const passesFilter = activeFilter === 'all' || activeFilter === group;
    if (!passesFilter) return 0.1;
    if (!selected) return 1;
    const connected = selected === nodeId || (adjacency.get(selected)?.has(nodeId) ?? false);
    return connected ? 1 : 0.18;
  }

  function edgeOpacity(a: string, b: string): number {
    if (!selected) return 0;
    return selected === a || selected === b ? 0.65 : 0;
  }

  /* ── derive edge stroke color from selected node's group ── */
  function edgeColor(a: string, b: string): string {
    if (!selected) return 'rgb(var(--fg))';
    const selNode = NODES.find((n) => n.id === selected);
    return selNode ? GROUP_COLOR[selNode.group] : 'rgb(var(--accent))';
  }

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
          description="Click any node to reveal its connections. Drag to rearrange. All nodes float freely."
        />

        {/* Filter chips */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-1.5">
          <FilterChip active={activeFilter === 'all'} onClick={() => { setActiveFilter('all'); setSelected(null); }}>
            All
          </FilterChip>
          {(Object.keys(GROUP_LABEL) as Group[]).map((g) => (
            <FilterChip
              key={g}
              active={activeFilter === g}
              onClick={() => { setActiveFilter(g); setSelected(null); }}
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
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="relative h-[380px] w-full touch-none sm:h-[460px] md:h-[520px]"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Edges — positions set by animation loop; opacity set by React */}
            {EDGES.map((edge, i) => (
              <line
                key={i}
                ref={(el) => {
                  if (el) edgeLineRefs.current.set(`${edge.a}-${edge.b}`, el);
                }}
                stroke={edgeColor(edge.a, edge.b)}
                strokeOpacity={edgeOpacity(edge.a, edge.b)}
                strokeWidth={1.8}
                strokeLinecap="round"
                style={{ transition: 'stroke-opacity 220ms ease, stroke 220ms ease' }}
              />
            ))}

            {/* Nodes */}
            {NODES.map((node) => {
              const r = (node.weight ?? 1) * 17;
              const opacity = nodeOpacity(node.id, node.group);
              const isSelected = selected === node.id;

              return (
                <g
                  key={node.id}
                  ref={(el) => {
                    if (el) nodeGroupRefs.current.set(node.id, el as SVGGElement);
                  }}
                  onPointerDown={(e) => handlePointerDown(node.id, e)}
                  onMouseEnter={() => setHoveredInfo(node.id)}
                  onMouseLeave={() => setHoveredInfo(null)}
                  tabIndex={0}
                  aria-label={`${node.label} — ${GROUP_LABEL[node.group]}`}
                  style={{
                    cursor: 'grab',
                    opacity,
                    transition: 'opacity 220ms ease',
                    outline: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                  }}
                >
                  {/* Selection glow */}
                  {isSelected && (
                    <circle
                      r={r + 18}
                      fill={GROUP_COLOR[node.group]}
                      opacity={0.18}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {/* Main circle */}
                  <circle
                    r={r}
                    fill="rgb(var(--surface))"
                    stroke={GROUP_COLOR[node.group]}
                    strokeWidth={isSelected ? 2.5 : 1.4}
                    style={{ transition: 'stroke-width 220ms ease' }}
                  />
                  {/* Label */}
                  <text
                    textAnchor="middle"
                    dy="0.35em"
                    fill="rgb(var(--fg))"
                    fontSize={10.5}
                    fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                    fontWeight={isSelected ? 600 : 500}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Info bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-bg/30 px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint sm:px-7">
            <span>
              {NODES.length} nodes · {EDGES.length} edges
            </span>
            <span className="hidden sm:inline">
              {selected ? (
                <>
                  <span className="text-fg-muted">
                    {NODES.find((n) => n.id === selected)?.label}
                  </span>
                  {' '}·{' '}
                  <span style={{ color: GROUP_COLOR[NODES.find(n => n.id === selected)!.group] }}>
                    {adjacency.get(selected)?.size ?? 0} connections
                  </span>
                  {' '}· click again to clear
                </>
              ) : hoveredInfo ? (
                <>
                  <span className="text-fg-muted">{NODES.find((n) => n.id === hoveredInfo)?.label}</span>
                  {' '}— click to see connections
                </>
              ) : (
                'click a node · drag to move'
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
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-all',
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
