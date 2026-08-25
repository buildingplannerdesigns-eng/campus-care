"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SiteCta } from "@/components/SiteCta";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`mx-auto max-w-6xl px-6 py-20 ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  heading,
  className = "",
}: {
  eyebrow?: string;
  heading: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl md:text-4xl">
        {heading}
      </h2>
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return <SiteCta href={href}>{children}</SiteCta>;
}

export function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <SiteCta href={href} variant="outline">
      {children}
    </SiteCta>
  );
}
