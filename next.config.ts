import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Webpack ───────────────────────────────────────────────────────────────
  webpack: (config) => {
    // Required by @react-pdf/renderer
    config.resolve.alias.canvas = false;
    return config;
  },

  // ── Images ────────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
    // Serve modern formats for smaller payloads
    formats: ["image/avif", "image/webp"],
  },

  // ── Performance ───────────────────────────────────────────────────────────
  // Compress responses
  compress: true,

  // ── Headers ───────────────────────────────────────────────────────────────
  // Long-lived cache for static assets; no-store for HTML
  async headers() {
    return [
      {
        // All Next.js static assets: aggressive cache
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Programmatic SEO pages: cache at CDN, revalidate in background
        source: "/gst-invoice/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/guides/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Security headers for all routes
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Canonical trailing-slash redirect (prevent duplicate content)
      {
        source: "/gst-invoice/:path+/",
        destination: "/gst-invoice/:path+",
        permanent: true,
      },
      {
        source: "/guides/:path+/",
        destination: "/guides/:path+",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
