'use client';

import * as React from 'react';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
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

  const toggle = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
