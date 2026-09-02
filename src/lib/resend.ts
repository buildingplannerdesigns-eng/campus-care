import { Resend } from "resend";
import type { ContactFormValues } from "@/types";
import { SITE_URL } from "@/lib/seo";

function getResendClient(): Resend {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(key);
}

function fromAddress() {
  const email =
    process.env.RESEND_FROM_EMAIL?.trim() || "info@actcampuscare.com";
  return email.includes("<") ? email : `Campus Care 2.0 <${email}>`;
}

function staffInbox() {
  return process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || "info@actcampuscare.com";
}

function resolveContactRecipient(target: ContactFormValues["target"]) {
  if (target === "dr-cammie") {
    return process.env.DR_CAMMIE_CONTACT_EMAIL?.trim() || "cconnor@actcampuscare.com";
  }
  return staffInbox();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function emailLayout(title: string, bodyHtml: string) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f7f4ef;font-family:Georgia,serif;color:#1a3c40;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6e0d6;">
            <tr>
              <td style="background:#0e4f88;padding:20px 28px;color:#ffffff;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">
                Campus Care 2.0 · ACT Healing
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 16px;font-size:26px;font-weight:normal;font-style:italic;color:#1a3c40;">${escapeHtml(title)}</h1>
                ${bodyHtml}
                <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#6b6460;">
                  ACT Healing · <a href="${SITE_URL}" style="color:#0e4f88;">actcampuscare.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendEmail(payload: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const { data, error } = await getResendClient().emails.send({
    from: fromAddress(),
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  });

  if (error) {
    throw new Error(error.message || "Resend failed to send email");
  }

  return data;
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  } catch {
    return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
  }
}

export async function sendContactNotification(values: ContactFormValues) {
  const to = resolveContactRecipient(values.target);
  const name = `${values.firstName} ${values.lastName}`.trim();
  const subject =
    values.target === "dr-cammie"
      ? `New Dr. Cammie enquiry: ${values.subject} — ${name}`
      : `New Campus Care 2.0 contact: ${values.subject} — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Subject: ${values.subject ?? "General enquiry"}`,
    `Target: ${values.target ?? "general"}`,
    values.message ? `Message: ${values.message}` : "Message: (none)",
  ].join("\n");

  await sendEmail({
    to,
    subject,
    replyTo: values.email,
    text,
    html: emailLayout(
      "New website message",
      `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">A new ${escapeHtml(values.target === "dr-cammie" ? "Dr. Cammie" : "general")} enquiry arrived.</p>
      <p style="margin:0;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(text)}</p>`,
    ),
  });

  await sendEmail({
    to: values.email,
    subject: "We received your message — Campus Care 2.0",
    text: [
      `Dear ${values.firstName},`,
      "",
      "Thank you for contacting ACT Healing. We received your message and will reply as soon as we can.",
      "",
      `Subject: ${values.subject ?? "General enquiry"}`,
    ].join("\n"),
    html: emailLayout(
      "We received your message",
      `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Dear ${escapeHtml(values.firstName)},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thank you for contacting ACT Healing. We received your message and will reply as soon as we can.</p>
      <p style="margin:0;font-size:14px;color:#6b6460;">Subject: ${escapeHtml(values.subject ?? "General enquiry")}</p>`,
    ),
  });
}

export async function sendDonationReceipt(params: {
  to: string;
  donorName: string;
  amount: number;
  currency: string;
  reference: string;
  source?: "stripe";
  recurring?: boolean;
}) {
  const amountLabel = formatMoney(params.amount, params.currency);
  const greeting = params.donorName || "friend";
  const cadence = params.recurring ? "monthly gift" : "gift";

  await sendEmail({
    to: params.to,
    subject: "Thank you for supporting Campus Care 2.0",
    text: [
      `Dear ${greeting},`,
      "",
      `Thank you for your ${cadence} of ${amountLabel} to Campus Care 2.0.`,
      `Reference: ${params.reference}`,
      `Processed by Stripe.`,
      "",
      "Your generosity directly supports culturally grounded mental wellness for HBCU students.",
    ].join("\n"),
    html: emailLayout(
      "Thank you for your gift",
      `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Dear ${escapeHtml(greeting)},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thank you for your ${escapeHtml(cadence)} of <strong>${escapeHtml(amountLabel)}</strong> to Campus Care 2.0.</p>
      <p style="margin:0 0 16px;font-size:14px;color:#6b6460;">Reference: ${escapeHtml(params.reference)} · Stripe</p>
      <p style="margin:0;font-size:15px;line-height:1.6;">Your generosity directly supports culturally grounded mental wellness for HBCU students.</p>`,
    ),
  });

  await sendEmail({
    to: staffInbox(),
    subject: `New Stripe donation: ${amountLabel}`,
    text: [
      `A ${cadence} was received via Stripe.`,
      `Donor: ${greeting} <${params.to}>`,
      `Amount: ${amountLabel}`,
      `Reference: ${params.reference}`,
    ].join("\n"),
    html: emailLayout(
      "New donation received",
      `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;">A ${escapeHtml(cadence)} was received via Stripe.</p>
      <p style="margin:0;font-size:15px;line-height:1.7;">Donor: ${escapeHtml(greeting)} &lt;${escapeHtml(params.to)}&gt;<br/>Amount: ${escapeHtml(amountLabel)}<br/>Reference: ${escapeHtml(params.reference)}</p>`,
    ),
  });
}
