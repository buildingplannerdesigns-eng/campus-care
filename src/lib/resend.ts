import { Resend } from "resend";
import type { ContactFormValues } from "@/types";

function resolveContactRecipient(target: ContactFormValues["target"]) {
  if (target === "dr-cammie") {
    return process.env.DR_CAMMIE_CONTACT_EMAIL ?? "cconner@actcampuscare.com";
  }

  return process.env.CONTACT_NOTIFICATION_EMAIL ?? "info@actcampuscare.com";
}

/**
 * Lazily instantiate the Resend client so the app can build and run
 * locally before RESEND_API_KEY is provisioned (see .env.example).
 */
function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendContactNotification(values: ContactFormValues) {
  const resend = getResendClient();
  const to = resolveContactRecipient(values.target);
  const from = process.env.RESEND_FROM_EMAIL ?? "no-reply@campuscare2.org";

  if (!resend) {
    // No credentials configured yet — log locally instead of failing the request.
    console.info("[contact] RESEND_API_KEY / CONTACT_NOTIFICATION_EMAIL not set. Submission:", values);
    return;
  }

  await resend.emails.send({
    from,
    to,
    subject:
      values.target === "dr-cammie"
        ? `New Dr. Cammie enquiry: ${values.subject} — ${values.firstName} ${values.lastName}`
        : `New Campus Care 2.0 contact: ${values.subject} — ${values.firstName} ${values.lastName}`,
    text: [
      `Name: ${values.firstName} ${values.lastName}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Subject: ${values.subject ?? "General enquiry"}`,
      `Target: ${values.target ?? "general"}`,
      values.message ? `Message: ${values.message}` : "Message: (none)",
    ].join("\n"),
  });
}

export async function sendDonationReceipt(params: {
  to: string;
  donorName: string;
  amount: number;
  currency: string;
  reference: string;
}) {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL ?? "donations@campuscare2.org";

  if (!resend) {
    console.info("[donation-receipt] RESEND_API_KEY not set. Receipt:", params);
    return;
  }

  await resend.emails.send({
    from,
    to: params.to,
    subject: "Thank you for supporting Campus Care 2.0",
    text: [
      `Dear ${params.donorName},`,
      "",
      `Thank you for your donation of ${params.currency} ${params.amount.toFixed(2)} to Campus Care 2.0.`,
      `Reference: ${params.reference}`,
      "",
      "Your generosity directly supports culturally grounded mental wellness for HBCU students.",
    ].join("\n"),
  });
}
