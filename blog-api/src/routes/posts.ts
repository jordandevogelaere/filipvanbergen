import { Hono } from "hono";
import type { Env } from "../types";

const posts = new Hono<{ Bindings: Env }>();

// GET /posts — list published posts, filtered by site and locale
posts.get("/", async (c) => {
  const site = c.req.query("site");
  const locale = c.req.query("locale") || "nl";
  const page = parseInt(c.req.query("page") || "1", 10);
  const limit = Math.min(parseInt(c.req.query("limit") || "12", 10), 50);
  const offset = (page - 1) * limit;
  const category = c.req.query("category");
  const tag = c.req.query("tag");

  if (!site) {
    return c.json({ error: "site parameter is required" }, 400);
  }

  let query = `
    SELECT p.id, p.slug, p.status, p.featured_image_url, p.published_at,
           p.created_at, p.updated_at,
           pt.title, pt.content_html, pt.meta_description,
           (SELECT COUNT(*) FROM post_reads pr WHERE pr.post_id = p.id) as read_count
    FROM posts p
    JOIN post_translations pt ON pt.post_id = p.id AND pt.locale = ?1
    JOIN post_sites ps ON ps.post_id = p.id AND ps.site = ?2
    WHERE p.status = 'published'
  `;
  const params: (string | number)[] = [locale, site];
  let paramIdx = 3;

  if (category) {
    query += `
      AND p.id IN (
        SELECT pc.post_id FROM post_categories pc
        JOIN categories cat ON cat.id = pc.category_id AND cat.slug = ?${paramIdx}
      )
    `;
    params.push(category);
    paramIdx++;
  }

  if (tag) {
    query += `
      AND p.id IN (
        SELECT ptg.post_id FROM post_tags ptg
        JOIN tags t ON t.id = ptg.tag_id AND t.slug = ?${paramIdx}
      )
    `;
    params.push(tag);
    paramIdx++;
  }

  query += ` ORDER BY p.published_at DESC LIMIT ?${paramIdx} OFFSET ?${paramIdx + 1}`;
  params.push(limit, offset);

  const result = await c.env.DB.prepare(query)
    .bind(...params)
    .all();

  // Count total for pagination
  let countQuery = `
    SELECT COUNT(*) as total
    FROM posts p
    JOIN post_sites ps ON ps.post_id = p.id AND ps.site = ?1
    WHERE p.status = 'published'
  `;
  const countParams: string[] = [site];

  const countResult = await c.env.DB.prepare(countQuery)
    .bind(...countParams)
    .first<{ total: number }>();

  // Get categories and tags for each post
  const postsWithMeta = await Promise.all(
    (result.results || []).map(async (post: Record<string, unknown>) => {
      const categories = await c.env.DB.prepare(`
        SELECT c.slug, ct.name
        FROM post_categories pc
        JOIN categories c ON c.id = pc.category_id
        JOIN category_translations ct ON ct.category_id = c.id AND ct.locale = ?1
        WHERE pc.post_id = ?2
      `)
        .bind(locale, post.id)
        .all();

      const tags = await c.env.DB.prepare(`
        SELECT t.slug, tt.name
        FROM post_tags ptg
        JOIN tags t ON t.id = ptg.tag_id
        JOIN tag_translations tt ON tt.tag_id = t.id AND tt.locale = ?1
        WHERE ptg.post_id = ?2
      `)
        .bind(locale, post.id)
        .all();

      return {
        ...post,
        categories: categories.results || [],
        tags: tags.results || [],
      };
    })
  );

  return c.json({
    posts: postsWithMeta,
    pagination: {
      page,
      limit,
      total: countResult?.total || 0,
      totalPages: Math.ceil((countResult?.total || 0) / limit),
    },
  });
});

// POST /posts/:slug/read — track a blog post read
posts.post("/:slug/read", async (c) => {
  const slug = c.req.param("slug");
  const site = c.req.query("site");

  if (!site) {
    return c.json({ error: "site parameter is required" }, 400);
  }

  const post = await c.env.DB.prepare(
    "SELECT p.id FROM posts p JOIN post_sites ps ON ps.post_id = p.id AND ps.site = ?1 WHERE p.slug = ?2 AND p.status = 'published'"
  )
    .bind(site, slug)
    .first<{ id: string }>();

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  await c.env.DB.prepare(
    "INSERT INTO post_reads (post_id, site) VALUES (?1, ?2)"
  )
    .bind(post.id, site)
    .run();

  return c.json({ ok: true });
});

// GET /posts/:slug — single post by slug
posts.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const locale = c.req.query("locale") || "nl";
  const site = c.req.query("site");

  if (!site) {
    return c.json({ error: "site parameter is required" }, 400);
  }

  const post = await c.env.DB.prepare(`
    SELECT p.id, p.slug, p.status, p.featured_image_url, p.published_at,
           p.created_at, p.updated_at,
           pt.title, pt.content_html, pt.meta_description,
           (SELECT COUNT(*) FROM post_reads pr WHERE pr.post_id = p.id) as read_count
    FROM posts p
    JOIN post_translations pt ON pt.post_id = p.id AND pt.locale = ?1
    JOIN post_sites ps ON ps.post_id = p.id AND ps.site = ?2
    WHERE p.slug = ?3 AND p.status = 'published'
  `)
    .bind(locale, site, slug)
    .first();

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  // Get categories
  const categories = await c.env.DB.prepare(`
    SELECT c.slug, ct.name
    FROM post_categories pc
    JOIN categories c ON c.id = pc.category_id
    JOIN category_translations ct ON ct.category_id = c.id AND ct.locale = ?1
    WHERE pc.post_id = ?2
  `)
    .bind(locale, post.id)
    .all();

  // Get tags
  const tags = await c.env.DB.prepare(`
    SELECT t.slug, tt.name
    FROM post_tags ptg
    JOIN tags t ON t.id = ptg.tag_id
    JOIN tag_translations tt ON tt.tag_id = t.id AND tt.locale = ?1
    WHERE ptg.post_id = ?2
  `)
    .bind(locale, post.id)
    .all();

  // Get available locales for this post
  const locales = await c.env.DB.prepare(`
    SELECT locale, title FROM post_translations WHERE post_id = ?1
  `)
    .bind(post.id)
    .all();

  return c.json({
    ...post,
    categories: categories.results || [],
    tags: tags.results || [],
    available_locales: locales.results || [],
  });
});

export default posts;
