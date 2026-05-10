'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { site } from '@/lib/data/site';
import { ThemeToggle } from '@/components/theme-toggle';

const links = [
  { href: '#work', label: 'Work', index: '01' },
  { href: '#process', label: 'Process', index: '02' },
  { href: '#about', label: 'About', index: '03' },
  { href: '#skills', label: 'Stack', index: '04' },
  { href: '#experience', label: 'Career', index: '06' },
  { href: '#contact', label: 'Contact', index: '08' },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const navLinks = links.map((l) => ({
    ...l,
    href: isHome ? l.href : `/${l.href}`,
  }));

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
      // Active section detection
      const sections = links
        .map((l) => l.href.slice(1))
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      const scrollPos = window.scrollY + 120;
      let current = '';
      for (const sec of sections) {
        if (sec.offsetTop <= scrollPos) current = sec.id;
      }
      setActive(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-line bg-bg/70 backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-6 sm:h-[72px] sm:px-8 lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-fg"
          >
            <span className="relative flex h-7 w-7 shrink-0 overflow-hidden rounded-md ring-1 ring-line transition-all group-hover:ring-accent">
              <Image
                src="/images/hero.jpg"
                alt={site.name}
                fill
                sizes="28px"
                className="object-cover"
                priority
              />
            </span>
            <span className="hidden sm:inline">{site.name}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center md:flex">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/40 px-1.5 py-1 backdrop-blur-md">
              {navLinks.map((l) => {
                const isActive = isHome && active === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={cn(
                        'relative inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                        isActive
                          ? 'text-fg'
                          : 'text-fg-muted hover:text-fg',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-surface-2"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative">{l.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <a
              href={`mailto:${site.email}`}
              className="hidden items-center gap-1.5 rounded-full border border-line bg-surface/40 px-3.5 py-1.5 text-xs font-medium text-fg transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent-hi sm:inline-flex"
            >
              Hire me
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <ThemeToggle className="sm:hidden" />
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface/40 text-fg transition-colors hover:border-line-2 md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 bg-bg/90 backdrop-blur-xl md:hidden"
      >
        <nav className="flex h-full flex-col items-start justify-center gap-2 px-8 pt-20">
          {navLinks.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              initial={false}
              animate={{
                opacity: open ? 1 : 0,
                y: open ? 0 : 12,
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: open ? i * 0.05 + 0.1 : 0,
              }}
              className="group flex w-full items-baseline gap-4 border-b border-line py-4 text-3xl font-medium tracking-tight text-fg sm:text-4xl"
            >
              <span className="font-mono text-xs text-fg-faint">{l.index}</span>
              <span>{l.label}</span>
              <ArrowUpRight className="ml-auto h-5 w-5 text-fg-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-fg" />
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </>
  );
}
