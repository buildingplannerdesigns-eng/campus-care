"use client";

import { usePathname } from "next/navigation";
import { MotionPage } from "@/components/MotionProvider";

const HERO_ROUTES = ["/dr-cammie-connor"];

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHeroRoute = HERO_ROUTES.includes(pathname);

  return (
    <main className={isHeroRoute ? "" : "pt-28"}>
      <MotionPage>{children}</MotionPage>
    </main>
  );
}
