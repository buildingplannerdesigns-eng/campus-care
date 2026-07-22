import {
  fallbackBlogPosts,
  type BlogPortableBlock,
  type BlogPortableTextChild,
  type BlogPost,
} from "@/data/blogFallback";
import { isSanityConfigured, sanityClient, urlForImage } from "@/lib/sanity";

type SanityBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  markDefs?: Array<{ _key: string; _type?: string; href?: string }>;
  children?: Array<{ _key?: string; _type?: string; text?: string; marks?: string[] }>;
};

type RawBlogPost = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  author?: string;
  category?: string;
  mainImage?: unknown;
  coverImage?: unknown;
  heroImage?: unknown;
  body?: SanityBlock[];
};

function extractBodyParagraphs(blocks?: SanityBlock[]): string[] {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .filter((block) => block?._type === "block")
    .map((block) =>
      (block.children ?? [])
        .map((child) => child?.text?.trim() ?? "")
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean);
}

function normalizePortableBlocks(blocks?: SanityBlock[]): BlogPortableBlock[] {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .filter((block) => block?._type === "block")
    .map((block, index) => ({
      _key: block._key ?? `block-${index}`,
      _type: "block" as const,
      style: block.style ?? "normal",
      listItem: block.listItem,
      level: block.level,
      markDefs: (block.markDefs ?? []).map((def) => ({
        _key: def._key,
        _type: def._type,
        href: def.href,
      })),
      children: (block.children ?? []).map(
        (child, childIndex): BlogPortableTextChild => ({
          _key: child._key ?? `span-${index}-${childIndex}`,
          _type: child._type ?? "span",
          text: child.text ?? "",
          marks: child.marks ?? [],
        })
      ),
    }));
}

function normalizePost(post: RawBlogPost, index: number): BlogPost {
  const paragraphs = extractBodyParagraphs(post.body);
  const excerpt =
    post.excerpt?.trim() ||
    paragraphs[0] ||
    "A new update from Campus Care 2.0 is available. Open to read the full article and details.";

  return {
    id: post._id ?? `sanity-${index}`,
    title: post.title?.trim() || "Untitled update",
    slug: post.slug?.trim() || `update-${index}`,
    excerpt,
    body:
      paragraphs.length > 0
        ? paragraphs
        : [
            excerpt,
            "Additional details for this article can be managed in Sanity CMS by adding body block content.",
          ],
    bodyBlocks: normalizePortableBlocks(post.body),
    publishedAt: post.publishedAt || new Date().toISOString(),
    author: post.author?.trim() || "Campus Care Team",
    category: post.category?.trim() || "Update",
    imageUrl:
      urlForImage(post.mainImage as never) ||
      urlForImage(post.coverImage as never) ||
      urlForImage(post.heroImage as never) ||
      fallbackBlogPosts[index % fallbackBlogPosts.length].imageUrl,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured() || !sanityClient) return fallbackBlogPosts;

  try {
    const query = `*[_type in ["post", "blogPost", "blog"] && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...50]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "publishedAt": coalesce(publishedAt, _createdAt),
      "author": coalesce(author->name, "Campus Care Team"),
      "category": coalesce(category->title, "Update"),
      mainImage,
      coverImage,
      heroImage,
      body
    }`;

    const posts = await sanityClient.fetch<RawBlogPost[]>(query);
    if (!posts?.length) return fallbackBlogPosts;

    return posts.map(normalizePost);
  } catch {
    return fallbackBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSanityConfigured() && sanityClient) {
    try {
      const post = await sanityClient.fetch<RawBlogPost | null>(
        `*[_type in ["post", "blogPost", "blog"] && slug.current == $slug][0]{
          _id,
          title,
          "slug": slug.current,
          excerpt,
          "publishedAt": coalesce(publishedAt, _createdAt),
          "author": coalesce(author->name, "Campus Care Team"),
          "category": coalesce(category->title, "Update"),
          mainImage,
          coverImage,
          heroImage,
          body
        }`,
        { slug }
      );
      if (post?.slug) return normalizePost(post, 0);
    } catch {
      // fall through to list lookup / fallback
    }
  }

  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}
