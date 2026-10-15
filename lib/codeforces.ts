import { competitive } from '@/data/competitive';

/**
 * ---------------------------------------------------------------------------
 * Codeforces integration
 * ---------------------------------------------------------------------------
 * Reads the public Codeforces API server-side with ISR revalidation.
 * No key, no secret, no client-side request.
 *
 * If the API is unreachable, slow or rate-limited, this returns null and the
 * UI renders the verified static numbers from data/competitive.ts instead. The
 * section is therefore never empty and never blocks rendering.
 */

const REVALIDATE_SECONDS = 60 * 60 * 6;

interface CodeforcesUser {
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
}

interface CodeforcesResponse {
  status: string;
  result?: CodeforcesUser[];
}

export interface CodeforcesLiveStats {
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  maxRank: string | null;
}

export async function fetchCodeforcesStats(): Promise<CodeforcesLiveStats | null> {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${competitive.handle}`,
      {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: 'application/json' },
      },
    );
    if (!response.ok) return null;

    const data = (await response.json()) as CodeforcesResponse;
    if (data.status !== 'OK' || !data.result?.length) return null;

    const user = data.result[0];
    return {
      rating: user.rating ?? null,
      maxRating: user.maxRating ?? null,
      rank: user.rank ?? null,
      maxRank: user.maxRank ?? null,
    };
  } catch {
    return null;
  }
}

/** Codeforces rank → accent colour, matching the platform's own convention. */
export function rankColor(rank: string | null | undefined): string {
  const value = (rank ?? '').toLowerCase();
  if (value.includes('legendary') || value.includes('international grandmaster') || value.includes('grandmaster'))
    return 'text-red-400';
  if (value.includes('master')) return 'text-orange-400';
  if (value.includes('candidate')) return 'text-violet-400';
  if (value.includes('expert')) return 'text-blue-400';
  if (value.includes('specialist')) return 'text-cyan-400';
  if (value.includes('pupil')) return 'text-emerald-400';
  return 'text-ink-muted';
}
