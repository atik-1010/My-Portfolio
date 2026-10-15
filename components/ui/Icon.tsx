import {
  Brain,
  Code2,
  Cpu,
  Database,
  Github,
  Layout,
  Linkedin,
  Mail,
  Phone,
  Server,
  Terminal,
  Trophy,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { IconName, SocialLink } from '@/data/types';

const iconMap: Record<IconName, LucideIcon> = {
  code: Code2,
  brain: Brain,
  users: Users,
  trophy: Trophy,
  server: Server,
  layout: Layout,
  database: Database,
  wrench: Wrench,
  cpu: Cpu,
  terminal: Terminal,
};

const socialIconMap: Record<SocialLink['icon'], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  code2: Code2,
  phone: Phone,
};

/** Resolve a data-layer icon name to a Lucide component. */
export function getIcon(name: IconName): LucideIcon {
  return iconMap[name];
}

export function getSocialIcon(name: SocialLink['icon']): LucideIcon {
  return socialIconMap[name];
}
