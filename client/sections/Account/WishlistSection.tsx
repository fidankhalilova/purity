"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useLocale } from "next-intl";

const initialWishlist = [
  {
    id: "1",
    name: "Dark Circle Patch",
    price: "$75.00",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
    href: "dark-circle-patch",
    inStock: true,
  },
  {
    id: "2",
    name: "Pore Detox Scrub",
    price: "$70.00",
    originalPrice: "$100.00",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
    href: "pore-detox-scrub",
    inStock: true,
  },
  {
    id: "3",
    name: "Brighten Serum",
    price: "$160.00",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
    href: "brighten-serum",
    inStock: false,
  },
];

export default function WishlistSection() {
  const t = useTranslations("AccountPage.wishlist");
  const locale = useLocale();
  const [items, setItems] = useState(initialWishlist);

  const remove = (id: string) => setItems(items.filter((i) => i.id !== id));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <Heart className="w-12 h-12 text-gray-200" />
        <p className="text-lg font-semibold text-gray-900">{t("emptyTitle")}</p>
        <p className="text-sm text-gray-500">{t("emptyDesc")}</p>
        <Link
          href={`/${locale}/shop`}
          className="mt-2 px-6 py-3 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors"
        >
          {t("exploreProducts")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {items.length} {t("savedItems")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-gray-100 overflow-hidden group"
          >
            <Link href={`/${locale}/shop/${item.href}`}>
              <div className="relative w-full aspect-square bg-[#f0ebe2]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                      {t("outOfStock")}
                    </span>
                  </div>
                )}
              </div>
            </Link>
            <div className="p-4 flex flex-col gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-sm font-bold ${(item as any).originalPrice ? "text-[#e8392a]" : "text-gray-900"}`}
                  >
                    {item.price}
                  </span>
                  {(item as any).originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {(item as any).originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  disabled={!item.inStock}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1f473e] text-white text-xs font-medium rounded-full hover:bg-[#163830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {t("addToCart")}
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-red-50 hover:border-red-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
