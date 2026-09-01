"use client";

import { Component, useEffect, useRef, type ReactNode } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
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

class WidgetErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="text-sm text-[#b3421c]">
          Security check failed to load. Refresh this page and try again.
        </p>
      );
    }
    return this.props.children;
  }
}

function TurnstileWidget({
  onTokenChange,
  onVerifiedChange,
  error,
  theme,
  className,
  compact,
  visible,
  resetNonce,
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

    const cleanup = () => {
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetId && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // Already removed during navigation.
        }
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };

    const renderWidget = () => {
      if (cancelled || widgetIdRef.current) return true;
      if (!containerRef.current || !window.turnstile?.render) return false;

      try {
        containerRef.current.innerHTML = "";
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
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
      } catch (renderError) {
        console.error("[turnstile] render failed:", renderError);
        return false;
      }
    };

    if (!renderWidget()) {
      let attempts = 0;
      poll = window.setInterval(() => {
        attempts += 1;
        if (renderWidget() || attempts >= 50) {
          if (poll) window.clearInterval(poll);
        }
      }, 200);
    }

    return () => {
      cancelled = true;
      if (poll) window.clearInterval(poll);
      cleanup();
    };
  }, [compact, theme, visible]);

  useEffect(() => {
    if (!resetNonce || !widgetIdRef.current || !window.turnstile?.reset) return;
    try {
      window.turnstile.reset(widgetIdRef.current);
    } catch {
      // Ignore reset errors after navigation.
    }
    onTokenChangeRef.current("");
    onVerifiedChangeRef.current(false);
  }, [resetNonce]);

  const isDark = theme === "dark";
  const textClass = isDark ? "text-white/80" : "text-parchment/70";
  const errorClass = isDark ? "text-[#ffb4a2]" : "text-[#b3421c]";

  if (!visible) return null;

  return (
    <div className={className}>
      <p className={`mb-2 text-xs ${textClass}`}>
        Security check <span className={isDark ? "text-[#ffb4a2]" : "text-[#b3421c]"}>*</span>
      </p>
      <div ref={containerRef} className="min-h-[65px] w-full" />
      {error && <p className={`mt-1.5 text-xs font-medium ${errorClass}`}>{error}</p>}
    </div>
  );
}

function CheckboxFallback({
  verified,
  onVerifiedChange,
  onTokenChange,
  error,
  theme,
  className,
}: SecurityCheckProps) {
  const isDark = theme === "dark";
  const boxClass = isDark
    ? "border border-white/25 bg-white/10"
    : "border border-[#d5d0c4] bg-[#faf9f7]";
  const textClass = isDark ? "text-white/80" : "text-parchment/70";
  const errorClass = isDark ? "text-[#ffb4a2]" : "text-[#b3421c]";

  return (
    <div className={className}>
      <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.14em] ${textClass}`}>
        Security check <span className={isDark ? "text-[#ffb4a2]" : "text-[#b3421c]"}>*</span>
      </p>
      <label className={`flex cursor-pointer items-start gap-3 rounded-none px-4 py-3 ${boxClass}`}>
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

export function SecurityCheck(props: SecurityCheckProps) {
  if (!TURNSTILE_SITE_KEY) {
    return <CheckboxFallback {...props} />;
  }

  return (
    <WidgetErrorBoundary>
      <TurnstileWidget {...props} />
    </WidgetErrorBoundary>
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
