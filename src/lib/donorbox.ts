export const DONORBOX_CAMPAIGN_SLUG =
  process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN_SLUG?.trim() || "act-campus-care-2-0";

export const DONORBOX_CAMPAIGN_URL = (
  process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN_URL || `https://donorbox.org/${DONORBOX_CAMPAIGN_SLUG}`
).replace(/\/?$/, "").replace(/\?$/, "");

export const DONORBOX_EMBED_URL =
  process.env.NEXT_PUBLIC_DONORBOX_EMBED_URL?.trim() ||
  `https://donorbox.org/embed/${DONORBOX_CAMPAIGN_SLUG}?default_interval=m`;

export function donorboxUrl(params?: { amount?: number; monthly?: boolean }) {
  const search = new URLSearchParams();
  if (params?.amount && params.amount > 0) search.set("amount", String(params.amount));
  if (params?.monthly) search.set("interval", "monthly");
  const query = search.toString();
  return query ? `${DONORBOX_CAMPAIGN_URL}?${query}` : DONORBOX_CAMPAIGN_URL;
}
