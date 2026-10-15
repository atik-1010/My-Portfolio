/** @type {import('next').NextConfig} */

/**
 * Baseline security headers.
 *
 * Deliberately no Content-Security-Policy here. The theme bootstrap in
 * app/layout.tsx is an inline <script>, and Next.js emits inline bootstrap
 * scripts of its own, so any CSP would need `strict-dynamic` with a per-request
 * nonce — which in turn forces every page off static rendering. If you do add
 * one later, give that script a nonce rather than dropping it: without it the
 * site flashes the wrong theme on every load.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Fonts are content-hashed and bundled with the app, so they can be
        // cached hard. Without this they inherit the default HTML caching.
        source: '/_next/static/media/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
