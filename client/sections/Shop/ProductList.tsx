"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

const PRODUCTS_PER_PAGE = 5;

const allProducts = [
  {
    name: "Dark Circle Patch",
    price: "$75.00",
    description:
      "A soothing under-eye patch that targets dark circles, puffiness and fine lines for brighter, refreshed eyes.",
    sizes: ["30ml", "50ml"],
    colors: [{ name: "Sky Blue", hex: "#a8d8ea" }],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
    tags: ["Eye Care", "Lift"],
    rating: 4.5,
    href: "/products/dark-circle-patch",
  },
  {
    name: "Glow Eye Patch",
    price: "$90.00",
    description:
      "Vitamin C-infused eye patches that brighten and firm the under-eye area for a radiant, wide-awake look.",
    sizes: ["30ml", "50ml"],
    colors: [{ name: "Gold", hex: "#f0c040" }],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
    tags: ["Eye Care", "Glow"],
    rating: 5.0,
    href: "/products/glow-eye-patch",
  },
  {
    name: "Brighten Serum",
    price: "$160.00",
    description:
      "A powerful brightening serum with 10% AHA and 2% BHA that resurfaces, clears and purifies skin for visible radiance.",
    sizes: ["30ml", "50ml", "100ml"],
    colors: [{ name: "Lavender", hex: "#c9b8d8" }],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
    tags: ["Serum", "Spot"],
    rating: 5.0,
    href: "/products/brighten-serum",
  },
  {
    name: "Pore Detox Scrub",
    price: "$70.00",
    originalPrice: "$100.00",
    discount: "-30%",
    description:
      "A deeply purifying clay scrub that draws out impurities, unclogs pores, and leaves skin feeling smooth, refreshed, and visibly clearer with every use.",
    sizes: ["50ml", "100ml", "200ml"],
    colors: [
      { name: "Pearl White", hex: "#f5f0e8" },
      { name: "Soft Clay", hex: "#c4a882" },
      { name: "Deep Teal", hex: "#1f473e" },
    ],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
    tags: ["Clay", "Serum"],
    rating: 5.0,
    href: "/products/pore-detox-scrub",
  },
  {
    name: "Clear Away Cleanser",
    price: "$26.00",
    description:
      "A gentle detoxifying cleanser that deeply purifies skin, removes impurities and leaves a fresh, balanced complexion.",
    sizes: ["100ml", "200ml"],
    colors: [{ name: "Fresh Green", hex: "#c8e6c9" }],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
    tags: ["Detox", "Purify"],
    rating: 4.5,
    href: "/products/clear-away-cleanser",
  },
  {
    name: "Foam Cleanser",
    price: "$75.00",
    originalPrice: "$84.00",
    discount: "-11%",
    description:
      "A renewing amino acid foam cleanser that gently removes makeup and impurities while nourishing and rebalancing all skin types.",
    sizes: ["100ml", "150ml"],
    colors: [{ name: "Teal", hex: "#1f473e" }],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
    tags: ["Gentle", "Glow"],
    rating: 5.0,
    href: "/products/foam-cleanser",
  },
];

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

  // Sort products
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
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {sorted.length} {t("count")}
        </p>

        {/* Sort dropdown */}
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

      {/* Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {paginated.map((product, i) => (
          <ProductCard key={`${product.href}-${i}`} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {sorted.length > PRODUCTS_PER_PAGE && (
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
