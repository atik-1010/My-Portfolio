import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-out ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-cta text-cta-fg shadow-cta-lift hover:bg-cta/90 hover:shadow-cta-lift-hover',
  secondary:
    'border border-line-strong bg-surface-muted text-ink hover:border-line-strong hover:bg-surface-strong',
  ghost: 'text-ink-muted hover:bg-surface-strong hover:text-ink',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Force an external anchor (adds target/rel). Auto-detected for http(s) URLs. */
  external?: boolean;
}

/**
 * The single link-button used across the site.
 * Internal hrefs route through next/link; hashes and external URLs use a plain
 * anchor so smooth scrolling and new-tab behaviour work as expected.
 */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^https?:\/\//.test(href);
  const isHash = href.startsWith('#');

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isHash) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

export const buttonStyles = { base, variants, sizes };
