import type { Config } from 'tailwindcss';

/**
 * Every colour below resolves to a CSS variable declared in app/globals.css,
 * where one set of values is defined for light and one for dark. Components
 * therefore never name a theme: `bg-surface` is the right surface in both.
 *
 * Channel triplets (`15 23 42`) rather than hex, so Tailwind's opacity
 * modifiers keep working — `bg-canvas/80` becomes `rgb(15 23 42 / 0.8)`.
 */

/** Opaque token. `text-ink` → full strength, `text-ink/60` → 60%. */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

/**
 * Translucent token: the variable carries its own base alpha, and an opacity
 * modifier scales it. `border-line` is a hairline; `border-line/70` is 70% of
 * one, not 70% of an opaque colour.
 */
const layer = (name: string, alpha: string) =>
  `rgb(var(${name}) / calc(var(${alpha}) * <alpha-value>))`;

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Page background. Named `canvas`, not `base`, because `text-base` is
        // already Tailwind's 1rem font-size utility — a colour called `base`
        // emits a second, clashing `.text-base` rule.
        canvas: {
          DEFAULT: token('--canvas'),
          soft: token('--canvas-soft'),
        },
        surface: {
          DEFAULT: token('--surface'),
          raised: token('--surface-raised'),
          hover: token('--surface-hover'),
          // Faint washes for icon chips, inputs and inset panels.
          subtle: layer('--wash', '--wash-subtle'),
          muted: layer('--wash', '--wash-muted'),
          strong: layer('--wash', '--wash-strong'),
        },
        line: {
          DEFAULT: layer('--line', '--line-alpha'),
          strong: layer('--line', '--line-strong-alpha'),
        },
        ink: {
          DEFAULT: token('--ink'),
          muted: token('--ink-muted'),
          faint: token('--ink-faint'),
        },
        accent: {
          DEFAULT: token('--accent-blue'),
          blue: token('--accent-blue'),
          violet: token('--accent-violet'),
          soft: layer('--accent-blue', '--accent-soft-alpha'),
        },
        // The filled, highest-emphasis control: near-white on dark, near-black
        // on light. `cta-fg` is the only text colour legible on top of it.
        cta: {
          DEFAULT: token('--cta'),
          fg: token('--cta-fg'),
        },
        // Signal colours. Use these rather than a fixed palette shade like
        // `emerald-400`, which is bright enough on a dark card and nearly
        // invisible on a white one.
        tone: {
          success: token('--tone-success'),
          warning: token('--tone-warning'),
          info: token('--tone-info'),
          special: token('--tone-special'),
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6.5vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'headline': ['clamp(1.9rem, 3.6vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'title': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        content: '72rem',
        prose: '46rem',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        glow: 'var(--shadow-glow)',
        // Named `cta-lift`, not `cta`: a boxShadow key that collides with a
        // colour name makes Tailwind emit `.shadow-cta` twice — once as the
        // shadow, once as a shadow-colour utility — and the two then fight.
        'cta-lift': 'var(--shadow-cta)',
        'cta-lift-hover': 'var(--shadow-cta-hover)',
      },
      backgroundImage: {
        'accent-gradient':
          'linear-gradient(100deg, rgb(var(--accent-blue)) 0%, rgb(var(--accent-violet)) 100%)',
        'grid-faint':
          'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'marquee': 'marquee 42s linear infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
