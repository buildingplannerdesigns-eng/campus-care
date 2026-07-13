import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://campuscare2.org";
  const routes = ["", "/about", "/act", "/solutions", "/courses", "/payments", "/campus-care", "/blog", "/contact"];
  const blogSlugs = await getBlogSlugs();

  const staticRoutes = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...blogRoutes];
}
