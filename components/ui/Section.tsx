import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Constrain the header text column; body still spans the full width. */
  align?: 'left' | 'center';
}

/**
 * Standard section frame: consistent vertical rhythm, anchor id, numbered
 * eyebrow and heading. Every section on the page uses this so the spacing
 * scale stays uniform.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  align = 'left',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-24 py-20 sm:py-24 lg:py-28', className)}
    >
      <div className="shell">
        <Reveal>
          <div className={cn('max-w-prose', align === 'center' && 'mx-auto text-center')}>
            {eyebrow ? (
              <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-ink-faint">
                <span className="inline-block h-px w-6 bg-accent-blue/70" aria-hidden="true" />
                {eyebrow}
              </p>
            ) : null}
            <h2 id={`${id}-heading`} className="text-headline font-semibold text-ink">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
