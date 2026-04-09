-- Track blog post reads
CREATE TABLE IF NOT EXISTS post_reads (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  site TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_post_reads_post_id ON post_reads(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reads_site ON post_reads(site);
