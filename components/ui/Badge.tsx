import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'outline';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'border-line bg-white/[0.04] text-ink-muted',
  accent: 'border-accent-blue/30 bg-accent-soft text-accent-blue',
  outline: 'border-line-strong bg-transparent text-ink-muted',
} as const;

const sizes = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3 py-1.5 text-xs',
} as const;

/** Small pill used for tech chips, categories and status labels. */
export function Badge({ children, className, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium leading-none tracking-wide transition-colors duration-200',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
