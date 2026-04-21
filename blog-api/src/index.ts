import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types";
import posts from "./routes/posts";
import categories from "./routes/categories";
import employees from "./routes/employees";

const app = new Hono<{ Bindings: Env }>();

// CORS for the three site domains + admin
app.use(
  "*",
  cors({
    origin: [
      "https://www.fvbadvocaten.com",
      "https://www.fvbmediation.com",
      "https://www.fvbarbitration.com",
      "https://admin.fvbadvocaten.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    maxAge: 86400,
  })
);

// Settings endpoint
app.get("/settings", async (c) => {
  const site = c.req.query("site");
  if (!site) {
    return c.json({ error: "site parameter is required" }, 400);
  }
  const row = await c.env.DB.prepare(
    "SELECT blog_menu_visible FROM site_settings WHERE site = ?1"
  )
    .bind(site)
    .first<{ blog_menu_visible: number }>();

  return c.json({
    blog_menu_visible: row ? row.blog_menu_visible === 1 : false,
  });
});

// Routes
app.route("/posts", posts);
app.route("/categories", categories);
app.route("/employees", employees);

// Health check
app.get("/", (c) => c.json({ status: "ok", service: "fvb-blog-api" }));

export default app;
