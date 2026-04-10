"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostForm from "@/components/PostForm";
import type { Locale } from "@/lib/types";

interface PostData {
  slug: string;
  status: string;
  featured_image_url: string;
  sites: string[];
  categories: string[];
  tags: string[];
  translations: Record<
    Locale,
    { title: string; content_json: string; content_html: string; meta_description: string }
  >;
}

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((post) => {
        setData({
          slug: post.slug,
          status: post.status,
          featured_image_url: post.featured_image_url || "",
          sites: post.sites,
          categories: post.categories,
          tags: post.tags,
          translations: post.translations,
        });
      })
      .catch(() => setError("Post not found"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-navy-500">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-600">{error || "Post not found"}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-navy-900 mb-8">
        Edit Post
      </h1>
      <PostForm postId={params.id} initialData={data} />
    </div>
  );
}
