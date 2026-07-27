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
  twitterDescription,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  /** Optional Twitter card description when it should differ from the meta description. */
  twitterDescription?: string;
  /** When true, skip the root layout title template (`%s | Campus Care 2.0`). */
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const twitterDesc = twitterDescription ?? description;

  return {
    title: absoluteTitle ? { absolute: title } : title,
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
      description: twitterDesc,
      images: ["/images/logo.jpg"],
    },
  };
}
