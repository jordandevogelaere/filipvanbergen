import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { locales, type Locale, htmlLang } from "@/lib/i18n";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { fetchBlogPost, fetchAllPostSlugs } from "@/lib/blog-api";
import BlogShareButtons from "@/components/BlogShareButtons";
import TrackRead from "@/components/TrackRead";

export async function generateStaticParams() {
  const slugs = await fetchAllPostSlugs();

  // Static export requires at least one param when a dynamic segment exists.
  // Use a placeholder when no posts exist yet.
  if (slugs.length === 0) {
    return locales.map((locale) => ({ locale, slug: "_placeholder" }));
  }

  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (slug === "_placeholder") {
    return { title: "Blog" };
  }

  const post = await fetchBlogPost(slug, locale);

  if (!post) return { title: "Post not found" };

  const alternates: Record<string, string> = {};
  for (const loc of post.available_locales) {
    alternates[loc.locale === "nl" ? "nl-BE" : loc.locale] =
      `${SITE_URL}/${loc.locale}/blog/${slug}/`;
  }
  alternates["x-default"] = `${SITE_URL}/nl/blog/${slug}/`;

  return {
    title: post.title,
    description: post.meta_description || undefined,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}/`,
      languages: alternates,
    },
    openGraph: {
      title: post.title,
      description: post.meta_description || undefined,
      url: `${SITE_URL}/${locale}/blog/${slug}/`,
      siteName: SITE_NAME,
      locale: htmlLang(locale as Locale),
      type: "article",
      publishedTime: post.published_at,
      ...(post.featured_image_url
        ? { images: [{ url: post.featured_image_url, width: 1200, height: 630, alt: post.title }] }
        : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;

  const labels = {
    nl: { backToBlog: "Terug naar blog", notFound: "Artikel niet gevonden." },
    en: { backToBlog: "Back to blog", notFound: "Post not found." },
    fr: { backToBlog: "Retour au blog", notFound: "Article non trouvé." },
  };
  const t = labels[loc];

  if (slug === "_placeholder") {
    return (
      <section className="py-20">
        <Container>
          <p className="text-center text-gray-500">{t.notFound}</p>
          <div className="mt-4 text-center">
            <Link href={`/${locale}/blog/`} className="text-accent hover:underline">
              {t.backToBlog}
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const post = await fetchBlogPost(slug, locale);

  if (!post) {
    return (
      <section className="py-20">
        <Container>
          <p className="text-center text-gray-500">{t.notFound}</p>
          <div className="mt-4 text-center">
            <Link href={`/${locale}/blog/`} className="text-accent hover:underline">{t.backToBlog}</Link>
          </div>
        </Container>
      </section>
    );
  }

  const postUrl = `${SITE_URL}/${locale}/blog/${slug}/`;

  return (
    <>
      <TrackRead slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.meta_description,
            datePublished: post.published_at,
            url: postUrl,
            publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            ...(post.featured_image_url ? { image: post.featured_image_url } : {}),
            inLanguage: htmlLang(loc),
          }),
        }}
      />

      <article className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link href={`/${locale}/blog/`} className="mb-8 inline-block text-sm text-accent hover:underline">
              &larr; {t.backToBlog}
            </Link>

            {post.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <span key={cat.slug} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {cat.name}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">{post.title}</h1>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString(
                  loc === "nl" ? "nl-BE" : loc === "fr" ? "fr-BE" : "en",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </time>
              {post.tags.length > 0 && (
                <div className="flex gap-1">
                  {post.tags.map((tag) => (<span key={tag.slug} className="text-gray-400">#{tag.name}</span>))}
                </div>
              )}
            </div>

            {post.featured_image_url && (
              <img src={post.featured_image_url} alt={post.title} width={800} height={450} className="mt-8 w-full rounded-xl object-cover" />
            )}

            <div
              className="prose prose-lg mt-8 max-w-none prose-headings:font-heading prose-headings:text-navy-900 prose-a:text-accent"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />

            {post.available_locales.length > 1 && (
              <div className="mt-8 border-t border-steel-200 pt-4">
                <p className="text-xs text-gray-500 mb-2">
                  {loc === "nl" ? "Dit artikel is ook beschikbaar in:" : loc === "fr" ? "Cet article est également disponible en :" : "This article is also available in:"}
                </p>
                <div className="flex gap-3">
                  {post.available_locales.filter((l) => l.locale !== locale).map((l) => (
                    <Link key={l.locale} href={`/${l.locale}/blog/${slug}/`} className="text-sm text-accent hover:underline">
                      {l.locale.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-steel-200 pt-6">
              <BlogShareButtons url={postUrl} title={post.title} />
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
