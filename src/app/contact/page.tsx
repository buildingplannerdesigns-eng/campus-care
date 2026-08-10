import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { getPointOfContact } from "@/lib/content/team";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Reach Dr. Cammie Connor for therapy, speaking, workshops, coaching, and Campus Care partnerships.",
  path: "/contact",
  keywords: ["contact Dr. Cammie Connor", "book consultation", "ACT Healing"],
});

const contactChannels = [
  {
    label: "Direct",
    email: "cconner@actcampuscare.com",
    description: "Therapy, coaching, speaking, workshops, and partnership conversations.",
  },
  {
    label: "General enquiries",
    email: "info@actcampuscare.com",
    description: "Media, campus partnerships, donations, and everything else.",
  },
];

export default async function ContactPage() {
  const pointOfContact = await getPointOfContact();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#e6e0d6] bg-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#0e4f88]" />
          <div className="absolute -right-24 bottom-8 h-56 w-56 rounded-full bg-[#0e4f88]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-16 text-center md:pt-32 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0e4f88]/80">
            Contact
          </p>
          <h1 className="mt-5 font-display text-4xl italic leading-[1.05] text-parchment md:text-6xl">
            Let&apos;s start the conversation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
            Whether you&apos;re seeking therapy, planning a workshop, booking a speaker, or bringing
            Campus Care to your campus — share a few details and Dr. Cammie Connor&apos;s team will be in
            touch personally.
          </p>
        </div>
      </section>

      {/* Contact details — above the form */}
      <section className="border-b border-[#e6e0d6] bg-[#faf9f7] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-[220px_1fr] md:gap-14">
            <div className="mx-auto md:mx-0">
              <div className="relative h-40 w-40 overflow-hidden rounded-full ring-1 ring-[#d7dfda] md:h-52 md:w-52">
                <Image
                  src="/images/team/dr.cammie.jpg"
                  alt={pointOfContact.name}
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-water">
                Who you&apos;ll reach
              </p>
              <p className="mt-3 font-display text-3xl italic text-parchment md:text-4xl">
                {pointOfContact.name}
              </p>
              <p className="mt-2 text-sm text-parchment/60 md:text-base">{pointOfContact.role}</p>

              <div className="mx-auto mt-6 h-px w-14 bg-[#0e4f88]/35 md:mx-0" aria-hidden />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {contactChannels.map((channel) => (
                  <div key={channel.email} className="text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-water">
                      {channel.label}
                    </p>
                    <a
                      href={`mailto:${channel.email}`}
                      className="mt-2 inline-flex items-center gap-2 font-display text-lg italic text-[#0e4f88] transition hover:text-[#0a3a66] md:text-xl"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {channel.email}
                    </a>
                    <p className="mt-2 text-sm leading-relaxed text-parchment/70">
                      {channel.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Large professional form */}
      <section className="border-b border-[#e6e0d6] bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-water">
              Send a message
            </p>
            <h2 className="mt-3 font-display text-3xl italic text-parchment md:text-5xl">
              Tell us how we can help
            </h2>
            <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-parchment/70 md:text-base">
              Complete the form below. Before we send anything, you&apos;ll get a chance to review your
              details.
            </p>
          </div>

          <div className="mt-12 border border-[#e2ded4] bg-white p-6 shadow-[0_18px_44px_rgba(12,63,132,0.08)] md:p-12">
            <ContactForm
              target="dr-cammie"
              size="lg"
              requireConfirmation
              submitLabel="Submit Form"
              successMessage="Thank you — Dr. Cammie Connor will be in touch soon."
            />
          </div>
        </div>
      </section>
    </>
  );
}
