'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import type { ThemePreference } from '@/lib/theme';
import { cn } from '@/lib/utils';

const options: ReadonlyArray<{
  value: ThemePreference;
  label: string;
  Icon: typeof Sun;
}> = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'system', label: 'Match system', Icon: Monitor },
  { value: 'dark', label: 'Dark', Icon: Moon },
];

/**
 * Three-way theme control: an explicit Light and Dark, plus System for anyone
 * who wants the site to keep following their OS. A plain two-state switch
 * cannot express that third intent — once you tap it you are pinned to a
 * choice forever — so the extra 28px of chrome is worth it.
 *
 * The active state is only rendered after mount. On the server there is no way
 * to know which theme the browser resolved, and guessing would either flash the
 * wrong highlight or break hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, mounted } = useTheme();

  const activeIndex = options.findIndex((option) => option.value === theme);

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        'relative inline-flex items-center rounded-full border border-line bg-surface p-0.5',
        className,
      )}
    >
      {/* Sliding highlight. Width matches one slot, so a 100% step lands exactly
          on the next button. */}
      {mounted && activeIndex >= 0 ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0.5 top-0.5 h-7 w-7 rounded-full bg-surface-strong transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
      ) : null}

      {options.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={mounted ? active : undefined}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            className={cn(
              'relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full',
              'transition-colors duration-200',
              active ? 'text-ink' : 'text-ink-faint hover:text-ink',
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
