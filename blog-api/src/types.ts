export interface Env {
  DB: D1Database;
}

export type Locale = "nl" | "en" | "fr";
export type Site = "fvbadvocaten" | "fvbmediation" | "fvbarbitration";

export interface Post {
  id: string;
  slug: string;
  status: string;
  featured_image_url: string | null;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostTranslation {
  locale: Locale;
  title: string;
  content_html: string;
  meta_description: string | null;
}

export interface PostWithTranslation extends Post {
  title: string;
  content_html: string;
  meta_description: string | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}
