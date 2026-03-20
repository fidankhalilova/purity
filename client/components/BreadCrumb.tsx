"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

const pathToTranslationKey: Record<string, string> = {
  shop: "shop",
  "about-us": "aboutUs",
  blog: "blog",
  "contact-us": "contactUs",
  faq: "faq",
};

interface BreadcrumbProps {
  homeIcon?: React.ReactNode;
  separator?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  overrideLastLabel?: string;
}

export default function Breadcrumb({
  homeIcon = <Home size={16} />,
  separator = <ChevronRight size={14} className="text-gray-400" />,
  className = "container mx-auto pb-4",
  itemClassName = "text-gray-500 hover:text-gray-800 transition-colors text-sm",
  activeClassName = "text-gray-800 font-medium text-sm",
  overrideLastLabel,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const pathSegments = (pathname || "").split("/").filter((segment) => {
    return segment && !["en", "az", "ru"].includes(segment);
  });

  if (pathSegments.length === 0) return null;

  const breadcrumbs = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const translationKey = pathToTranslationKey[segment];
    const isLast = index === pathSegments.length - 1;

    let title: string;
    if (isLast && overrideLastLabel) {
      title = overrideLastLabel;
    } else if (translationKey) {
      title = t(translationKey);
    } else {
      // fallback: prettify the slug
      title = segment
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    return { href: url, title };
  });

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2">
        <li className="flex items-center">
          <Link href="/" className={`flex items-center gap-1 ${itemClassName}`}>
            {homeIcon}
            <span>{t("home")}</span>
          </Link>
        </li>

        <li className="flex items-center">{separator}</li>

        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <Fragment key={item.href}>
              <li className="flex items-center">
                {isLast ? (
                  <span className={activeClassName}>{item.title}</span>
                ) : (
                  <Link href={item.href} className={itemClassName}>
                    {item.title}
                  </Link>
                )}
              </li>
              {!isLast && <li className="flex items-center">{separator}</li>}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
