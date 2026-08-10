import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "@/components/ui";
import { faqItems } from "@/data/faq";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ — Campus Care 2.0 & ACT Healing",
  description:
    "Answers about Campus Care 2.0, student access, the 5 Core Elements, donations, and working with ACT Healing and Dr. Connor.",
  path: "/faq",
  keywords: [
    "Campus Care FAQ",
    "HBCU wellness FAQ",
    "VR Sanctuary",
    "ACT Healing questions",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
  url: `${SITE_URL}/faq`,
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-sanctuary-700/40 bg-sanctuary-900 px-6 pb-16 pt-28 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-water">FAQ</p>
          <h1 className="mt-4 font-display text-4xl italic leading-tight text-parchment md:text-5xl lg:text-6xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-parchment/70 md:text-lg">
            Clear answers about Campus Care 2.0, student access, ACT Healing services, and how to
            get involved.
          </p>
        </div>
      </section>

      <section className="border-b border-sanctuary-700/40 bg-[#faf9f7] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-3">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              className="group border border-[#e4e0d8] bg-white open:shadow-[0_16px_36px_rgba(12,63,132,0.08)]"
              open={index === 0}
            >
              <summary className="cursor-pointer list-none px-5 py-5 marker:content-none md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl leading-snug text-parchment md:text-2xl">
                    {item.question}
                  </h2>
                  <span
                    className="mt-1 shrink-0 font-display text-2xl leading-none text-water transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </div>
              </summary>
              <div className="border-t border-[#eeeae4] px-5 pb-6 pt-4 md:px-7">
                <p className="text-sm leading-relaxed text-parchment/70 md:text-base">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-display text-2xl italic text-parchment md:text-3xl">
            Still have a question?
          </p>
          <p className="mt-3 text-sm text-parchment/65 md:text-base">
            Reach the ACT Healing team anytime at{" "}
            <Link href="mailto:info@actcampuscare.com" className="text-[#0e4f88] underline-offset-2 hover:underline">
              info@actcampuscare.com
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PrimaryButton href="/contact">Contact Us</PrimaryButton>
            <SecondaryButton href="/campus-care">Explore Campus Care</SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
