import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { featuredProjects, secondaryProjects } from '@/data/projects';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { ProjectCover } from '@/components/ui/ProjectCover';

/**
 * Featured projects (with case-study pages) plus a compact secondary list.
 * Every card leads with the problem solved, not the technology used.
 */
export function Projects() {

  return (
    <Section
      id="projects"
      eyebrow=" 03 - Projects"
      title="Systems I built end to end."
      description="Each one started as a problem worth solving rather than a framework worth trying. Open a case study for the architecture, the decisions and what went wrong along the way."
    >
      <Stagger className="space-y-6" staggerChildren={0.1}>
        {featuredProjects.map((project, index) => (
          <StaggerItem key={project.slug}>
            <article className="card card-hover group overflow-hidden">
              <div
                className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative block overflow-hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <ProjectCover
                    project={project}
                    className="h-full lg:aspect-auto lg:min-h-[22rem]"
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </Link>

                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="accent">{project.category}</Badge>
                    <span className="font-mono text-xs text-ink-faint">{project.year}</span>
                  </div>

                  <h3 className="mt-4 text-headline font-semibold tracking-tight text-ink">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition-colors hover:text-accent-blue"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
                    {project.tagline}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-ink-muted">{project.summary}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.stack.slice(0, 6).map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                    {project.stack.length > 6 ? (
                      <li>
                        <Badge variant="outline">+{project.stack.length - 6}</Badge>
                      </li>
                    ) : null}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink"
                    >
                      Read case study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>

                    {project.links.github ? (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        Source
                      </a>
                    ) : null}

                    {project.links.demo ? (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        Live demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      {/* -------------------------------------------------- secondary projects */}
      <div className="mt-16">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h3 className="text-title font-semibold text-ink">More projects</h3>
          <a
            href="https://github.com/atik-1010?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            All repositories
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2" staggerChildren={0.06}>
          {secondaryProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <a
                href={project.links.github ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex h-full flex-col p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-ink transition-colors group-hover:text-accent-blue">
                      {project.name}
                    </h4>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                      {project.category}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  {project.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

    </Section>

  );

}
