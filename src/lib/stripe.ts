export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() ||
  "https://buy.stripe.com/dRm28t1OzgRG9Gq0Gmawo00";

export function isStripeCheckoutConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}
