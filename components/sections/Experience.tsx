import { ArrowUpRight, Briefcase, CalendarDays, Users2 } from 'lucide-react';
import { publishedExperience } from '@/data/experience';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';

const kindLabel: Record<string, string> = {
  leadership: 'Leadership',
  internship: 'Internship',
  organizing: 'Event organization',
};

/** Experience — a vertical timeline of verified roles. */
export function Experience() {

  return (
    <Section
      id="experience"
      eyebrow="02 - Experience"
      title="Where I have taken responsibility."
      description="Internship, Leadership, Executive committee work, contest organization and volunteering across the DUET Computer Society - roles measured by what had to run on the day, not by the title."
    >
      <Stagger className="relative" staggerChildren={0.1}>
        {/* Timeline rail */}
        <div
          className="absolute left-[15px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent-blue/40 via-line-strong to-transparent sm:block"
          aria-hidden="true"
        />

        <ol className="space-y-5">
          {publishedExperience.map((item) => (
            /* Rendered as <li> so the animation wrapper keeps the list semantics. */
            <StaggerItem key={item.id} as="li" className="relative sm:pl-12">
              {/* Node */}
              <span
                className="absolute left-0 top-7 hidden h-8 w-8 items-center justify-center rounded-full border border-line bg-surface sm:flex"
                aria-hidden="true"
              >
                {item.kind === 'leadership' ? (
                  <Users2 className="h-3.5 w-3.5 text-accent-blue" />
                ) : (
                  <Briefcase className="h-3.5 w-3.5 text-ink-faint" />
                )}
              </span>

              <article className="card card-hover p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-title font-semibold text-ink">{item.role}</h3>
                      <Badge variant="outline">{kindLabel[item.kind] ?? item.kind}</Badge>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-accent-blue">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 hover:underline underline-offset-4"
                        >
                          {item.organization}
                          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        item.organization
                      )}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-ink-faint">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.period}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.summary}</p>

                {item.responsibilities.length > 0 ? (
                  <ul className="mt-5 space-y-2.5">
                    {item.responsibilities.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex gap-3 text-sm leading-relaxed text-ink-muted"
                      >
                        <span
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent-blue/70"
                          aria-hidden="true"
                        />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </ol>
      </Stagger>



    </Section>


  );
}
