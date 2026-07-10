import { Section, PrimaryButton } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-ember">404</p>
      <h1 className="mt-4 font-display text-4xl">This part of the sanctuary is quiet</h1>
      <p className="mx-auto mt-6 max-w-md text-parchment/70">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex justify-center">
        <PrimaryButton href="/">Return home</PrimaryButton>
      </div>
    </Section>
  );
}
