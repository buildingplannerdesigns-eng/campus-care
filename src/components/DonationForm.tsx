"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const DONORBOX_URL =
  process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN_URL ||
  "https://donorbox.org/campus-care-2-0";

const suggestedAmounts = [25, 50, 100, 250, 365];

const impactByAmount: Record<number, string> = {
  25: "Supports one guided wellness touchpoint for a student.",
  50: "Helps fund restorative VR content sessions.",
  100: "Expands trauma-informed support for students and teams.",
  250: "Sponsors a Sanctuary access package for a campus partner.",
  365: "A dollar a day — year-round student support.",
};

const paymentLogos = [
  {
    name: "Visa",
    src: "/images/payments/visa.svg",
    wrapperClass: "w-24 md:w-28",
    imageClass: "p-1.5",
  },
  {
    name: "Mastercard",
    src: "/images/payments/mastercard.svg",
    wrapperClass: "w-20 md:w-22",
    imageClass: "p-2",
  },
  {
    name: "Amex",
    src: "/images/payments/amex.svg",
    wrapperClass: "w-20 md:w-22",
    imageClass: "p-2",
  },
  {
    name: "Apple Pay",
    src: "/images/payments/apple-pay.svg",
    wrapperClass: "w-24 md:w-28",
    imageClass: "p-1.5",
  },
  {
    name: "Google Pay",
    src: "/images/payments/google-pay.svg",
    wrapperClass: "w-20 md:w-24",
    imageClass: "p-2",
  },
];

export function DonationForm() {
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [honorGift, setHonorGift] = useState<boolean>(false);

  const activeAmount = customAmount !== "" ? Number(customAmount) : amount;

  const donateUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (activeAmount > 0) params.set("amount", String(activeAmount));
    if (isMonthly) params.set("interval", "monthly");
    const query = params.toString();
    return query ? `${DONORBOX_URL}?${query}` : DONORBOX_URL;
  }, [activeAmount, isMonthly]);

  const impactText =
    impactByAmount[activeAmount] ??
    "Supports culturally grounded mental wellness for HBCU students.";

  return (
    <div className="space-y-7">
      {/* Frequency toggle */}
      <div className="flex overflow-hidden rounded-full border border-gray-200 bg-gray-100 p-1">
        {(["One-time", "Monthly"] as const).map((freq) => {
          const monthly = freq === "Monthly";
          const active = monthly === isMonthly;
          return (
            <button
              key={freq}
              type="button"
              onClick={() => setIsMonthly(monthly)}
              className={`flex-1 py-2.5 text-sm font-semibold transition ${
                active
                  ? "rounded-full bg-white text-parchment shadow-sm"
                  : "text-parchment/50 hover:text-parchment/75"
              }`}
            >
              {freq}
            </button>
          );
        })}
      </div>

      {/* Preset amounts */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-parchment/45">
          Choose amount
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {suggestedAmounts.map((preset) => {
            const active = customAmount === "" && amount === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount("");
                }}
                className={`rounded-xl border px-3 py-3 text-center transition ${
                  active
                    ? "border-ember bg-ember/10 text-ember shadow-sm"
                    : "border-gray-200 bg-white text-parchment/80 hover:border-ember/40"
                }`}
              >
                <span className="block font-display text-xl leading-none">${preset}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom amount */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-ember">
        <span className="text-xl font-medium text-parchment/50">$</span>
        <input
          type="number"
          min={1}
          placeholder="Other amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
          }}
          className="w-full bg-transparent text-lg font-medium text-parchment outline-none placeholder:text-parchment/30"
        />
      </div>

      {/* Impact line */}
      <p className="text-sm leading-relaxed text-parchment/60">{impactText}</p>

      {/* Honor gift */}
      <label className="flex cursor-pointer items-start gap-3 text-sm text-parchment/70">
        <input
          type="checkbox"
          checked={honorGift}
          onChange={(e) => setHonorGift(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-ember"
        />
        Dedicate this donation in honor or in memory of someone
      </label>

      {/* Donate CTA */}
      <a
        href={donateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-full items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
      >
        Donate {activeAmount > 0 ? `$${activeAmount}` : "Now"}
        {isMonthly ? " / month" : " today"}
        <span
          className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100"
          aria-hidden
        >
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </a>

      {honorGift && (
        <p className="text-center text-xs text-parchment/50">
          Dedication details can be added on the Donorbox checkout page.
        </p>
      )}

      {/* Payment logos */}
      <div className="flex flex-wrap items-center justify-center gap-5 border-t border-gray-100 pt-6">
        {paymentLogos.map((logo) => (
          <div
            key={logo.name}
            className={`relative flex h-12 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-[0_4px_12px_rgba(11,31,52,0.05)] ${logo.wrapperClass}`}
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              fill
              className={`object-contain ${logo.imageClass}`}
            />
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-parchment/45">
        Powered by{" "}
        <a
          href="https://donorbox.org"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#1a5a96] hover:underline"
        >
          Donorbox
        </a>{" "}
        · Secure &amp; encrypted checkout
      </p>
    </div>
  );
}
