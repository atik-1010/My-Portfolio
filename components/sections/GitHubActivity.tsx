import { ArrowUpRight, GitFork, Github, Star } from 'lucide-react';
import { fetchGitHubProfile, fetchRepositories, githubProfileUrl } from '@/lib/github';
import { projects } from '@/data/projects';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem, Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatMonthYear } from '@/lib/utils';
import type { Repository } from '@/data/types';

/**
 * Rough language → dot colour, matching GitHub's own convention.
 *
 * Fixed palette shades on purpose, not theme tokens: these are identity
 * colours people recognise per language, so they stay put in both themes.
 * They are decorative — every dot sits beside its language name in text.
 */
const languageColor: Record<string, string> = {
  'C#': 'bg-violet-400',
  'C++': 'bg-blue-400',
  C: 'bg-slate-400',
  Java: 'bg-orange-400',
  Python: 'bg-yellow-400',
  JavaScript: 'bg-amber-300',
  TypeScript: 'bg-sky-400',
  HTML: 'bg-red-400',
  CSS: 'bg-purple-400',
  PHP: 'bg-indigo-400',
};

/**
 * Fallback used when the GitHub API is unreachable or rate-limited, built from
 * the repositories already listed in data/projects.ts. The section therefore
 * always renders real, verified links — it just stops being live.
 */
function fallbackRepositories(): Repository[] {
  return projects
    .filter((project) => Boolean(project.links.github))
    .slice(0, 6)
    .map((project) => ({
      name: project.links.github!.split('/').pop() ?? project.name,
      description: project.summary,
      language: project.stack[0] ?? null,
      stars: 0,
      forks: 0,
      url: project.links.github!,
      updatedAt: '',
    }));
}

export async function GitHubActivity() {
  const [profileSummary, repositories] = await Promise.all([
    fetchGitHubProfile(),
    fetchRepositories(6),
  ]);

  const repos = repositories.length > 0 ? repositories : fallbackRepositories();
  const isLive = repositories.length > 0;

  return (
    <Section
      id="github"
      eyebrow="08 - GitHub"
      title="The code, unedited."
      description="Public repositories from my GitHub profile - coursework, contest solutions and the projects above. Pulled from the GitHub API and refreshed automatically."
    >
      <Reveal>
        <div className="card mb-5 flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-muted text-ink">
              <Github className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-base font-semibold text-ink">atik-1010</p>
              <p className="mt-1 text-sm text-ink-muted">
                {profileSummary ? (
                  <>
                    {profileSummary.publicRepos} public repositories
                    {profileSummary.memberSince ? ` · on GitHub since ${profileSummary.memberSince}` : ''}
                  </>
                ) : (
                  'Public repositories and project source code'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-tone-success" aria-hidden="true" />
                Live
              </span>
            ) : null}
            <ButtonLink href={githubProfileUrl} variant="secondary" size="md">
              View profile
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
        {repos.map((repo) => (
          <StaggerItem key={repo.name}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover group flex h-full flex-col p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 break-words font-mono text-sm font-semibold text-ink transition-colors group-hover:text-accent-blue">
                  {repo.name}
                </h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
                {repo.description ?? 'No description provided.'}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-faint">
                {repo.language ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${languageColor[repo.language] ?? 'bg-ink-faint'}`}
                      aria-hidden="true"
                    />
                    {repo.language}
                  </span>
                ) : null}
                {repo.stars > 0 ? (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" aria-hidden="true" />
                    {repo.stars}
                  </span>
                ) : null}
                {repo.forks > 0 ? (
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3 w-3" aria-hidden="true" />
                    {repo.forks}
                  </span>
                ) : null}
                {repo.updatedAt ? (
                  <span className="ml-auto">Updated {formatMonthYear(repo.updatedAt)}</span>
                ) : null}
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      {!isLive ? (
        <Reveal className="mt-5">
          <p className="text-center text-xs text-ink-faint">
            <Badge variant="outline" className="mr-2">
              Offline
            </Badge>
            Showing verified repository links - the GitHub API was unavailable at build time.
          </p>
        </Reveal>
      ) : null}
    </Section>
  );
}
