import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Site Content",
  robots: { index: false, follow: false },
};

/**
 * Embedded Sanity Studio is not bundled into the Next.js production build
 * (Sanity v5 requires React APIs incompatible with this Next 15 build).
 * Editors use the Sanity CLI / hosted Studio instead.
 */
export default function StudioEntryPage() {
  const hostedStudio = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0e4f88]">Campus Care CMS</p>
      <h1 className="mt-4 font-display text-4xl italic text-parchment md:text-5xl">Edit site content</h1>
      <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-parchment/70 md:text-base">
        Blog posts, team profiles, homepage copy, and course elements are managed in Sanity.
        Use the hosted Studio or run it locally with the project CLI.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {hostedStudio ? (
          <a
            href={hostedStudio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-[#0e4f88] bg-[#0e4f88] px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#0e4f88]"
          >
            Open Sanity Studio
          </a>
        ) : (
          <a
            href={
              projectId
                ? `https://www.sanity.io/manage/project/${projectId}`
                : "https://www.sanity.io/manage"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-[#0e4f88] bg-[#0e4f88] px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#0e4f88]"
          >
            Open Sanity Manage
          </a>
        )}
        <Link
          href="/"
          className="inline-flex border border-[#0e4f88] bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#0e4f88] transition hover:bg-[#0e4f88] hover:text-white"
        >
          Back to site
        </Link>
      </div>

      <div className="mx-auto mt-12 max-w-lg border border-[#eeeae4] bg-[#faf9f7] p-6 text-left text-sm text-parchment/75">
        <p className="font-semibold text-parchment">Local Studio</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            Set <code className="text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> in{" "}
            <code className="text-xs">.env.local</code>
          </li>
          <li>
            Run <code className="text-xs">npm run sanity</code>
          </li>
          <li>Edit and publish Blog, Team, Site Settings, and Core Elements</li>
        </ol>
        <p className="mt-4 text-xs text-parchment/60">
          Optional: set <code>NEXT_PUBLIC_SANITY_STUDIO_URL</code> after{" "}
          <code>npm run sanity:deploy</code> to deep-link the hosted Studio.
        </p>
      </div>
    </section>
  );
}
