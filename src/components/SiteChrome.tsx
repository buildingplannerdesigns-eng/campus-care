"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MainWrapper } from "@/components/MainWrapper";
import { PwaRegister } from "@/components/PwaRegister";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <MainWrapper>{children}</MainWrapper>
      <SiteFooter />
      <PwaRegister />
    </>
  );
}
