"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProductDetail } from "@/types/product";

export default function ProductAccordion({
  product,
}: {
  product: ProductDetail;
}) {
  const t = useTranslations("ProductDetail");
  const [open, setOpen] = useState<string | null>(null);

  const sections = [
    { id: "info", label: t("productInfo"), key: "productInfo" as const },
    { id: "how", label: t("howToUse"), key: "howToUse" as const },
    { id: "ingredients", label: t("ingredients"), key: "ingredients" as const },
  ];

  return (
    <div className="border-t border-gray-100 mt-4">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-gray-100">
          <button
            onClick={() => setOpen(open === section.id ? null : section.id)}
            className="w-full flex items-center justify-between py-4 md:py-5 text-left"
          >
            <span className="font-semibold text-gray-900 text-sm md:text-base">
              {section.label}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open === section.id ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {open === section.id && (
            <p className="text-sm text-gray-600 leading-relaxed pb-5">
              {product[section.key]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
