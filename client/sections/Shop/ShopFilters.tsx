"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";

const filterData = {
  colors: [
    { name: "Blue", hex: "#4A6FA5", count: 1 },
    { name: "Pink", hex: "#F4A7B9", count: 1 },
    { name: "Red", hex: "#E8392A", count: 1 },
    { name: "Purple", hex: "#9B59B6", count: 2 },
    { name: "Yellow", hex: "#F1C40F", count: 1 },
  ],
  sizes: [
    { label: "30ml", count: 4 },
    { label: "50ml", count: 6 },
    { label: "100ml", count: 8 },
    { label: "200ml", count: 3 },
  ],
  brands: [
    { label: "Gently", count: 8 },
    { label: "Elanique", count: 6 },
    { label: "Purity", count: 10 },
    { label: "Lumière", count: 4 },
    { label: "Dermasoft", count: 3 },
  ],
  categories: [
    { label: "Cleanser", count: 7 },
    { label: "Serum", count: 9 },
    { label: "Moisturiser", count: 6 },
    { label: "Eye Care", count: 4 },
    { label: "Toner", count: 3 },
    { label: "Sunscreen", count: 2 },
  ],
  concerns: [
    { label: "Acne", count: 5 },
    { label: "Dark Spots", count: 6 },
    { label: "Hydration", count: 10 },
    { label: "Anti-Aging", count: 7 },
    { label: "Sensitivity", count: 4 },
    { label: "Brightening", count: 8 },
  ],
  formulations: [
    { label: "Gel", count: 5 },
    { label: "Cream", count: 9 },
    { label: "Oil", count: 3 },
    { label: "Foam", count: 4 },
    { label: "Mist", count: 2 },
    { label: "Balm", count: 3 },
  ],
};

export default function ShopFilters() {
  const t = useTranslations("ShopPage.filters");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

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
  const onSale = searchParams?.get("sale") === "true";
  const newArrivals = searchParams?.get("new") === "true";
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
    onSale ? "sale" : "",
    newArrivals ? "new" : "",
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

  const hasActiveFilters = activeCount > 0 || priceMin > 0 || priceMax < 585;

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
      {/* Deals */}
      <div className="py-5">
        <SectionHeader id="deals" label="Deals" />
        {isOpen("deals") && (
          <div className="mt-4 flex flex-col gap-3">
            <CheckboxRow
              label={t("sale")}
              count={12}
              checked={onSale}
              onChange={() => updateURL("sale", onSale ? "" : "true")}
            />
            <CheckboxRow
              label={t("newArrivals")}
              count={8}
              checked={newArrivals}
              onChange={() => updateURL("new", newArrivals ? "" : "true")}
            />
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="py-5">
        <SectionHeader id="availability" label={t("availability")} />
        {isOpen("availability") && (
          <div className="mt-4 flex flex-col gap-3">
            {[
              { label: t("inStock"), count: 30 },
              { label: t("outOfStock"), count: 1 },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() =>
                  toggleSingle("availability", availability, item.label)
                }
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      availability === item.label
                        ? "border-gray-900 bg-gray-900"
                        : "border-gray-300 group-hover:border-gray-500"
                    }`}
                  >
                    {availability === item.label && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <span className="text-sm text-gray-400">{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="py-5">
        <SectionHeader id="category" label={t("category")} />
        {isOpen("category") && (
          <div className="mt-4 flex flex-col gap-3">
            {filterData.categories.map((item) => (
              <CheckboxRow
                key={item.label}
                label={item.label}
                count={item.count}
                checked={selectedCategories.includes(item.label)}
                onChange={() =>
                  toggleMulti("categories", selectedCategories, item.label)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="py-5">
        <SectionHeader id="brand" label={t("brand")} />
        {isOpen("brand") && (
          <div className="mt-4 flex flex-col gap-3">
            {filterData.brands.map((item) => (
              <CheckboxRow
                key={item.label}
                label={item.label}
                count={item.count}
                checked={selectedBrands.includes(item.label)}
                onChange={() =>
                  toggleMulti("brands", selectedBrands, item.label)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Price */}
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

      {/* Color */}
      <div className="py-5">
        <SectionHeader id="color" label={t("color")} />
        {isOpen("color") && (
          <div className="mt-4 flex flex-col gap-3">
            {filterData.colors.map((color) => (
              <div
                key={color.name}
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
                      backgroundColor: color.hex,
                      boxShadow: "0 0 0 1px #e5e7eb",
                    }}
                  />
                  <span className="text-sm text-gray-600">{color.name}</span>
                </div>
                <span className="text-sm text-gray-400">{color.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="py-5">
        <SectionHeader id="size" label={t("size")} />
        {isOpen("size") && (
          <div className="mt-4 flex flex-col gap-3">
            {filterData.sizes.map((size) => (
              <CheckboxRow
                key={size.label}
                label={size.label}
                count={size.count}
                checked={selectedSizes.includes(size.label)}
                onChange={() => toggleMulti("sizes", selectedSizes, size.label)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Concern */}
      <div className="py-5">
        <SectionHeader id="concern" label={t("concern")} />
        {isOpen("concern") && (
          <div className="mt-4 flex flex-col gap-3">
            {filterData.concerns.map((item) => (
              <CheckboxRow
                key={item.label}
                label={item.label}
                count={item.count}
                checked={selectedConcerns.includes(item.label)}
                onChange={() =>
                  toggleMulti("concerns", selectedConcerns, item.label)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Formulation */}
      <div className="py-5">
        <SectionHeader id="formulation" label={t("formulation")} />
        {isOpen("formulation") && (
          <div className="mt-4 flex flex-col gap-3">
            {filterData.formulations.map((item) => (
              <CheckboxRow
                key={item.label}
                label={item.label}
                count={item.count}
                checked={selectedFormulations.includes(item.label)}
                onChange={() =>
                  toggleMulti("formulations", selectedFormulations, item.label)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <div className="py-5">
          <button
            onClick={() => router.push("?", { scroll: false })}
            className="text-sm text-gray-500 underline hover:text-gray-900 transition-colors"
          >
            {t("clearAll")}
          </button>
        </div>
      )}
    </div>
  );

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
            onClick={() => router.push("?", { scroll: false })}
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* Modal sheet — slides up from bottom */}
          <div className="relative w-full bg-white rounded-t-3xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-lg">Filters</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6">
              <FilterContent />
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    router.push("?", { scroll: false });
                    setMobileOpen(false);
                  }}
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
