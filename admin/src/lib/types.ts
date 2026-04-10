export type Locale = "nl" | "en" | "fr";
export type Site = "fvbadvocaten" | "fvbmediation" | "fvbarbitration";
export type PostStatus = "draft" | "published";
export type Platform = "linkedin" | "twitter" | "facebook";

export const LOCALES: Locale[] = ["nl", "en", "fr"];
export const SITES: { value: Site; label: string }[] = [
  { value: "fvbadvocaten", label: "FVB Advocaten" },
  { value: "fvbmediation", label: "FVB Mediation" },
  { value: "fvbarbitration", label: "FVB Arbitration" },
];
export const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "X (Twitter)" },
  { value: "facebook", label: "Facebook" },
];

export interface Post {
  id: string;
  slug: string;
  status: PostStatus;
  featured_image_url: string | null;
  author_email: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostTranslation {
  id: string;
  post_id: string;
  locale: Locale;
  title: string;
  content_json: string;
  content_html: string;
  meta_description: string | null;
}

export interface Category {
  id: string;
  slug: string;
}

export interface CategoryTranslation {
  category_id: string;
  locale: Locale;
  name: string;
}

export interface Tag {
  id: string;
  slug: string;
}

export interface SocialProfile {
  id: string;
  platform: Platform;
  profile_url: string;
  site: Site;
}
