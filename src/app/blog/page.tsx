import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getBlogCategories, getBlogPosts } from "@/lib/blog";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Insights, stories, and research updates from Campus Care 2.0 and the Diaspora VR Sanctuary.",
  path: "/blog",
  keywords: ["Campus Care blog", "HBCU wellness", "ACT Healing insights"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://campuscare2.org";

type BlogPageProps = {
  searchParams?: Promise<{ category?: string; q?: string; page?: string }>;
};

const POSTS_PER_PAGE = 7;

type SharePlatform = "facebook" | "x" | "linkedin" | "whatsapp" | "email";

function getShareHoverClass(platform: SharePlatform): string {
  if (platform === "facebook") return "hover:text-[#1877F2]";
  if (platform === "x") return "hover:text-black";
  if (platform === "linkedin") return "hover:text-[#0A66C2]";
  if (platform === "whatsapp") return "hover:text-[#25D366]";
  return "hover:text-[#EA4335]";
}

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

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function getShareLinks(slug: string, title: string, imageUrl: string) {
  const postUrl = `${siteUrl}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedImage = encodeURIComponent(imageUrl);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${encodedImage}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`,
  };
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

function matchesSearchQuery(value: string, query: string): boolean {
  return value.toLowerCase().includes(query.toLowerCase());
}

function buildBlogHref(params: { category?: string; q?: string; page?: number }): string {
  const query = new URLSearchParams();

  if (params.category) query.set("category", params.category);
  if (params.q) query.set("q", params.q);
  if (params.page && params.page > 1) query.set("page", String(params.page));

  const serialized = query.toString();
  return serialized ? `/blog?${serialized}` : "/blog";
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeCategory = resolvedSearchParams?.category?.trim() ?? "";
  const searchQuery = resolvedSearchParams?.q?.trim() ?? "";
  const requestedPage = Number.parseInt(resolvedSearchParams?.page?.trim() ?? "1", 10);
  const currentPage = Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;
  const [posts, categories] = await Promise.all([getBlogPosts(), getBlogCategories()]);

  const categoryFilteredPosts = activeCategory
    ? posts.filter((post) => post.category.toLowerCase() === activeCategory.toLowerCase())
    : posts;

  const filteredPosts = searchQuery
    ? categoryFilteredPosts.filter((post) => {
        const haystack = [post.title, post.excerpt, post.category, post.author].join(" ");
        return matchesSearchQuery(haystack, searchQuery);
      })
    : categoryFilteredPosts;

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const [featured, ...rest] = visiblePosts;

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-[#0a3870]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(9, 42, 84, 0.92), rgba(9, 42, 84, 0.94)), linear-gradient(160deg, #0c3f84 0%, #14568f 45%, #0e3d6f 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #ffffff 0, transparent 40%), radial-gradient(circle at 80% 0%, #ffffff 0, transparent 35%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            The Campus Care Journal
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-[2.5rem] italic leading-[1.05] text-white md:text-[4.4rem]">
            Insights on culturally grounded wellness
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            Research, stories, and practical tools from the ACT Healing team and the Diaspora VR
            Sanctuary — helping students, clinicians, and communities heal, grow, and ACT on purpose.
          </p>

          <form action="/blog" method="get" className="mx-auto mt-11 max-w-3xl">
            {activeCategory ? <input type="hidden" name="category" value={activeCategory} /> : null}
            <label htmlFor="blog-search" className="sr-only">
              Search blog posts
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-5 inline-flex items-center text-[#7d8794]" aria-hidden>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="blog-search"
                name="q"
                type="search"
                defaultValue={searchQuery}
                placeholder="Search..."
                className="h-14 w-full rounded-full border border-white/50 bg-[#f2f2f2] pl-14 pr-5 text-base text-[#17467b] placeholder:text-[#9aa3ad] focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>
          </form>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-9 gap-y-3 border-t border-white/25 pt-6">
            <Link
              href={buildBlogHref({ q: searchQuery || undefined })}
              className={`inline-flex items-center justify-center rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                !activeCategory
                  ? "border-white bg-white text-[#0c3f84]"
                  : "border-white/30 bg-white/10 text-white/90 hover:border-white hover:bg-white hover:text-[#0c3f84]"
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={buildBlogHref({ category, q: searchQuery || undefined })}
                className={`inline-flex items-center justify-center rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  activeCategory.toLowerCase() === category.toLowerCase()
                    ? "border-white bg-white text-[#0c3f84]"
                    : "border-white/30 bg-white/10 text-white/90 hover:border-white hover:bg-white hover:text-[#0c3f84]"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>

          {(activeCategory || searchQuery) && (
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/70">
              {activeCategory ? `Category: ${activeCategory}` : "All categories"}
              {searchQuery ? ` | Search: ${searchQuery}` : ""}
            </p>
          )}
        </div>
      </section>

      {!featured && (
        <section className="border-b border-[#d9d9d7] bg-[#f7f5ef] py-14">
          <div className="mx-auto max-w-6xl px-6">
            <div className="border border-[#d0d8d3] bg-white px-6 py-10 text-center md:px-10">
              <h2 className="font-display text-3xl text-[#0f3862]">No posts found</h2>
              <p className="mt-3 text-sm text-[#355879]">
                Try another search phrase or switch categories to find more updates.
              </p>
              <Link
                href="/blog"
                className="group mt-6 inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
              >
                View All Posts
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
          </div>
      </section>
          )}

      {featured && (
        <section className="border-b border-[#d9d9d7] bg-[#f7f5ef] py-14">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
            <div className="group relative min-h-[300px] overflow-hidden border border-[#d0d8d3]">
              <Image
                src={featured.imageUrl}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e4f88]/80 via-[#0e4f88]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="pointer-events-auto absolute left-0 top-6 flex flex-col gap-0.5 border-y border-r border-white/40 bg-[#0e4f88]/85 p-1 backdrop-blur-sm">
                  <a
                    href={getShareLinks(featured.slug, featured.title, featured.imageUrl).facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share ${featured.title} on Facebook`}
                    className={`inline-flex h-8 w-8 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("facebook")}`}
                  >
                    <ShareIcon platform="facebook" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href={getShareLinks(featured.slug, featured.title, featured.imageUrl).x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share ${featured.title} on X`}
                    className={`inline-flex h-8 w-8 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("x")}`}
                  >
                    <ShareIcon platform="x" />
                    <span className="sr-only">X</span>
                  </a>
                  <a
                    href={getShareLinks(featured.slug, featured.title, featured.imageUrl).linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share ${featured.title} on LinkedIn`}
                    className={`inline-flex h-8 w-8 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("linkedin")}`}
                  >
                    <ShareIcon platform="linkedin" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href={getShareLinks(featured.slug, featured.title, featured.imageUrl).whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share ${featured.title} on WhatsApp`}
                    className={`inline-flex h-8 w-8 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("whatsapp")}`}
                  >
                    <ShareIcon platform="whatsapp" />
                    <span className="sr-only">WhatsApp</span>
                  </a>
                </div>
                <span className="absolute bottom-4 left-4 inline-flex border border-white/60 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  {featured.category}
                </span>
              </div>
            </div>
            <article className="flex flex-col border border-[#d0d8d3] bg-white p-7 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3f5f88]">Featured Update</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#0f3862]">{featured.title}</h2>
              <p className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[#4f6a86]">
                <span>{featured.category}</span>
                <span>•</span>
                <span>{featured.author}</span>
                <span>•</span>
                <span>{formatDate(featured.publishedAt)}</span>
              </p>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-[#355879]">{featured.excerpt}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="group mt-7 inline-flex items-center justify-center self-start rounded-none border border-[#0e4f88] bg-[#0e4f88] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
              >
                Read Article
                <span
                  className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
                  aria-hidden
                >
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </article>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#dde3df] pb-4">
            <h3 className="font-display text-3xl italic text-[#113f6c]">Latest Articles</h3>
            <p className="text-xs uppercase tracking-[0.18em] text-[#4e6f95]">
              {activeCategory ? `Category: ${activeCategory}` : "Fresh Campus Care Updates"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden border border-[#d6ded9] bg-[#fcfbf8] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,63,108,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e4f88]/80 via-[#0e4f88]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="pointer-events-auto absolute left-0 top-4 flex flex-col gap-0.5 border-y border-r border-white/40 bg-[#0e4f88]/85 p-1 backdrop-blur-sm">
                      <a
                        href={getShareLinks(post.slug, post.title, post.imageUrl).facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share ${post.title} on Facebook`}
                        className={`inline-flex h-7 w-7 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("facebook")}`}
                      >
                        <ShareIcon platform="facebook" className="h-3 w-3" />
                        <span className="sr-only">Facebook</span>
                      </a>
                      <a
                        href={getShareLinks(post.slug, post.title, post.imageUrl).x}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share ${post.title} on X`}
                        className={`inline-flex h-7 w-7 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("x")}`}
                      >
                        <ShareIcon platform="x" className="h-3 w-3" />
                        <span className="sr-only">X</span>
                      </a>
                      <a
                        href={getShareLinks(post.slug, post.title, post.imageUrl).linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share ${post.title} on LinkedIn`}
                        className={`inline-flex h-7 w-7 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("linkedin")}`}
                      >
                        <ShareIcon platform="linkedin" className="h-3 w-3" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                      <a
                        href={getShareLinks(post.slug, post.title, post.imageUrl).whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share ${post.title} on WhatsApp`}
                        className={`inline-flex h-7 w-7 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("whatsapp")}`}
                      >
                        <ShareIcon platform="whatsapp" className="h-3 w-3" />
                        <span className="sr-only">WhatsApp</span>
                      </a>
                      <a
                        href={getShareLinks(post.slug, post.title, post.imageUrl).email}
                        aria-label={`Share ${post.title} by Email`}
                        className={`inline-flex h-7 w-7 items-center justify-center text-white transition hover:bg-white ${getShareHoverClass("email")}`}
                      >
                        <ShareIcon platform="email" className="h-3 w-3" />
                        <span className="sr-only">Email</span>
                      </a>
                    </div>
                    <span className="absolute bottom-4 left-4 inline-flex border border-white/60 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#4d6f93]">
                    {post.category} • {formatDate(post.publishedAt)}
                  </p>
                  <h4 className="mt-3 font-display text-2xl leading-tight text-[#113f6c]">{post.title}</h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#385a7e]">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
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

      {totalPages > 1 && (
        <section className="border-t border-[#d2d8d5] bg-[#efefef] py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            {safePage > 1 ? (
              <Link
                href={buildBlogHref({
                  category: activeCategory || undefined,
                  q: searchQuery || undefined,
                  page: safePage - 1,
                })}
                className="text-[1.35rem] uppercase tracking-[0.12em] text-[#5e6d7f] transition hover:text-[#0e4f88]"
              >
                &lt; Newer Posts
              </Link>
            ) : (
              <span className="text-[1.35rem] uppercase tracking-[0.12em] text-[#9aa3ad]">&lt; Newer Posts</span>
            )}

            {safePage < totalPages ? (
              <Link
                href={buildBlogHref({
                  category: activeCategory || undefined,
                  q: searchQuery || undefined,
                  page: safePage + 1,
                })}
                className="text-[1.35rem] uppercase tracking-[0.12em] text-[#5e6d7f] transition hover:text-[#0e4f88]"
              >
                Older Posts &gt;
              </Link>
            ) : (
              <span className="text-[1.35rem] uppercase tracking-[0.12em] text-[#9aa3ad]">Older Posts &gt;</span>
            )}
          </div>
        </section>
      )}
    </>
  );
}
