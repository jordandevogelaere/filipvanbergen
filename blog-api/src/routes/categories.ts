import { Hono } from "hono";
import type { Env } from "../types";

const categories = new Hono<{ Bindings: Env }>();

// GET /categories — list all categories with translations
categories.get("/", async (c) => {
  const locale = c.req.query("locale") || "nl";

  const result = await c.env.DB.prepare(`
    SELECT c.id, c.slug, ct.name
    FROM categories c
    JOIN category_translations ct ON ct.category_id = c.id AND ct.locale = ?1
    ORDER BY ct.name ASC
  `)
    .bind(locale)
    .all();

  return c.json({ categories: result.results || [] });
});

export default categories;
