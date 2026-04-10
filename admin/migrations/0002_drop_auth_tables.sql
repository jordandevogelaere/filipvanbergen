-- Migration: 0002_drop_auth_tables
-- Description: Remove users and sessions tables — auth is now handled by Cloudflare Access

DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

-- Rename author_id to author_email in posts table
-- D1/SQLite doesn't support ALTER COLUMN, so we recreate the table
CREATE TABLE posts_new (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured_image_url TEXT,
  author_email TEXT NOT NULL DEFAULT '',
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO posts_new (id, slug, status, featured_image_url, author_email, published_at, created_at, updated_at)
  SELECT id, slug, status, featured_image_url, COALESCE(author_id, ''), published_at, created_at, updated_at FROM posts;

DROP TABLE posts;
ALTER TABLE posts_new RENAME TO posts;

CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);
