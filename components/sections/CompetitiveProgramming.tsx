import { ArrowUpRight, Award, Code2, Target } from 'lucide-react';
import { competitive } from '@/data/competitive';
import { fetchCodeforcesStats, rankColor } from '@/lib/codeforces';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem, Reveal } from '@/components/ui/Reveal';
import { CountUp } from '@/components/ui/CountUp';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';

/* -------------------------------------------------------------------------- */
/* LeetCode                                                                    */
/* -------------------------------------------------------------------------- */

const LEETCODE = {
  handle: 'Arb_103',
  profileUrl: 'https://leetcode.com/u/Arb_103/',
  /** Fallback figures, used when the public API can't be reached at build time. */
  fallback: {
    solved: 300,
    rating: null as number | null,
    tier: 'Coder',
  },
};

type LeetCodeStats = {
  handle: string;
  solved: number;
  rating: number | null;
  globalRanking: number | null;
  attendedContests: number;
  topPercentage: number | null;
  tier: string;
};

const LEETCODE_QUERY = /* GraphQL */ `
  query userData($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
  }
`;

/** LeetCode has no named ranks; these mirror the contest badge tiers. */
function leetcodeTier(rating: number | null, topPercentage: number | null): string {
  if (rating === null) return 'Unrated';
  if ((topPercentage !== null && topPercentage <= 1) || rating >= 2200) return 'Guardian';
  if (rating >= 1850) return 'Knight';
  return 'Coder';
}

function leetcodeTierColor(tier: string): string {
  switch (tier.toLowerCase()) {
    case 'guardian':
      return 'text-amber-300 border-amber-300/30';
    case 'knight':
      return 'text-violet-300 border-violet-300/30';
    case 'coder':
      return 'text-sky-300 border-sky-300/30';
    default:
      return 'text-ink-faint border-line';
  }
}

/**
 * Reads the public LeetCode GraphQL endpoint at build / revalidation time.
 * Returns null on any failure so the static fallback figures are used instead.
 */
async function fetchLeetCodeStats(handle: string): Promise<LeetCodeStats | null> {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: `https://leetcode.com/u/${handle}/`,
        'User-Agent': 'Mozilla/5.0 (compatible; portfolio-build)',
      },
      body: JSON.stringify({ query: LEETCODE_QUERY, variables: { username: handle } }),
      next: { revalidate: 60 * 60 * 6 }, // 6 hours
    });

    if (!res.ok) return null;

    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) return null;

    const buckets: Array<{ difficulty: string; count: number }> =
      user.submitStatsGlobal?.acSubmissionNum ?? [];
    const solved = buckets.find((b) => b.difficulty === 'All')?.count ?? 0;

    const contest = json?.data?.userContestRanking ?? null;
    const rating = contest?.rating != null ? Math.round(contest.rating) : null;
    const topPercentage = contest?.topPercentage ?? null;

    return {
      handle: user.username,
      solved,
      rating,
      globalRanking: contest?.globalRanking ?? null,
      attendedContests: contest?.attendedContestsCount ?? 0,
      topPercentage,
      tier: leetcodeTier(rating, topPercentage),
    };
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Shared profile strip                                                        */
/* -------------------------------------------------------------------------- */

type ProfileStripProps = {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  handle: string;
  badge: string;
  badgeClass: string;
  detail: string;
  href: string;
  cta: string;
  liveLabel?: string | null;
};

function ProfileStrip({
  icon: Icon,
  handle,
  badge,
  badgeClass,
  detail,
  href,
  cta,
  liveLabel,
}: ProfileStripProps) {
  return (
    <div className="card flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent-violet">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="font-mono text-base font-semibold text-ink">{handle}</p>
            <Badge variant="outline" className={badgeClass}>
              {badge.replace(/\b\w/g, (c) => c.toUpperCase())}
            </Badge>
            {liveLabel ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                {liveLabel}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-ink-muted">{detail}</p>
        </div>
      </div>

      <ButtonLink href={href} variant="secondary" size="md">
        {cta}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </ButtonLink>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Competitive programming — the signature section.
 *
 * Server component. Attempts a live read of the public Codeforces and LeetCode
 * APIs at build / revalidation time and falls back to the verified static
 * figures when that fails, so the numbers are never stale-looking and never
 * missing.
 */
export async function CompetitiveProgramming() {
  const [live, leetcode] = await Promise.all([
    fetchCodeforcesStats(),
    fetchLeetCodeStats(LEETCODE.handle),
  ]);

  const maxRating = live?.maxRating ?? competitive.stats[1].value;
  const currentRank = live?.rank ?? competitive.rank;
  const maxRank = live?.maxRank ?? competitive.rank;
  const isLive = live !== null;

  const lcSolved = leetcode?.solved ?? LEETCODE.fallback.solved;
  const lcRating = leetcode?.rating ?? LEETCODE.fallback.rating;
  const lcTier = leetcode?.tier ?? LEETCODE.fallback.tier;

  const stats = competitive.stats.map((stat) =>
    stat.id === 'rating'
      ? {
        ...stat,
        value: maxRating,
        caption: `${maxRank.replace(/\b\w/g, (c) => c.toUpperCase())} — handle ${competitive.handle}`,
      }
      : stat,
  );

  return (
    <Section
      id="competitive-programming"
      eyebrow="05 - Competitive Programming"
      title="900+ problems, and the habits they built."
      description="Contests are where I learned to bound a problem before writing code, to reason about complexity as a first step rather than an optimization, and to debug calmly while a clock runs."
    >
      {/* Stat row */}
      <Stagger className="grid gap-5 sm:grid-cols-3" staggerChildren={0.09}>
        {stats.map((stat) => (
          <StaggerItem key={stat.id}>
            <article className="card edge-light relative h-full overflow-hidden p-7">
              <div
                className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(closest-side,rgba(59,130,246,0.14),transparent)]"
                aria-hidden="true"
              />
              <p className="relative font-mono text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  format={stat.id === 'rating' ? 'plain' : 'locale'}
                />
              </p>
              <p className="relative mt-3 text-sm font-medium text-ink">{stat.label}</p>
              <p className="relative mt-1 text-xs leading-relaxed text-ink-faint">{stat.caption}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Profile strips */}
      <Reveal className="mt-5">
        <div className="grid gap-5">
          <ProfileStrip
            icon={Target}
            handle={competitive.handle}
            badge={currentRank}
            badgeClass={rankColor(currentRank)}
            detail={`Codeforces profile · max rating ${maxRating}`}
            href={competitive.profileUrl}
            cta="View Codeforces profile"
            liveLabel={isLive ? 'Live from Codeforces' : null}
          />

          <ProfileStrip
            icon={Code2}
            handle={LEETCODE.handle}
            badge={lcTier}
            badgeClass={leetcodeTierColor(lcTier)}
            detail={
              lcRating
                ? `LeetCode profile · ${lcSolved.toLocaleString()} solved · contest rating ${lcRating}`
                : `LeetCode profile · ${lcSolved.toLocaleString()} problems solved`
            }
            href={LEETCODE.profileUrl}
            cta="View LeetCode profile"
            liveLabel={leetcode ? 'Live from LeetCode' : null}
          />
        </div>
      </Reveal>

      {/* Contest highlights */}
      <div className="mt-16">
        <h3 className="mb-6 text-title font-semibold text-ink">Contest highlights</h3>

        <Stagger className="overflow-hidden rounded-2xl border border-line" staggerChildren={0.05}>
          {competitive.contests.map((contest, index) => {
            const rowClass = `group flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-surface/50 px-6 py-5 transition-colors duration-200 hover:bg-surface-hover/70 ${index !== 0 ? 'border-t border-line' : ''
              }`;

            const content = (
              <>
                <div className="flex min-w-0 items-start gap-3.5">
                  <Award
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-accent-blue"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{contest.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-ink-faint">{contest.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-8 sm:pl-0">
                  {contest.result ? (
                    <span className="font-mono text-sm text-accent-blue">{contest.result}</span>
                  ) : (
                    <span className="font-mono text-sm text-ink-faint">Participated</span>
                  )}
                  {contest.href ? (
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-ink-faint opacity-0 transition-all duration-200 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              </>
            );

            return (
              <StaggerItem key={`${contest.name}-${contest.year}`}>
                {contest.href ? (
                  <a
                    href={contest.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClass}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={rowClass}>{content}</div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
