import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactNotification } from "@/lib/resend";
import { getClientIp, rateLimitByIp } from "@/lib/security";
import { verifyTurnstileToken } from "@/lib/turnstile";

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  subject: z.string().min(1),
  message: z.string().optional(),
  target: z.enum(["general", "dr-cammie"]).optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimitByIp("contact", ip, { max: 5, windowMs: 10 * 60 * 1000 });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSeconds),
        },
      }
    );
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const token = parsed.data.turnstileToken;
    if (!token) {
      return NextResponse.json(
        { error: "Security verification is required." },
        { status: 400 }
      );
    }

    const isHuman = await verifyTurnstileToken({
      token,
      remoteIp: ip,
    });

    if (!isHuman) {
      return NextResponse.json(
        { error: "Security verification failed. Please retry." },
        { status: 403 }
      );
    }
  }

  try {
    await sendContactNotification({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
      target: parsed.data.target ?? "general",
    });
    return NextResponse.json(
      { ok: true },
      {
        headers: {
          "X-RateLimit-Remaining": String(limit.remaining),
        },
      }
    );
  } catch (error) {
    console.error("Contact form notification failed:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 502 });
  }
}
