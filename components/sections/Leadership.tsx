import { ArrowUpRight, Sparkles } from 'lucide-react';
import { leadership } from '@/data/leadership';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';

/**
 * Leadership & Impact — framed around what had to be delivered, not job titles.
 * Add real attendance / sponsor / volunteer numbers in data/leadership.ts when
 * you have them; they make this section considerably stronger.
 */
export function Leadership() {
  return (
    <Section
      id="leadership"
      eyebrow="06 - Leadership & Impact"
      title="Running events is engineering with people as the runtime."
      description="Contests and carnivals fail in the same places systems do: unclear ownership, no fallback, and coordination left until the last moment. These are the roles where I learned that."
    >
      <Stagger className="grid gap-5 lg:grid-cols-2" staggerChildren={0.08}>
        {leadership.map((item) => (
          <StaggerItem key={item.id}>
            <article className="card card-hover group relative h-full overflow-hidden p-7">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent-violet/[0.07] blur-2xl transition-opacity duration-500 group-hover:bg-accent-violet/[0.12]"
                aria-hidden="true"
              />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-title font-semibold text-ink">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-blue"
                      >
                        {item.title}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-accent-blue">{item.role}</p>
                </div>
                <Badge variant="outline" className="shrink-0 font-mono">
                  {item.period}
                </Badge>
              </div>

              <ul className="relative mt-6 space-y-3">
                {item.impact.map((entry) => (
                  <li key={entry} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <Sparkles
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-violet/70"
                      aria-hidden="true"
                    />
                    {entry}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
