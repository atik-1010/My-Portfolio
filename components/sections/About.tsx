import { GraduationCap } from 'lucide-react';
import { pillars, profile } from '@/data/profile';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { getIcon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';

/** About — three pillars plus education. Story, not a restated CV paragraph. */
export function About() {
  const { education } = profile;

  return (
    <Section
      id="about"
      eyebrow="01 - About"
      title="Engineering, contests and the work that connects them."
      description="I came to software through competitive programming, and it shaped how I build: understand the constraints first, then write the smallest thing that solves the problem properly. Three threads run through everything I have worked on."
    >
      <Stagger className="grid gap-5 md:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = getIcon(pillar.icon);
          return (
            <StaggerItem key={pillar.id}>
              <article className="card card-hover group relative h-full overflow-hidden p-7">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-blue/[0.07] blur-2xl transition-opacity duration-500 group-hover:bg-accent-blue/[0.12]"
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-muted text-accent-blue">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-ink-faint">
                    {pillar.index}
                  </span>
                </div>
                <h3 className="relative mt-6 text-title font-semibold text-ink">{pillar.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-muted">{pillar.body}</p>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Education */}
      <Stagger className="mt-5" staggerChildren={0}>
        <StaggerItem>
          <article className="card p-7 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-muted text-accent-violet">
                  <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-title font-semibold text-ink">
                    {education.degree} in {education.field}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-muted">{education.institution}</p>
                  {education.cgpa ? (
                    <p className="mt-1 text-sm text-ink-muted">CGPA: {education.cgpa}</p>
                  ) : null}
                </div>
              </div>
              <Badge variant="accent" size="md" className="shrink-0 self-start">
                {education.graduation}
              </Badge>
            </div>

            <div className="mt-7">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                Relevant coursework
              </p>
              <ul className="flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <li key={course}>
                    <Badge>{course}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
