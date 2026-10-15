/**
 * Shared theme constants and the pre-paint bootstrap script.
 *
 * The script below is injected into <head> as a plain, blocking <script>, so
 * it runs before the browser paints anything. That ordering is the whole point:
 * React cannot help here, because by the time hydration runs the first frame is
 * already on screen and a dark-mode visitor would see a white flash.
 */

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
export const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Drives the mobile browser chrome; kept in step with --canvas. */
export const THEME_COLOR: Record<ResolvedTheme, string> = {
  dark: '#050505',
  light: '#f8fafc',
};

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

/**
 * Minified by hand rather than by the bundler, because it ships as an inline
 * string. Kept deliberately small — it is on the critical path for every page.
 *
 * `localStorage` is read inside try/catch: Safari throws on access in Lockdown
 * Mode and in some embedded webviews, and the correct response is to fall back
 * to the default theme rather than break the page.
 */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var d=s==="dark"||(s!=="light"&&window.matchMedia(${JSON.stringify(
  DARK_QUERY,
)}).matches);document.documentElement.classList.add(d?"dark":"light");var c=d?${JSON.stringify(
  THEME_COLOR.dark,
)}:${JSON.stringify(
  THEME_COLOR.light,
)};var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++){m[i].setAttribute("content",c);}}catch(_){document.documentElement.classList.add("dark");}})();`;
