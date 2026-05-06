import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        bg:           '#0A0A0A',
        surface:      '#111111',
        'surface-2':  '#161616',
        'surface-3':  '#1c1c1c',
        line:         'rgba(255,255,255,0.08)',
        'line-2':     'rgba(255,255,255,0.14)',
        fg:           '#EDEDED',
        'fg-muted':   'rgba(237,237,237,0.65)',
        'fg-faint':   'rgba(237,237,237,0.4)',
        accent:       '#6366F1',
        'accent-hi':  '#818CF8',
        success:      '#10B981',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
      letterSpacing: {
        'tightest-2': '-0.05em',
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
