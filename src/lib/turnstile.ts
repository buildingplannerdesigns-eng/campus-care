type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export function getTurnstileSecretKey() {
  return (
    process.env.TURNSTILE_SECRET_KEY?.trim() ||
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY?.trim() ||
    ""
  );
}

export async function verifyTurnstileToken(params: {
  token: string;
  remoteIp?: string;
}): Promise<boolean> {
  const secret = getTurnstileSecretKey();
  if (!secret) return false;

  const body = new URLSearchParams({
    secret,
    response: params.token,
  });

  if (params.remoteIp) {
    body.set("remoteip", params.remoteIp);
  }

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as TurnstileVerifyResponse;
  return data.success === true;
}
