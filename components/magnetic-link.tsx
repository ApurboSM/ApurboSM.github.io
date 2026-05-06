'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  external?: boolean;
  ariaLabel?: string;
};

export function MagneticLink({
  href,
  children,
  className,
  strength = 8,
  external = false,
  ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.4 };
  const x = useSpring(useTransform(mx, [-1, 1], [-strength, strength]), springConfig);
  const y = useSpring(useTransform(my, [-1, 1], [-strength, strength]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) / (rect.width / 2));
    my.set((e.clientY - cy) / (rect.height / 2));
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={cn('inline-flex select-none items-center', className)}
    >
      {children}
    </motion.a>
  );
}
