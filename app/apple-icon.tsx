import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Apple touch icon, generated at build time to match the site favicon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D0D0D',
          color: '#3B82F6',
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontFamily: 'sans-serif',
        }}
      >
        AR
      </div>
    ),
    size,
  );
}
