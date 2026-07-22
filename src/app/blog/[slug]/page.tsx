import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getBlogPostBySlug, getBlogPosts, getBlogSlugs } from "@/lib/blog";
import type { BlogPortableBlock } from "@/data/blogFallback";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

type SharePlatform = "facebook" | "x" | "linkedin" | "whatsapp" | "telegram" | "pinterest" | "email";

function getShareHoverClass(platform: SharePlatform): string {
  if (platform === "facebook") return "hover:text-[#1877F2] hover:border-[#1877F2]";
  if (platform === "x") return "hover:text-black hover:border-black";
  if (platform === "linkedin") return "hover:text-[#0A66C2] hover:border-[#0A66C2]";
  if (platform === "whatsapp") return "hover:text-[#25D366] hover:border-[#25D366]";
  if (platform === "telegram") return "hover:text-[#229ED9] hover:border-[#229ED9]";
  if (platform === "pinterest") return "hover:text-[#E60023] hover:border-[#E60023]";
  return "hover:text-[#EA4335] hover:border-[#EA4335]";
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://campuscare2.org";

function ShareIcon({ platform, className = "h-3.5 w-3.5" }: { platform: SharePlatform; className?: string }) {
  if (platform === "facebook") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 22v-8h2.8l.4-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6h1.7V4.8c-.8-.1-1.6-.2-2.4-.2-2.4 0-4 1.4-4 4.1V11H8v3h2.5v8h3Z" />
      </svg>
    );
  }
  if (platform === "linkedin") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z" />
      </svg>
    );
  }
  if (platform === "x") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.17 17.52h1.83L7.08 4.13H5.12Z" />
      </svg>
    );
  }
  if (platform === "whatsapp") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0C5.6 0 .31 5.29.31 11.8c0 2.08.54 4.1 1.57 5.88L0 24l6.5-1.84a11.74 11.74 0 0 0 5.6 1.43h.01c6.5 0 11.8-5.29 11.8-11.8a11.72 11.72 0 0 0-3.39-8.31Zm-8.42 18.1h-.01a9.8 9.8 0 0 1-5-1.38l-.36-.21-3.86 1.1 1.03-3.76-.24-.38a9.77 9.77 0 0 1-1.5-5.16c0-5.4 4.4-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.88a9.73 9.73 0 0 1 2.87 6.93c0 5.4-4.4 9.8-9.8 9.8Zm5.37-7.35c-.29-.14-1.7-.84-1.97-.93-.26-.1-.45-.14-.64.14-.19.28-.73.93-.89 1.12-.16.19-.32.22-.6.07-.29-.14-1.2-.44-2.29-1.39-.84-.75-1.42-1.67-1.58-1.95-.16-.28-.02-.43.12-.57.13-.13.29-.32.43-.48.15-.16.2-.28.29-.47.1-.2.05-.37-.02-.52-.07-.14-.64-1.54-.88-2.1-.24-.57-.48-.5-.64-.5-.16 0-.35-.02-.54-.02-.19 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.87 1.22 3.07c.14.2 2.08 3.18 5.03 4.46.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33Z" />
      </svg>
    );
  }
  if (platform === "telegram") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.9 8.17-1.97 9.3c-.15.66-.54.82-1.1.51l-3.04-2.24-1.47 1.41c-.16.16-.3.3-.6.3l.21-3 5.47-4.94c.24-.21-.05-.33-.37-.12l-6.76 4.26-2.92-.91c-.63-.2-.65-.63.13-.93l11.4-4.4c.53-.2.99.12.82.92Z" />
      </svg>
    );
  }
  if (platform === "pinterest") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 4.96 3.02 9.2 7.33 11.02-.1-.94-.2-2.38.04-3.4.22-.92 1.43-5.87 1.43-5.87s-.36-.73-.36-1.8c0-1.69.98-2.95 2.2-2.95 1.04 0 1.54.78 1.54 1.72 0 1.05-.67 2.61-1.01 4.06-.29 1.22.61 2.22 1.8 2.22 2.16 0 3.82-2.28 3.82-5.56 0-2.91-2.09-4.95-5.08-4.95-3.46 0-5.49 2.6-5.49 5.29 0 1.05.4 2.18.91 2.79.1.12.11.23.08.36-.09.4-.3 1.22-.34 1.39-.05.22-.17.27-.39.16-1.47-.68-2.39-2.81-2.39-4.52 0-3.68 2.67-7.06 7.71-7.06 4.05 0 7.19 2.89 7.19 6.75 0 4.03-2.54 7.27-6.07 7.27-1.19 0-2.31-.62-2.69-1.35l-.73 2.79c-.27 1.02-.99 2.29-1.47 3.07 1.1.34 2.26.52 3.47.52 6.63 0 12-5.37 12-12S18.63 0 12 0Z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function formatDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return "Recent update";
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function renderInlineContent(block: BlogPortableBlock): ReactNode {
  const markDefs = block.markDefs ?? [];
  const children = block.children ?? [];

  return children.map((child, index) => {
    const text = child.text ?? "";
    if (!text) return null;

    let node: ReactNode = text;
    const marks = child.marks ?? [];

    for (const mark of marks) {
      const markDef = markDefs.find((def) => def._key === mark);

      if (mark === "strong") {
        node = <strong key={`${child._key ?? index}-${mark}`}>{node}</strong>;
      } else if (mark === "em") {
        node = <em key={`${child._key ?? index}-${mark}`}>{node}</em>;
      } else if (mark === "code") {
        node = (
          <code
            key={`${child._key ?? index}-${mark}`}
            className="rounded-none bg-[#e8eef4] px-1.5 py-0.5 font-mono text-[0.9em] text-[#123f6a]"
          >
            {node}
          </code>
        );
      } else if (markDef?._type === "link" && markDef.href) {
        const isExternal = /^https?:\/\//i.test(markDef.href);
        node = (
          <a
            key={`${child._key ?? index}-${mark}`}
            href={markDef.href}
            className="underline decoration-[#0e4f88]/40 underline-offset-4 transition hover:text-[#0e4f88]"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {node}
          </a>
        );
      }
    }

    return <span key={child._key ?? `${index}`}>{node}</span>;
  });
}

function renderPortableBlocks(blocks: BlogPortableBlock[]): ReactNode {
  const rendered: ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.listItem) {
      const listType = block.listItem;
      const listLevel = block.level ?? 1;
      const items: ReactNode[] = [];

      while (
        i < blocks.length &&
        blocks[i].listItem === listType &&
        (blocks[i].level ?? 1) === listLevel
      ) {
        const listBlock = blocks[i];
        items.push(
          <li key={listBlock._key ?? `list-${i}`} className="pl-1">
            {renderInlineContent(listBlock)}
          </li>
        );
        i += 1;
      }

      if (listType === "number") {
        rendered.push(
          <ol key={`ol-${i}`} className="list-decimal space-y-3 pl-7 marker:text-[#0e4f88]">
            {items}
          </ol>
        );
      } else {
        rendered.push(
          <ul key={`ul-${i}`} className="list-disc space-y-3 pl-7 marker:text-[#0e4f88]">
            {items}
          </ul>
        );
      }

      continue;
    }

    const content = renderInlineContent(block);
    const key = block._key ?? `block-${i}`;

    if (block.style === "h2") {
      rendered.push(
        <h2 key={key} className="mt-10 font-display text-3xl italic leading-tight text-[#113f6c] md:text-4xl">
          {content}
        </h2>
      );
    } else if (block.style === "h3") {
      rendered.push(
        <h3 key={key} className="mt-8 font-display text-2xl italic leading-tight text-[#113f6c] md:text-3xl">
          {content}
        </h3>
      );
    } else if (block.style === "blockquote") {
      rendered.push(
        <blockquote
          key={key}
          className="border-l-2 border-[#9bb7d4] bg-[#f4f8fb] px-5 py-4 font-display text-2xl italic text-[#2c547f]"
        >
          {content}
        </blockquote>
      );
    } else {
      rendered.push(
        <p key={key} className="text-base leading-relaxed text-[#2f4f72] md:text-lg">
          {content}
        </p>
      );
    }

    i += 1;
  }

  return rendered;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found - Campus Care 2.0",
    };
  }

  return {
    title: `${post.title} - Blog - Campus Care 2.0`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20${encodeURIComponent(postUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&description=${encodeURIComponent(post.title)}&media=${encodeURIComponent(post.imageUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.title)}%0A${encodeURIComponent(postUrl)}`,
  };

  const sameCategory = allPosts.filter(
    (candidate) => candidate.slug !== post.slug && candidate.category === post.category
  );
  const otherPosts = allPosts.filter(
    (candidate) => candidate.slug !== post.slug && candidate.category !== post.category
  );
  const relatedPosts = [...sameCategory, ...otherPosts].slice(0, 3);

  return (
    <>
      <section className="border-b border-[#d4dcd8] bg-[linear-gradient(145deg,#f4f0e8_0%,#e8f0ec_45%,#dbe8e4_100%)] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Link href="/blog" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#325786] hover:text-[#0e4f88]">
            Back to Blog
          </Link>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#4f6a86]">
            {post.category} • {post.author} • {formatDate(post.publishedAt)}
          </p>
          <h1 className="mt-4 font-display text-4xl italic leading-[1.08] text-[#113f6c] md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#355879] md:text-lg">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#c9d8e6] pt-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4f6a86]">Share</span>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-8 min-w-8 items-center justify-center border border-[#7f9fbe] bg-[#eaf2f9] px-2 text-xs font-semibold text-[#0e4f88] transition hover:bg-white ${getShareHoverClass("facebook")}`}
              aria-label="Share on Facebook"
            >
              <ShareIcon platform="facebook" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href={shareLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-8 min-w-8 items-center justify-center border border-[#7f9fbe] bg-[#eaf2f9] px-2 text-xs font-semibold text-[#0e4f88] transition hover:bg-white ${getShareHoverClass("x")}`}
              aria-label="Share on X"
            >
              <ShareIcon platform="x" />
              <span className="sr-only">X</span>
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-8 min-w-8 items-center justify-center border border-[#7f9fbe] bg-[#eaf2f9] px-2 text-xs font-semibold text-[#0e4f88] transition hover:bg-white ${getShareHoverClass("linkedin")}`}
              aria-label="Share on LinkedIn"
            >
              <ShareIcon platform="linkedin" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-8 min-w-8 items-center justify-center border border-[#7f9fbe] bg-[#eaf2f9] px-2 text-xs font-semibold text-[#0e4f88] transition hover:bg-white ${getShareHoverClass("whatsapp")}`}
              aria-label="Share on WhatsApp"
            >
              <ShareIcon platform="whatsapp" />
              <span className="sr-only">WhatsApp</span>
            </a>
            <a
              href={shareLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-8 min-w-8 items-center justify-center border border-[#7f9fbe] bg-[#eaf2f9] px-2 text-xs font-semibold text-[#0e4f88] transition hover:bg-white ${getShareHoverClass("telegram")}`}
              aria-label="Share on Telegram"
            >
              <ShareIcon platform="telegram" />
              <span className="sr-only">Telegram</span>
            </a>
            <a
              href={shareLinks.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-8 min-w-8 items-center justify-center border border-[#7f9fbe] bg-[#eaf2f9] px-2 text-xs font-semibold text-[#0e4f88] transition hover:bg-white ${getShareHoverClass("pinterest")}`}
              aria-label="Share on Pinterest"
            >
              <ShareIcon platform="pinterest" />
              <span className="sr-only">Pinterest</span>
            </a>
            <a
              href={shareLinks.email}
              className={`inline-flex h-8 min-w-8 items-center justify-center border border-[#7f9fbe] bg-[#eaf2f9] px-2 text-xs font-semibold text-[#0e4f88] transition hover:bg-white ${getShareHoverClass("email")}`}
              aria-label="Share by Email"
            >
              <ShareIcon platform="email" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <article className="mx-auto max-w-4xl px-6">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden border border-[#d0d8d3]">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div className="space-y-6 text-base leading-relaxed text-[#2f4f72] md:text-lg">
            {post.bodyBlocks && post.bodyBlocks.length > 0
              ? renderPortableBlocks(post.bodyBlocks)
              : post.body.map((paragraph, index) => (
                  <p key={`${post.id}-paragraph-${index}`}>{paragraph}</p>
                ))}
          </div>

          <div className="mt-12 border-t border-[#d8dfda] pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
            >
              View More Updates
              <span
                className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
                aria-hidden
              >
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </article>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-[#dbe3dd] bg-[#f7f5ef] py-14">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#d8e0db] pb-4">
              <h2 className="font-display text-3xl italic text-[#113f6c]">Related Blogs</h2>
              <Link href="/blog" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0e4f88] hover:underline">
                View All
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  className="group flex h-full flex-col overflow-hidden border border-[#d0d8d3] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(17,63,108,0.1)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={related.imageUrl}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#4d6f93]">
                      {related.category} • {formatDate(related.publishedAt)}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-[#113f6c]">{related.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#385a7e]">{related.excerpt}</p>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="group mt-5 inline-flex items-center self-start text-xs font-semibold uppercase tracking-[0.16em] text-[#0e4f88]"
                    >
                      Continue Reading
                      <span
                        className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
                        aria-hidden
                      >
                        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
