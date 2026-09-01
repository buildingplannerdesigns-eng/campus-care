"use client";

import { useEffect, useId, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      ready?: (callback: () => void) => void;
      implicitRender?: () => void;
    };
  }
}

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
  process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY?.trim() ||
  "";

const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";

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
  const reactId = useId().replace(/:/g, "");
  const successCb = `onTurnstileSuccess_${reactId}`;
  const expiredCb = `onTurnstileExpired_${reactId}`;
  const errorCb = `onTurnstileError_${reactId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onVerifiedChangeRef = useRef(onVerifiedChange);

  onTokenChangeRef.current = onTokenChange;
  onVerifiedChangeRef.current = onVerifiedChange;

  useEffect(() => {
    (window as unknown as Record<string, unknown>)[successCb] = (value: string) => {
      onTokenChangeRef.current(value);
      onVerifiedChangeRef.current(true);
    };
    (window as unknown as Record<string, unknown>)[expiredCb] = () => {
      onTokenChangeRef.current("");
      onVerifiedChangeRef.current(false);
    };
    (window as unknown as Record<string, unknown>)[errorCb] = () => {
      onTokenChangeRef.current("");
      onVerifiedChangeRef.current(false);
    };

    return () => {
      delete (window as unknown as Record<string, unknown>)[successCb];
      delete (window as unknown as Record<string, unknown>)[expiredCb];
      delete (window as unknown as Record<string, unknown>)[errorCb];
    };
  }, [errorCb, expiredCb, successCb]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !visible) return;

    let cancelled = false;
    let poll: number | undefined;

    const hasWidget = () =>
      Boolean(containerRef.current?.querySelector("iframe, input[name='cf-turnstile-response']"));

    const renderExplicit = () => {
      if (cancelled || widgetIdRef.current || !containerRef.current || !window.turnstile?.render) {
        return false;
      }
      if (hasWidget()) return true;
      const target =
        containerRef.current.querySelector<HTMLElement>(".cf-turnstile") || containerRef.current;

      try {
        widgetIdRef.current = window.turnstile.render(target, {
          sitekey: TURNSTILE_SITE_KEY,
          theme,
          size: compact ? "compact" : "normal",
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
        });
        return Boolean(widgetIdRef.current);
      } catch (error) {
        console.error("[turnstile] render failed:", error);
        return false;
      }
    };

    const start = () => {
      if (!window.turnstile) return false;
      if (hasWidget()) return true;
      if (typeof window.turnstile.implicitRender === "function") {
        try {
          window.turnstile.implicitRender();
        } catch {
          // Fall through to explicit render.
        }
      }
      if (hasWidget()) return true;
      if (typeof window.turnstile.ready === "function") {
        window.turnstile.ready(() => {
          if (!hasWidget()) renderExplicit();
        });
        return true;
      }
      return renderExplicit();
    };

    const onLoad = () => {
      start();
    };
    window.addEventListener("turnstile-load", onLoad);

    if (!start()) {
      poll = window.setInterval(() => {
        if (start() && poll) window.clearInterval(poll);
      }, 250);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("turnstile-load", onLoad);
      if (poll) window.clearInterval(poll);
      if (widgetIdRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Widget may already be gone during unmount.
        }
      }
      widgetIdRef.current = null;
    };
  }, [compact, theme, visible]);

  useEffect(() => {
    if (!resetNonce || !window.turnstile?.reset) return;
    try {
      if (widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      } else {
        window.turnstile.reset();
      }
    } catch {
      // Ignore reset errors after navigation or expired widgets.
    }
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
          src={TURNSTILE_SCRIPT}
          strategy="afterInteractive"
          onLoad={() => {
            window.dispatchEvent(new Event("turnstile-load"));
          }}
        />
        <p className={`mb-2 text-xs ${textClass}`}>
          Security check <span className={isDark ? "text-[#ffb4a2]" : "text-[#b3421c]"}>*</span>
        </p>
        <div ref={containerRef} className="min-h-[65px] w-full">
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme={theme}
            data-size={compact ? "compact" : "normal"}
            data-callback={successCb}
            data-expired-callback={expiredCb}
            data-error-callback={errorCb}
          />
        </div>
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
