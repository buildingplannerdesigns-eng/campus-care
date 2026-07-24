import type { Metadata } from "next";

/** Canonical production origin used by metadata, sitemap, robots, and share links. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.actcampuscare.com";

/** Shared SEO helpers for page-level metadata. */
export function pageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords: [
      "ACT Healing",
      "Campus Care 2.0",
      "Dr. Connor",
      ...keywords,
    ],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: "/images/logo.jpg", alt: "ACT Healing — Campus Care 2.0" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logo.jpg"],
    },
  };
}
