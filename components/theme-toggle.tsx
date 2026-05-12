'use client';

import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from './theme-provider';

type CircleOverlay = {
  /** Fixed-position center of the button that was clicked */
  cx: number;
  cy: number;
  /** Diameter large enough to cover the entire viewport */
  diameter: number;
  /** Background color of the incoming theme */
  color: string;
  /** Animation phase */
  phase: 'grow' | 'shrink';
};

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const btnRef   = useRef<HTMLButtonElement>(null);
  const busyRef  = useRef(false);
  const [overlay, setOverlay]   = useState<CircleOverlay | null>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClick = useCallback(() => {
    if (busyRef.current || !btnRef.current) return;
    busyRef.current = true;

    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;

    /*
      Diameter = 2 × the farthest corner distance from (cx, cy).
      This guarantees the circle covers every pixel when fully grown.
    */
    const diameter =
      Math.hypot(
        Math.max(cx, window.innerWidth  - cx),
        Math.max(cy, window.innerHeight - cy),
      ) * 2 + 80; // +80 px safety margin

    const next: Theme  = isDark ? 'light' : 'dark';
    const color        = next === 'light' ? '#fafafa' : '#0a0a0a';

    setOverlay({ cx, cy, diameter, color, phase: 'grow' });

    /*
      Timeline:
        0 ms  — circle starts growing   (ease-out, 520 ms)
      460 ms  — theme data-attribute switches (circle fully covers viewport)
      520 ms  — circle starts fading out (140 ms)
      660 ms  — overlay removed, lock released
    */
    setTimeout(() => setTheme(next),                                    460);
    setTimeout(() => setOverlay(o => o ? { ...o, phase: 'shrink' } : null), 520);
    setTimeout(() => { setOverlay(null); busyRef.current = false; },    660);
  }, [isDark, setTheme]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/40 text-fg-muted backdrop-blur-md transition-colors hover:border-line-2 hover:text-fg ${className}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate: 90,  opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inline-flex"
          >
            {isDark
              ? <Moon className="h-[15px] w-[15px]" strokeWidth={1.6} />
              : <Sun  className="h-[15px] w-[15px]" strokeWidth={1.6} />}
          </motion.span>
        </AnimatePresence>
      </button>

      {isMounted && overlay && createPortal(
        <motion.div
          /*
            The div is pre-positioned so its center coincides with the button.
            transform-origin stays at "center center" so scale(0→1) expands
            outward from the button, not from the top-left corner.
          */
          style={{
            position:        'fixed',
            inset:           0,
            pointerEvents:   'none',
            zIndex:          99999,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
        >
          <motion.span
            initial={{ scale: 0, opacity: 1 }}
            animate={
              overlay.phase === 'grow'
                ? { scale: 1, opacity: 1 }
                : { scale: 1, opacity: 0 }
            }
            transition={
              overlay.phase === 'grow'
                ? {
                    scale:   { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0 },
                  }
                : {
                    opacity: { duration: 0.14, ease: 'easeOut' },
                  }
            }
            style={{
              position:        'absolute',
              /* Place circle center at button center */
              top:             overlay.cy - overlay.diameter / 2,
              left:            overlay.cx - overlay.diameter / 2,
              width:           overlay.diameter,
              height:          overlay.diameter,
              borderRadius:    '50%',
              backgroundColor: overlay.color,
              transformOrigin: 'center center',
              willChange:      'transform, opacity',
            }}
          />
        </motion.div>,
        document.body,
      )}
    </>
  );
}

type Theme = 'dark' | 'light';
