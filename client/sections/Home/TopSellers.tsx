"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { productService } from "@/services/productService";
import { getImageUrl } from "@/utils/imageUrl";

export default function TopSellers() {
  const t = useTranslations("HomePage.topSellers");
  const tabs = t.raw("tabs") as string[];
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [productsByTab, setProductsByTab] = useState<Record<number, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { products: allProducts } = await productService.getAll(1, 12, {
        status: "active",
        inStock: true,
      });

      // Split products into 3 tabs (4 products per tab)
      const chunkSize = 4;
      const tabsData: Record<number, any[]> = {};
      for (let i = 0; i < 3; i++) {
        tabsData[i] = allProducts
          .slice(i * chunkSize, (i + 1) * chunkSize)
          .map((p: any) => ({
            _id: p._id,
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.originalPrice,
            discount: p.originalPrice
              ? `-${Math.round((1 - parseFloat(p.price.replace("$", "")) / parseFloat(p.originalPrice.replace("$", ""))) * 100)}%`
              : undefined,
            description: p.description,
            sizes:
              p.productSizes?.map((s: any) => ({
                size: s.size,
                inStock: s.inStock !== false,
              })) || [],
            colors:
              p.productColors?.map((c: any) => ({
                name: c.name,
                hex: c.hexCode,
              })) || [],
            image: getImageUrl(p.images?.[0]),
            hoverImage: getImageUrl(p.images?.[1] || p.images?.[0]),
            tags: p.badges?.map((b: any) => b.label).slice(0, 2) || [],
            rating: p.rating,
            href: p.id ? `/shop/${p.id}` : `/shop/${p._id}`,
            inStock: p.inStock,
          }));
      }
      setProductsByTab(tabsData);
    } catch (error) {
      console.error("Error loading top sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTab = (i: number) => {
    if (i === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(i);
      setAnimating(false);
    }, 200);
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 px-4 md:px-6 container mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {t("title")}
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => handleTab(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeTab === i
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-200 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
      >
        {(productsByTab[activeTab] || []).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
