"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, BarChart3 } from "lucide-react";

interface PostRow {
  id: string;
  slug: string;
  title: string;
  status: string;
  sites: string[];
  published_at: string | null;
  created_at: string;
  read_count: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-heading text-navy-900">Posts</h1>
        <Link
          href="/posts/new"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-steel-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-steel-200 bg-steel-100">
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Reads</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Sites</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Date</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-navy-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-navy-500 text-sm">Loading...</td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-navy-500 text-sm">
                  No posts yet. Create your first blog post to get started.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-steel-100 hover:bg-steel-100/50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-navy-900">{post.title}</p>
                    <p className="text-xs text-navy-500">/{post.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status === "published" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-sm text-navy-700">
                      <BarChart3 className="w-3.5 h-3.5" />
                      {post.read_count}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {post.sites.map((site) => (
                        <span key={site} className="px-2 py-0.5 bg-navy-100 text-navy-700 rounded text-xs">
                          {site.replace("fvb", "")}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="p-1.5 text-navy-500 hover:text-accent transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-navy-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
