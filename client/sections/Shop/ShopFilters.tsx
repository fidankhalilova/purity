"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { collectionService } from "@/services/collectionService";
import { tagService } from "@/services/tagService";
import { skinConcernService } from "@/services/skinConcernService";
import { formulationService } from "@/services/formulationService";
import { brandService } from "@/services/brandService";
import { productColorService } from "@/services/productColorService";
import { productSizeService } from "@/services/productSizeService";
import { productService } from "@/services/productService";

export default function ShopFilters() {
  const t = useTranslations("ShopPage.filters");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);
  const [concerns, setConcerns] = useState<any[]>([]);
  const [formulations, setFormulations] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedCollection = searchParams?.get("collection") || "";
  const [selectedCollectionName, setSelectedCollectionName] = useState("");

  const [counts, setCounts] = useState({
    onSale: 0,
    newArrivals: 0,
    inStock: 0,
    outOfStock: 0,
    categories: {} as Record<string, number>,
    brands: {} as Record<string, number>,
    colors: {} as Record<string, number>,
    sizes: {} as Record<string, number>,
    concerns: {} as Record<string, number>,
    formulations: {} as Record<string, number>,
  });

  useEffect(() => {
    loadFilterData();
    loadFilterCounts();
  }, []);

  useEffect(() => {
    const loadCollectionName = async () => {
      if (selectedCollection) {
        try {
          const collection =
            await collectionService.getById(selectedCollection);
          setSelectedCollectionName(collection.name);
        } catch (error) {
          console.error("Error loading collection:", error);
          setSelectedCollectionName("");
        }
      } else {
        setSelectedCollectionName("");
      }
    };
    loadCollectionName();
  }, [selectedCollection]);

  const loadFilterData = async () => {
    try {
      const [
        categoriesData,
        brandsData,
        colorsData,
        sizesData,
        concernsData,
        formulationsData,
        tagsData,
      ] = await Promise.all([
        collectionService.getAll(),
        brandService.getAll(),
        productColorService.getAll(),
        productSizeService.getAll(),
        skinConcernService.getAll(),
        formulationService.getAll(),
        tagService.getAll(),
      ]);

      setCategories(categoriesData.filter((c) => c.isActive));
      setBrands(brandsData.filter((b) => b.isActive));
      setColors(colorsData);
      setSizes(sizesData);
      setConcerns(concernsData);
      setFormulations(formulationsData.filter((f) => f.isActive));
      setTags(tagsData);
    } catch (error) {
      console.error("Error loading filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFilterCounts = async () => {
    try {
      const { products } = await productService.getAll(1, 1000);

      const onSaleCount = products.filter(
        (p) => p.originalPrice && p.originalPrice !== "",
      ).length;
      const newArrivalsCount = products.filter((p) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return p.createdAt && new Date(p.createdAt) >= thirtyDaysAgo;
      }).length;
      const inStockCount = products.filter((p) => p.inStock).length;
      const outOfStockCount = products.filter((p) => !p.inStock).length;

      const categoryCounts: Record<string, number> = {};
      products.forEach((p) => {
        if (p.collection && typeof p.collection === "object") {
          const name = p.collection.name;
          categoryCounts[name] = (categoryCounts[name] || 0) + 1;
        }
      });

      const brandCounts: Record<string, number> = {};
      products.forEach((p) => {
        if (p.brand && typeof p.brand === "object") {
          const name = p.brand.name;
          brandCounts[name] = (brandCounts[name] || 0) + 1;
        }
      });

      const colorCounts: Record<string, number> = {};
      products.forEach((p) => {
        if (p.productColors && Array.isArray(p.productColors)) {
          p.productColors.forEach((c: any) => {
            if (c.name) {
              colorCounts[c.name] = (colorCounts[c.name] || 0) + 1;
            }
          });
        }
      });

      const sizeCounts: Record<string, number> = {};
      products.forEach((p) => {
        if (p.productSizes && Array.isArray(p.productSizes)) {
          p.productSizes.forEach((s: any) => {
            if (s.size) {
              sizeCounts[s.size] = (sizeCounts[s.size] || 0) + 1;
            }
          });
        }
      });

      const concernCounts: Record<string, number> = {};
      products.forEach((p) => {
        if (p.skinConcerns && Array.isArray(p.skinConcerns)) {
          p.skinConcerns.forEach((c: any) => {
            const name = typeof c === "object" ? c.name : c;
            if (name) {
              concernCounts[name] = (concernCounts[name] || 0) + 1;
            }
          });
        }
      });

      const formulationCounts: Record<string, number> = {};
      products.forEach((p) => {
        if (p.formulation && typeof p.formulation === "object") {
          const name = p.formulation.name;
          formulationCounts[name] = (formulationCounts[name] || 0) + 1;
        }
      });

      setCounts({
        onSale: onSaleCount,
        newArrivals: newArrivalsCount,
        inStock: inStockCount,
        outOfStock: outOfStockCount,
        categories: categoryCounts,
        brands: brandCounts,
        colors: colorCounts,
        sizes: sizeCounts,
        concerns: concernCounts,
        formulations: formulationCounts,
      });
    } catch (error) {
      console.error("Error loading filter counts:", error);
    }
  };

  const availability = searchParams?.get("availability") || "";
  const priceMin = Number(searchParams?.get("priceMin")) || 0;
  const priceMax = Number(searchParams?.get("priceMax")) || 585;
  const selectedColors =
    searchParams?.get("colors")?.split(",").filter(Boolean) || [];
  const selectedSizes =
    searchParams?.get("sizes")?.split(",").filter(Boolean) || [];
  const selectedBrands =
    searchParams?.get("brands")?.split(",").filter(Boolean) || [];
  const selectedCategories =
    searchParams?.get("categories")?.split(",").filter(Boolean) || [];
  const selectedConcerns =
    searchParams?.get("concerns")?.split(",").filter(Boolean) || [];
  const selectedFormulations =
    searchParams?.get("formulations")?.split(",").filter(Boolean) || [];
  const selectedTags =
    searchParams?.get("tags")?.split(",").filter(Boolean) || [];
  const onSale = searchParams?.get("sale") === "true";
  const newArrivals = searchParams?.get("new") === "true";
  const collectionFilter = searchParams?.get("collection") || "";
  const closedSections =
    searchParams?.get("closed")?.split(",").filter(Boolean) || [];

  const activeCount = [
    availability,
    ...selectedColors,
    ...selectedSizes,
    ...selectedBrands,
    ...selectedCategories,
    ...selectedConcerns,
    ...selectedFormulations,
    ...selectedTags,
    onSale ? "sale" : "",
    newArrivals ? "new" : "",
    collectionFilter ? "collection" : "",
  ].filter(Boolean).length;

  const isOpen = (id: string) => !closedSections.includes(id);

  const updateURL = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams();
    const page = searchParams?.get("page");
    if (page) params.set("page", page);
    router.push(`?${params.toString()}`, { scroll: false });
    setMobileOpen(false);
  }, [router, searchParams]);

  const toggleSection = (id: string) => {
    const updated = isOpen(id)
      ? [...closedSections, id]
      : closedSections.filter((s) => s !== id);
    updateURL("closed", updated.join(","));
  };

  const toggleMulti = (key: string, current: string[], value: string) => {
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateURL(key, updated.join(","));
  };

  const toggleSingle = (key: string, current: string, value: string) => {
    updateURL(key, current === value ? "" : value);
  };

  const updatePrice = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("priceMin", String(min));
    params.set("priceMax", String(max));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const hasActiveFilters =
    activeCount > 0 ||
    priceMin > 0 ||
    priceMax < 585 ||
    !!collectionFilter ||
    !!selectedCollection;

  const SectionHeader = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between py-1"
    >
      <span className="font-bold text-gray-900">{label}</span>
      <svg
        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen(id) ? "" : "rotate-180"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );

  const CheckboxRow = ({
    label,
    count,
    checked,
    onChange,
  }: {
    label: string;
    count: number;
    checked: boolean;
    onChange: () => void;
  }) => (
    <div
      onClick={onChange}
      className="flex items-center justify-between cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            checked
              ? "border-gray-900 bg-gray-900"
              : "border-gray-300 group-hover:border-gray-500"
          }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm text-gray-400">{count}</span>
    </div>
  );

  const FilterContent = () => (
    <div className="flex flex-col divide-y divide-gray-100">
      <div className="py-5">
        <SectionHeader id="deals" label="Deals" />
        {isOpen("deals") && (
          <div className="mt-4 flex flex-col gap-3">
            <CheckboxRow
              label={t("sale")}
              count={counts.onSale}
              checked={onSale}
              onChange={() => updateURL("sale", onSale ? "" : "true")}
            />
            <CheckboxRow
              label={t("newArrivals")}
              count={counts.newArrivals}
              checked={newArrivals}
              onChange={() => updateURL("new", newArrivals ? "" : "true")}
            />
          </div>
        )}
      </div>

      {selectedCollection && selectedCollectionName && (
        <div className="py-5">
          <div className="mb-3">
            <span className="font-bold text-gray-900">Active Filter</span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Collection:</span>
              <span className="text-sm font-medium text-gray-900">
                {selectedCollectionName}
              </span>
            </div>
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams?.toString());
                params.delete("collection");
                params.delete("page");
                router.push(`?${params.toString()}`, { scroll: false });
              }}
              className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      <div className="py-5">
        <SectionHeader id="availability" label={t("availability")} />
        {isOpen("availability") && (
          <div className="mt-4 flex flex-col gap-3">
            <CheckboxRow
              label={t("inStock")}
              count={counts.inStock}
              checked={availability === "inStock"}
              onChange={() =>
                toggleSingle("availability", availability, "inStock")
              }
            />
            <CheckboxRow
              label={t("outOfStock")}
              count={counts.outOfStock}
              checked={availability === "outOfStock"}
              onChange={() =>
                toggleSingle("availability", availability, "outOfStock")
              }
            />
          </div>
        )}
      </div>

      {categories.length > 0 && (
        <div className="py-5">
          <SectionHeader id="category" label={t("category")} />
          {isOpen("category") && (
            <div className="mt-4 flex flex-col gap-3">
              {categories.map((item) => (
                <CheckboxRow
                  key={item._id}
                  label={item.name}
                  count={counts.categories[item.name] || 0}
                  checked={selectedCategories.includes(item.name)}
                  onChange={() =>
                    toggleMulti("categories", selectedCategories, item.name)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {brands.length > 0 && (
        <div className="py-5">
          <SectionHeader id="brand" label={t("brand")} />
          {isOpen("brand") && (
            <div className="mt-4 flex flex-col gap-3">
              {brands.map((item) => (
                <CheckboxRow
                  key={item._id}
                  label={item.name}
                  count={counts.brands[item.name] || 0}
                  checked={selectedBrands.includes(item.name)}
                  onChange={() =>
                    toggleMulti("brands", selectedBrands, item.name)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="py-5">
        <SectionHeader id="price" label={t("price")} />
        {isOpen("price") && (
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-sm text-gray-500">{t("highestPrice")}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-2 flex-1">
                <span className="text-sm text-gray-400">$</span>
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) =>
                    updatePrice(Number(e.target.value), priceMax)
                  }
                  className="w-full text-sm text-gray-700 outline-none bg-transparent"
                />
              </div>
              <span className="text-gray-400">—</span>
              <div className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-2 flex-1">
                <span className="text-sm text-gray-400">$</span>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) =>
                    updatePrice(priceMin, Number(e.target.value))
                  }
                  className="w-full text-sm text-gray-700 outline-none bg-transparent"
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={585}
              value={priceMax}
              onChange={(e) => updatePrice(priceMin, Number(e.target.value))}
              className="w-full accent-gray-900"
            />
          </div>
        )}
      </div>

      {colors.length > 0 && (
        <div className="py-5">
          <SectionHeader id="color" label={t("color")} />
          {isOpen("color") && (
            <div className="mt-4 flex flex-col gap-3">
              {colors.map((color) => (
                <div
                  key={color._id}
                  onClick={() =>
                    toggleMulti("colors", selectedColors, color.name)
                  }
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColors.includes(color.name)
                          ? "border-gray-900 scale-110"
                          : "border-transparent"
                      }`}
                      style={{
                        backgroundColor: color.hexCode,
                        boxShadow: "0 0 0 1px #e5e7eb",
                      }}
                    />
                    <span className="text-sm text-gray-600">{color.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {counts.colors[color.name] || 0}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {sizes.length > 0 && (
        <div className="py-5">
          <SectionHeader id="size" label={t("size")} />
          {isOpen("size") && (
            <div className="mt-4 flex flex-col gap-3">
              {sizes.map((size) => (
                <CheckboxRow
                  key={size._id}
                  label={size.size}
                  count={counts.sizes[size.size] || 0}
                  checked={selectedSizes.includes(size.size)}
                  onChange={() =>
                    toggleMulti("sizes", selectedSizes, size.size)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {concerns.length > 0 && (
        <div className="py-5">
          <SectionHeader id="concern" label={t("concern")} />
          {isOpen("concern") && (
            <div className="mt-4 flex flex-col gap-3">
              {concerns.map((item) => (
                <CheckboxRow
                  key={item._id}
                  label={item.name}
                  count={counts.concerns[item.name] || 0}
                  checked={selectedConcerns.includes(item.name)}
                  onChange={() =>
                    toggleMulti("concerns", selectedConcerns, item.name)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {formulations.length > 0 && (
        <div className="py-5">
          <SectionHeader id="formulation" label={t("formulation")} />
          {isOpen("formulation") && (
            <div className="mt-4 flex flex-col gap-3">
              {formulations.map((item) => (
                <CheckboxRow
                  key={item._id}
                  label={item.name}
                  count={counts.formulations[item.name] || 0}
                  checked={selectedFormulations.includes(item.name)}
                  onChange={() =>
                    toggleMulti("formulations", selectedFormulations, item.name)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {hasActiveFilters && (
        <div className="py-5">
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 underline hover:text-gray-900 transition-colors"
          >
            {t("clearAll")}
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden flex items-center gap-3 mb-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-gray-900 text-white rounded-2xl text-sm font-medium active:scale-95 transition-transform"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-gray-900 text-xs font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1.5 px-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-500 hover:border-gray-400 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>

      {/* Mobile modal */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-full bg-white rounded-t-3xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-lg">Filters</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <FilterContent />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-3.5 bg-[#1f473e] text-white text-sm font-medium rounded-2xl hover:bg-[#163830] transition-colors"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
