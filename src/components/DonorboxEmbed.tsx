"use client";

import Script from "next/script";
import { DONORBOX_EMBED_URL } from "@/lib/donorbox";

export function DonorboxEmbed() {
  return (
    <div className="mx-auto w-full max-w-[500px]">
      <Script src="https://donorbox.org/widget.js" strategy="afterInteractive" />
      <div className="overflow-hidden border border-[#e6e0d6] bg-white shadow-[0_18px_44px_rgba(12,63,132,0.08)]">
        <iframe
          src={DONORBOX_EMBED_URL}
          name="donorbox"
          title="Donate to Campus Care 2.0"
          allow="payment"
          width="100%"
          height={900}
          className="block w-full border-0"
          style={{ maxWidth: 500, minWidth: 250, maxHeight: "none" }}
        />
      </div>
    </div>
  );
}
