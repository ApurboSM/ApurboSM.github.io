import { MaxWidth } from '@/components/max-width';
import { ExperienceItem } from '@/components/experience-item';
import { SectionTitle } from '@/components/section-title';
import { experience } from '@/lib/data/experience';

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-32 sm:py-40">
      <MaxWidth>
        <SectionTitle
          index="05"
          label="Career"
          title="Where I've built things."
          description="Roles ordered by current relevance — featured first."
        />

        <ol className="mx-auto max-w-3xl space-y-3">
          {experience.map((item, i) => (
            <ExperienceItem
              key={item.company}
              item={item}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </ol>
      </MaxWidth>
    </section>
  );
}
