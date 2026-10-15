import type { CompetitiveProgramming } from './types';

/**
 * ---------------------------------------------------------------------------
 * COMPETITIVE PROGRAMMING
 * ---------------------------------------------------------------------------
 * These figures come from the supplied resume and are rendered as static,
 * verified values.
 *
 * The Codeforces rating and contest count are also fetched live at build time
 * from the public Codeforces API (see lib/codeforces.ts). If that request fails
 * or is rate-limited, the numbers below are used — the section never breaks and
 * never shows a spinner.
 *
 * Keep these updated as your record changes.
 */
export const competitive: CompetitiveProgramming = {
  handle: 'Arb_103',
  profileUrl: 'https://codeforces.com/profile/Arb_103',
  rank: 'Pupil',
  stats: [
    {
      id: 'problems',
      value: 900,
      suffix: '+',
      label: 'Problems solved',
      caption: 'Across competitive programming platforms',
    },
    {
      id: 'rating',
      value: 1204,
      label: 'Max Codeforces rating',
      caption: 'Pupil - handle Arb_103',
    },
    {
      id: 'contests',
      value: 80,
      suffix: '+',
      label: 'Contests entered',
      caption: 'Online rounds and onsite university contests',
    },
  ],
  contests: [
    {
      name: 'ICPC Asia Dhaka Regional Preliminary Contest',
      year: '2025-2026',
      result: 'Rank 573 of 2489 teams',
      href: 'https://icpc.global/ICPCID/HS5ZJ7VTYJKN',
    },
    {
      name: 'ICPC Asia Dhaka Regional Online Preliminary Contest',
      year: '2024-2025',
      href: 'https://icpc.global/ICPCID/HS5ZJ7VTYJKN',
    },
    {
      name: 'CUET Inter University Programming Contest',
      year: '2025',
      result: '115th rank',
      href: 'https://clist.by/standings/cuet-inter-university-programming-contest-iupc-2025-63981977/',
    },
    {
      name: 'DUET Inter University Programming Contest',
      year: '2025',
      result: '84th rank',
      href: 'https://drive.google.com/file/d/1TEoecAq0_HfRvzhaCBIKRLZrmORAjRh1/view?usp=sharing',
    },
    {
      name: '5th International ROBO TECH Olympiad - IUPC',
      year: '2025',
      result: '76th rank',
      href: 'https://toph.co/c/uttara-university-inter-university-2025/standings',
    },
    {
      name: 'Intra DUET Programming Contest (IDPC)',
      year: '2023 & 2024',
    },
    {
      name: 'National Collegiate Programming Contest',
      year: '2023',
    },
  ],
};
