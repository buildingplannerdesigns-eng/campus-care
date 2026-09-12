import { EarlyRegistrationForm } from "@/components/EarlyRegistrationForm";
import { PageIntro } from "@/components/PageIntro";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Courses — Coming Soon",
  description:
    "ACT Campus Care Courses are coming soon. Register early interest for workshops, professional training, and campus wellness programs.",
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
    <>
      <PageIntro
        label="Courses"
        heading="Coming soon"
        body="Workshops, professional training, and campus programs are on the way. Leave your details and we'll notify you when registration opens."
        aside={
          <div className="mb-12 border border-[#1a3c40]/20 bg-[#1a3c40] p-6 md:mb-16 md:p-8">
            <h2 className="font-hero text-2xl font-normal text-white md:text-3xl">
              Early registration
            </h2>
            <p className="mt-2 text-sm text-white/70">Be first in line when Courses launch.</p>
            <div className="mt-7">
              <EarlyRegistrationForm />
            </div>
          </div>
        }
      />
    </>
  );
}
