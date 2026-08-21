import { Eyebrow } from "@/components/ui";
import { DonorboxEmbed } from "@/components/DonorboxEmbed";
import { Shield, RefreshCcw, Globe2, FileText } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Donate to Campus Care 2.0 | Support HBCU Student Wellness",
  description:
    "Your gift funds culturally grounded VR wellness sessions for HBCU students. Give once or monthly through secure checkout.",
  path: "/payments",
  twitterDescription:
    "Support culturally grounded mental wellness for HBCU students — one-time and monthly giving.",
  absoluteTitle: true,
  keywords: [
    "donate",
    "Donorbox",
    "HBCU student wellness",
    "monthly giving",
    "VR wellness donation",
  ],
});

const trustItems = [
  {
    Icon: Shield,
    label: "Secure checkout via Donorbox",
    description: "256-bit SSL encrypted transit",
  },
  {
    Icon: RefreshCcw,
    label: "One-time or monthly giving",
    description: "Toggle frequency anytime",
  },
  {
    Icon: Globe2,
    label: "International donors welcome",
    description: "Supports multi-currency gifts",
  },
  {
    Icon: FileText,
    label: "Donation receipt emailed automatically",
    description: "Instant tax-compliant receipt",
  },
];

export default function PaymentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-sanctuary-700/40 bg-sanctuary-900 px-6 pb-16 pt-28 text-center">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Donate</Eyebrow>
          <h1 className="mt-4 font-display text-4xl italic leading-tight text-parchment md:text-5xl lg:text-6xl">
            Support the VR Sanctuary
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-parchment/70 md:text-lg">
            Every contribution brings culturally grounded mental wellness to more HBCU students.
            Give once or give monthly — every amount makes a real difference.
          </p>
        </div>
      </section>

      {/* Donation form — centered, full focus */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-parchment/45">
            Secure giving
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-parchment md:text-4xl">
            Make your donation
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-parchment/60">
            Complete your gift securely below. Donorbox processes one-time and monthly donations
            with an emailed receipt.
          </p>

          <div className="mt-10">
            <DonorboxEmbed />
          </div>

          {/* Trust bar */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {trustItems.map((item) => {
              const { Icon } = item;
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-4 border border-gray-100 bg-white p-5"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#1a5a96]" strokeWidth={1.5} aria-hidden />
                  <div>
                    <h4 className="text-sm font-bold leading-snug text-parchment">{item.label}</h4>
                    <p className="mt-1 text-xs text-parchment/50">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
