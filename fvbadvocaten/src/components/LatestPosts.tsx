import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { fetchBlogPosts, type BlogPost } from "@/lib/blog-api";

const labels = {
  nl: { title: "Laatste Blogberichten", viewAll: "Bekijk alle artikelen", readMore: "Lees meer" },
  en: { title: "Latest Blog Posts", viewAll: "View all articles", readMore: "Read more" },
  fr: { title: "Derniers Articles", viewAll: "Voir tous les articles", readMore: "Lire la suite" },
};

export default async function LatestPosts({ locale }: { locale: Locale }) {
  const { posts } = await fetchBlogPosts(locale, 1, 3);
  const t = labels[locale];

  if (posts.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading mb-8 text-center text-3xl font-bold italic md:text-4xl text-navy-800">
        {t.title}
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-xl bg-white shadow-sm border border-steel-200 transition-shadow hover:shadow-md"
          >
            {post.featured_image_url && (
              <img
                src={post.featured_image_url}
                alt={post.title}
                width={400}
                height={225}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-5">
              <time
                dateTime={post.published_at}
                className="text-xs text-gray-400"
              >
                {new Date(post.published_at).toLocaleDateString(
                  locale === "nl" ? "nl-BE" : locale === "fr" ? "fr-BE" : "en",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </time>
              <h3 className="font-heading mt-1 text-lg font-bold text-navy-900">
                <Link
                  href={`/${locale}/blog/${post.slug}/`}
                  className="hover:text-accent transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              {post.meta_description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {post.meta_description}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/blog/`}
          className="text-accent font-medium hover:underline"
        >
          {t.viewAll} &rarr;
        </Link>
      </div>
    </div>
  );
}
