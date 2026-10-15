import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/types';

/** Deterministic hue derived from the slug — same project, same colour, always. */
function hueFromSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  }
  // Keep it inside the blue→violet family so covers read as one system.
  return 205 + (hash % 70);
}

interface ProjectCoverProps {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Project visual. Uses the real screenshot when one exists at
 * `public/projects/<slug>.png` (set `hasCover: true` in data/projects.ts);
 * otherwise renders a generated cover — a monogram over a slug-derived gradient
 * with a faint grid. No stock imagery, no broken image icons, no layout shift.
 */
export function ProjectCover({ project, className, priority, sizes }: ProjectCoverProps) {
  if (project.hasCover) {
    return (
      <div className={cn('relative aspect-[16/10] overflow-hidden bg-surface', className)}>
        <Image
          src={`/projects/${project.slug}.png`}
          alt={`${project.name} screenshot`}
          fill
          sizes={sizes ?? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px'}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
    );
  }

  const hue = hueFromSlug(project.slug);
  const initials = project.name
    .split(' ')
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');

  return (
    <div
      className={cn('relative aspect-[16/10] overflow-hidden bg-surface', className)}
      role="img"
      aria-label={`${project.name} — placeholder cover`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 15% 0%, hsl(${hue} 85% 58% / 0.34) 0%, transparent 55%), radial-gradient(100% 100% at 100% 100%, hsl(${
            hue + 40
          } 85% 60% / 0.22) 0%, transparent 60%), #0D0D0D`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-grid-faint [background-size:36px_36px] opacity-50"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="font-mono text-5xl font-semibold tracking-tight text-white/20 sm:text-6xl">
          {initials || '{ }'}
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
