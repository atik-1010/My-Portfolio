import type { ExperienceItem } from './types';

/**
 * ---------------------------------------------------------------------------
 * EXPERIENCE TIMELINE
 * ---------------------------------------------------------------------------
 * Only entries with `enabled: true` are rendered. Nothing here is invented —
 * where source documents disagreed or lacked detail, it is noted inline.
 */
export const experience: ExperienceItem[] = [
  {
    id: 'brain-station-23',
    organization: 'Brain Station 23',
    role: 'Software Engineer Intern',
    period: 'May 2026 - Jun 2026 · 2 months',
    kind: 'internship',
    summary:
      'Software development internship with exposure to .NET and practical engineering workflow. Brain Station 23 is one of the leading tech hubs in the country, and I am thrilled to be part of such a dynamic and innovative environment. During this internship, I am looking forward to applying my academic knowledge to real-world challenges, collaborating with industry experts, and sharpening my skills in software development.',
    responsibilities: [],
    // ---------------------------------------------------------------------
    // DISABLED ON PURPOSE.
    // This internship appears only in the portfolio-plan document, with no
    // role title, dates, team or outcomes, and it is absent from the resume.
    // Publishing it with invented detail would be worse than omitting it.
    //
    // TO PUBLISH: fill in `role`, `period`, `summary` and at least three
    // concrete `responsibilities`, then set `enabled: true`.
    // ---------------------------------------------------------------------
    enabled: true,
    note: 'Needs verified role title, start/end dates and 3+ concrete responsibilities before publishing.',
  },
  {
    id: 'duetcs-general-secretary',
    organization: 'DUET Computer Society',
    // NOTE: the supplied resume states "General Secretary (2024-25)", while the
    // portfolio-plan document mentions "Senior Vice President". The resume is
    // treated as the authoritative source. If the SVP title is current, change
    // the two lines below and nothing else.
    role: 'General Secretary',
    period: '2024 - 2025',
    kind: 'leadership',
    summary:
      'Elected to the executive committee of DUET Computer Society, responsible for coordinating the society’s technical programme across the academic year.',
    responsibilities: [
      'Coordinated the society’s technical events calendar with the executive committee',
      'Worked with the sponsor committee on partner outreach for flagship events',
      'Led the hospitality management wing for inter-university events hosted at DUET',
      'Managed volunteer recruitment, briefing and on-day assignment across events',
    ],
    href: 'https://drive.google.com/file/d/1PTlKevNQZJwAk7GcjJRTXDc6P_ZKtN6X/view?usp=sharing',
    enabled: true,
  },
  {
    id: 'duet-cse-carnival-2026',
    organization: 'DUET CSE Carnival 2026',
    role: 'Organizer & Management',
    period: '2026',
    kind: 'organizing',
    summary:
      'Part of the organizing team for the CSE department’s flagship carnival, covering planning, coordination and event-day operations.',
    responsibilities: [
      'Contributed to event planning and inter-team coordination',
      'Supported logistics and participant operations during the carnival',
    ],
    enabled: true,
  },
  {
    id: 'duet-iupc-2025',
    organization: 'DUET Inter University Programming Contest 2025',
    role: 'Organizer & Volunteer',
    period: '2025',
    kind: 'organizing',
    summary:
      'Organized and volunteered at DUET Inter University Programming Contest 2025, one of the largest competitive programming events hosted on campus.',
    responsibilities: [
      'Handled registration and participant logistics for visiting university teams',
      'Ran hospitality operations for contestants, coaches and judges',
      'Coordinated the volunteer team across contest day',
    ],
    href: 'https://drive.google.com/file/d/1igkP6VxQFggLj2oZ-nCxZUAyCkUuBRDF/view?usp=sharing',
    enabled: true,
  },
  {
    id: 'bear-summit-2025',
    organization: 'BEAR Summit 2025',
    role: 'Volunteer',
    period: '2025',
    kind: 'organizing',
    summary:
      'Volunteered at the BEAR Summit 2025, supporting event operations alongside the organizing team.',
    responsibilities: ['Supported on-site event operations and participant coordination'],
    href: 'https://drive.google.com/file/d/16TMHqwV6NzkX0i-yp_alMaE6xWHCNs78/view?usp=sharing',
    enabled: true,
  },

];

export const publishedExperience = experience.filter((item) => item.enabled);
