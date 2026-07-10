import type { Metadata } from "next";
import { Section, PrimaryButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thank You",
};

export default function ThankYouPage() {
  return (
    <Section className="py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-ember">Donation received</p>
      <h1 className="mt-4 font-display text-4xl">Thank you for supporting Campus Care 2.0</h1>
      <p className="mx-auto mt-6 max-w-xl text-parchment/70">
        A receipt is on its way to your inbox. Your gift helps bring the Diaspora VR
        Sanctuary to more HBCU students.
      </p>
      <div className="mt-8 flex justify-center">
        <PrimaryButton href="/">Return home</PrimaryButton>
      </div>
    </Section>
  );
}
