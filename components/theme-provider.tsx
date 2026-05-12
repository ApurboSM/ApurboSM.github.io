'use client';

import * as React from 'react';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  /** Pass the click MouseEvent so the reveal can originate from the button. */
  toggle: (e?: React.MouseEvent) => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'apurbo:theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>('dark');

  React.useEffect(() => {
    try {
      const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null;
      const initial: Theme = stored ?? 'dark';
      setThemeState(initial);
      document.documentElement.setAttribute('data-theme', initial);
    } catch {
      // ignore
    }
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
  }, []);

  const toggle = React.useCallback(
    (e?: React.MouseEvent) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';

      /* Compute click origin (button center) for the circle animation */
      const rect = (e?.currentTarget as HTMLElement | undefined)?.getBoundingClientRect();
      const originX = rect ? rect.left + rect.width  / 2 : window.innerWidth  / 2;
      const originY = rect ? rect.top  + rect.height / 2 : window.innerHeight / 2;

      applyTheme(next, originX, originY);
      setThemeState(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Applies theme using the View Transitions API (Chrome 111+) for a cinematic
 * circular reveal expanding from `(x, y)`.  Falls back to a CSS cross-fade
 * for browsers that don't support startViewTransition.
 */
function applyTheme(theme: Theme, x: number, y: number) {
  const root = document.documentElement;

  /* Store origin as CSS custom properties for the clip-path animation */
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);

  const vt = (document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  }).startViewTransition;

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (vt && !reducedMotion) {
    vt.call(document, () => {
      root.setAttribute('data-theme', theme);
    });
  } else {
    /* CSS-only fallback */
    root.setAttribute('data-theme', theme);
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 500);
  }
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
