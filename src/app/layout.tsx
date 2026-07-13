import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Montserrat,
  IBM_Plex_Mono,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MainWrapper } from "@/components/MainWrapper";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodySans = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const scriptHand = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://campuscare2.org"),
  title: {
    default: "Campus Care 2.0 — The Diaspora VR Sanctuary | ACT Healing",
    template: "%s | Campus Care 2.0",
  },
  description:
    "Campus Care 2.0 is a culturally-grounded, bio-responsive virtual reality platform helping HBCU students regulate stress and build resilience, from ACT Healing.",
  openGraph: {
    title: "Campus Care 2.0 — The Diaspora VR Sanctuary",
    description:
      "An immersive, bio-responsive VR platform built to regulate the nervous system and cultivate resilience for HBCU students.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${displaySerif.variable} ${bodySans.variable} ${plexMono.variable} ${scriptHand.variable}`}
    >
      <body className="font-body bg-sanctuary-950 text-parchment antialiased">
        <SiteHeader />
        <MainWrapper>{children}</MainWrapper>
        <SiteFooter />
      </body>
    </html>
  );
}
