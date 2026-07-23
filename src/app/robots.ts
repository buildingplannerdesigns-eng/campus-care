import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://campuscare2.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio", "/studio/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
