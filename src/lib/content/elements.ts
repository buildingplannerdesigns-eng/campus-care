import { coreElements as fallbackElements } from "@/data/elements";
import { isSanityConfigured, sanityClient } from "@/lib/sanity";
import type { CoreElement, ElementKey } from "@/types";

type SanityElement = {
  key?: string;
  name?: string;
  eyebrow?: string;
  description?: string;
};

const validKeys = new Set<ElementKey>(["water", "fire", "earth", "mineral", "nature"]);

export async function getCoreElements(): Promise<CoreElement[]> {
  if (!isSanityConfigured() || !sanityClient) return fallbackElements;

  try {
    const rows = await sanityClient.fetch<SanityElement[]>(
      `*[_type == "coreElement"] | order(order asc) {
        key, name, eyebrow, description
      }`
    );

    if (!rows?.length) return fallbackElements;

    const mapped = rows
      .filter((row): row is SanityElement & { key: ElementKey } =>
        Boolean(row.key && validKeys.has(row.key as ElementKey))
      )
      .map((row) => ({
        key: row.key,
        name: row.name?.trim() || fallbackElements.find((e) => e.key === row.key)?.name || row.key,
        eyebrow: row.eyebrow?.trim() || "",
        description:
          row.description?.trim() ||
          fallbackElements.find((e) => e.key === row.key)?.description ||
          "",
      }));

    return mapped.length ? mapped : fallbackElements;
  } catch {
    return fallbackElements;
  }
}
