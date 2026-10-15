import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Lightbulb,
  Target,
} from 'lucide-react';
import { caseStudyProjects, getProjectBySlug } from '@/data/projects';
import { profile } from '@/data/profile';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { ProjectCover } from '@/components/ui/ProjectCover';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.name} · ${profile.name}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} · ${profile.name}`,
      description: project.summary,
    },
  };
}

const sections = [
  { key: 'problem', title: 'The problem', icon: Target },
  { key: 'solution', title: 'The solution', icon: Lightbulb },
] as const;

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.caseStudy) notFound();

  const study = project.caseStudy;
  const index = caseStudyProjects.findIndex((item) => item.slug === project.slug);
  const next = caseStudyProjects[(index + 1) % caseStudyProjects.length];

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      {/* ------------------------------------------------------------- header */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-[-20rem] h-[32rem] w-[min(64rem,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-blue)/0.14),transparent)] blur-2xl" />
        </div>

        <div className="shell">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All projects
          </Link>

          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent" size="md">
                {project.category}
              </Badge>
              <span className="font-mono text-xs text-ink-faint">{project.year}</span>
            </div>

            <h1 className="mt-5 max-w-3xl text-display font-semibold text-ink">{project.name}</h1>
            <p className="mt-2 font-mono text-sm uppercase tracking-[0.16em] text-ink-faint">
              {project.tagline}
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.links.github ? (
                <ButtonLink href={project.links.github} size="md">
                  <Github className="h-4 w-4" />
                  View source
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </ButtonLink>
              ) : null}
              {project.links.demo ? (
                <ButtonLink href={project.links.demo} variant="secondary" size="md">
                  <ExternalLink className="h-4 w-4" />
                  Live demo
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>

          <Reveal className="mt-12" delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-line shadow-card">
              <ProjectCover project={project} priority sizes="(max-width: 1200px) 100vw, 1152px" />
            </div>
          </Reveal>
        </div>
      </header>

      {/* --------------------------------------------------------------- body */}
      <div className="shell mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div className="min-w-0 space-y-14">
          {sections.map(({ key, title, icon: Icon }) => (
            <Reveal key={key}>
              <section>
                <h2 className="flex items-center gap-3 text-title font-semibold text-ink">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-muted text-accent-blue">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {title}
                </h2>
                <p className="mt-5 text-base leading-[1.75] text-ink-muted">{study[key]}</p>
              </section>
            </Reveal>
          ))}

          <Reveal>
            <section>
              <h2 className="flex items-center gap-3 text-title font-semibold text-ink">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-muted text-accent-violet">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                </span>
                Architecture
              </h2>
              <Stagger className="mt-6 space-y-3" staggerChildren={0.06}>
                {study.architecture.map((entry, entryIndex) => (
                  <StaggerItem key={entry}>
                    <div className="card flex gap-4 p-5">
                      <span className="font-mono text-xs text-accent-blue">
                        {String(entryIndex + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm leading-relaxed text-ink-muted">{entry}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-3 text-title font-semibold text-ink">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-muted text-tone-success">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </span>
                Key features
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {study.features.map((feature) => (
                  <li key={feature} className="card flex gap-3 p-5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-tone-success/80"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-ink-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-3 text-title font-semibold text-ink">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-muted text-tone-warning">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                </span>
                Challenges
              </h2>
              <ul className="mt-6 space-y-3">
                {study.challenges.map((challenge) => (
                  <li key={challenge} className="flex gap-3 text-base leading-[1.75] text-ink-muted">
                    <span
                      className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-tone-warning/70"
                      aria-hidden="true"
                    />
                    {challenge}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className="card edge-light relative overflow-hidden p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_140%_at_0%_0%,rgb(var(--accent-violet)/0.12),transparent_60%)]"
                aria-hidden="true"
              />
              <h2 className="relative text-title font-semibold text-ink">Outcome</h2>
              <p className="relative mt-4 text-base leading-[1.75] text-ink-muted">
                {study.outcome}
              </p>
            </section>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------ aside */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
              Technology
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-line pt-6">
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-subtle px-4 py-3 transition-colors hover:border-line-strong"
                >
                  <span className="flex items-center gap-2.5 text-sm text-ink">
                    <Github className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                    Repository
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </a>
              ) : null}
              {project.links.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-subtle px-4 py-3 transition-colors hover:border-line-strong"
                >
                  <span className="flex items-center gap-2.5 text-sm text-ink">
                    <ExternalLink className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                    Live demo
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </a>
              ) : null}
            </div>
          </div>
        </aside>
      </div>

      {/* ----------------------------------------------------------- next up */}
      {next && next.slug !== project.slug ? (
        <div className="shell mt-20">
          <Reveal>
            <Link
              href={`/projects/${next.slug}`}
              className="card card-hover group flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  Next case study
                </p>
                <p className="mt-2 text-title font-semibold text-ink transition-colors group-hover:text-accent-blue">
                  {next.name}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink" />
            </Link>
          </Reveal>
        </div>
      ) : null}
    </article>
  );
}

/** Only the slugs returned by generateStaticParams resolve; anything else 404s. */
export const dynamicParams = false;
