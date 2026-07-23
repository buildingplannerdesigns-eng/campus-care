"use client";

import dynamic from "next/dynamic";

// Sanity Studio is a browser-only app. Load it client-side only so it is never
// evaluated during server rendering / "collect page data" (which breaks on
// React.createContext and other client-only APIs).
const Studio = dynamic(() => import("./Studio"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        height: "100dvh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        color: "#0c3f84",
      }}
    >
      Loading Studio…
    </div>
  ),
});

export default function StudioPage() {
  return <Studio />;
}
