import Stripe from "stripe";
import { fulfillDonation } from "@/lib/donations";

export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() ||
  "https://buy.stripe.com/dRm28t1OzgRG9Gq0Gmawo00";

export function isStripeCheckoutConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) return null;
  return new Stripe(secret);
}

export async function fulfillPaidCheckoutSession(sessionId: string) {
  const stripe = getStripe();
  if (!stripe || !sessionId.startsWith("cs_")) {
    return { emailed: false as const, reason: "invalid" };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paid = session.status === "complete" || session.payment_status === "paid";
  if (!paid) {
    return { emailed: false as const, reason: "unpaid" };
  }

  const email = session.customer_details?.email || session.customer_email;
  if (!email) {
    return { emailed: false as const, reason: "no-email" };
  }

  return fulfillDonation({
    reference: session.id,
    donorEmail: email,
    donorName: session.customer_details?.name || "friend",
    amount: (session.amount_total ?? 0) / 100,
    currency: session.currency || "usd",
    source: "stripe",
    recurring: session.mode === "subscription",
  });
}
