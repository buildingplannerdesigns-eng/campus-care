import type { NextConfig } from "next";
import path from "path";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self \"https://donorbox.org\")" },
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
      "frame-src 'self' https://donorbox.org https://*.donorbox.org https://js.stripe.com https://hooks.stripe.com https://www.paypal.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com; " +
      "form-action 'self' https://donorbox.org https://*.donorbox.org; " +
      "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://flagcdn.com https://donorbox.org https://*.donorbox.org https://*.stripe.com https://www.paypalobjects.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com; " +
      "font-src 'self' https://fonts.gstatic.com https://rsms.me data:; " +
      "style-src 'self' 'unsafe-inline' https://rsms.me https://fonts.googleapis.com; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://donorbox.org https://*.donorbox.org https://jspm.dev https://ga.jspm.io https://cdn.jsdelivr.net https://js.stripe.com https://www.paypal.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://core.sanity-cdn.com https://*.sanity.io; " +
      "worker-src 'self' blob:; " +
      "manifest-src 'self'; " +
      "connect-src 'self' https://api.resend.com https://cdn.sanity.io https://*.api.sanity.io https://*.sanity.io wss://*.api.sanity.io https://donorbox.org https://*.donorbox.org https://jspm.dev https://ga.jspm.io https://appsignal-endpoint.net https://api.stripe.com https://m.stripe.com https://www.paypal.com https://*.paypal.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;",
  },
];

/** Looser CSP for embedded Sanity Studio */
const studioHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; " +
      "base-uri 'self'; " +
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io https://flagcdn.com; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      "style-src 'self' 'unsafe-inline'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com https://*.sanity.io; " +
      "worker-src 'self' blob:; " +
      "connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io https://*.sanity.io wss://*.api.sanity.io; " +
      "frame-src 'self' https://*.sanity.io;",
  },
];

const nextConfig: NextConfig = {
  // Pin tracing to this project — avoids wrong root when another lockfile exists upstream
  outputFileTracingRoot: path.join(process.cwd()),
  reactStrictMode: true,
  transpilePackages: ["next-sanity", "sanity", "@sanity/vision", "@sanity/ui", "@sanity/icons"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // OneDrive/Windows can leave 0-byte files in `.next/**/cache/images`, which
    // poisons Next's image LRU (calculateSize returned 0). Skip the optimizer
    // in `next dev` so pages still render photos from `/public`.
    unoptimized: process.env.NODE_ENV === "development",
  },
  // OneDrive/synced folders can corrupt/hang the webpack disk cache (EPERM errors,
  // stalled builds). Disable the filesystem cache entirely in this environment.
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: studioHeaders,
      },
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
