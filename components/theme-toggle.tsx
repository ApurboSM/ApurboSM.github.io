'use client';

import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './theme-provider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={(e) => toggle(e)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/40 text-fg-muted backdrop-blur-md transition-colors hover:border-line-2 hover:text-fg ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inline-flex"
        >
          {isDark ? (
            <Moon className="h-[15px] w-[15px]" strokeWidth={1.6} />
          ) : (
            <Sun className="h-[15px] w-[15px]" strokeWidth={1.6} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
