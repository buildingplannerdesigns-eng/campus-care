import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Campus Care 2.0 — ACT Healing",
    short_name: "Campus Care",
    description:
      "Culturally grounded wellness from ACT Healing — therapy, workshops, and Campus Care 2.0 for campuses and communities.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e4f88",
    orientation: "portrait-primary",
    categories: ["health", "education", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
