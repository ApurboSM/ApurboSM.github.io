'use client';

import { motion } from 'framer-motion';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';
import { skills } from '@/lib/data/skills';

const ease = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-y border-line bg-surface/30 py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="04"
          label="Stack"
          title="The tools I reach for."
          description="Categorized, not ranked. Anything I list here, I have shipped with."
        />

        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease, delay: gi * 0.06 }}
              className="border-t border-line pt-7"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-sans text-lg font-medium text-fg sm:text-xl">
                  {group.category}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">
                  {group.caption}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {group.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.4,
                      ease,
                      delay: gi * 0.06 + ii * 0.025,
                    }}
                    className="inline-flex items-center rounded-md border border-line bg-bg/60 px-2.5 py-1 font-mono text-[12px] text-fg-muted transition-colors hover:border-line-2 hover:bg-surface-2 hover:text-fg"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </MaxWidth>
    </section>
  );
}
