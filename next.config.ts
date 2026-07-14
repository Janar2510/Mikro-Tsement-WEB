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
      { protocol: "https", hostname: "replicate.delivery" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Old Basebeton-era URLs -> new Luxury Concrete® taxonomy.
  // Kept permanently so previously indexed pages don't 404.
  async redirects() {
    const productMap: Record<string, string> = {
      "basebeton-originale": "concrete",
      "beton-cire": "monocrete",
      "oxidestuc": "metallic",
      "natureplast": "", // no Luxury Concrete equivalent -> hub
      "sichtbeton": "limecrete",
      "basebeton-paint": "easycret",
      "basebeton-plus": "monocrete",
      "basebeton-xtreme": "concrete-pox",
      "basebeton-solid": "concrete-pox",
      "basebeton-grit": "concrete",
      "stuccopuro": "limecrete",
    };
    const colorMap: Record<string, string> = {
      "oxidestuc": "oxid-metal",
      "basebeton-originale": "colorcrete",
      "beton-cire": "colorcrete",
      "basebeton-paint": "colorcrete",
      "basebeton-plus": "colorcrete",
    };

    const redirects = [
      { source: "/:lang/guide/basebeton", destination: "/:lang/guide/luxury-concrete", permanent: true },
      { source: "/:lang/guide/topcret", destination: "/:lang/guide/luxury-concrete", permanent: true },
    ];

    for (const [oldSlug, newSlug] of Object.entries(productMap)) {
      redirects.push({
        source: `/:lang/products/${oldSlug}`,
        destination: newSlug ? `/:lang/products/${newSlug}` : "/:lang/products",
        permanent: true,
      });
    }

    for (const oldSlug of [
      "basebeton-originale", "beton-cire", "oxidestuc", "natureplast", "sichtbeton",
      "basebeton-paint", "basebeton-plus", "basebeton-xtreme", "basebeton-solid",
      "basebeton-grit", "stuccopuro",
    ]) {
      const newSlug = colorMap[oldSlug];
      redirects.push({
        source: `/:lang/colors/${oldSlug}`,
        destination: newSlug ? `/:lang/colors/${newSlug}` : "/:lang/colors",
        permanent: true,
      });
    }

    return redirects;
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
