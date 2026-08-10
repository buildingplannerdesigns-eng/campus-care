import Image from "next/image";
import { EarlyRegistrationForm } from "@/components/EarlyRegistrationForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Courses — Coming Soon",
  description:
    "Campus Care Courses are coming soon. Register early interest for workshops, professional training, and campus wellness programs.",
  path: "/courses",
  keywords: [
    "courses coming soon",
    "early registration",
    "campus wellness programs",
    "ACT Healing courses",
  ],
});

export default function CoursesPage() {
  return (
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden">
      <Image
        src="/images/courses/hero-book.jpg"
        alt="Open book with warm light — Campus Care Courses coming soon"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(8, 28, 58, 0.88) 0%, rgba(12, 63, 132, 0.78) 48%, rgba(10, 36, 72, 0.55) 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-32">
        <div className="text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
            Campus Care Courses
          </p>
          <h1 className="mt-6 font-display text-[clamp(3.5rem,10vw,7rem)] italic leading-[0.9] text-white">
            Coming Soon
          </h1>
          <div className="mx-auto mt-6 h-px w-20 bg-white/40 lg:mx-0" aria-hidden />
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base lg:mx-0">
            Workshops, professional training, and campus programs are on the way. Leave your details
            and we&apos;ll notify you when registration opens.
          </p>
        </div>

        <div className="border border-white/25 bg-[#0a2f66]/55 p-6 backdrop-blur-md md:p-8">
          <h2 className="font-display text-2xl italic text-white md:text-3xl">
            Early registration
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Be first in line when Courses launch.
          </p>
          <div className="mt-7">
            <EarlyRegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
