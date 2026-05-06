'use client';

import { motion } from 'framer-motion';
import { type ProcessStep as Step } from '@/lib/data/process';

const ease = [0.16, 1, 0.3, 1] as const;

export function ProcessStep({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      className="group relative flex flex-col gap-5 border-l border-line pl-8 transition-colors duration-500 hover:border-accent/40 sm:gap-6 sm:pl-10"
    >
      {/* Vertical accent line that grows on hover */}
      <span className="pointer-events-none absolute left-0 top-0 h-0 w-px bg-accent transition-all duration-700 ease-out group-hover:h-full" />

      <div className="flex items-baseline gap-4">
        <span className="font-mono text-3xl text-fg-faint sm:text-4xl">
          {step.number}
        </span>
        <h3 className="font-sans text-xl font-medium tracking-tight text-fg sm:text-2xl">
          {step.title}
        </h3>
      </div>

      <p className="text-pretty text-base font-medium leading-relaxed text-fg sm:text-lg">
        {step.description}
      </p>

      <p className="text-pretty text-sm leading-relaxed text-fg-muted sm:text-[15px]">
        {step.detail}
      </p>
    </motion.div>
  );
}
