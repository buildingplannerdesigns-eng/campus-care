import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { BrandLogo } from "@/components/BrandLogo";
import { ElementCard } from "@/components/ElementCard";
import { DesktopVideoMockup } from "@/components/dr-cammie/DesktopVideoMockup";
import { PrimaryButton, Section, SectionHeading } from "@/components/ui";
import { siteCopy } from "@/data/copy";
import { pointOfContact } from "@/data/team";
import { getCoreElements } from "@/lib/content/elements";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Campus Care",
  description:
    "Campus Care is an immersive VR Sanctuary for wellness, creativity, and clinical engagement — culturally grounded care for students and communities.",
  path: "/campus-care",
  keywords: ["VR Sanctuary", "VR therapy", "HBCU wellness", "teletherapy", "5 core elements"],
});

const evidenceStats = [
  {
    value: "54%",
    label:
      "of Black HBCU students said they had unmet mental health needs, compared to 41% of students nationally — better culture, worse infrastructure.",
    source: "Healthy Minds Network / UNCF / Steve Fund · Journal of Blacks in Higher Education",
    href: "https://jbhe.com/2025/03/black-students-at-hbcus-have-better-mental-health-than-peers-at-other-institutions/",
  },
  {
    value: "78%",
    label:
      "of HBCU students facing financial insecurity reported mental health problems, compared to just 26% of financially secure peers.",
    source: "Healthy Minds Network / UNCF / Steve Fund · Journal of Blacks in Higher Education",
    href: "https://uncficb.org/wp-content/uploads/2025/03/healthymindstudycommunitycultureandcare.pdf",
  },
  {
    value: "25% · 39%",
    label:
      "On a single HBCU campus, 25% were unaware of available mental health resources, while 39% faced time constraints that prevented them from seeking help — supporting always-available, on-device care.",
    source: "PMC10775398 · Assessing Underutilization of Mental Health Resources at an HBCU",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10775398/",
  },
  {
    value: "Race stress",
    label:
      "A study of 206 Black women at a southern HBCU found a positive relationship between anticipatory race-related stress and general worry — grounding Campus Care’s focus on racialized stress.",
    source: "PMC12572699 · peer-reviewed clinical psychology research",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12572699/",
  },
  {
    value: "g = 0.79",
    label:
      "A meta-analysis of 39 trials found VR-based therapies more effective than control for anxiety (g = 0.79) and depression (g = 0.73) — strong evidence the core technology works.",
    source: "Scientific Reports (Nature) · peer-reviewed meta-analysis",
    href: "https://www.nature.com/articles/s41598-018-28113-6",
  },
];

const xrImages = [
  {
    src: "/images/campus-care/campus-care-hero.png",
    alt: "Campus Care immersive VR Sanctuary experience",
  },
  {
    src: "/images/campus-care/student.jpeg",
    alt: "Student engaging with Campus Care wellness technology",
  },
  {
    src: "/images/campus-care/vr.jpeg",
    alt: "Immersive Campus Care virtual reality session",
  },
];

/** Drop at public/videos/campus-care.mp4, or override with NEXT_PUBLIC_CAMPUS_CARE_VIDEO_URL. */
const DRUMMING_VIDEO_SRC =
  process.env.NEXT_PUBLIC_CAMPUS_CARE_VIDEO_URL?.trim() || "/videos/campus-care.mp4";
const DRUMMING_POSTER = "/images/campus-care/fire-circle-drumming.jpg";

export default async function CampusCarePage() {
  const coreElements = await getCoreElements();

  return (
    <>
      <section className="border-b border-sanctuary-700/30 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16 text-center md:py-24">
          <BrandLogo size="lg" priority alt="Campus Care logo" />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-[#0c3f84]">
            Campus Care
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl leading-[1.05] text-[#113f6c] md:text-6xl lg:text-[4.25rem]">
            The only immersive healing experience grounded in community and ancestral reflection.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#355879] md:text-base">
            Campus Care offers a virtual reality experience aimed at promoting the mental well-being of
            HBCU students by tackling stress, anxiety, and depression (SAD) to help them succeed.
          </p>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-sanctuary-700/30">
        <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] md:h-[340px] lg:h-[460px] xl:h-[520px]">
          <Image
            src={xrImages[0].src}
            alt={xrImages[0].alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      <Section className="border-t border-sanctuary-700/60 bg-sanctuary-900">
        <div className="mx-auto max-w-5xl space-y-10 md:space-y-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-sanctuary-700 md:aspect-[21/9]">
            <Image
              src={xrImages[1].src}
              alt="HBCU graduates celebrating together in caps and gowns"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <p className="mx-auto max-w-3xl text-center font-display text-2xl italic leading-snug text-parchment md:text-3xl lg:text-[2.15rem]">
            Experience our vibrant Afrocentric space crafted to help you relax, heal, and thrive during
            college.
          </p>

          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-sanctuary-700 md:aspect-[21/9]">
            <Image
              src={xrImages[2].src}
              alt={xrImages[2].alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="flex justify-center">
            <PrimaryButton href="/contact">Request a Demo</PrimaryButton>
          </div>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="In the Sanctuary"
            heading="Campus Care drumming in an immersive environment"
            className="text-center [&>h2]:mx-auto"
          />
          <p className="mt-5 text-sm leading-relaxed text-parchment/70 md:text-base">
            Experience the rhythm, community, and restorative presence at the heart of the VR Sanctuary.
          </p>
        </div>
        <div className="mt-10">
          <DesktopVideoMockup
            title="Campus Care — Drumming in the VR Sanctuary"
            videoSrc={DRUMMING_VIDEO_SRC}
            poster={DRUMMING_POSTER}
            urlBar="actcampuscare.com/campus-care"
          />
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <SectionHeading
            eyebrow="Evidence"
            heading="Why Campus Care 2.0 matters for HBCU student wellness"
            className="text-center [&>h2]:mx-auto"
          />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-parchment/70 md:text-lg">
            Peer-reviewed research shows HBCU students often have stronger campus culture — and still
            face unmet need, financial stress, access barriers, and race-related worry. VR-based care
            has measured effects on anxiety and depression.
          </p>
          <h3 className="mt-10 font-display text-2xl italic text-parchment md:text-3xl">
            Read the Study
          </h3>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {evidenceStats.map((stat) => (
            <article
              key={stat.value}
              className="flex flex-col border border-sanctuary-700/50 bg-white p-6 md:p-8"
            >
              <p className="font-display text-3xl text-water md:text-4xl">{stat.value}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment/75">{stat.label}</p>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-parchment/45">
                {stat.source}
              </p>
              <a
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center justify-center self-start rounded-none border border-[#0e4f88] bg-[#0e4f88] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
              >
                Read the Study
                <span
                  className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
                  aria-hidden
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60 bg-sanctuary-900">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Campus Care & Self Reflection"
            heading="Immersive environment that heals you completely."
            className="text-center [&>h2]:mx-auto"
          />
          <p className="mt-5 text-sm leading-relaxed text-parchment/70 md:text-base">
            Self-guided VR that combines the human touch option to help you explore your emotions, and
            encourage you to create a stronger sense of belonging.
          </p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-water">
            People who participated in this exercise reported
          </p>

          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[1.5rem] border border-sanctuary-700 bg-white">
            <Image
              src="/images/campus-care/word-cloud.png"
              alt="Community, hope, excitement, fulfilled, joy, and sense of success — words participants associate with Campus Care"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            eyebrow="The Sanctuary"
            heading={siteCopy.elementsIntro.heading}
            className="text-center [&>h2]:mx-auto"
          />
          <p className="mt-6 text-base leading-relaxed text-parchment/70 md:text-lg">
            {siteCopy.elementsIntro.body}
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreElements.map((element) => (
            <ElementCard key={element.key} element={element} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <PrimaryButton href="/courses">Courses — Coming Soon</PrimaryButton>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60" id="contact">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Get in Touch"
            heading="Connect with the Campus Care team"
            className="text-center [&>h2]:mx-auto"
          />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
            Campus Care is designed to meet you where you are. If you are looking to stay ahead and
            take charge of your mental health, our virtual exercises and tools are what you need.
          </p>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />

          <div className="mx-auto mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-water">
                Direct
              </p>
              <a
                href="mailto:cconnor@actcampuscare.com"
                className="mt-2 inline-flex items-center gap-2 font-display text-lg italic text-[#0e4f88] transition hover:text-ember md:text-xl"
              >
                cconnor@actcampuscare.com
              </a>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-water">
                General
              </p>
              <a
                href="mailto:info@actcampuscare.com"
                className="mt-2 inline-flex items-center gap-2 font-display text-lg italic text-[#0e4f88] transition hover:text-ember md:text-xl"
              >
                info@actcampuscare.com
              </a>
            </div>
            {pointOfContact.phone && (
              <div className="sm:col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-water">
                  Phone
                </p>
                <a
                  href={`tel:${pointOfContact.phone.replace(/[^\d+]/g, "")}`}
                  className="mt-2 inline-flex items-center gap-2 font-display text-lg italic text-[#0e4f88] transition hover:text-ember md:text-xl"
                >
                  {pointOfContact.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-water">
              Send a message
            </p>
            <h3 className="mt-3 font-display text-3xl italic text-parchment md:text-4xl">
              Tell us how we can help
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-parchment/70 md:text-base">
              Complete the form below. Before we send anything, you&apos;ll get a chance to review your
              details.
            </p>
          </div>
          <div className="mt-10 border border-[#e2ded4] bg-white p-6 shadow-[0_18px_44px_rgba(12,63,132,0.08)] md:p-12">
            <ContactForm
              target="dr-cammie"
              size="lg"
              requireConfirmation
              submitLabel="Submit Form"
              successMessage="Thank you — the Campus Care team will be in touch soon."
            />
          </div>
        </div>
      </Section>

    </>
  );
}
