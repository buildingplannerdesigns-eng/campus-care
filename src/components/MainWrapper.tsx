"use client";

import { usePathname } from "next/navigation";
import { MotionPage } from "@/components/MotionProvider";
import { HERO_ROUTES } from "@/components/SiteHeader";

function isHeroPath(pathname: string | null) {
  if (!pathname) return false;
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return (HERO_ROUTES as readonly string[]).includes(path);
}

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHeroRoute = isHeroPath(pathname);

  return (
    <main className={isHeroRoute ? "" : "pt-28"}>
      <MotionPage>{children}</MotionPage>
    </main>
  );
}
