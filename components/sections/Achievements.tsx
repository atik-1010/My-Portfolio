import { ArrowUpRight, Medal } from 'lucide-react';
import { achievements } from '@/data/leadership';
import { competitive } from '@/data/competitive';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { CountUp } from '@/components/ui/CountUp';

const summaryCards = [
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    value: competitive.stats[0].value,
    suffix: '+',
    detail: 'Problems solved across competitive programming platforms',
  },
  {
    id: 'contests',
    title: 'Contest Participation',
    value: competitive.stats[2].value,
    suffix: '+',
    detail: 'ICPC regional preliminaries, IUPCs, Olympiad and national contests',
  },
  {
    id: 'rating',
    title: 'Codeforces Rating',
    value: competitive.stats[1].value,
    detail: `Max rating as ${competitive.rank} - handle ${competitive.handle}`,
  },
];

/** Achievements — verified results only, each linking to evidence where it exists. */
export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="07 - Achievements"
      title="Results, with the evidence attached."
      description="Every entry below links to a standings page, certificate or profile wherever one exists. Nothing here is rounded up."
    >
      <Stagger className="grid gap-5 sm:grid-cols-3" staggerChildren={0.08}>
        {summaryCards.map((card) => (
          <StaggerItem key={card.id}>
            <article className="card h-full p-7">
              <p className="font-mono text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                <CountUp
                  value={card.value}
                  suffix={card.suffix}
                  format={card.id === 'rating' ? 'plain' : 'locale'}
                />
              </p>
              <h3 className="mt-3 text-sm font-semibold text-ink">{card.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">{card.detail}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger className="mt-5 grid gap-4 sm:grid-cols-2" staggerChildren={0.05}>
        {achievements.map((achievement) => {
          const inner = (
            <>
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-muted text-accent-blue">
                <Medal className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="flex items-start justify-between gap-3 text-sm font-semibold text-ink">
                  <span>{achievement.title}</span>
                  {achievement.href ? (
                    <ArrowUpRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                      aria-hidden="true"
                    />
                  ) : null}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{achievement.detail}</p>
              </div>
            </>
          );

          return (
            <StaggerItem key={achievement.id}>
              {achievement.href ? (
                <a
                  href={achievement.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover group flex h-full gap-4 p-5"
                >
                  {inner}
                </a>
              ) : (
                <div className="card flex h-full gap-4 p-5">{inner}</div>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
