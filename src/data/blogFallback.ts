export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string[];
  bodyBlocks?: BlogPortableBlock[];
  publishedAt: string;
  author: string;
  category: string;
  imageUrl: string;
};

export type BlogMarkDef = {
  _key: string;
  _type?: string;
  href?: string;
};

export type BlogPortableTextChild = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

export type BlogPortableBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: BlogPortableTextChild[];
  markDefs?: BlogMarkDef[];
};

/**
 * Default cover image used when a Sanity post has no image set.
 */
export const DEFAULT_BLOG_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80";

/**
 * Static fallback posts. Intentionally empty — all blog content is now
 * managed in Sanity Studio (/studio). When Sanity has no posts, the blog
 * simply shows its empty state instead of sample placeholder articles.
 */
export const fallbackBlogPosts: BlogPost[] = [];
