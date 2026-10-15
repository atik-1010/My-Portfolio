import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const alt = `${profile.name} — Software Developer, Problem Solver, CSE Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social preview card, generated at build time by Next.js. No design tool, no
 * checked-in binary, and it always matches the site's own palette.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // Literal colours on purpose. This route is rendered to a static PNG
          // by Satori at build time, which has no CSS variables and no theme to
          // resolve — a share card is one fixed image for every viewer, so it
          // stays on the dark brand palette. Do not swap these for var(--…).
          backgroundColor: '#050505',
          backgroundImage:
            'radial-gradient(120% 90% at 15% 0%, rgba(59,130,246,0.30) 0%, rgba(5,5,5,0) 55%), radial-gradient(100% 90% at 100% 100%, rgba(139,92,246,0.22) 0%, rgba(5,5,5,0) 55%)',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.04)',
              color: '#3B82F6',
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            AR
          </div>
          <div style={{ display: 'flex', color: '#A1A1AA', fontSize: 24 }}>
            Open to opportunities
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: '#FFFFFF',
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              color: '#A1A1AA',
              fontSize: 34,
              letterSpacing: '-0.01em',
            }}
          >
            Software Developer • Problem Solver • CSE Engineer
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 48,
            borderTop: '1px solid rgba(255,255,255,0.10)',
            paddingTop: 32,
          }}
        >
          {[
            ['800+', 'Problems solved'],
            ['1204', 'Max CF rating'],
            ['50+', 'Contests'],
            ['DUET', 'CSE, 2026'],
          ].map(([value, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', color: '#FFFFFF', fontSize: 38, fontWeight: 600 }}>
                {value}
              </div>
              <div style={{ display: 'flex', color: '#71717A', fontSize: 20, marginTop: 6 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
