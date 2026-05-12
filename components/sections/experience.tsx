'use client';

import { useRef, useEffect, useState } from 'react';
import { MaxWidth } from '@/components/max-width';
import { ExperienceItem } from '@/components/experience-item';
import { SectionTitle } from '@/components/section-title';
import { experience } from '@/lib/data/experience';

/**
 * Scroll-driven accordion state machine:
 *
 *   seq = -1        → "before": no item open, user hasn't entered yet
 *   seq = 0..N-1   → item[seq] is expanded
 *   seq = N         → "after": all items cycled, scroll released downward
 *
 * Scroll DOWN:
 *   -1 → 0           (engage: open first)
 *    i → i+1          (advance)
 *   N-1 → N           (exit at bottom, don't lock)
 *
 * Scroll UP:
 *    N → N-1          (re-engage from end)
 *    i → i-1          (retreat)
 *    0 → -1           (exit at top, don't lock)
 */

const THROTTLE_MS = 480;
const BEFORE = -1;

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const seqRef = useRef<number>(BEFORE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastWheelRef = useRef(0);
  const inViewRef = useRef(false);
  const N = experience.length;

  /** Update both the ref (for sync reads inside wheel handler) and state (for React render) */
  function setSeq(idx: number) {
    seqRef.current = idx;
    setActiveIndex(idx >= 0 && idx < N ? idx : null);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* ─ Visibility tracker ─────────────────────────────────────────────── */
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          const { top, bottom } = entry.boundingClientRect;
          if (bottom <= 0) {
            /* Section scrolled entirely above viewport → mark as "after" */
            seqRef.current = N;
            setActiveIndex(null);
          } else if (top >= window.innerHeight) {
            /* Section is entirely below viewport → reset to "before" */
            seqRef.current = BEFORE;
            setActiveIndex(null);
          }
        }
      },
      { threshold: 0.05 },
    );

    /* ─ Wheel handler ─────────────────────────────────────────────────── */
    const handleWheel = (e: WheelEvent) => {
      if (!inViewRef.current) return;

      const now = Date.now();
      const seq = seqRef.current;
      const goingDown = e.deltaY > 0;
      const inSequence = seq >= 0 && seq < N;

      /* ── Scrolling DOWN ── */
      if (goingDown) {
        if (seq === BEFORE) {
          /* Only engage once the section heading has scrolled into the upper viewport */
          const rect = section.getBoundingClientRect();
          if (rect.top > window.innerHeight * 0.6) return;

          /* Lock and open first item */
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          setSeq(0);

        } else if (inSequence) {
          /* Advance to next item, or exit if on last */
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;

          if (seq < N - 1) {
            setSeq(seq + 1);
          } else {
            /* Last item → release scroll downward */
            setSeq(N);
          }
        }
        /* seq === N: past sequence, let scroll flow normally */

      /* ── Scrolling UP ── */
      } else {
        if (seq === N) {
          /* Re-engage from the bottom when user scrolls back up */
          const rect = section.getBoundingClientRect();
          if (rect.bottom < window.innerHeight * 0.4) return;

          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          setSeq(N - 1);

        } else if (inSequence) {
          /* Go back to previous item, or exit if on first */
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;

          if (seq > 0) {
            setSeq(seq - 1);
          } else {
            /* First item → release scroll upward */
            setSeq(BEFORE);
          }
        }
        /* seq === BEFORE: before sequence, let scroll flow normally */
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

        <ol className="mx-auto max-w-3xl space-y-2.5">
          {experience.map((item, i) => (
            <ExperienceItem
              key={item.company}
              item={item}
              index={i}
              isLast={i === N - 1}
              isOpen={activeIndex === i}
              onToggle={() => setSeq(seqRef.current === i ? BEFORE : i)}
            />
          ))}
        </ol>

        {/* Step progress indicator — visible while in sequence */}
        {activeIndex !== null && (
          <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-1.5">
            {experience.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSeq(i)}
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
