"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      ready: (callback: () => void) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
  process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY?.trim() ||
  "";

type SecurityCheckProps = {
  token: string;
  onTokenChange: (token: string) => void;
  verified: boolean;
  onVerifiedChange: (verified: boolean) => void;
  error?: string;
  theme?: "light" | "dark";
  className?: string;
  compact?: boolean;
  visible?: boolean;
  resetNonce?: number;
};

/**
 * Always-visible security check:
 * - Cloudflare Turnstile when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set
 * - Checkbox confirmation fallback when Turnstile is not configured
 */
export function SecurityCheck({
  onTokenChange,
  verified,
  onVerifiedChange,
  error,
  theme = "light",
  className,
  compact = false,
  visible = true,
  resetNonce = 0,
}: SecurityCheckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onVerifiedChangeRef = useRef(onVerifiedChange);

  onTokenChangeRef.current = onTokenChange;
  onVerifiedChangeRef.current = onVerifiedChange;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !visible) return;

    let cancelled = false;
    let poll: number | undefined;

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme,
        size: compact ? "compact" : "flexible",
        appearance: "always",
        action: "contact",
        callback: (value: string) => {
          onTokenChangeRef.current(value);
          onVerifiedChangeRef.current(true);
        },
        "expired-callback": () => {
          onTokenChangeRef.current("");
          onVerifiedChangeRef.current(false);
        },
        "error-callback": () => {
          onTokenChangeRef.current("");
          onVerifiedChangeRef.current(false);
        },
        "timeout-callback": () => {
          onTokenChangeRef.current("");
          onVerifiedChangeRef.current(false);
        },
      });
    };

    const start = () => {
      if (!window.turnstile) return false;
      window.turnstile.ready(renderWidget);
      return true;
    };

    const onReady = () => {
      start();
    };
    window.addEventListener("turnstile-load", onReady);

    if (!start()) {
      poll = window.setInterval(() => {
        if (start() && poll) window.clearInterval(poll);
      }, 250);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("turnstile-load", onReady);
      if (poll) window.clearInterval(poll);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [compact, theme, visible]);

  useEffect(() => {
    if (!resetNonce || !widgetIdRef.current || !window.turnstile) return;
    window.turnstile.reset(widgetIdRef.current);
    onTokenChangeRef.current("");
    onVerifiedChangeRef.current(false);
  }, [resetNonce]);

  const isDark = theme === "dark";
  const boxClass = isDark
    ? "border border-white/25 bg-white/10"
    : "border border-[#d5d0c4] bg-[#faf9f7]";
  const textClass = isDark ? "text-white/80" : "text-parchment/70";
  const errorClass = isDark ? "text-[#ffb4a2]" : "text-[#b3421c]";

  if (TURNSTILE_SITE_KEY) {
    if (!visible) return null;

    return (
      <div className={className}>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => {
            window.dispatchEvent(new Event("turnstile-load"));
          }}
        />
        <p className={`mb-2 text-xs ${textClass}`}>
          Security check <span className={isDark ? "text-[#ffb4a2]" : "text-[#b3421c]"}>*</span>
        </p>
        <div ref={containerRef} className="overflow-hidden" />
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
