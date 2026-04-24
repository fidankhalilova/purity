"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface BlogTagsShareProps {
  tags: string[];
  shareTitle: string;
}

export default function BlogTagsShare({
  tags,
  shareTitle,
}: BlogTagsShareProps) {
  const t = useTranslations("BlogDetail");
  const [shareUrl, setShareUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShareUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl);
  const titleEncoded = encodeURIComponent(shareTitle);

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${titleEncoded}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "pinterest":
        url = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${titleEncoded}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${titleEncoded}`;
        break;
    }
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!mounted) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-100">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-semibold text-gray-500">
              {t("tags")}:
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500">
            {t("share")}:
          </span>
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 animate-pulse" />
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 animate-pulse" />
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-100">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold text-gray-500">
            {t("tags")}:
          </span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-500">
          {t("share")}:
        </span>
        <button
          onClick={() => handleShare("twitter")}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Share on Twitter"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          onClick={() => handleShare("facebook")}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Share on Facebook"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
        <button
          onClick={() => handleShare("pinterest")}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Share on Pinterest"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.934 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.357-1.492 3.156 1.12.345 2.307.533 3.539.533 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
