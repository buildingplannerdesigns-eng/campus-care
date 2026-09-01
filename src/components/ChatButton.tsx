"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 3.25c-4.97 0-9 3.48-9 7.77 0 2.16.96 4.12 2.54 5.54L4.2 20.6a.75.75 0 0 0 1.05.9l4.3-2.18c.78.2 1.6.31 2.45.31 4.97 0 9-3.48 9-7.77s-4.03-7.61-9-7.61Z"
      />
      <circle cx="8.25" cy="11.15" r="1.05" className="fill-[#1a3c40] transition-colors group-hover:fill-[#f7efe8]" />
      <circle cx="12" cy="11.15" r="1.05" className="fill-[#1a3c40] transition-colors group-hover:fill-[#f7efe8]" />
      <circle cx="15.75" cy="11.15" r="1.05" className="fill-[#1a3c40] transition-colors group-hover:fill-[#f7efe8]" />
    </svg>
  );
}

export function ChatButton() {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (panelRef.current?.querySelector('[aria-label="Select country code"]')) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    const firstField = panelRef.current?.querySelector<HTMLElement>(
      "input:not([type=hidden]):not([tabindex='-1']), select, textarea"
    );
    firstField?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-5 z-40 sm:bottom-8 sm:right-8">
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-labelledby={`${panelId}-title`}
        aria-hidden={!open}
        tabIndex={-1}
        className={`absolute bottom-[4.25rem] right-0 max-h-[calc(100dvh-10.5rem)] w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-hidden border border-[#1a3c40] bg-white shadow-[0_18px_48px_rgba(26,60,64,0.28)] outline-none sm:bottom-[4.75rem] sm:max-h-[calc(100dvh-15rem)] ${
          open ? "flex" : "hidden"
        }`}
      >
        <div className="shrink-0 bg-[#1a3c40] px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9A87C]">
            Campus Care 2.0
          </p>
          <h2
            id={`${panelId}-title`}
            className="mt-1.5 font-display text-2xl italic leading-snug text-[#f7efe8]"
          >
            How can we help?
          </h2>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <p className="mb-4 text-sm leading-relaxed text-[#1a3c40]/80">
            Fill in a few details and we&apos;ll get back to you personally.
          </p>
          {open ? (
            <ContactForm
              compact
              idPrefix="chat-"
              submitLabel="Send message"
              successMessage="Thank you — the Campus Care team will be in touch soon."
            />
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat" : "Chat with us"}
        title={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        aria-controls={panelId}
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#1a3c40] bg-[#1a3c40] text-[#f7efe8] shadow-[0_12px_28px_rgba(26,60,64,0.32)] transition-all duration-300 hover:border-[#ead5c6] hover:bg-gradient-to-b hover:from-[#f7efe8] hover:to-[#ead5c6] hover:text-[#1a3c40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ead5c6]"
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.25} aria-hidden />
        ) : (
          <ChatBubbleIcon className="h-7 w-7" />
        )}
      </button>
    </div>
  );
}
