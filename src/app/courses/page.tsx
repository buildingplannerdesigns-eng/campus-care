import { Section, SectionHeading, PrimaryButton, SecondaryButton, Eyebrow } from "@/components/ui";
import { OperationStep } from "@/components/OperationStep";
import { StatCard } from "@/components/StatCard";
import { operationSteps } from "@/data/operations";
import { mentalHealthStats } from "@/data/stats";
import { siteCopy } from "@/data/copy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Courses",
  description:
    "Campus Care 2.0 programs — a bio-responsive ecosystem and the evidence behind restorative campus wellness.",
  path: "/courses",
  keywords: ["professional courses", "campus wellness programs", "bio-responsive ecosystem"],
});

export default function CoursesPage() {
  return (
    <>
      <Section className="pt-20">
        <Eyebrow>Courses</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl md:text-5xl">
          Programs built for lasting change
        </h1>
        <p className="mt-6 max-w-2xl text-parchment/70">
          Explore Campus Care 2.0 programs and the evidence behind restorative campus wellness.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <PrimaryButton href="/campus-care">Explore Campus Care</PrimaryButton>
          <SecondaryButton href="/contact">Contact Us</SecondaryButton>
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
          Ready to bring these programs to your campus or community?
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <PrimaryButton href="/contact">Contact Us</PrimaryButton>
          <SecondaryButton href="/payments">Make a Payment</SecondaryButton>
        </div>
      </Section>
    </>
  );
}
