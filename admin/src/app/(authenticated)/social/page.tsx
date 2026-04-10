"use client";

import { useEffect, useState } from "react";
import { Save, ExternalLink } from "lucide-react";
import { SITES, PLATFORMS } from "@/lib/types";

interface SocialProfileState {
  [key: string]: string;
}

export default function SocialPage() {
  const [profiles, setProfiles] = useState<SocialProfileState>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/social")
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === "object" && !data.error) setProfiles(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleChange(platform: string, site: string, value: string) {
    setProfiles((prev) => ({
      ...prev,
      [`${platform}_${site}`]: value,
    }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profiles),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {}
    setSaving(false);
  }

  if (loading) {
    return <div className="text-center py-20 text-navy-500">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-900">Social Media</h1>
          <p className="text-sm text-navy-500 mt-1">Manage social media profile links for each site</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {SITES.map((site) => (
          <div key={site.value} className="bg-white rounded-xl shadow-sm border border-steel-200 p-6">
            <h2 className="text-lg font-semibold text-navy-900 mb-4">{site.label}</h2>
            <div className="space-y-4">
              {PLATFORMS.map((platform) => {
                const key = `${platform.value}_${site.value}`;
                const value = profiles[key] || "";
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-navy-700 mb-1">{platform.label}</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={value}
                        onChange={(e) => handleChange(platform.value, site.value, e.target.value)}
                        placeholder={`https://${platform.value === "twitter" ? "x" : platform.value}.com/...`}
                        className="flex-1 px-3 py-2 border border-steel-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                      />
                      {value && (
                        <a href={value} target="_blank" rel="noopener noreferrer" className="p-2 text-navy-500 hover:text-accent">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
