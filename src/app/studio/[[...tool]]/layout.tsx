import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Campus Care CMS",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e4f88",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] h-[100dvh] w-screen overflow-hidden bg-white">
      {children}
    </div>
  );
}
