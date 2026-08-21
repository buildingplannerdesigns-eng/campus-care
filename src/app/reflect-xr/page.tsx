import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { PrimaryButton, SecondaryButton, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Diaspora VR",
  description:
    "Diaspora VR is an immersive creativity and self-reflection platform for wellness, teletherapy, and clinical engagement.",
};

const evidenceStats = [
  {
    value: "23.1%",
    label: "Adults in the U.S. who deal with mental health issues",
  },
  {
    value: "$477B",
    label: "Estimated cost of mental healthcare today",
  },
  {
    value: "$14T",
    label: "Estimated cost of mental healthcare by 2040",
  },
  {
    value: "65%",
    label: "The size of the treatment gap for mental health",
  },
];

const platformPillars = [
  {
    title: "Immersive Arts for Wellness",
    body:
      "Self-guided modes that help users explore emotions, the self, and personal journeys with reduced stress and improved reflection.",
    bullets: [
      "Reduced feelings of stress, anxiety, and burnout",
      "Enhanced positive moods",
      "Space for self-reflection",
      "Empowerment and sense of agency",
    ],
  },
  {
    title: "Immersive Art Therapy",
    body:
      "Clinician-supported experiences that improve self-awareness, emotional processing, and digital access to care.",
    bullets: [
      "Optimized and personalized treatment",
      "Dynamic digital platform",
      "Seamless telehealth solution",
      "Real-time streaming via desktop app",
    ],
  },
];

const xrImages = [
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    alt: "Person using a virtual reality headset in a dark immersive space",
  },
  {
    src: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=1400&q=80",
    alt: "Developer working with immersive technology and XR visuals",
  },
  {
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1400&q=80",
    alt: "Creative digital experience representing virtual reality wellness",
  },
];

export default function ReflectXRPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-sanctuary-700/30 bg-[#07141f] text-white">
        <div className="absolute inset-0">
          <Image
            src={xrImages[0].src}
            alt={xrImages[0].alt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,31,0.5)_0%,rgba(7,20,31,0.72)_55%,rgba(7,20,31,0.84)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center md:min-h-[78vh] md:py-28 lg:min-h-[84vh]">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-ember/90">Diaspora VR</p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl leading-[1.05] md:text-6xl lg:text-[4.25rem]">
            Immersive healing through creativity, reflection, and connection.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            A virtual reality experience designed to support mental wellness for students, communities, and care teams.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton href="mailto:info@campuscare.com">Schedule a Demo</PrimaryButton>
            <SecondaryButton href="#beta">Join the Beta</SecondaryButton>
          </div>
        </div>
      </section>

      <Section className="border-t border-sanctuary-700/60 bg-sanctuary-900">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-sanctuary-700">
            <Image
              src={xrImages[1].src}
              alt={xrImages[1].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-sanctuary-700">
            <Image
              src={xrImages[2].src}
              alt={xrImages[2].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <SectionHeading
            eyebrow="Evidence"
            heading="Why creative expression matters for mental health"
            className="text-center [&>h2]:mx-auto"
          />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-parchment/70 md:text-lg">
            Research supports the role of honest self-expression in building confidence and reducing stress, anxiety, and burnout.
          </p>
          <a
            href="https://www.sciencedirect.com/science/article/abs/pii/S019745562100068X"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
          >
            Read the Study
            <span
              className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100 group-active:ml-2 group-active:w-4 group-active:opacity-100"
              aria-hidden
            >
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 group-active:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-sanctuary-700/40 sm:grid-cols-2 lg:grid-cols-4">
          {evidenceStats.map((stat) => (
            <article key={stat.value} className="bg-white p-6 md:p-8">
              <p className="font-display text-4xl text-water md:text-5xl">{stat.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-parchment/70">{stat.label}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60 bg-sanctuary-900">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="Creativity & Self Reflection" heading="Immersive arts for wellness" />
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
              Self-guided and clinician-supported options help users explore emotions, externalize stress, and create a stronger sense of agency.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-parchment/75">
              {platformPillars[0].bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 rounded-2xl border border-sanctuary-700 bg-white px-4 py-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-ember" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-sanctuary-700 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-parchment/45">Immersive art therapy</p>
            <h3 className="mt-3 font-display text-2xl">A seamless digital platform for wellness teams</h3>
            <p className="mt-4 text-sm leading-relaxed text-parchment/70">
              Clinicians and organizations can support self-awareness and emotional processing through a dynamic experience built for telehealth and digital care.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {platformPillars[1].bullets.map((bullet) => (
                <div key={bullet} className="rounded-2xl border border-sanctuary-700 bg-sanctuary-900 px-4 py-3 text-sm text-parchment/80">
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60 bg-sanctuary-900" id="beta">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Join the Beta" heading="Become a beta tester and experience Diaspora VR" />
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
              Diaspora VR is built for organizations and healthcare teams looking to expand creative wellness tools, increase self-expression, and transform the experience of care.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href="mailto:info@campuscare.com">Apply</PrimaryButton>
              <SecondaryButton href="/contact">Contact the Team</SecondaryButton>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-sanctuary-700 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-parchment/45">Browse the brochure</p>
            <h3 className="mt-3 font-display text-2xl">Contact the team</h3>
            <p className="mt-2 text-sm leading-relaxed text-parchment/70">
              Reach out for the brochure, a demo, or a conversation about implementing Diaspora VR in your organization.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading eyebrow="Platform Summary" heading="Diaspora VR is a versatile platform designed to accommodate personal and professional needs" />
          <p className="mt-5 text-base leading-relaxed text-parchment/70 md:text-lg">
            From self-guided creative journeys to clinician-supported sessions, Diaspora VR offers a scalable approach to wellness, self-reflection, and digital health.
          </p>
        </div>
      </Section>

      <section className="border-t border-sanctuary-700/60 bg-[#07141f] py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1c2b] shadow-xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <div className="relative min-h-[240px] lg:min-h-full">
                <Image
                  src={xrImages[0].src}
                  alt="Immersive Diaspora VR experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07141f]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0b1c2b]/90" />
              </div>

              <div className="flex flex-col justify-center px-6 py-10 text-center lg:px-10 lg:py-12 lg:text-left">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-ember/90">Additional links</p>
                <h2 className="mt-4 font-display text-3xl md:text-4xl">Ready to explore Diaspora VR?</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                  Discover a new approach to creativity, connection, and self-expression.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                  <PrimaryButton href="mailto:info@campuscare.com">Schedule a Demo</PrimaryButton>
                  <SecondaryButton href="/contact">Contact Us</SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}