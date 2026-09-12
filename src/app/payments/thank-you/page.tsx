import { Section, PrimaryButton } from "@/components/ui";
import { fulfillPaidCheckoutSession } from "@/lib/stripe";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thank You for Your Gift",
  description:
    "Your donation to ACT Campus Care was received. A receipt is on its way to your inbox.",
  path: "/payments/thank-you",
  keywords: ["donation thank you", "Stripe receipt"],
});

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (sessionId) {
    try {
      await fulfillPaidCheckoutSession(sessionId);
    } catch (error) {
      console.error("Thank-you donation receipt failed:", error);
    }
  }

  return (
    <Section className="py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-ember">Donation received</p>
      <h1 className="mt-4 font-display text-4xl">Thank you for supporting ACT Campus Care</h1>
      <p className="mx-auto mt-6 max-w-xl text-parchment/70">
        A receipt is on its way to your inbox from ACT Campus Care. Your gift helps bring the VR Sanctuary
        to more HBCU students.
      </p>
      <div className="mt-8 flex justify-center">
        <PrimaryButton href="/">Return home</PrimaryButton>
      </div>
    </Section>
  );
}
