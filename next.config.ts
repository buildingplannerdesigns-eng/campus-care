import type { NextConfig } from "next";
import path from "path";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; " +
      "base-uri 'self'; " +
      "frame-ancestors 'none'; " +
      "frame-src 'self' https://donorbox.org; " +
      "form-action 'self'; " +
      "img-src 'self' data: https://cdn.sanity.io https://images.unsplash.com; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      "style-src 'self' 'unsafe-inline'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "connect-src 'self' https://api.resend.com https://cdn.sanity.io;",
  },
];

const nextConfig: NextConfig = {
  // Pin tracing to this project — avoids wrong root when another lockfile exists upstream
  outputFileTracingRoot: path.join(process.cwd()),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // OneDrive/synced folders can corrupt webpack disk cache (EPERM errors)
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/mail",
        destination: "https://mail.hostinger.com",
        permanent: true,
      },
      { source: "/dr-cammie-connor", destination: "/act", permanent: true },
      { source: "/programs", destination: "/courses", permanent: true },
      { source: "/diaspora-vr", destination: "/campus-care", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/reflect-xr", destination: "/campus-care", permanent: true },
    ];
  },
};

export default nextConfig;
