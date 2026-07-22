"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MainWrapper } from "@/components/MainWrapper";
import { PwaRegister } from "@/components/PwaRegister";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <MainWrapper>{children}</MainWrapper>
      <SiteFooter />
      <PwaRegister />
    </>
  );
}
