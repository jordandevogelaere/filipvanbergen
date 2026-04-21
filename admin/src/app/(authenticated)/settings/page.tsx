"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, RefreshCw, Settings } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

interface SiteSetting {
  site: string;
  blog_menu_visible: boolean;
}

const SITE_LABELS: Record<string, string> = {
  fvbadvocaten: "FVB Advocaten",
  fvbmediation: "FVB Bemiddeling",
  fvbarbitration: "FVB Arbitrage",
};

const ALL_SITES = ["fvbadvocaten", "fvbmediation", "fvbarbitration"];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const toast = useToast();

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
        toast.success(`Blog menu ${!current ? "shown" : "hidden"} on ${SITE_LABELS[site] ?? site}`);
      } else {
        toast.error("Failed to update setting");
      }
    } catch {
      toast.error("Failed to update setting");
    } finally {
      setSaving(null);
    }
  }

  async function deployAll() {
    setDeploying(true);
    try {
      const res = await fetch("/api/v1/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sites: ALL_SITES }),
      });
      if (res.ok) {
        toast.success("Deploy triggered for all 3 websites");
      } else {
        toast.error("Failed to trigger deploy");
      }
    } catch {
      toast.error("Failed to trigger deploy");
    } finally {
      setDeploying(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-6 h-6 text-navy-900" />
        <h1 className="text-2xl font-bold font-heading text-navy-900">Settings</h1>
      </div>

      <div className="space-y-6">
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

        <div className="bg-white rounded-xl shadow-sm border border-steel-200 p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-2">Manual Deploy</h2>
          <p className="text-sm text-navy-500 mb-6">
            Trigger a rebuild of all three websites. Use this after making changes that require a fresh deploy.
          </p>
          <button
            onClick={deployAll}
            disabled={deploying}
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${deploying ? "animate-spin" : ""}`} />
            {deploying ? "Deploying..." : "Deploy all websites"}
          </button>
        </div>
      </div>
    </div>
  );
}
