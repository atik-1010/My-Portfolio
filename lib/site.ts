import { profile } from '@/data/profile';

/**
 * Canonical site configuration used by metadata, Open Graph, sitemap and
 * robots.txt. Set NEXT_PUBLIC_SITE_URL in your deployment environment; the
 * fallback keeps local development and previews working without any .env file.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atikur-rahman.vercel.app'
).replace(/\/$/, '');

export const site = {
  url: siteUrl,
  name: `${profile.name} — Software Developer`,
  shortName: profile.name,
  title: `${profile.name} · Software Developer & Problem Solver`,
  description:
    'Computer Science & Engineering student at DUET building full-stack applications with ASP.NET Core and .NET. 800+ competitive programming problems solved, ICPC Asia Dhaka regionalist, General Secretary of the DUET Computer Society.',
  keywords: [
    'Atikur Rahman',
    'Software Developer',
    'Software Engineer',
    'DUET',
    'Computer Science and Engineering',
    'Competitive Programming',
    'Codeforces Arb_103',
    'ASP.NET Core',
    'C#',
    '.NET',
    'Full Stack Developer',
    'Bangladesh',
    'Portfolio',
  ],
  locale: 'en_US',
} as const;
