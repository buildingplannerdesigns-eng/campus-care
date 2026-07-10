import type { Metadata } from "next";
import { Section, SectionHeading, PrimaryButton, SecondaryButton, Eyebrow } from "@/components/ui";
import { ElementCard } from "@/components/ElementCard";
import { OperationStep } from "@/components/OperationStep";
import { StatCard } from "@/components/StatCard";
import { coreElements } from "@/data/elements";
import { operationSteps } from "@/data/operations";
import { mentalHealthStats } from "@/data/stats";
import { siteCopy } from "@/data/copy";

export const metadata: Metadata = {
  title: "Professional Courses — Campus Care 2.0",
  description:
    "Campus Care 2.0: The Diaspora VR Sanctuary — five core elements, a bio-responsive ecosystem, and the evidence behind it.",
};

export default function ProgramsPage() {
  return (
    <>
      <Section className="pt-20">
        <Eyebrow>{siteCopy.campusCare.kicker}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl md:text-5xl">
          {siteCopy.campusCare.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-parchment/70">{siteCopy.campusCare.body}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <PrimaryButton href="/contact">{siteCopy.campusCare.primaryCta}</PrimaryButton>
          <SecondaryButton href="/contact">{siteCopy.campusCare.secondaryCta}</SecondaryButton>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading heading={siteCopy.whyItExists.heading} />
        <div className="mt-6 max-w-3xl space-y-4 text-parchment/70">
          {siteCopy.whyItExists.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="The Sanctuary" heading={siteCopy.elementsIntro.heading} />
        <p className="mt-6 max-w-2xl text-parchment/70">{siteCopy.elementsIntro.body}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreElements.map((element) => (
            <ElementCard key={element.key} element={element} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="Closed-Loop Design" heading={siteCopy.ecosystemIntro.heading} />
        <p className="mt-6 max-w-2xl text-parchment/70">{siteCopy.ecosystemIntro.body}</p>
        <div className="mt-12 max-w-3xl">
          {operationSteps.map((step) => (
            <OperationStep key={step.order} step={step} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="The Evidence" heading="Why This, Why Now" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentalHealthStats.map((stat) => (
            <StatCard key={stat.stat + stat.source} item={stat} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60 text-center">
        <p className="mx-auto max-w-xl text-parchment/70">
          Bring Campus Care 2.0&apos;s Diaspora VR Sanctuary to your campus.
        </p>
        <div className="mt-6 flex justify-center">
          <PrimaryButton href="/contact">{siteCopy.campusCare.primaryCta}</PrimaryButton>
        </div>
      </Section>
    </>
  );
}
