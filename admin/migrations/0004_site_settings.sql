-- Site settings (feature flags per site)
CREATE TABLE IF NOT EXISTS site_settings (
  site TEXT PRIMARY KEY,
  blog_menu_visible INTEGER NOT NULL DEFAULT 0
);

-- Default: blog menu hidden on all sites
INSERT OR IGNORE INTO site_settings (site, blog_menu_visible) VALUES ('fvbadvocaten', 0);
INSERT OR IGNORE INTO site_settings (site, blog_menu_visible) VALUES ('fvbmediation', 0);
INSERT OR IGNORE INTO site_settings (site, blog_menu_visible) VALUES ('fvbarbitration', 0);
