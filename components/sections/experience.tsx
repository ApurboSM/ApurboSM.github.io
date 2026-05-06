import { MaxWidth } from '@/components/max-width';
import { ExperienceItem } from '@/components/experience-item';
import { SectionTitle } from '@/components/section-title';
import { experience } from '@/lib/data/experience';

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-t border-line py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="06"
          label="Career"
          title="Where I've built things."
          description="Compact career path. Click any role to expand bullets, stack and links."
        />

        <ol className="mx-auto max-w-3xl space-y-2.5">
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
