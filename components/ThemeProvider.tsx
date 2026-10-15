'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DARK_QUERY,
  THEME_COLOR,
  THEME_STORAGE_KEY,
  isThemePreference,
  type ResolvedTheme,
  type ThemePreference,
} from '@/lib/theme';

interface ThemeContextValue {
  /** What the visitor chose. `system` follows the OS and keeps following it. */
  theme: ThemePreference;
  /** What is actually on screen right now. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
  /**
   * False during server render and the first client render. Controls that
   * highlight the active theme must wait for this, because the server has no
   * way to know which theme the browser picked.
   */
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemePreference(stored)) return stored;
  } catch {
    // Storage blocked (Lockdown Mode, embedded webview, cookies denied).
  }
  return 'system';
}

function prefersDark(): boolean {
  return window.matchMedia(DARK_QUERY).matches;
}

function resolve(theme: ThemePreference): ResolvedTheme {
  if (theme === 'system') return prefersDark() ? 'dark' : 'light';
  return theme;
}

/** Writes the resolved theme to the DOM. Mirrors the bootstrap script. */
function applyToDocument(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.classList.toggle('light', resolved === 'light');

  // All matches, not just the first: `next dev` renders the metadata twice,
  // and a browser honours the last theme-color tag it finds.
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', THEME_COLOR[resolved]));
}

/**
 * Paints the palette change over one short transition instead of letting it
 * snap. Skipped when the visitor asked for reduced motion.
 */
function animateSwitch() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  root.classList.add('theme-switching');
  window.setTimeout(() => root.classList.remove('theme-switching'), 240);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // These defaults only ever render on the server and for one client frame;
  // the effect below replaces them with what the bootstrap script already did.
  const [theme, setThemeState] = useState<ThemePreference>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStoredPreference();
    const resolved = resolve(stored);

    setThemeState(stored);
    setResolvedTheme(resolved);
    setMounted(true);

    // Idempotent re-assert. The bootstrap script has normally done this
    // already, but it skips the theme-color meta if Next had not emitted it
    // yet at that point in <head>. Running it again costs nothing and makes
    // the pair self-correcting.
    applyToDocument(resolved);
  }, []);

  // Follow the OS while the preference is `system`.
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const query = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      const next = query.matches ? 'dark' : 'light';
      animateSwitch();
      setResolvedTheme(next);
      applyToDocument(next);
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [mounted, theme]);

  // Keep other tabs of the site in step.
  useEffect(() => {
    if (!mounted) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;

      const next = isThemePreference(event.newValue) ? event.newValue : 'system';
      setThemeState(next);
      setResolvedTheme(resolve(next));
      applyToDocument(resolve(next));
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [mounted]);

  const setTheme = useCallback((next: ThemePreference) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Not persistable — honour the choice for this page view anyway.
    }

    const nextResolved = resolve(next);
    animateSwitch();
    setThemeState(next);
    setResolvedTheme(nextResolved);
    applyToDocument(nextResolved);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, mounted }),
    [theme, resolvedTheme, setTheme, mounted],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>.');
  return context;
}
