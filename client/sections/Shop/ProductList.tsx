"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { productService } from "@/services/productService";
import { getImageUrl } from "@/utils/imageUrl";

const PRODUCTS_PER_PAGE = 7;

export default function ProductList() {
  const t = useTranslations("ShopPage.products");
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortOptions = t.raw("sortOptions") as string[];

  // Get filter values from URL
  const urlPage = Number(searchParams?.get("page")) || 1;
  const urlSort = searchParams?.get("sort") || sortOptions[0];
  const searchQuery = searchParams?.get("search") || "";
  const selectedCollection = searchParams?.get("collection") || "";
  const selectedTag = searchParams?.get("tag") || "";
  const inStockOnly = searchParams?.get("inStock") === "true";
  const priceMin = Number(searchParams?.get("priceMin")) || 0;
  const priceMax = Number(searchParams?.get("priceMax")) || 1000;
  const selectedColors = useMemo(
    () => searchParams?.get("colors")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const selectedSizes = useMemo(
    () => searchParams?.get("sizes")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const selectedBrands = useMemo(
    () => searchParams?.get("brands")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const selectedCategories = useMemo(
    () => searchParams?.get("categories")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const selectedConcerns = useMemo(
    () => searchParams?.get("concerns")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const selectedFormulations = useMemo(
    () => searchParams?.get("formulations")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const onSale = searchParams?.get("sale") === "true";
  const newArrivals = searchParams?.get("new") === "true";

  const [sort, setSort] = useState(urlSort);
  const [page, setPage] = useState(urlPage);
  const [sortOpen, setSortOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setPage(Number(searchParams?.get("page")) || 1);
    setSort(searchParams?.get("sort") || sortOptions[0]);
  }, [searchParams, sortOptions]);

  const getSortField = useCallback(
    (sortValue: string): string => {
      if (sortValue === sortOptions[1]) return "price";
      if (sortValue === sortOptions[2]) return "price";
      if (sortValue === sortOptions[4]) return "rating";
      return "createdAt";
    },
    [sortOptions],
  );

  const getSortOrder = useCallback(
    (sortValue: string): "asc" | "desc" => {
      if (sortValue === sortOptions[2]) return "desc";
      if (sortValue === sortOptions[1]) return "asc";
      return "desc";
    },
    [sortOptions],
  );

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const options: any = {
        sort: getSortField(sort),
        order: getSortOrder(sort),
      };

      if (searchQuery) options.search = searchQuery;
      if (selectedCollection) options.collection = selectedCollection;
      if (selectedTag) options.tag = selectedTag;
      if (inStockOnly) options.inStock = true;
      if (priceMin > 0) options.priceMin = priceMin;
      if (priceMax < 1000) options.priceMax = priceMax;
      if (selectedColors.length > 0) options.colors = selectedColors;
      if (selectedSizes.length > 0) options.sizes = selectedSizes;
      if (selectedBrands.length > 0) options.brands = selectedBrands;
      if (selectedCategories.length > 0)
        options.categories = selectedCategories;
      if (selectedConcerns.length > 0) options.concerns = selectedConcerns;
      if (selectedFormulations.length > 0)
        options.formulations = selectedFormulations;
      if (onSale) options.onSale = true;
      if (newArrivals) options.newArrivals = true;

      console.log("Loading products with options:", options);

      const data = await productService.getAll(
        page,
        PRODUCTS_PER_PAGE,
        options,
      );

      // In ProductList.tsx, update the product mapping to include proper sizes and colors

      const mappedProducts = data.products.map((p: any) => {
        // Process sizes - check if productSizes exists and is an array
        let sizes = [];
        if (p.productSizes && Array.isArray(p.productSizes)) {
          sizes = p.productSizes
            .filter((s: any) => s && s.size) // Filter out invalid entries
            .map((s: any) => ({
              size: s.size,
              inStock: s.inStock !== false,
              price: s.price,
            }));
        }

        // Process colors - check if productColors exists and is an array
        let colors = [];
        if (p.productColors && Array.isArray(p.productColors)) {
          colors = p.productColors
            .filter((c: any) => c && c.name && c.hexCode) // Filter out invalid entries
            .map((c: any) => ({
              name: c.name,
              hex: c.hexCode,
              inStock: p.inStock !== false,
            }));
        }

        return {
          _id: p._id,
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          discount: p.originalPrice
            ? `-${Math.round((1 - parseFloat(p.price.replace("$", "")) / parseFloat(p.originalPrice.replace("$", ""))) * 100)}%`
            : undefined,
          description: p.description,
          sizes: sizes,
          colors: colors,
          image: getImageUrl(p.images?.[0]),
          hoverImage: getImageUrl(p.images?.[1] || p.images?.[0]),
          tags: p.badges?.map((b: any) => b.label).slice(0, 2) || [],
          rating: p.rating,
          href: p.id ? `/shop/${p.id}` : `/shop/${p._id}`,
          inStock: p.inStock,
        };
      });

      setProducts(mappedProducts);
      setTotalPages(data.pagination.pages);
      setTotalProducts(data.pagination.total);
    } catch (error) {
      console.error("Error loading products:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [
    page,
    sort,
    searchQuery,
    selectedCollection,
    selectedTag,
    inStockOnly,
    priceMin,
    priceMax,
    selectedColors,
    selectedSizes,
    selectedBrands,
    selectedCategories,
    selectedConcerns,
    selectedFormulations,
    onSale,
    newArrivals,
    getSortField,
    getSortOrder,
  ]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadProducts();
      return;
    }

    if (
      page !== 1 &&
      (searchParams?.get("page") === null || searchParams?.get("page") === "1")
    ) {
      setPage(1);
      return;
    }

    loadProducts();
  }, [loadProducts, page, searchParams]);

  const updateURL = useCallback(
    (newPage: number, newSort: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("page", String(newPage));
      params.set("sort", newSort);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSort = useCallback(
    (opt: string) => {
      setSort(opt);
      setPage(1);
      updateURL(1, opt);
      setSortOpen(false);
    },
    [updateURL],
  );

  const handlePageChange = useCallback(
    (p: number) => {
      setPage(p);
      updateURL(p, sort);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateURL, sort],
  );

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));
      if (sort === sortOptions[1]) return priceA - priceB;
      if (sort === sortOptions[2]) return priceB - priceA;
      if (sort === sortOptions[4]) return b.rating - a.rating;
      return 0;
    });
  }, [products, sort, sortOptions]);

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => loadProducts()}
          className="px-4 py-2 bg-[#1f473e] text-white rounded-full text-sm hover:bg-[#163830]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {totalProducts} {t("count")}
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

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentPage={page}
            />
          )}
        </>
      )}
    </div>
  );
}
