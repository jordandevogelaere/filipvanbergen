-- Migration: 0001_initial_schema
-- Description: Create all tables for the FVB blog admin system
-- Authentication is handled by Cloudflare Access

-- Blog Posts
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured_image_url TEXT,
  author_email TEXT NOT NULL,
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE post_translations (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('nl', 'en', 'fr')),
  title TEXT NOT NULL,
  content_json TEXT NOT NULL,
  content_html TEXT NOT NULL,
  meta_description TEXT,
  UNIQUE (post_id, locale)
);

-- Categories
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE category_translations (
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('nl', 'en', 'fr')),
  name TEXT NOT NULL,
  PRIMARY KEY (category_id, locale)
);

CREATE TABLE post_categories (
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Tags
CREATE TABLE tags (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE tag_translations (
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('nl', 'en', 'fr')),
  name TEXT NOT NULL,
  PRIMARY KEY (tag_id, locale)
);

CREATE TABLE post_tags (
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Site assignment
CREATE TABLE post_sites (
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  site TEXT NOT NULL CHECK (site IN ('fvbadvocaten', 'fvbmediation', 'fvbarbitration')),
  PRIMARY KEY (post_id, site)
);

-- Social media profiles
CREATE TABLE social_profiles (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('linkedin', 'twitter', 'facebook')),
  profile_url TEXT NOT NULL,
  site TEXT NOT NULL CHECK (site IN ('fvbadvocaten', 'fvbmediation', 'fvbarbitration')),
  UNIQUE (platform, site)
);

-- Indexes
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_post_translations_locale ON post_translations(post_id, locale);
CREATE INDEX idx_post_sites_site ON post_sites(site);
