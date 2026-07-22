import { Section, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { getEditableSiteCopy } from "@/lib/content/siteCopy";
import { getPointOfContact } from "@/lib/content/team";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Stay in touch with Dr. Connor and Campus Care 2.0 — therapy, speaking, workshops, and campus partnerships.",
  path: "/contact",
  keywords: ["contact ACT Healing", "book consultation", "campus demo"],
});

export default async function ContactPage() {
  const [copy, pointOfContact] = await Promise.all([
    getEditableSiteCopy(),
    getPointOfContact(),
  ]);

  return (
    <Section className="grid gap-12 pt-20 md:grid-cols-2">
      <div>
        <SectionHeading eyebrow="Contact Us" heading={copy.contact.heading} />
        <p className="mt-6 max-w-md text-parchment/70">{copy.contact.body}</p>

        <div className="mt-10 rounded-sanctuary border border-sanctuary-700 bg-sanctuary-900 p-6">
          <p className="font-display text-lg">{pointOfContact.name}</p>
          <ul className="mt-4 space-y-2 text-sm text-parchment/70">
            {pointOfContact.email && (
              <li>
                <a href={`mailto:${pointOfContact.email}`} className="hover:text-ember">
                  {pointOfContact.email}
                </a>
              </li>
            )}
            {pointOfContact.supportEmail && (
              <li>
                <a href={`mailto:${pointOfContact.supportEmail}`} className="hover:text-ember">
                  {pointOfContact.supportEmail}
                </a>
              </li>
            )}
            {pointOfContact.phone && <li>{pointOfContact.phone}</li>}
            {pointOfContact.location && <li>{pointOfContact.location}</li>}
            {pointOfContact.availableForTravel && (
              <li className="text-parchment/50">Available for travel</li>
            )}
          </ul>
        </div>
      </div>

      <div className="rounded-sanctuary border border-sanctuary-700 bg-sanctuary-900 p-8">
        <ContactForm
          target="general"
          submitLabel="Submit"
          successMessage="Thanks — your message has been sent to Campus Care 2.0."
        />
      </div>
    </Section>
  );
}
