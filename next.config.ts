import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Content-Security-Policy",
    // NOTE: 'unsafe-inline' on script-src is required for Next.js inline runtime scripts in App Router.
    // 'unsafe-inline' on default-src is required because Safari enforces default-src (not script-src)
    // against <script type="application/ld+json"> elements.
    // Tighten with nonces if/when Next 16 stable nonce API is adopted across all routes.
    value: [
      "default-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' data: blob: https:",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://generativelanguage.googleapis.com https://api.resend.com https://api.replicate.com https://replicate.delivery",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Fixes WebSocket/HMR for local network IPs.
  allowedDevOrigins: process.env.NEXT_DEV_HOSTS
    ? process.env.NEXT_DEV_HOSTS.split(",").map((s) => s.trim())
    : ["localhost", "192.168.1.87", "127.0.0.1", "localhost:3000", "localhost:3001"],

  images: {
    // Explicit allowlist (was wildcard '**' — open image-proxy risk).
    // Add additional hosts here as needed.
    remotePatterns: [
      { protocol: "https", hostname: "topcret.com" },
      { protocol: "https", hostname: "replicate.delivery" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [];
    }
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
