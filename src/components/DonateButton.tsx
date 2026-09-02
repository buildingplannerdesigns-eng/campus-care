import type { ReactNode } from "react";
import { SiteCta, type SiteCtaVariant } from "@/components/SiteCta";

const variantMap: Record<"dark" | "outline" | "light", SiteCtaVariant> = {
  dark: "peach",
  light: "peach",
  outline: "ghost",
};

export function DonateButton({
  children = "Donate to Support",
  href = "/payments",
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
