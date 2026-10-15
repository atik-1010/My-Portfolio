import type { Repository } from '@/data/types';
import { profile } from '@/data/profile';

/**
 * ---------------------------------------------------------------------------
 * GitHub integration
 * ---------------------------------------------------------------------------
 * Uses the PUBLIC, UNAUTHENTICATED GitHub REST API from the server only, with
 * ISR revalidation every 6 hours. No secret is required and none is exposed to
 * the browser.
 *
 * Every function here fails soft: on a network error, a rate limit or a bad
 * response it returns null / an empty list, and the UI falls back to static
 * content. The site never shows a broken section because GitHub had a bad day.
 *
 * Optional: set GITHUB_TOKEN (server-side, no NEXT_PUBLIC_ prefix) to raise the
 * rate limit from 60 to 5000 requests/hour.
 */

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'atik-1010';
const REVALIDATE_SECONDS = 60 * 60 * 6;

/** Repositories to surface first in the GitHub section, in this order. */
const PINNED = [
  'UniversitySystem',
  'Programming-Quiz-App',
  'Weather-Forecast-API-Project',
  'DUET-Computer-Society-Website',
  'Smart-Library-Management-System-App',
  'Meal-Management-System-Tkinter-Project',
];

function headers(): HeadersInit {
  const base: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'atikur-rahman-portfolio',
  };
  const token = process.env.GITHUB_TOKEN;
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

interface GitHubUserResponse {
  public_repos?: number;
  followers?: number;
  following?: number;
  avatar_url?: string;
  html_url?: string;
  created_at?: string;
}

interface GitHubRepoResponse {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  fork: boolean;
}

export interface GitHubProfileSummary {
  publicRepos: number;
  followers: number;
  memberSince: string;
  profileUrl: string;
}

export async function fetchGitHubProfile(): Promise<GitHubProfileSummary | null> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as GitHubUserResponse;
    return {
      publicRepos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
      memberSince: data.created_at ? new Date(data.created_at).getFullYear().toString() : '',
      profileUrl: data.html_url ?? `https://github.com/${USERNAME}`,
    };
  } catch {
    return null;
  }
}

export async function fetchRepositories(limit = 6): Promise<Repository[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`,
      { headers: headers(), next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!response.ok) return [];

    const data = (await response.json()) as GitHubRepoResponse[];
    if (!Array.isArray(data)) return [];

    const mapped: Repository[] = data
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updatedAt: repo.updated_at,
      }));

    // Pinned repositories first (in declared order), then the rest by recency.
    const rank = (name: string) => {
      const index = PINNED.indexOf(name);
      return index === -1 ? PINNED.length : index;
    };

    return mapped
      .sort((a, b) => {
        const byPin = rank(a.name) - rank(b.name);
        if (byPin !== 0) return byPin;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      })
      .slice(0, limit);
  } catch {
    return [];
  }
}

/** Profile URL used by the UI whether or not the API call succeeds. */
export const githubProfileUrl =
  profile.socials.find((social) => social.icon === 'github')?.href ??
  `https://github.com/${USERNAME}`;
