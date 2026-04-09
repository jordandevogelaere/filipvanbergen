# Filip van Bergen Websites

Monorepo containing three static websites and a blog admin system for Filip van Bergen's law practice.

## Architecture

```
karachi/
├── fvbadvocaten/      # FVB Advocaten website (Next.js static export)
├── fvbmediation/      # FVB Mediation website (Next.js static export)
├── fvbarbitration/    # FVB Arbitration website (Next.js static export)
├── admin/             # Blog admin tool (Next.js SSR on Cloudflare Workers)
├── blog-api/          # Public blog API (Hono on Cloudflare Workers)
├── images/            # Shared image assets
└── logos/             # Brand logos
```

### How it works

- **3 static websites** are built with Next.js 16 using `output: "export"`. Blog posts are fetched at build time from the blog API and baked into static HTML.
- **admin** is a Next.js SSR app deployed on Cloudflare Workers via `@opennextjs/cloudflare`. It provides a UI for managing blog posts, categories, tags, and social media profiles. Authentication is handled by Cloudflare Access (Zero Trust).
- **blog-api** is a lightweight Hono worker that serves published blog posts from the D1 database. It's used by the static sites at build time and could be used client-side if needed.

### Data flow

```
Admin (write) ──> Cloudflare D1 <── Blog API (read) <── Static sites (build time)
                       │
Admin (upload) ──> Cloudflare R2 ──> cdn.fvbadvocaten.be (public images)
                       │
Admin (publish) ──> GitHub Actions (repository_dispatch) ──> Rebuild affected sites
```

## Cloudflare Services

| Service | Name | Purpose |
|---------|------|---------|
| D1 Database | `fvbadvocaten` | Blog posts, translations, categories, tags, social profiles |
| R2 Bucket | `fvbadvocaten` | Blog featured images |
| R2 Custom Domain | `cdn.fvbadvocaten.be` | Public image CDN |
| Pages | 3 projects | Static site hosting |
| Workers | `fvb-blog-api` | Public read-only blog API |
| Workers | `fvb-admin` | Admin tool (SSR) |
| Access | Zero Trust | Admin authentication (email-based) |

## Development Setup

### Prerequisites

- Node.js 22+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm install -g wrangler`)
- Cloudflare account with access to the project

### Install dependencies

```bash
# Install all projects
cd admin && npm install && cd ..
cd blog-api && npm install && cd ..
cd fvbadvocaten && npm install && cd ..
cd fvbmediation && npm install && cd ..
cd fvbarbitration && npm install && cd ..
```

### Initialize local D1 database

The admin app creates a local D1 database automatically. Run the migration to set up tables:

```bash
cd admin
npx wrangler d1 execute fvbadvocaten --local --file=migrations/0001_initial_schema.sql
```

### Running locally

You need three terminals:

```bash
# Terminal 1: Blog API (shares admin's local D1)
cd blog-api
npm run dev
# Runs on http://localhost:8787

# Terminal 2: Admin tool
cd admin
npm run dev
# Runs on http://localhost:3001

# Terminal 3: Any of the 3 websites
cd fvbadvocaten
BLOG_API_URL=http://localhost:8787 npm run dev
# Runs on http://localhost:3000
```

The blog API uses `--persist-to ../admin/.wrangler/state` so it reads from the same local D1 database as the admin.

### Environment variables

**admin/.env.local** (create this file, not committed):

```env
R2_ACCESS_KEY_ID=<your-r2-access-key>
R2_SECRET_ACCESS_KEY=<your-r2-secret-key>
```

**Static sites** use `BLOG_API_URL` at build/dev time:

- Default (production): `https://fvb-blog-api.workers.dev`
- Local development: `http://localhost:8787`

## Deployment

All deployments are handled by GitHub Actions (`.github/workflows/deploy.yml`).

### Automatic triggers

- **Push to `main`**: Detects which directories changed and deploys only the affected projects.
- **Blog publish**: When a post is published in the admin, it sends a `repository_dispatch` event to GitHub, which rebuilds only the sites the post is assigned to.
- **Manual**: Use `workflow_dispatch` from the GitHub Actions UI.

### Secrets required in GitHub Actions

| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | Deploy to Cloudflare Pages/Workers |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier |
| `BLOG_API_URL` | Production blog API URL for static site builds |

### Secrets required on Cloudflare Workers (admin)

Set via `cd admin && npx wrangler secret put <NAME>`:

| Secret | Purpose |
|--------|---------|
| `GITHUB_TOKEN` | Fine-grained PAT with `actions:write` on this repo, used to trigger site rebuilds |

## Project Details

### Static Sites (fvbadvocaten, fvbmediation, fvbarbitration)

- Next.js 16 with `output: "export"` and `trailingSlash: true`
- Three locales: NL (default), EN, FR
- Blog listing at `/{locale}/blog/`
- Blog posts at `/{locale}/blog/{slug}/`
- Latest posts section on homepage
- Deployed to Cloudflare Pages

### Admin (`/admin`)

- Next.js 16 SSR via `@opennextjs/cloudflare`
- TipTap rich text editor
- Multi-locale post editing (NL/EN/FR)
- Post assignment to one or more sites
- Category and tag management
- Featured image upload to R2
- Social media share buttons (copy URL + redirect to LinkedIn/X/Facebook)
- Triggers site rebuilds on publish

### Blog API (`/blog-api`)

- Hono framework on Cloudflare Workers
- `GET /posts` — list published posts (filtered by site, locale, category, tag; paginated)
- `GET /posts/:slug` — single post with categories, tags, and available locales
- `GET /categories` — list categories for a locale
- CORS enabled for all 3 sites + admin + localhost

### Database Schema

Key tables in D1:

- `posts` — slug, status, featured image, author email, publish date
- `post_translations` — title, content (JSON + HTML), meta description per locale
- `post_sites` — which sites a post appears on
- `categories` / `category_translations` — with slugs and locale names
- `tags` / `tag_translations` — with slugs and locale names
- `post_categories` / `post_tags` — many-to-many relations
- `social_profiles` — social media URLs per platform per site
