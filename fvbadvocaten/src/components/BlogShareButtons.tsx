"use client";

import { useState } from "react";

interface BlogShareButtonsProps {
  url: string;
  title: string;
}

const platforms = [
  {
    name: "LinkedIn",
    color: "bg-[#0A66C2] hover:bg-[#004182]",
    shareUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "X",
    color: "bg-[#000000] hover:bg-[#333333]",
    shareUrl: (url: string, title: string) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Facebook",
    color: "bg-[#1877F2] hover:bg-[#0d65d9]",
    shareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
];

export default function BlogShareButtons({
  url,
  title,
}: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-gray-500 mr-1">Delen:</span>
      {platforms.map((platform) => (
        <button
          key={platform.name}
          onClick={() => {
            navigator.clipboard.writeText(url);
            window.open(
              platform.shareUrl(url, title),
              "_blank",
              "width=600,height=400"
            );
          }}
          className={`${platform.color} text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors`}
        >
          {platform.name}
        </button>
      ))}
      <button
        onClick={handleCopy}
        className="bg-steel-200 text-navy-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-steel-300 transition-colors"
      >
        {copied ? "Gekopieerd!" : "Kopieer link"}
      </button>
    </div>
  );
}
