/**
 * Shared content types.
 *
 * Everything rendered on the site is typed here and authored in the sibling
 * data files. UI components never hard-code copy — edit the data, not the JSX.
 */

export type IconName =
  | 'code'
  | 'brain'
  | 'users'
  | 'trophy'
  | 'server'
  | 'layout'
  | 'database'
  | 'wrench'
  | 'cpu'
  | 'terminal';

export interface SocialLink {
  label: string;
  href: string;
  /** Handle shown next to the label where space allows. */
  handle?: string;
  icon: 'github' | 'linkedin' | 'mail' | 'code2' | 'phone';
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  intro: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  /**
   * Portrait shown in the hero.
   * Drop a square JPG/PNG at `public/images/portrait.jpg` and set
   * `hasPortrait: true`. Until then an elegant monogram is rendered instead —
   * no broken image, no placeholder stock photo.
   */
  portrait: string;
  hasPortrait: boolean;
  socials: SocialLink[];
  education: Education;
}

export interface Education {
  institution: string;
  shortName: string;
  degree: string;
  field: string;
  location: string;
  graduation: string;
  /**
   * Left empty on purpose — the supplied resume lists CGPA as "x.xx".
   * Fill this in and it renders automatically; leave it empty and it is hidden.
   */
  cgpa: string;
  coursework: string[];
}

export interface Pillar {
  id: string;
  index: string;
  title: string;
  body: string;
  icon: IconName;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  kind: 'leadership' | 'internship' | 'organizing';
  summary: string;
  responsibilities: string[];
  href?: string;
  /**
   * Set to false to keep an entry in the repository without publishing it.
   * Used for roles that are not yet backed by verified details.
   */
  enabled: boolean;
  /** Internal note for the site owner. Never rendered. */
  note?: string;
}

export interface ProjectLink {
  github?: string;
  demo?: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  challenges: string[];
  outcome: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  category: string;
  featured: boolean;
  stack: string[];
  links: ProjectLink;
  /**
   * Screenshot at `public/projects/<slug>.png`. Set `hasCover: true` once added;
   * otherwise a generated gradient cover is used.
   */
  hasCover: boolean;
  caseStudy?: CaseStudy;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: IconName;
  items: string[];
}

export interface ContestResult {
  name: string;
  year: string;
  result?: string;
  href?: string;
}

export interface CompetitiveProgramming {
  handle: string;
  profileUrl: string;
  rank: string;
  stats: StatItem[];
  contests: ContestResult[];
}

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
}

export interface LeadershipItem {
  id: string;
  title: string;
  role: string;
  period: string;
  href?: string;
  impact: string[];
}

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
}
