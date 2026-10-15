import type { LeadershipItem, Achievement } from './types';

/**
 * ---------------------------------------------------------------------------
 * LEADERSHIP & IMPACT
 * ---------------------------------------------------------------------------
 * Framed around responsibility and outcome rather than title.
 * Where a number would be useful (attendee counts, sponsor totals, volunteer
 * headcount) none was supplied — add real figures here and they will strengthen
 * this section considerably. Do not estimate them.
 */
export const leadership: LeadershipItem[] = [
  {
    id: 'duet-computer-society',
    title: 'DUET Computer Society',
    role: 'General Secretary',
    period: '2024 - 2025',
    href: 'https://drive.google.com/file/d/1PTlKevNQZJwAk7GcjJRTXDc6P_ZKtN6X/view?usp=sharing',
    impact: [
      'Served on the executive committee responsible for the society’s technical programme across the academic year',
      'Worked with the sponsor committee on partner outreach supporting flagship events',
      'Headed the hospitality management wing for inter-university events hosted at DUET',
      'Owned volunteer management — recruitment, briefing and contest-day assignment',
    ],
  },
  {
    id: 'duet-iupc-2025',
    title: 'DUET Inter University Programming Contest 2025',
    role: 'Organizer',
    period: '2025',
    href: 'https://drive.google.com/file/d/1igkP6VxQFggLj2oZ-nCxZUAyCkUuBRDF/view?usp=sharing',
    impact: [
      'Coordinated registration and logistics for visiting university teams',
      'Ran hospitality operations for contestants, coaches and judges',
      'Directed volunteers through setup, contest hours and wrap-up',
    ],
  },
  {
    id: 'duet-cse-carnival-2026',
    title: 'DUET CSE Carnival 2026',
    role: 'Management',
    period: '2026',
    impact: [
      'Contributed to planning and cross-team coordination for the department’s flagship carnival',
      'Supported event-day logistics and participant operations',
    ],
  },
  {
    id: 'volunteering',
    title: 'Event Volunteering',
    role: 'Volunteer',
    period: '2023 - 2025',
    impact: [
      'BEAR Summit 2025 - on-site event operations',
      'NCIM 2025 - volunteer support',
      'Intra DUET Programming Contest - 2023, 2024 and 2025 editions',
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: 'icpc-2025',
    title: 'ICPC Asia Dhaka Regional Preliminary',
    detail: 'Rank 573 out of 2489 teams - 2025-2026 edition',
    href: 'https://icpc.global/ICPCID/HS5ZJ7VTYJKN',
  },
  {
    id: 'icpc-2024',
    title: 'ICPC Asia Dhaka Regional Online Preliminary',
    detail: 'Competed in the 2024-2025 edition',
    href: 'https://icpc.global/ICPCID/HS5ZJ7VTYJKN',
  },
  {
    id: 'duet-iupc',
    title: 'DUET Inter University Programming Contest 2025',
    detail: '84th rank',
    href: 'https://drive.google.com/file/d/1TEoecAq0_HfRvzhaCBIKRLZrmORAjRh1/view?usp=sharing',
  },
  {
    id: 'cuet-iupc',
    title: 'CUET Inter University Programming Contest 2025',
    detail: '115th rank',
    href: 'https://clist.by/standings/cuet-inter-university-programming-contest-iupc-2025-63981977/',
  },
  {
    id: 'robo-tech',
    title: '5th International ROBO TECH Olympiad - IUPC 2025',
    detail: '76th rank',
    href: 'https://toph.co/c/uttara-university-inter-university-2025/standings',
  },
  {
    id: 'codeforces',
    title: 'Codeforces - Pupil',
    detail: 'Max rating 1204 · 800+ problems solved · 50+ contests',
    href: 'https://codeforces.com/profile/Arb_103',
  },
  {
    id: 'scouts',
    title: 'Certified Scout - Bangladesh Scouts',
    detail: 'Trained at the Second Upazila Scouts Assembly, 2015',
    href: 'https://drive.google.com/file/d/158i-6elFGQoI3KQb03lHh4IcDPHBAEvH/view?usp=sharing',
  },
  {
    id: 'bdrcs',
    title: 'Bangladesh Red Crescent Society',
    detail: 'Completed BDRCS training',
    href: 'https://drive.google.com/file/d/158i-6elFGQoI3KQb03lHh4IcDPHBAEvH/view?usp=sharing',
  },
];
