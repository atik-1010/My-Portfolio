import type { Profile, NavItem, Pillar } from './types';

/**
 * ---------------------------------------------------------------------------
 * PERSONAL IDENTITY
 * ---------------------------------------------------------------------------
 * Every fact here comes from the supplied resume and personal information file.
 * Update this file first when anything about you changes.
 */
export const profile: Profile = {
  name: 'Atikur Rahman',
  role: 'Software Developer • Problem Solver • CSE Engineer',
  headline: "Hi, I'm Atikur Rahman.",
  intro:
    'Computer Science and Engineering student at Dhaka University of Engineering & Technology, Gazipur, with a strong interest in software engineering, algorithmic problem-solving, and building practical, user-focused applications. I use C++ for competitive programming and C#/.NET for software development, with a focus on clean architecture, thoughtful design decisions, and building reliable, maintainable software.',
  location: 'Hatiya, Noakhali, Bangladesh',
  email: 'atik.duet100@gmail.com',
  phone: '+880 1781 773188',
  availability: 'Open to Software Engineering and Business Analyst opportunities.',
  portrait: '/images/portrait7.jpg',
  // Set to true after you add public/images/portrait.jpg
  hasPortrait: true,
  socials: [
    {
      label: 'GitHub',
      handle: 'atik-1010',
      href: 'https://github.com/atik-1010',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      handle: 'atik1010',
      href: 'https://linkedin.com/in/atik1010',
      icon: 'linkedin',
    },
    {
      label: 'Codeforces',
      handle: 'Arb_103',
      href: 'https://codeforces.com/profile/Arb_103',
      icon: 'code2',
    },
    {
      label: 'Email',
      handle: 'atik.duet100@gmail.com',
      href: 'mailto:atik.duet100@gmail.com',
      icon: 'mail',
    },
  ],
  education: {
    institution: 'Dhaka University of Engineering and Technology, Gazipur',
    shortName: 'DUET',
    degree: 'B.Sc.',
    field: 'Computer Science and Engineering',
    location: 'Gazipur, Bangladesh',
    graduation: 'Expected Graduation: December 2026',
    // The supplied resume lists CGPA as "x.xx" — intentionally left blank
    // rather than invented. Fill it in and it will render automatically.
    cgpa: '',
    coursework: [
      'Data Structures & Algorithms',
      'Object Oriented Programming',
      'Structural Programming',
      'Operating Systems',
      'Databases',
      'Computer Networking',
      'Systems Analysis and Design',
      'Artificial Intelligence',
      'Programming Languages',
    ],
  },
};

export const navigation: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Competitive', href: '#competitive-programming' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const pillars: Pillar[] = [
  {
    id: 'software-engineering',
    index: '01',
    title: 'Software Engineering',
    body: 'I build complete applications rather than demos - a University ERP on ASP.NET Core with clean architecture, EF Core and role-based access control, plus desktop and mobile projects in Java and Python. My interest is in structure: how a system is layered, where the boundaries sit, and what makes it maintainable six months later.',
    icon: 'code',
  },
  {
    id: 'problem-solving',
    index: '02',
    title: 'Problem Solving',
    body: '900+ problems solved on competitive programming platforms and 80+ contests entered, including the ICPC Asia Dhaka Regional Preliminary. Contests taught me to reason about complexity before writing code and to debug under pressure - habits that carry directly into engineering work.',
    icon: 'brain',
  },
  {
    id: 'leadership',
    index: '03',
    title: 'Leadership',
    body: 'General Secretary of the DUET Computer Society, organizer of DUET IUPC 2025 and the DUET CSE Carnival 2026. Running a university-scale programming contest means logistics, sponsors, hospitality and volunteers - coordination work that is closer to engineering management than it looks.',
    icon: 'users',
  },
];
