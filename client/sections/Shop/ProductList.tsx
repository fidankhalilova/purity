"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { products } from "@/data/product";

const PRODUCTS_PER_PAGE = 5;

export default function ProductList() {
  const t = useTranslations("ShopPage.products");
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortOptions = t.raw("sortOptions") as string[];

  const urlPage = Number(searchParams?.get("page")) || 1;
  const urlSort = searchParams?.get("sort") || sortOptions[0];
  const [sort, setSort] = useState(urlSort);
  const [page, setPage] = useState(urlPage);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    setPage(Number(searchParams?.get("page")) || 1);
    setSort(searchParams?.get("sort") || sortOptions[0]);
  }, [searchParams]);

  const updateURL = (newPage: number, newSort: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", String(newPage));
    params.set("sort", newSort);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSort = (opt: string) => {
    setSort(opt);
    setPage(1);
    updateURL(1, opt);
    setSortOpen(false);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    updateURL(p, sort);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map ProductDetail to ProductCard shape
  const allProducts = products.map((p) => ({
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.originalPrice
      ? `-${Math.round((1 - parseFloat(p.price.replace("$", "")) / parseFloat(p.originalPrice.replace("$", ""))) * 100)}%`
      : undefined,
    description: p.description,
    sizes:
      p.glowIngredients.length > 0
        ? ["30ml", "50ml", "100ml"]
        : ["50ml", "100ml"],
    colors: [{ name: "Default", hex: "#f0ebe2" }],
    image: p.images[0],
    hoverImage: p.images[1] ?? p.images[0],
    tags: p.badges.map((b) => b.label).slice(0, 2),
    rating: p.rating,
    href: `/shop/${p.id}`,
  }));

  const sorted = [...allProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace("$", ""));
    const priceB = parseFloat(b.price.replace("$", ""));
    if (sort === sortOptions[1]) return priceA - priceB;
    if (sort === sortOptions[2]) return priceB - priceA;
    if (sort === sortOptions[4]) return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PRODUCTS_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {sorted.length} {t("count")}
        </p>

        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 font-medium"
          >
            <span className="text-gray-400 hidden sm:inline">
              {t("sortBy")}
            </span>
            <span className="truncate max-w-30 sm:max-w-none">{sort}</span>
            <svg
              className="w-4 h-4 text-gray-500 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-2xl shadow-sm py-2 min-w-48">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSort(opt)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                    sort === opt
                      ? "font-semibold text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {paginated.map((product, i) => (
          <ProductCard key={`${product.href}-${i}`} product={product} />
        ))}
      </div>

      {sorted.length > PRODUCTS_PER_PAGE && (
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
