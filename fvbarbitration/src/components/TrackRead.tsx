"use client";

import { useEffect, useRef } from "react";

const BLOG_API_URL =
  process.env.NEXT_PUBLIC_BLOG_API_URL || "https://fvb-blog-api.workers.dev";
const SITE = "fvbarbitration";

export default function TrackRead({ slug }: { slug: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    fetch(`${BLOG_API_URL}/posts/${slug}/read?site=${SITE}`, {
      method: "POST",
    }).catch(() => {});
  }, [slug]);

  return null;
}
