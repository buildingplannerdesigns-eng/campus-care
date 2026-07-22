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
import { PwaRegister } from "@/components/PwaRegister";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://campuscare2.org";

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

const seoKeywords = [
  "ACT Healing",
  "Campus Care 2.0",
  "Dr. Cammie Connor",
  "Dr. Connor",
  "intergenerational trauma",
  "HBCU mental health",
  "culturally grounded wellness",
  "VR wellness",
  "Diaspora VR Sanctuary",
  "therapy",
  "workshops",
  "campus wellness",
  "bio-responsive VR",
  "student mental health",
  "trauma-informed care",
  "Afrocentric healing",
  "Connect Care Belong",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Campus Care 2.0 — The Diaspora VR Sanctuary | ACT Healing",
    template: "%s | Campus Care 2.0",
  },
  description:
    "Campus Care 2.0 is a culturally-grounded, bio-responsive virtual reality platform helping HBCU students regulate stress and build resilience, from ACT Healing and Dr. Connor.",
  keywords: seoKeywords,
  applicationName: "Campus Care 2.0",
  authors: [{ name: "ACT Healing", url: siteUrl }],
  creator: "ACT Healing",
  publisher: "ACT Healing",
  category: "Health",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Campus Care 2.0",
    title: "Campus Care 2.0 — The Diaspora VR Sanctuary",
    description:
      "An immersive, bio-responsive VR platform built to regulate the nervous system and cultivate resilience for HBCU students.",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 1200,
        alt: "ACT Healing — Campus Care 2.0 logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Care 2.0 — The Diaspora VR Sanctuary",
    description:
      "Culturally grounded, bio-responsive VR wellness for HBCU students from ACT Healing.",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Campus Care",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0e4f88" },
    { media: "(prefers-color-scheme: dark)", color: "#0e4f88" },
  ],
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "ACT Healing",
      alternateName: "Campus Care 2.0",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.jpg`,
      email: "info@actcampuscare.com",
      description:
        "Agents of Change and Transformation — culturally grounded wellness, therapy, workshops, and Campus Care 2.0.",
      founder: {
        "@type": "Person",
        name: "Dr. Cammie Connor",
        jobTitle: "Intergenerational Trauma Expert & Founder",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      name: "Campus Care 2.0",
      url: siteUrl,
      description:
        "Culturally-grounded, bio-responsive virtual reality wellness for HBCU campuses and communities.",
      publisher: {
        "@type": "Organization",
        name: "ACT Healing",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <MainWrapper>{children}</MainWrapper>
        <SiteFooter />
        <PwaRegister />
      </body>
    </html>
  );
}
