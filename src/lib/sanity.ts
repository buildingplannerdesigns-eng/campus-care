import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { createClient } from "@sanity/client";

/**
 * Sanity CMS client for content the Campus Care team edits in Sanity Studio:
 * blog posts, team bios, core elements, and site settings.
 * Until NEXT_PUBLIC_SANITY_PROJECT_ID is set, pages use src/data fallbacks.
 */
export function isSanityConfigured(): boolean {
  return Boolean(projectId && projectId !== "placeholder");
}

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = isSanityConfigured()
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: unknown) {
  if (!builder || !source) return undefined;
  try {
    return builder.image(source as Parameters<typeof builder.image>[0]).auto("format").fit("max").url();
  } catch {
    return undefined;
  }
}
