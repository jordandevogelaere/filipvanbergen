"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Save, Eye, EyeOff, Globe, Send, Upload, X } from "lucide-react";
import { LOCALES, SITES, type Locale } from "@/lib/types";
import SocialShareButtons from "./SocialShareButtons";
import { useToast } from "./ToastProvider";

// Dynamic import to avoid SSR issues with TipTap
const Editor = dynamic(() => import("./Editor"), { ssr: false });

interface PostFormProps {
  postId?: string;
  initialData?: {
    slug: string;
    status: string;
    featured_image_url: string;
    sites: string[];
    categories: string[];
    tags: string[];
    translations: Record<
      Locale,
      {
        title: string;
        content_json: string;
        content_html: string;
        meta_description: string;
      }
    >;
  };
}

export default function PostForm({ postId, initialData }: PostFormProps) {
  const router = useRouter();
  const [activeLocale, setActiveLocale] = useState<Locale>("nl");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featured_image_url || ""
  );
  const [featuredImagePreview, setFeaturedImagePreview] = useState(
    initialData?.featured_image_url || ""
  );
  const [selectedSites, setSelectedSites] = useState<string[]>(
    initialData?.sites || []
  );
  const [translations, setTranslations] = useState<
    Record<Locale, { title: string; content_json: string; content_html: string; meta_description: string }>
  >(
    initialData?.translations || {
      nl: { title: "", content_json: "", content_html: "", meta_description: "" },
      en: { title: "", content_json: "", content_html: "", meta_description: "" },
      fr: { title: "", content_json: "", content_html: "", meta_description: "" },
    }
  );
  const [isPublished, setIsPublished] = useState(initialData?.status === "published");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const toast = useToast();

  function updateTranslation(
    locale: Locale,
    field: string,
    value: string
  ) {
    setTranslations((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [field]: value },
    }));
  }

  function handleSiteToggle(site: string) {
    setSelectedSites((prev) =>
      prev.includes(site) ? prev.filter((s) => s !== site) : [...prev, site]
    );
  }

  function autoSlug() {
    const title = translations.en.title || translations.nl.title;
    if (title) {
      setSlug(
        title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  }

  async function handleSave(publish: boolean) {
    publish ? setPublishing(true) : setSaving(true);

    try {
      const body = {
        slug,
        featured_image_url: featuredImage || undefined,
        sites: selectedSites,
        translations,
        publish,
      };

      const url = postId ? `/api/posts/${postId}` : "/api/posts";
      const method = postId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save");
        return;
      }

      if (publish) {
        setIsPublished(true);
        setShowShareButtons(true);
        toast.success(postId ? "Post updated successfully" : "Post published successfully");
      } else {
        toast.success(isPublished ? "Post unpublished" : "Draft saved");
        setIsPublished(false);
        router.push("/posts");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  }

  // Build the post URL for social sharing
  const postUrl = slug
    ? `https://www.fvbadvocaten.com/nl/blog/${slug}/`
    : "";

  return (
    <div className="space-y-6">
      {showShareButtons && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Post Published!
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Share this post on social media:
          </p>
          <SocialShareButtons url={postUrl} title={translations.nl.title} />
          <button
            onClick={() => router.push("/posts")}
            className="mt-4 text-sm text-green-700 underline"
          >
            Back to posts
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Locale tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-steel-200 overflow-hidden">
            <div className="flex border-b border-steel-200">
              {LOCALES.map((locale) => (
                <button
                  key={locale}
                  type="button"
                  onClick={() => setActiveLocale(locale)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeLocale === locale
                      ? "bg-accent text-white"
                      : "text-navy-500 hover:bg-steel-100"
                  }`}
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Title ({activeLocale.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={translations[activeLocale].title}
                  onChange={(e) =>
                    updateTranslation(activeLocale, "title", e.target.value)
                  }
                  onBlur={() => {
                    if (!slug) autoSlug();
                  }}
                  className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="Post title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Content ({activeLocale.toUpperCase()})
                </label>
                <Editor
                  content={translations[activeLocale].content_json || undefined}
                  onChange={(json, html) => {
                    updateTranslation(activeLocale, "content_json", json);
                    updateTranslation(activeLocale, "content_html", html);
                  }}
                  placeholder={`Write your blog post in ${activeLocale.toUpperCase()}...`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Meta Description ({activeLocale.toUpperCase()})
                </label>
                <textarea
                  value={translations[activeLocale].meta_description}
                  onChange={(e) =>
                    updateTranslation(
                      activeLocale,
                      "meta_description",
                      e.target.value
                    )
                  }
                  rows={2}
                  maxLength={160}
                  className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none resize-none"
                  placeholder="Brief description for search engines (max 160 chars)..."
                />
                <p className="text-xs text-navy-500 mt-1">
                  {translations[activeLocale].meta_description.length}/160
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Slug */}
          <div className="bg-white rounded-xl shadow-sm border border-steel-200 p-6">
            <label className="block text-sm font-medium text-navy-700 mb-1">
              URL Slug
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 px-3 py-2 border border-steel-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                placeholder="post-slug"
              />
              <button
                type="button"
                onClick={autoSlug}
                className="px-3 py-2 text-xs border border-steel-200 rounded-lg text-navy-600 hover:bg-steel-100"
              >
                Auto
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl shadow-sm border border-steel-200 p-6">
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Featured Image
            </label>
            {featuredImagePreview ? (
              <div className="relative">
                <img
                  src={featuredImagePreview}
                  alt="Preview"
                  className="rounded-lg max-h-40 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => { setFeaturedImage(""); setFeaturedImagePreview(""); }}
                  className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow hover:bg-white"
                >
                  <X className="w-4 h-4 text-navy-700" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-steel-300 rounded-lg cursor-pointer hover:border-accent hover:bg-steel-50 transition-colors">
                <Upload className="w-6 h-6 text-steel-400 mb-1" />
                <span className="text-sm text-steel-500">
                  {uploading ? "Uploading..." : "Click to upload"}
                </span>
                <span className="text-xs text-steel-400 mt-1">
                  JPEG, PNG, WebP, GIF (max 5MB)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    try {
                      const formData = new FormData();
                      formData.append("file", file);
                      const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      });
                      const data = await res.json();
                      if (!res.ok) {
                        toast.error(data.error || "Upload failed");
                      } else {
                        setFeaturedImage(data.url);
                        setFeaturedImagePreview(data.previewUrl || data.url);
                      }
                    } catch {
                      toast.error("Upload failed");
                    } finally {
                      setUploading(false);
                      e.target.value = "";
                    }
                  }}
                />
              </label>
            )}
          </div>

          {/* Sites */}
          <div className="bg-white rounded-xl shadow-sm border border-steel-200 p-6">
            <label className="block text-sm font-medium text-navy-700 mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Publish to Sites
            </label>
            <div className="space-y-2">
              {SITES.map((site) => (
                <label
                  key={site.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSites.includes(site.value)}
                    onChange={() => handleSiteToggle(site.value)}
                    className="rounded border-steel-300 text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-navy-700">{site.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-steel-200 p-6 space-y-3">
            {isPublished ? (
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 border border-steel-200 text-navy-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-steel-100 transition-colors disabled:opacity-50"
              >
                <EyeOff className="w-4 h-4" />
                {saving ? "Unpublishing..." : "Unpublish"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 border border-steel-200 text-navy-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-steel-100 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Draft"}
              </button>
            )}
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={publishing}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {publishing ? "Publishing..." : isPublished ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
