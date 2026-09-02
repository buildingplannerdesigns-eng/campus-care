import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { fulfillDonation } from "@/lib/donations";
import { fulfillPaidCheckoutSession } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!secret) {
    return NextResponse.json({ received: false, ignored: true });
  }

  if (!webhookSecret) {
    return NextResponse.json({ received: false, ignored: true });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature failed:", error);
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await fulfillPaidCheckoutSession(session.id);
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.billing_reason !== "subscription_cycle") {
        return NextResponse.json({ received: true });
      }

      const email = invoice.customer_email;
      if (!email) {
        return NextResponse.json({ received: true, skipped: true });
      }

      await fulfillDonation({
        reference: invoice.id || event.id,
        donorEmail: email,
        donorName: "friend",
        amount: (invoice.amount_paid ?? 0) / 100,
        currency: invoice.currency || "usd",
        source: "stripe",
        recurring: true,
      });
    }
  } catch (error) {
    console.error("Stripe donation fulfillment failed:", error);
    return NextResponse.json({ error: "Failed to process donation." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
