'use client';

import { useRef, useEffect, useState } from 'react';
import { MaxWidth } from '@/components/max-width';
import { ExperienceItem } from '@/components/experience-item';
import { SectionTitle } from '@/components/section-title';
import { experience } from '@/lib/data/experience';

/**
 * Butter-smooth 3-scroll-per-item state machine
 * ─────────────────────────────────────────────
 *  seqRef   -1        → before sequence
 *           0..N-1   → that item is expanded
 *           N        → after sequence
 *
 *  phaseRef  0 (TOP)     → viewport at item header  ; next ↓ = show full card
 *            1 (BOTTOM)  → viewport at card bottom  ; next ↓ = collapse + next
 *
 * KEY TECHNIQUE — predictive scroll:
 *   When advancing from item[i] to item[i+1] the collapsed height of item[i]
 *   is estimated from a sibling in closed state.  The scroll target is
 *   computed BEFORE any animation, so the viewport glides to the exact right
 *   spot while the accordion opens/closes simultaneously — no waiting needed.
 */

const THROTTLE_MS = 360;        // min ms between transitions
const NAV_H       = 92;         // px reserved for navbar
const ANIM_MS     = 260;        // accordion animation duration + small buffer
const BEFORE      = -1;

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLOListElement>(null);
  const seqRef     = useRef<number>(BEFORE);
  const phaseRef   = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastWheelRef = useRef(0);
  const inViewRef    = useRef(false);
  const N = experience.length;

  /* ── Helpers ──────────────────────────────────────────────────────────── */

  /** Collapse-height of any closed item (reads a real sibling for accuracy). */
  function getCollapsedHeight(excludeIdx: number): number {
    const list = listRef.current;
    if (!list) return 200;
    for (let j = 0; j < N; j++) {
      if (j !== excludeIdx && j !== seqRef.current) {
        const h = (list.children[j] as HTMLElement)?.getBoundingClientRect().height;
        if (h > 0) return h;
      }
    }
    return 200; // fallback
  }

  /**
   * Predictive scroll: called BEFORE React re-renders so the old DOM heights
   * are still accurate.  We calculate where item[nextIdx] will end up once
   * item[prevIdx] collapses and scroll there immediately.
   */
  function scrollPredictive(prevIdx: number, nextIdx: number) {
    const list = listRef.current;
    if (!list) return;
    const prevEl = list.children[prevIdx] as HTMLElement | undefined;
    const nextEl = list.children[nextIdx] as HTMLElement | undefined;
    if (!prevEl || !nextEl) return;

    const prevHeight   = prevEl.getBoundingClientRect().height;
    const collapsedH   = getCollapsedHeight(prevIdx);
    const shrinkage    = Math.max(0, prevHeight - collapsedH);
    const nextAbsTop   = nextEl.getBoundingClientRect().top + window.scrollY;
    const target       = nextAbsTop - shrinkage - NAV_H - 8;

    window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }

  /** Simple scroll to top or bottom of an item, after `delay` ms. */
  function scrollItem(idx: number, edge: 'top' | 'bottom', delay: number) {
    if (idx < 0 || idx >= N) return;
    setTimeout(() => {
      const list = listRef.current;
      if (!list) return;
      const el = list.children[idx] as HTMLElement | undefined;
      if (!el) return;
      const rect   = el.getBoundingClientRect();
      const target =
        edge === 'top'
          ? rect.top  + window.scrollY - NAV_H - 8
          : rect.top  + window.scrollY + rect.height - window.innerHeight + 8;
      window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
    }, delay);
  }

  /* Open going FORWARD (↓): show item top */
  function openForward(idx: number, prevIdx?: number) {
    const active = idx >= 0 && idx < N;
    seqRef.current   = idx;
    phaseRef.current = 0;
    setActiveIndex(active ? idx : null);

    if (!active) return;
    if (prevIdx !== undefined) {
      scrollPredictive(prevIdx, idx); // instant, no delay
    } else {
      scrollItem(idx, 'top', 60);     // first item — short delay
    }
  }

  /* Open going BACKWARD (↑): show item bottom */
  function openBackward(idx: number) {
    const active = idx >= 0 && idx < N;
    seqRef.current   = idx;
    phaseRef.current = 1;
    setActiveIndex(active ? idx : null);
    if (active) scrollItem(idx, 'bottom', ANIM_MS); // wait for accordion
  }

  /* ── Effect: wheel handler + visibility ─────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          const { top, bottom } = entry.boundingClientRect;
          if (bottom <= 0) { seqRef.current = N;      setActiveIndex(null); }
          else if (top >= window.innerHeight) { seqRef.current = BEFORE; setActiveIndex(null); }
        }
      },
      { threshold: 0.05 },
    );

    const handleWheel = (e: WheelEvent) => {
      if (!inViewRef.current) return;

      const now       = Date.now();
      const seq       = seqRef.current;
      const phase     = phaseRef.current;
      const goingDown = e.deltaY > 0;
      const inSeq     = seq >= 0 && seq < N;

      if (goingDown) {
        /* ── Engage ── */
        if (seq === BEFORE) {
          const rect = section.getBoundingClientRect();
          if (rect.top > window.innerHeight * 0.6) return;
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          openForward(0);

        } else if (inSeq) {
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;

          if (phase === 0) {
            /* Show full details (bottom of card) */
            phaseRef.current = 1;
            scrollItem(seq, 'bottom', ANIM_MS);

          } else {
            /* Collapse + advance */
            if (seq < N - 1) {
              openForward(seq + 1, seq); // predictive — no delay
            } else {
              seqRef.current = N;
              setActiveIndex(null);
            }
          }
        }
        /* seq === N → normal scroll */

      } else { /* UP */
        if (seq === N) {
          const rect = section.getBoundingClientRect();
          if (rect.bottom < window.innerHeight * 0.4) return;
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          openBackward(N - 1);

        } else if (inSeq) {
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;

          if (phase === 1) {
            phaseRef.current = 0;
            scrollItem(seq, 'top', 30); // no accordion change → near-instant
          } else {
            if (seq > 0) {
              openBackward(seq - 1);
            } else {
              seqRef.current = BEFORE;
              setActiveIndex(null);
            }
          }
        }
        /* seq === BEFORE → normal scroll */
      }
    };

    observer.observe(section);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative scroll-mt-24 border-t border-line py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="01"
          label="Career"
          title="Where I've built things."
          description="Scroll to step through each role — or click any card to open it directly."
        />

        <ol ref={listRef} className="mx-auto max-w-3xl space-y-2.5">
          {experience.map((item, i) => (
            <ExperienceItem
              key={item.company}
              item={item}
              index={i}
              isLast={i === N - 1}
              isOpen={activeIndex === i}
              onToggle={() => {
                const next = seqRef.current === i ? BEFORE : i;
                seqRef.current   = next;
                phaseRef.current = 0;
                setActiveIndex(next >= 0 && next < N ? next : null);
                if (next >= 0 && next < N) scrollItem(next, 'top', 60);
              }}
            />
          ))}
        </ol>

        {activeIndex !== null && (
          <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-1.5">
            {experience.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  seqRef.current   = i;
                  phaseRef.current = 0;
                  setActiveIndex(i);
                  scrollItem(i, 'top', 60);
                }}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? '24px' : '6px',
                  background:
                    activeIndex === i
                      ? 'rgb(var(--accent))'
                      : 'rgb(var(--fg) / 0.2)',
                }}
                aria-label={`Jump to ${experience[i].company}`}
              />
            ))}
          </div>
        )}
      </MaxWidth>
    </section>
  );
}
