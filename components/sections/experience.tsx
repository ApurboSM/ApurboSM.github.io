'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
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
 * Each transition scrolls the active item into the viewport so it is
 * always fully visible (Apple-style sticky-feel without CSS sticky).
 */

const THROTTLE_MS = 520;
const NAV_H = 88; // navbar + breathing room
const BEFORE = -1;

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const seqRef = useRef<number>(BEFORE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastWheelRef = useRef(0);
  const inViewRef = useRef(false);
  const N = experience.length;

  /** Smoothly scroll the list item at `idx` so it sits just below the navbar. */
  const scrollToItem = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= N) return;
      // Wait briefly for React to commit the state change before reading layout
      setTimeout(() => {
        const list = listRef.current;
        if (!list) return;
        const item = list.children[idx] as HTMLElement | undefined;
        if (!item) return;
        const top = item.getBoundingClientRect().top + window.scrollY - NAV_H;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 60);
    },
    [N],
  );

  /** Update ref (sync reads inside wheel handler) + state (React render) + viewport. */
  const setSeq = useCallback(
    (idx: number) => {
      seqRef.current = idx;
      const next = idx >= 0 && idx < N ? idx : null;
      setActiveIndex(next);
      if (next !== null) scrollToItem(next);
    },
    [N, scrollToItem],
  );

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
            seqRef.current = N;
            setActiveIndex(null);
          } else if (top >= window.innerHeight) {
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
          /* Engage when the section heading has crossed 60 % of the viewport */
          const rect = section.getBoundingClientRect();
          if (rect.top > window.innerHeight * 0.6) return;

          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          setSeq(0);

        } else if (inSequence) {
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          setSeq(seq < N - 1 ? seq + 1 : N); // N = exit sequence
        }
        /* seq === N: past sequence — scroll flows normally */

      /* ── Scrolling UP ── */
      } else {
        if (seq === N) {
          /* Re-engage from the end when scrolling back up */
          const rect = section.getBoundingClientRect();
          if (rect.bottom < window.innerHeight * 0.4) return;

          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          setSeq(N - 1);

        } else if (inSequence) {
          e.preventDefault();
          if (now - lastWheelRef.current < THROTTLE_MS) return;
          lastWheelRef.current = now;
          setSeq(seq > 0 ? seq - 1 : BEFORE); // BEFORE = exit sequence
        }
        /* seq === BEFORE: before sequence — scroll flows normally */
      }
    };

    observer.observe(section);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
    };
  }, [N, setSeq]);

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
              onToggle={() => setSeq(seqRef.current === i ? BEFORE : i)}
            />
          ))}
        </ol>

        {/* Step progress dots — visible while sequence is active */}
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
