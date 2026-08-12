import { DrCammieHero } from "@/components/DrCammieHero";
import { ContactForm } from "@/components/ContactForm";
import { HeroFeatureBar } from "@/components/dr-cammie/HeroFeatureBar";
import {
  StefClosingCta,
  StefFeatureSection,
  StefHiFriend,
  StefImagineSection,
  StefOffersSection,
  StefOverwhelmAndSteps,
  StefQuoteCarousel,
  StefStorySection,
} from "@/components/dr-cammie/StefSections";
import { drCammieCopy } from "@/data/drCammie";
import { pointOfContact } from "@/data/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ACT — Dr. Cammie Connor",
  description:
    "Dr. Cammie Connor — intergenerational trauma expert, speaker, workshop facilitator, and founder of ACT Healing & Campus Care 2.0.",
  path: "/act",
  keywords: [
    "Dr. Cammie Connor",
    "speaker",
    "workshops",
    "coaching",
    "intergenerational trauma expert",
  ],
});

export default function DrCammieConnorPage() {
  const copy = drCammieCopy;

  return (
    <>
      <DrCammieHero
        headline={copy.hero.headline}
        subhead={copy.hero.subhead}
        primaryCta={copy.hero.primaryCta}
        primaryCtaHref="#show-me-how"
        secondaryCta="Book Dr. Cammie"
        secondaryCtaHref="mailto:cconnor@actcampuscare.com"
        headshotSrc="/images/act/portrait-orange.jpg"
        headshotAlt="Dr. Connor"
      />

      <HeroFeatureBar items={copy.heroFeatures} />

      <StefHiFriend copy={copy.hiFriend} />

      <StefOverwhelmAndSteps
        overwhelm={copy.overwhelm}
        steps={copy.steps}
        showMe={copy.showMe}
        video={copy.homeVideo}
      />

      <StefFeatureSection feature={copy.feature} />

      <StefQuoteCarousel testimonies={copy.testimonies} />

      <StefStorySection story={copy.story} />

      <StefOffersSection offers={copy.offers} />

      <StefImagineSection imagine={copy.imagine} />

      <section className="border-t border-[#e8e4df] bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-parchment/45">
              Contact Dr. Cammie
            </p>
            <h2 className="mt-4 font-display text-4xl italic text-parchment md:text-5xl">
              Start the conversation directly with Dr. Cammie
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-parchment/70 md:text-base">
              Use the secure form to ask about speaking, workshops, coaching, therapy, or campus partnerships.
            </p>
            <div className="mt-8 space-y-3 text-sm text-parchment/75">
              <a
                href="mailto:cconnor@actcampuscare.com"
                className="flex items-center gap-3 rounded-none border border-[#e8e4df] bg-white px-4 py-3 transition hover:border-water hover:text-water"
              >
                <span className="font-semibold text-parchment">Email:</span>
                <span>cconnor@actcampuscare.com</span>
              </a>
              {pointOfContact.phone && (
                <a
                  href={`tel:${pointOfContact.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 rounded-none border border-[#e8e4df] bg-white px-4 py-3 transition hover:border-water hover:text-water"
                >
                  <span className="font-semibold text-parchment">Phone:</span>
                  <span>{pointOfContact.phone}</span>
                </a>
              )}
            </div>
          </div>

          <div className="border border-[#e8e4df] bg-white p-6 md:p-8">
            <ContactForm
              target="dr-cammie"
              submitLabel="Submit Form"
              successMessage="Thanks — your message has been sent to Dr. Cammie."
            />
          </div>
        </div>
      </section>

      <StefClosingCta closing={copy.closingCta} />
    </>
  );
}
