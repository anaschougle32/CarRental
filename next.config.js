/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

// ─── Security Headers ────────────────────────────────────────────────────────
// Applied to every route via the headers() async function below.
// References:
//   https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
//   https://owasp.org/www-project-secure-headers/

// ── Always active (safe in both dev and prod) ────────────────────────────────
const baseHeaders = [
  // ── Content Security Policy ────────────────────────────────────────────────
  // CSP FORMAT RULE: each array element = ONE complete directive.
  // Values inside a directive are SPACE-separated.
  // Directives are joined with '; '.
  {
    key: 'Content-Security-Policy',
    value: [
      // Default fallback for any unspecified directive
      "default-src 'self'",

      // Scripts — Next.js requires unsafe-inline + unsafe-eval for hydration
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://va.vercel-scripts.com https://cdn.vercel-insights.com",

      // Styles — Tailwind inline + Google Fonts + Fontshare
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",

      // Fonts
      "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com",

      // Images — wildcard https covers Pexels, Supabase Storage, picsum, etc.
      "img-src 'self' https: data: blob:",

      // Fetch / XHR / WebSocket — Supabase REST + Realtime WS MUST be whitelisted
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net",

      // Iframes — Google Maps embed (Footer) + Google Ads frames
      "frame-src 'self' https://www.google.com https://maps.google.com https://googleads.g.doubleclick.net",

      // Media / Workers / Plugins
      "media-src 'self'",
      "worker-src 'self' blob:",
      "object-src 'none'",
    ].join('; '),
  },

  // ── Clickjacking protection ──────────────────────────────────────────────
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },

  // ── MIME-type sniffing prevention ────────────────────────────────────────
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },

  // ── Referrer leakage control ─────────────────────────────────────────────
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },

  // ── Feature / Permissions Policy ─────────────────────────────────────────
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },

  // ── XSS Protection (legacy browsers) ─────────────────────────────────────
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

// ── Production-only headers ───────────────────────────────────────────────────
// ⚠ NEVER apply these in development (localhost / HTTP).
//
// • Strict-Transport-Security (HSTS): tells the browser to refuse plain HTTP
//   for 1 year. On localhost there IS no HTTPS, so the browser tries to upgrade
//   http://localhost/_next/static/chunks/app/layout.js → https://localhost/...
//   which times out → ChunkLoadError.
//
// • upgrade-insecure-requests in CSP: same problem — silently upgrades every
//   resource request to HTTPS, breaking the entire Webpack HMR/chunk system
//   on the local dev server.
const productionOnlyHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    // Appended to the existing CSP — must be a separate header entry
    // because Content-Security-Policy can't be duplicated; handled below
    // by injecting the directive into the CSP value string instead.
    // We use a custom key here only as a marker; see the headers() function.
    key: '_upgrade-insecure-requests-marker',
    value: 'upgrade-insecure-requests',
  },
];

// Build the final header list for the current environment.
// CSP and HSTS are strictly production headers — applying CSP during dev breaks Webpack HMR chunk loading.
function buildHeaders() {
  if (!isProd) {
    // Return standard security headers without CSP in development
    return baseHeaders.filter(h => h.key !== 'Content-Security-Policy');
  }

  // Production: full strict CSP + upgrade-insecure-requests + HSTS
  return [
    ...baseHeaders.map(h => {
      if (h.key === 'Content-Security-Policy') {
        return {
          key: h.key,
          value: h.value + '; upgrade-insecure-requests',
        };
      }
      return h;
    }),
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains; preload',
    },
  ];
}

const nextConfig = {
  serverExternalPackages: ['@supabase/supabase-js'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    unoptimized: true,
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: isProd,
  },

  // ── Security headers applied to every route ──────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: buildHeaders(),
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    // Ignore WebSocket optional dependencies warnings
    config.ignoreWarnings = [
      { module: /node_modules\/ws\/lib\/buffer-util\.js/ },
      { module: /node_modules\/ws\/lib\/validation\.js/ },
    ];
    return config;
  },
};

module.exports = nextConfig;

