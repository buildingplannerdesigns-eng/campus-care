"use client";

import { usePathname } from "next/navigation";
import { HERO_ROUTES, SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MainWrapper } from "@/components/MainWrapper";
import { PwaRegister } from "@/components/PwaRegister";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const headerInHero = (HERO_ROUTES as readonly string[]).includes(pathname ?? "");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Home + ACT render SiteHeader inside their hero sections */}
      {!headerInHero && <SiteHeader />}
      <MainWrapper>{children}</MainWrapper>
      <SiteFooter />
      <PwaRegister />
    </>
  );
}
