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
    'bg-white text-black shadow-[0_10px_30px_-12px_rgba(255,255,255,0.45)] hover:bg-white/90 hover:shadow-[0_14px_36px_-12px_rgba(255,255,255,0.6)]',
  secondary:
    'border border-line-strong bg-white/[0.03] text-ink hover:border-white/25 hover:bg-white/[0.07]',
  ghost: 'text-ink-muted hover:bg-white/[0.05] hover:text-ink',
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
