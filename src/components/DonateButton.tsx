import type { ReactNode } from "react";
import { SiteCta, type SiteCtaVariant } from "@/components/SiteCta";
import { STRIPE_PAYMENT_LINK } from "@/lib/stripe";

const variantMap: Record<"dark" | "outline" | "light", SiteCtaVariant> = {
  dark: "peach",
  light: "peach",
  outline: "ghost",
};

export function DonateButton({
  children = "Donate to Support",
  href = STRIPE_PAYMENT_LINK,
  variant = "dark",
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  variant?: "dark" | "outline" | "light";
  className?: string;
}) {
  return (
    <SiteCta href={href} variant={variantMap[variant]} className={className}>
      {children}
    </SiteCta>
  );
}
