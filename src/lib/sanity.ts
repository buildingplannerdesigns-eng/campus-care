import { createClient } from "@sanity/client";

/**
 * Sanity CMS client for content that the Campus Care team edits directly:
 * programs, gallery, team bios, and news/updates. Wire this up once
 * NEXT_PUBLIC_SANITY_PROJECT_ID is provisioned — until then, pages fall
 * back to the static content in src/data/.
 */
export function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;
