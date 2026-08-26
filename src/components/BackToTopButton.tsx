"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 420;

export function BackToTopButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.scrollY > SHOW_AFTER_PX);

    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 left-5 z-40 inline-flex h-12 w-12 items-center justify-center border border-[#1a3c40] bg-[#1a3c40] text-[#f7efe8] shadow-[0_12px_28px_rgba(26,60,64,0.28)] transition-all duration-300 hover:border-[#ead5c6] hover:bg-gradient-to-b hover:from-[#f7efe8] hover:to-[#ead5c6] hover:text-[#1a3c40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ead5c6] sm:bottom-8 sm:left-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
