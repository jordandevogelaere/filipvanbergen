import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types";
import posts from "./routes/posts";
import categories from "./routes/categories";

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

// Routes
app.route("/posts", posts);
app.route("/categories", categories);

// Health check
app.get("/", (c) => c.json({ status: "ok", service: "fvb-blog-api" }));

export default app;
