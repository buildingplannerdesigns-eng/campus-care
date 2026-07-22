import type { Metadata } from "next";

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://campuscare2.org";
  const url = `${siteUrl}${path}`;

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
