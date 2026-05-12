'use client';

import { useRef, useEffect, useState } from 'react';
import { MaxWidth } from '@/components/max-width';
import { ExperienceItem } from '@/components/experience-item';
import { SectionTitle } from '@/components/section-title';
import { experience } from '@/lib/data/experience';

/**
 * 3-scroll-per-item state machine:
 *
 *  seqRef   -1          → "before": no item active
 *           0..N-1      → that item is expanded
 *           N           → "after": all items done
 *
 *  phaseRef  0 (TOP)    → viewport shows the item header; next ↓ = show bottom
 *            1 (BOTTOM) → viewport shows full details;   next ↓ = collapse+next
 *
 * Scroll DOWN per item:
 *   ↓ [1] open item    → scroll to item TOP     (phase 0)
 *   ↓ [2] full-view    → scroll to item BOTTOM  (phase 1)
 *   ↓ [3] advance      → close + open next (or exit)
 *
 * Scroll UP is symmetric:
 *   ↑ from phase 1     → scroll back to TOP     (phase 0)
 *   ↑ from phase 0     → close + open previous  (at phase 1)
 */

const THROTTLE_MS = 560;
const NAV_H = 92;   // navbar height + breathing room (px)
const ANIM_MS = 420; // accordion open/close duration + buffer

const BEFORE = -1;

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLOListElement>(null);
  const seqRef     = useRef<number>(BEFORE);
  const phaseRef   = useRef<number>(0);          // 0 = TOP  1 = BOTTOM
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastWheelRef = useRef(0);
  const inViewRef    = useRef(false);
  const N = experience.length;

  /* ── Scroll helper ──────────────────────────────────────────────────────
     Reads the item's current rect AFTER `delay` ms (letting accordion
     animation settle) and scrolls it into view.                           */
  function scrollItem(idx: number, edge: 'top' | 'bottom', delay: number) {
    if (idx < 0 || idx >= N) return;
    setTimeout(() => {
      const list = listRef.current;
      if (!list) return;
      const el = list.children[idx] as HTMLElement | undefined;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const target =
        edge === 'top'
          ? rect.top  + window.scrollY - NAV_H - 8
          : rect.top  + window.scrollY + rect.height - window.innerHeight + 8;
      window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
    }, delay);
  }

  /* ── Open item going FORWARD (↓): start at TOP ─────────────────────── */
  function openForward(idx: number) {
    const active = idx >= 0 && idx < N;
    seqRef.current  = idx;
    phaseRef.current = 0;
    setActiveIndex(active ? idx : null);
    if (active) {
      /* If this is the first item there is nothing collapsing above it,
         so a short delay is enough.  For subsequent items we wait for the
         previous card to finish collapsing before measuring position.     */
      scrollItem(idx, 'top', idx === 0 ? 60 : ANIM_MS);
    }
  }

  /* ── Open item going BACKWARD (↑): start at BOTTOM ─────────────────── */
  function openBackward(idx: number) {
    const active = idx >= 0 && idx < N;
    seqRef.current   = idx;
    phaseRef.current = 1;
    setActiveIndex(active ? idx : null);
    if (active) scrollItem(idx, 'bottom', ANIM_MS);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* ─ Visibility tracker ──────────────────────────────────────────── */
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          const { top, bottom } = entry.boundingClientRect;
          if (bottom <= 0) {
            /* Scrolled entirely above → mark as after */
            seqRef.current = N;
            setActiveIndex(null);
          } else if (top >= window.innerHeight) {
            /* Entirely below → reset to before */
            seqRef.current = BEFORE;
            setActiveIndex(null);
          }
        }
      },
      { threshold: 0.05 },
    );

    /* ─ Wheel handler ───────────────────────────────────────────────── */
    const handleWheel = (e: WheelEvent) => {
      if (!inViewRef.current) return;

      const now       = Date.now();
      const seq       = seqRef.current;
      const phase     = phaseRef.current;
      const goingDown = e.deltaY > 0;
      const inSeq     = seq >= 0 && seq < N;

      /* ── DOWN ── */
      if (goingDown) {
        if (seq === BEFORE) {
          /* Engage when heading has crossed 60 % of viewport */
          const rect = section.getBoundingClientRect();
          if (rect.top > window.innerHeight * 0.6) return;
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          openForward(0);            // scroll [1]: expand first item

        } else if (inSeq) {
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;

          if (phase === 0) {
            /* scroll [2]: show full details (scroll to item bottom) */
            phaseRef.current = 1;
            scrollItem(seq, 'bottom', ANIM_MS); // accordion finishes opening first

          } else {
            /* scroll [3]: collapse + advance */
            if (seq < N - 1) {
              openForward(seq + 1);
            } else {
              seqRef.current = N;   // exit sequence
              setActiveIndex(null);
            }
          }
        }
        /* seq === N: past sequence — normal scroll */

      /* ── UP ── */
      } else {
        if (seq === N) {
          const rect = section.getBoundingClientRect();
          if (rect.bottom < window.innerHeight * 0.4) return;
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          openBackward(N - 1);     // re-enter from end, show last item bottom

        } else if (inSeq) {
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;

          if (phase === 1) {
            /* scroll [2] reversed: back to item top */
            phaseRef.current = 0;
            scrollItem(seq, 'top', 50); // no accordion change, near-instant

          } else {
            /* scroll [1] reversed: close + go to previous */
            if (seq > 0) {
              openBackward(seq - 1);
            } else {
              seqRef.current = BEFORE;
              setActiveIndex(null);
            }
          }
        }
        /* seq === BEFORE: before sequence — normal scroll */
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
                seqRef.current  = next;
                phaseRef.current = 0;
                setActiveIndex(next >= 0 && next < N ? next : null);
                if (next >= 0 && next < N) scrollItem(next, 'top', 60);
              }}
            />
          ))}
        </ol>

        {/* Progress dots */}
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
