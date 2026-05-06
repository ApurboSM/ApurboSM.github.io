import { MaxWidth } from '@/components/max-width';
import { ProcessStep } from '@/components/process-step';
import { SectionTitle } from '@/components/section-title';
import { process } from '@/lib/data/process';

export function EngineeringProcess() {
  return (
    <section
      id="process"
      className="relative scroll-mt-24 border-y border-line bg-surface/30 py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="02"
          label="How I Build"
          title="Engineering as a discipline, not a vibe."
          description="The same loop runs every project — whether it is a startup MVP, a SaaS feature, or a research prototype."
        />

        <div className="grid gap-12 sm:gap-14 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
          {process.map((s, i) => (
            <ProcessStep key={s.number} step={s} index={i} />
          ))}
        </div>
      </MaxWidth>
    </section>
  );
}
