import { NextRequest } from "next/server";

type RateLimitConfig = {
  max: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function getClientIp(request: NextRequest): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

export function rateLimitByIp(
  key: string,
  ip: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const bucketKey = `${key}:${ip}`;

  for (const [storedKey, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(storedKey);
    }
  }

  const existing = buckets.get(bucketKey);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + config.windowMs;
    buckets.set(bucketKey, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: Math.max(config.max - 1, 0),
      retryAfterSeconds: Math.ceil(config.windowMs / 1000),
    };
  }

  if (existing.count >= config.max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(Math.ceil((existing.resetAt - now) / 1000), 1),
    };
  }

  existing.count += 1;
  buckets.set(bucketKey, existing);

  return {
    allowed: true,
    remaining: Math.max(config.max - existing.count, 0),
    retryAfterSeconds: Math.max(Math.ceil((existing.resetAt - now) / 1000), 1),
  };
}
