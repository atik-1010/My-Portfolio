'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, FileText } from 'lucide-react';
import { navigation, profile } from '@/data/profile';
import { cn } from '@/lib/utils';

/**
 * Fixed navigation.
 *
 * - Gains a border and blur once the page scrolls, so the hero stays clean.
 * - Highlights the section currently in view via IntersectionObserver.
 * - Mobile menu traps nothing and closes on Escape, navigation or resize.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active-section highlighting.
  useEffect(() => {
    const ids = navigation.map((item) => item.href.replace('#', ''));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape or when the viewport grows.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 no-print',
          scrolled
            ? 'border-b border-line bg-base/80 backdrop-blur-xl supports-[backdrop-filter]:bg-base/60'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="shell flex h-full items-center justify-between gap-4" aria-label="Primary">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-ink"
            onClick={close}
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface font-mono text-[13px] text-accent-blue transition-colors group-hover:border-accent-blue/40">
              AR
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3 py-2 text-[13px] transition-colors duration-200',
                    active === item.href
                      ? 'text-ink'
                      : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {item.label}
                  {active === item.href ? (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent-gradient"
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#resume"
              className="hidden h-9 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-medium text-black transition-colors hover:bg-white/90 sm:inline-flex"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-line-strong lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          'fixed inset-0 z-40 lg:hidden no-print',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className="absolute inset-0 h-full w-full bg-base/85 backdrop-blur-xl"
        />
        <nav
          aria-label="Mobile"
          className="relative mt-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-base px-5 pb-10 pt-6"
        >
          <ul className="flex flex-col">
            {navigation.map((item, index) => (
              <li key={item.href} className="border-b border-line/70 last:border-0">
                <a
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between py-4 text-lg font-medium text-ink"
                >
                  {item.label}
                  <span className="font-mono text-xs text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#resume"
            onClick={close}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-medium text-black"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            View Resume
          </a>
        </nav>
      </div>
    </>
  );
}
