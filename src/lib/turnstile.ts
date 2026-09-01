type TurnstileVerifyResponse = {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

export const TURNSTILE_FALLBACK_TOKEN = "manual-security-check";

export function getTurnstileSecretKey() {
  return (
    process.env.TURNSTILE_SECRET_KEY?.trim() ||
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY?.trim() ||
    process.env.TURNSTILE_SECRET?.trim() ||
    ""
  );
}

export function isTurnstileServerConfigured() {
  return Boolean(getTurnstileSecretKey());
}

export async function verifyTurnstileToken(params: {
  token: string;
  remoteIp?: string;
}): Promise<{ success: boolean; errorCodes: string[] }> {
  const secret = getTurnstileSecretKey();
  if (!secret) return { success: false, errorCodes: ["missing-input-secret"] };

  const token = params.token.trim();
  if (!token || token === TURNSTILE_FALLBACK_TOKEN || token.length > 2048) {
    return { success: false, errorCodes: ["invalid-input-response"] };
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret,
        response: token,
        ...(params.remoteIp && params.remoteIp !== "unknown" ? { remoteip: params.remoteIp } : {}),
        idempotency_key: crypto.randomUUID(),
      }),
    });

    const data = (await res.json()) as TurnstileVerifyResponse;
    const errorCodes = data["error-codes"] ?? [];

    if (!res.ok || data.success !== true) {
      console.warn("[turnstile] siteverify failed", errorCodes);
      return { success: false, errorCodes };
    }

    return { success: true, errorCodes: [] };
  } catch (error) {
    console.error("[turnstile] siteverify error:", error);
    return { success: false, errorCodes: ["internal-error"] };
  }
}
