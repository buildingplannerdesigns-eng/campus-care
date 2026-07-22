"use client";

import { useCallback, useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const DISMISS_KEY = "cc-pwa-install-dismissed";

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function isIos() {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export function PwaRegister() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        // Register in all environments so install works in local preview too when served over HTTPS/localhost
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch {
        // Silent fail — PWA registration should never block the app
      }
    };

    void register();
  }, []);

  useEffect(() => {
    if (isStandalone()) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return;

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      setVisible(true);
      setIosHint(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    // iOS has no beforeinstallprompt — show a soft hint after a short delay
    if (isIos()) {
      const timer = window.setTimeout(() => {
        if (!sessionStorage.getItem(DISMISS_KEY) && !isStandalone()) {
          setIosHint(true);
          setVisible(true);
        }
      }, 4000);
      return () => {
        window.removeEventListener("beforeinstallprompt", onBeforeInstall);
        window.clearTimeout(timer);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
  }, [deferred]);

  // Expose install trigger for footer button
  useEffect(() => {
    const handler = () => {
      if (deferred) {
        void install();
        return;
      }
      // No deferred prompt — show the banner / iOS hint
      setVisible(true);
      if (isIos()) setIosHint(true);
    };
    window.addEventListener("cc-pwa-install", handler);
    return () => window.removeEventListener("cc-pwa-install", handler);
  }, [deferred, install]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-5">
      <div className="mx-auto flex max-w-xl flex-col gap-3 border border-[#d7dfda] bg-white p-4 shadow-[0_18px_40px_rgba(17,63,108,0.18)] sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0e4f88]">Install Campus Care</p>
          <p className="mt-1 text-sm leading-relaxed text-parchment/75">
            {iosHint
              ? "On iPhone: tap Share, then Add to Home Screen."
              : "Add the app to your home screen for quick access."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="border border-[#d7dfda] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-parchment/70 transition hover:border-[#0e4f88] hover:text-[#0e4f88]"
          >
            Not now
          </button>
          {!iosHint && deferred && (
            <button
              type="button"
              onClick={() => void install()}
              className="border border-[#0e4f88] bg-[#0e4f88] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#0e4f88]"
            >
              Install
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Trigger the PWA install flow from anywhere (e.g. footer link). */
export function triggerPwaInstall() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("cc-pwa-install"));
}
