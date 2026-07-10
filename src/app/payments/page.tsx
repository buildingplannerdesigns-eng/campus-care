import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";
import { DonationForm } from "@/components/DonationForm";
import { ShieldCheck, RefreshCw, Globe, Receipt } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate — Campus Care 2.0",
  description:
    "Support Campus Care 2.0 through Donorbox with secure one-time or recurring giving.",
};

const impactTiers = [
  {
    amount: "$25",
    label: "Seed",
    impact: "Supports one guided wellness touchpoint for a student.",
  },
  {
    amount: "$50",
    label: "Grow",
    impact: "Funds restorative VR content sessions in the Sanctuary.",
  },
  {
    amount: "$100",
    label: "Sustain",
    impact: "Expands trauma-informed support for students and campus teams.",
  },
  {
    amount: "$250+",
    label: "Transform",
    impact: "Accelerates Diaspora VR Sanctuary deployment to HBCU campuses.",
  },
];

const trustItems = [
  {
    Icon: ShieldCheck,
    label: "Secure checkout via Donorbox",
    description: "256-bit SSL encrypted transit",
  },
  {
    Icon: RefreshCw,
    label: "One-time or monthly giving",
    description: "Toggle frequency anytime",
  },
  {
    Icon: Globe,
    label: "International donors welcome",
    description: "Supports multi-currency gifts",
  },
  {
    Icon: Receipt,
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
            Support the Diaspora VR Sanctuary
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-parchment/70 md:text-lg">
            Every contribution brings culturally grounded mental wellness to more HBCU students.
            Give once or give monthly — every amount makes a real difference.
          </p>
        </div>
      </section>

      {/* Impact tiers */}
      <section className="border-b border-sanctuary-700/40 bg-sanctuary-900 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-parchment/45">
            Your impact
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactTiers.map((tier) => (
              <article
                key={tier.amount}
                className="flex flex-col rounded-2xl border border-sanctuary-700 bg-white/5 p-6 text-center transition hover:border-ember/50 hover:bg-white/10"
              >
                <span className="font-display text-4xl font-light text-ember">{tier.amount}</span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-parchment/45">{tier.label}</span>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment/65">{tier.impact}</p>
              </article>
            ))}
          </div>
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
            Choose an amount and click Donate Now — you&apos;ll be taken to Donorbox&apos;s
            secure checkout to complete your gift.
          </p>

          <div className="mt-10 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_24px_60px_rgba(11,31,52,0.08)] md:p-8">
            <DonationForm />
          </div>

          {/* Trust bar */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {trustItems.map((item) => {
              const { Icon } = item;
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_12px_28px_rgba(11,31,52,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(11,31,52,0.08)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1a5a96]/10 text-[#1a5a96]">
                    <Icon className="h-6 w-6" />
                  </div>
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
