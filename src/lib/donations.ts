import { recordDonation } from "@/lib/supabase";
import { sendDonationReceipt } from "@/lib/resend";

export async function fulfillDonation(params: {
  reference: string;
  donorEmail: string;
  donorName: string;
  amount: number;
  currency: string;
  source: "stripe";
  recurring?: boolean;
}) {
  const email = params.donorEmail.trim().toLowerCase();
  if (!email) {
    throw new Error("Donation is missing a donor email");
  }

  const created = await recordDonation({
    reference: `${params.source}:${params.reference}`,
    amountInPesewas: Math.round(params.amount * 100),
    currency: params.currency.toLowerCase(),
    donorEmail: email,
  });

  if (!created) return { emailed: false };

  await sendDonationReceipt({
    to: email,
    donorName: params.donorName.trim() || "friend",
    amount: params.amount,
    currency: params.currency,
    reference: params.reference,
    source: params.source,
    recurring: params.recurring,
  });

  return { emailed: true };
}
