"use client";

import Image from "next/image";
import { DonateButton } from "@/components/DonateButton";
import { STRIPE_PAYMENT_LINK } from "@/lib/stripe";

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
  return (
    <div className="space-y-7">
      <DonateButton href={STRIPE_PAYMENT_LINK} className="w-full px-6 py-4 sm:px-6 sm:py-4">
        Donate to Support
      </DonateButton>

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
          href="https://stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#1a5a96] hover:underline"
        >
          Stripe
        </a>{" "}
        · Secure &amp; encrypted checkout
      </p>
    </div>
  );
}
