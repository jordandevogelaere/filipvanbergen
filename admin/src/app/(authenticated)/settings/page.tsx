"use client";

import { useEffect, useState } from "react";
import { Settings, Eye, EyeOff } from "lucide-react";

interface SiteSetting {
  site: string;
  blog_menu_visible: boolean;
}

const SITE_LABELS: Record<string, string> = {
  fvbadvocaten: "FVB Advocaten",
  fvbmediation: "FVB Bemiddeling",
  fvbarbitration: "FVB Arbitrage",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSettings(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function toggleBlogMenu(site: string, current: boolean) {
    setSaving(site);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, blog_menu_visible: !current }),
      });
      if (res.ok) {
        setSettings((prev) =>
          prev.map((s) =>
            s.site === site ? { ...s, blog_menu_visible: !current } : s
          )
        );
      }
    } catch {
      // ignore
    } finally {
      setSaving(null);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-6 h-6 text-navy-900" />
        <h1 className="text-2xl font-bold font-heading text-navy-900">Settings</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-steel-200 p-6">
        <h2 className="text-lg font-semibold text-navy-900 mb-2">Blog Menu Visibility</h2>
        <p className="text-sm text-navy-500 mb-6">
          Control whether the Blog menu item is visible on each website. Hide it until you have blog posts ready to show.
        </p>

        {loading ? (
          <p className="text-sm text-navy-500">Loading...</p>
        ) : (
          <div className="space-y-4">
            {settings.map((setting) => (
              <div
                key={setting.site}
                className="flex items-center justify-between rounded-lg border border-steel-200 p-4"
              >
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    {SITE_LABELS[setting.site] || setting.site}
                  </p>
                  <p className="text-xs text-navy-500">{setting.site}</p>
                </div>
                <button
                  onClick={() => toggleBlogMenu(setting.site, setting.blog_menu_visible)}
                  disabled={saving === setting.site}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    setting.blog_menu_visible
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-steel-100 text-navy-500 hover:bg-steel-200"
                  }`}
                >
                  {setting.blog_menu_visible ? (
                    <>
                      <Eye className="w-4 h-4" />
                      Visible
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hidden
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
