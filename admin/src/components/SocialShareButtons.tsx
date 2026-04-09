"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

const platforms = [
  {
    name: "LinkedIn",
    color: "bg-[#0A66C2]",
    shareUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "X (Twitter)",
    color: "bg-[#000000]",
    shareUrl: (url: string, title: string) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Facebook",
    color: "bg-[#1877F2]",
    shareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
];

export default function SocialShareButtons({
  url,
  title,
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleShare(platform: (typeof platforms)[0]) {
    navigator.clipboard.writeText(url);
    window.open(platform.shareUrl(url, title), "_blank", "width=600,height=400");
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-steel-200 text-navy-700 rounded-lg text-sm font-medium hover:bg-steel-300 transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {copied ? "Copied!" : "Copy URL"}
      </button>

      {platforms.map((platform) => (
        <button
          key={platform.name}
          onClick={() => handleShare(platform)}
          className={`flex items-center gap-2 px-4 py-2 ${platform.color} text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
        >
          <ExternalLink className="w-4 h-4" />
          {platform.name}
        </button>
      ))}
    </div>
  );
}
