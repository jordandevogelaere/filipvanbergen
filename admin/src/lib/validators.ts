import { z } from "zod";

export const postTranslationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content_json: z.string().min(1, "Content is required"),
  content_html: z.string().min(1, "Content is required"),
  meta_description: z.string().optional(),
});

export const createPostSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  featured_image_url: z.string().url().optional().or(z.literal("")),
  sites: z.array(z.enum(["fvbadvocaten", "fvbmediation", "fvbarbitration"])).min(1, "Select at least one site"),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  translations: z.object({
    nl: postTranslationSchema,
    en: postTranslationSchema,
    fr: postTranslationSchema,
  }),
});

export const categorySchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  translations: z.object({
    nl: z.string().min(1, "Dutch name is required"),
    en: z.string().min(1, "English name is required"),
    fr: z.string().min(1, "French name is required"),
  }),
});

export const tagSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  translations: z.object({
    nl: z.string().min(1, "Dutch name is required"),
    en: z.string().min(1, "English name is required"),
    fr: z.string().min(1, "French name is required"),
  }),
});

export const socialProfileSchema = z.object({
  platform: z.enum(["linkedin", "twitter", "facebook"]),
  profile_url: z.string().url("Must be a valid URL"),
  site: z.enum(["fvbadvocaten", "fvbmediation", "fvbarbitration"]),
});
