"use client";

import { useEffect, useId, useState } from "react";
import Script from "next/script";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type SecurityCheckProps = {
  token: string;
  onTokenChange: (token: string) => void;
  verified: boolean;
  onVerifiedChange: (verified: boolean) => void;
  error?: string;
  theme?: "light" | "dark";
  className?: string;
};

/**
 * Always-visible security check:
 * - Cloudflare Turnstile when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set
 * - Checkbox confirmation fallback when Turnstile is not configured
 */
export function SecurityCheck({
  token,
  onTokenChange,
  verified,
  onVerifiedChange,
  error,
  theme = "light",
  className,
}: SecurityCheckProps) {
  const reactId = useId().replace(/:/g, "");
  const successCb = `onTurnstileSuccess_${reactId}`;
  const expiredCb = `onTurnstileExpired_${reactId}`;
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    (window as unknown as Record<string, unknown>)[successCb] = (value: string) => {
      onTokenChange(value);
      onVerifiedChange(true);
    };
    (window as unknown as Record<string, unknown>)[expiredCb] = () => {
      onTokenChange("");
      onVerifiedChange(false);
    };

    return () => {
      delete (window as unknown as Record<string, unknown>)[successCb];
      delete (window as unknown as Record<string, unknown>)[expiredCb];
    };
  }, [successCb, expiredCb, onTokenChange, onVerifiedChange]);

  const isDark = theme === "dark";
  const boxClass = isDark
    ? "border border-white/25 bg-white/10"
    : "border border-[#d5d0c4] bg-[#faf9f7]";
  const textClass = isDark ? "text-white/80" : "text-parchment/70";
  const errorClass = isDark ? "text-[#ffb4a2]" : "text-[#b3421c]";

  if (TURNSTILE_SITE_KEY) {
    return (
      <div className={className}>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
        <p className={`mb-2 text-xs ${textClass}`}>
          Security check <span className={isDark ? "text-[#ffb4a2]" : "text-[#b3421c]"}>*</span>
        </p>
        <div
          className="cf-turnstile"
          data-sitekey={TURNSTILE_SITE_KEY}
          data-callback={successCb}
          data-expired-callback={expiredCb}
          data-theme={theme}
        />
        {!scriptReady && !token && (
          <p className={`mt-2 text-xs ${textClass}`}>Loading security check…</p>
        )}
        {error && <p className={`mt-1.5 text-xs font-medium ${errorClass}`}>{error}</p>}
      </div>
    );
  }

  return (
    <div className={className}>
      <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.14em] ${textClass}`}>
        Security check <span className={isDark ? "text-[#ffb4a2]" : "text-[#b3421c]"}>*</span>
      </p>
      <label
        className={`flex cursor-pointer items-start gap-3 rounded-none px-4 py-3 ${boxClass}`}
      >
        <input
          type="checkbox"
          checked={verified}
          onChange={(e) => {
            onVerifiedChange(e.target.checked);
            onTokenChange(e.target.checked ? "manual-security-check" : "");
          }}
          className="mt-0.5 h-4 w-4 accent-[#0e4f88]"
          required
        />
        <span className={`text-sm leading-snug ${isDark ? "text-white/85" : "text-parchment/80"}`}>
          I am not a robot
        </span>
      </label>
      {error && <p className={`mt-1.5 text-xs font-medium ${errorClass}`}>{error}</p>}
    </div>
  );
}

export function isSecuritySatisfied(params: {
  turnstileConfigured: boolean;
  token: string;
  verified: boolean;
}): boolean {
  if (params.turnstileConfigured) return Boolean(params.token);
  return params.verified;
}

export const isTurnstileConfigured = Boolean(TURNSTILE_SITE_KEY);
