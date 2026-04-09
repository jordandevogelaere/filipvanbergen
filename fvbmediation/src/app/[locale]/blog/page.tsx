import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { locales, type Locale } from "@/lib/i18n";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { fetchBlogPosts } from "@/lib/blog-api";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const title = "Blog";
  const description =
    loc === "en"
      ? "Read our latest insights on mediation."
      : loc === "fr"
        ? "Lisez nos derniers articles sur la médiation."
        : "Lees onze laatste inzichten over bemiddeling.";

  return {
    title,
    description,
    alternates: buildAlternates(loc, "blog"),
    openGraph: buildOpenGraph(loc, title, description, "blog"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const { posts } = await fetchBlogPosts(loc);

  const labels = {
    nl: { title: "Blog", noPostsYet: "Er zijn nog geen blogberichten.", readMore: "Lees meer" },
    en: { title: "Blog", noPostsYet: "No blog posts yet.", readMore: "Read more" },
    fr: { title: "Blog", noPostsYet: "Aucun article de blog pour le moment.", readMore: "Lire la suite" },
  };
  const t = labels[loc];

  return (
    <section className="py-20">
      <Container>
        <SectionHeading>{t.title}</SectionHeading>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">{t.noPostsYet}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm border border-steel-200 transition-shadow hover:shadow-md"
              >
                {post.featured_image_url && (
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    width={600}
                    height={340}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  {post.categories.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {post.categories.map((cat) => (
                        <span
                          key={cat.slug}
                          className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="font-heading text-lg font-bold text-navy-900">
                    <Link
                      href={`/${locale}/blog/${post.slug}/`}
                      className="hover:text-accent transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.meta_description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {post.meta_description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <time
                      dateTime={post.published_at}
                      className="text-xs text-gray-400"
                    >
                      {new Date(post.published_at).toLocaleDateString(
                        loc === "nl" ? "nl-BE" : loc === "fr" ? "fr-BE" : "en",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                    <Link
                      href={`/${locale}/blog/${post.slug}/`}
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {t.readMore}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
