import { MaxWidth } from '@/components/max-width';
import { ProjectCard } from '@/components/project-card';
import { SectionTitle } from '@/components/section-title';
import { projects } from '@/lib/data/projects';

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative scroll-mt-24 py-32 sm:py-40">
      <MaxWidth>
        <SectionTitle
          index="01"
          label="Selected Work"
          title="Products that shipped, problems that mattered."
          description="A short list, not a long one. Each project here had a real user, a real constraint, and a real outcome."
        />

        <div className="space-y-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} featured />
          ))}

          <div className="grid gap-6 lg:grid-cols-2">
            {rest.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={featured.length + i}
              />
            ))}
          </div>
        </div>
      </MaxWidth>
    </section>
  );
}
