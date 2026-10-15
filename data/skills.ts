import type { SkillGroup } from './types';

/**
 * ---------------------------------------------------------------------------
 * ENGINEERING SKILLS
 * ---------------------------------------------------------------------------
 * Category-based, deliberately without percentage bars — a "78% at C++" badge
 * tells a recruiter nothing and invites a question you cannot answer.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: 'terminal',
    items: ['C++', 'C', 'C#', 'Python', 'Java', 'JavaScript', 'PHP', 'SQL'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    items: ['ASP.NET Core', '.NET', 'Entity Framework Core', 'REST APIs', 'Clean Architecture', 'RBAC', 'Next.js', 'Java', 'PHP',],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    items: ['HTML5', 'Tailwind CSS', 'CSS3', 'JavaScript', 'TypeScript', 'Bootstrap 5', 'Razor Views'],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'database',
    items: ['Docker', 'PostgreSQL', 'SQL Server', 'MySQL', 'SQLite', 'Firebase Realtime Database'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'wrench',
    items: [
      'Git',
      'GitHub',
      'Visual Studio',
      'JetBrains Rider',
      'VS Code',
      'Android Studio',
      'MySQL Workbench',
      'Code::Blocks',
    ],
  },
  {
    id: 'core-cs',
    title: 'Core Computer Science',
    icon: 'cpu',
    items: [
      'Data Structures',
      'Algorithms',
      'Object Oriented Programming',
      'Database Systems',
      'Operating Systems',
      'Computer Networks',
      'Systems Analysis & Design',
      'Artificial Intelligence',
    ],
  },
];
