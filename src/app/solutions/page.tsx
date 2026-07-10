import type { Metadata } from "next";
import { Section, SectionHeading, PrimaryButton } from "@/components/ui";
import { AudienceOutcomeCard } from "@/components/AudienceOutcomeCard";
import { audienceOutcomes } from "@/data/audiences";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "ACT Healing solutions for therapy and for institutional interventions — grounded in cultural understanding and evidence-based practice.",
};

export default function SolutionsPage() {
  return (
    <>
      <Section className="pt-20">
        <SectionHeading eyebrow="Solutions" heading="Two Ways We Work With You" />
        <p className="mt-6 max-w-2xl text-parchment/70">
          Through compassion, cultural understanding, and evidence-based practices, we help
          transform pain into purpose and challenges into opportunities for growth.
        </p>
      </Section>

      <Section id="therapy" className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="For Therapy" heading="Individual, Couples & Family Sessions" />
        <p className="mt-6 max-w-2xl text-parchment/70">
          One-on-one and relational work led by Dr. Cammie, drawing on intergenerational
          trauma expertise to help clients discover strengths, foster intimacy, and build
          supportive environments for growth.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {audienceOutcomes.slice(0, 2).map((item) => (
            <AudienceOutcomeCard key={item.audience} item={item} />
          ))}
        </div>
        <div className="mt-8">
          <PrimaryButton href="/contact">Book a consultation</PrimaryButton>
        </div>
      </Section>

      <Section id="interventions" className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="For Interventions" heading="Campus & Community Programs" />
        <p className="mt-6 max-w-2xl text-parchment/70">
          Campus Care 2.0 is our flagship institutional intervention: a culturally grounded,
          bio-responsive VR platform built for HBCU campuses to encourage cultural pride,
          resilience, and social justice at scale.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {audienceOutcomes.slice(2).map((item) => (
            <AudienceOutcomeCard key={item.audience} item={item} />
          ))}
        </div>
        <div className="mt-8">
          <PrimaryButton href="/programs">Explore Campus Care 2.0</PrimaryButton>
        </div>
      </Section>
    </>
  );
}
