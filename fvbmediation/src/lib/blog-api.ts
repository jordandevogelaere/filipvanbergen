// Blog API fetch helper — called at build time (static export) or request time (dev)
const BLOG_API_URL =
  process.env.BLOG_API_URL || "https://fvb-blog-api.workers.dev";
const SITE = "fvbmediation";

const fetchOptions: RequestInit =
  process.env.STATIC_EXPORT === "1"
    ? { cache: "force-cache" }
    : { cache: "no-store" };

export interface BlogPost {
  id: string;
  slug: string;
  featured_image_url: string | null;
  published_at: string;
  title: string;
  content_html: string;
  meta_description: string | null;
  categories: { slug: string; name: string }[];
  tags: { slug: string; name: string }[];
}

export interface BlogListResponse {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function fetchBlogPosts(
  locale: string,
  page = 1,
  limit = 12
): Promise<BlogListResponse> {
  try {
    const res = await fetch(
      `${BLOG_API_URL}/posts?site=${SITE}&locale=${locale}&page=${page}&limit=${limit}`,
      fetchOptions
    );
    if (!res.ok) return { posts: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } };
    return res.json();
  } catch {
    return { posts: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } };
  }
}

export async function fetchBlogPost(
  slug: string,
  locale: string
): Promise<(BlogPost & { available_locales: { locale: string; title: string }[] }) | null> {
  try {
    const res = await fetch(
      `${BLOG_API_URL}/posts/${slug}?site=${SITE}&locale=${locale}`,
      fetchOptions
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchAllPostSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${BLOG_API_URL}/posts?site=${SITE}&locale=nl&limit=500`,
      fetchOptions
    );
    if (!res.ok) return [];
    const data: BlogListResponse = await res.json();
    return data.posts.map((p) => p.slug);
  } catch {
    return [];
  }
}
