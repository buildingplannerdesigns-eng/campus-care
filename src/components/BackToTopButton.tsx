"use client";

import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}