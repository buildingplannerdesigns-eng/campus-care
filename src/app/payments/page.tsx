import { PageIntro } from "@/components/PageIntro";
import { DonationForm } from "@/components/DonationForm";
import { MarathonJourneyChallenge } from "@/components/MarathonJourneyChallenge";
import { Shield, RefreshCcw, Globe2, FileText } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Donate Here | Support HBCU Student Wellness",
  description:
    "Your gift funds culturally grounded VR wellness sessions for HBCU students. Give once or monthly through secure Stripe checkout.",
  path: "/payments",
  twitterDescription:
    "Support culturally grounded mental wellness for HBCU students — one-time and monthly giving.",
  absoluteTitle: true,
  keywords: [
    "donate",
    "Stripe",
    "HBCU student wellness",
    "monthly giving",
    "VR wellness donation",
    "Every Woman's Marathon",
  ],
});

const trustItems = [
  {
    Icon: Shield,
    label: "Secure checkout via Stripe",
    description: "256-bit SSL encrypted transit",
  },
  {
    Icon: RefreshCcw,
    label: "One-time or monthly giving",
    description: "Choose your gift on Stripe checkout",
  },
  {
    Icon: Globe2,
    label: "International partners welcome",
    description: "Supports major cards and wallets",
  },
  {
    Icon: FileText,
    label: "Receipt emailed automatically",
    description: "An ACT Campus Care receipt is sent after payment",
  },
];

type PaymentsPageProps = {
  searchParams?: Promise<{ campaign?: string }>;
};

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const isMarathon = resolved?.campaign === "marathon";

  return (
    <>
      <PageIntro
        label={isMarathon ? "Donate Here" : "Become a Partner"}
        heading={isMarathon ? "Support the Journey" : "Support the VR Sanctuary"}
        body={
          isMarathon
            ? "Every Woman's Marathon 2027 — 26.2 Miles for Healing. Your gift helps build immersive VR wellness for college students. Give once or give monthly — every amount makes a real difference."
            : "Every contribution brings culturally grounded mental wellness to more HBCU students. Give once or give monthly — every amount makes a real difference."
        }
      />

      <section className="bg-sage px-6 py-20">
        <div className="mx-auto max-w-2xl">
          {isMarathon && (
            <div className="mb-14">
              <MarathonJourneyChallenge />
            </div>
          )}

          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-parchment/45">
            {isMarathon ? "Secure giving" : "Secure partnership"}
          </p>
          <h2 className="mt-3 text-center font-display text-3xl text-parchment md:text-4xl">
            {isMarathon ? "Donate Here" : "Become a Partner"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-parchment/60">
            {isMarathon
              ? "Choose a mile challenge above, then complete your gift securely with Stripe. Enter your chosen amount at checkout — you'll receive an emailed receipt."
              : "Complete your gift securely with Stripe. You'll receive an emailed receipt after checkout."}
          </p>

          <div className="mt-10 border border-[#e6e0d6] bg-white p-6 shadow-[0_18px_44px_rgba(12,63,132,0.08)] md:p-10">
            <DonationForm buttonLabel={isMarathon ? "Donate Here" : "Become a Partner"} />
          </div>

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
