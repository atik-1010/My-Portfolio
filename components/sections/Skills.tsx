import { skillGroups } from '@/data/skills';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { getIcon } from '@/components/ui/Icon';

/**
 * Skills — category cards with plain chips.
 * No percentage bars: a "78% at C++" claim is unverifiable and invites a
 * question no one can answer well in an interview.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="04 - Skills"
      title="The toolkit, grouped honestly."
      description="Languages and tools I have shipped something with, plus the computer science coursework underneath them. No proficiency percentages - ask me about any of these instead."
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.07}>
        {skillGroups.map((group) => {
          const Icon = getIcon(group.icon);
          return (
            <StaggerItem key={group.id}>
              <article className="card card-hover h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-accent-blue">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-[15px] font-semibold text-ink">{group.title}</h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-white/[0.02] px-2.5 py-1.5 text-[13px] text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
