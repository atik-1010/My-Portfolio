import type { Config } from 'tailwindcss';

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
        base: {
          DEFAULT: '#050505',
          soft: '#080808',
        },
        surface: {
          DEFAULT: '#0D0D0D',
          raised: '#121212',
          hover: '#161616',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.14)',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          // Contrast against #050505: 8.9:1 — comfortably above WCAG AA.
          muted: '#A1A1AA',
          // Raised from #71717A, which measured 4.21:1 and failed AA for body
          // text. #8B8B93 measures ~5.7:1 while keeping the same quiet feel.
          faint: '#8B8B93',
        },
        accent: {
          DEFAULT: '#3B82F6',
          blue: '#3B82F6',
          violet: '#8B5CF6',
          soft: 'rgba(59,130,246,0.12)',
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
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.9)',
        glow: '0 0 80px -20px rgba(59,130,246,0.45)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(100deg, #3B82F6 0%, #8B5CF6 100%)',
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
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
