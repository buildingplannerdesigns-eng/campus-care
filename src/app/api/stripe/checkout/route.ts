import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { STRIPE_PAYMENT_LINK } from "@/lib/stripe";
import { getClientIp, rateLimitByIp } from "@/lib/security";

const checkoutSchema = z.object({
  amount: z.number().min(1).max(100_000),
  monthly: z.boolean().optional(),
  honorGift: z.boolean().optional(),
});

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.actcampuscare.com").replace(/\/$/, "");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimitByIp("stripe-checkout", ip, { max: 8, windowMs: 10 * 60 * 1000 });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many checkout attempts. Please try again later." },
      { status: 429 }
    );
  }

  const parsed = checkoutSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid donation amount." }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    return NextResponse.json({ url: STRIPE_PAYMENT_LINK });
  }

  const { amount, monthly, honorGift } = parsed.data;
  const stripe = new Stripe(secret);
  const amountCents = Math.round(amount * 100);
  const origin = request.headers.get("origin") || siteUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: monthly ? "subscription" : "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: monthly ? "ACT Campus Care monthly gift" : "ACT Campus Care donation",
              description: "Support culturally grounded VR wellness for HBCU students.",
            },
            unit_amount: amountCents,
            ...(monthly ? { recurring: { interval: "month" as const } } : {}),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/payments/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payments`,
      metadata: {
        honorGift: honorGift ? "true" : "false",
        source: "payments-page",
      },
    });

    if (!session.url) {
      return NextResponse.json({ url: STRIPE_PAYMENT_LINK });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout session failed:", error);
    return NextResponse.json({ url: STRIPE_PAYMENT_LINK });
  }
}
