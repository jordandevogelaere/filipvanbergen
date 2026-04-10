"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Eye, Clock, BarChart3 } from "lucide-react";

interface DashboardData {
  stats: { total: number; published: number; drafts: number; totalReads: number };
  recentPosts: { id: string; slug: string; title: string; status: string; date: string; read_count: number }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Total Posts", value: data?.stats.total ?? 0, icon: FileText },
    { label: "Published", value: data?.stats.published ?? 0, icon: Eye },
    { label: "Drafts", value: data?.stats.drafts ?? 0, icon: Clock },
    { label: "Total Reads", value: data?.stats.totalReads ?? 0, icon: BarChart3 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-navy-900 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm border border-steel-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-navy-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-navy-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <Icon className="w-8 h-8 text-accent" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-steel-200">
        <h2 className="text-lg font-semibold text-navy-900 mb-4">
          Recent Posts
        </h2>
        {!data?.recentPosts.length ? (
          <p className="text-navy-500 text-sm">
            No posts yet. Create your first blog post to get started.
          </p>
        ) : (
          <ul className="space-y-3">
            {data.recentPosts.map((post) => (
              <li key={post.id} className="flex items-center justify-between">
                <div>
                  <Link href={`/posts/${post.id}/edit`} className="text-sm font-medium text-navy-900 hover:text-accent">
                    {post.title}
                  </Link>
                  <p className="text-xs text-navy-500">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-navy-500 flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {post.read_count}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
