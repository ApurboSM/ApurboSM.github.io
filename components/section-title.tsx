import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

type SectionTitleProps = {
  index: string;
  label: string;
  title: string;
  description?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
};

export function SectionTitle({
  index,
  label,
  title,
  description,
  className,
  align = 'left',
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'mb-16 sm:mb-20',
        align === 'center' && 'mx-auto max-w-2xl text-center',
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3 text-fg-faint">
          <span className="font-mono text-xs tracking-widest">{index}</span>
          <span className="h-px w-8 bg-line" />
          <span className="font-mono text-xs uppercase tracking-[0.18em]">
            {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
