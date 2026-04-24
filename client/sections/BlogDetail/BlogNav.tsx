"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface BlogNavProps {
  older?: { title: string; href: string };
  newer?: { title: string; href: string };
}

export default function BlogNav({ older, newer }: BlogNavProps) {
  const t = useTranslations("BlogDetail");
  const locale = useLocale();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 py-8 border-t border-gray-200">
      {older ? (
        <Link
          href={`/${locale}/blog/${older.href}`}
          className="group flex flex-col gap-1 max-w-xs"
        >
          <span className="flex items-center gap-1 text-xs md:text-sm text-gray-400">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t("olderPost")}
          </span>
          <span className="text-sm md:text-base font-bold text-gray-900 group-hover:underline line-clamp-2">
            {older.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {newer ? (
        <Link
          href={`/${locale}/blog/${newer.href}`}
          className="group flex flex-col gap-1 sm:items-end max-w-xs sm:ml-auto"
        >
          <span className="flex items-center gap-1 text-xs md:text-sm text-gray-400">
            {t("newerPost")}
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
          <span className="text-sm md:text-base font-bold text-gray-900 group-hover:underline line-clamp-2 sm:text-right">
            {newer.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
