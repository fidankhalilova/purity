"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useTranslations } from "next-intl";
import { productService } from "@/services/productService";
import { getImageUrl } from "@/utils/imageUrl";
import { Loader2, RefreshCw } from "lucide-react";

export default function OthersBought() {
  const t = useTranslations("AboutUs.OthersBought");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRandomProducts = async () => {
    try {
      setLoading(true);
      // Fetch all active products
      const { products: allProducts } = await productService.getAll(1, 100, {
        status: "active",
        inStock: true,
      });

      // Randomly select 4 products
      const shuffled = [...allProducts];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const randomProducts = shuffled.slice(0, 4);

      // Map products to the format expected by ProductCard
      const mappedProducts = randomProducts.map((p: any) => ({
        _id: p._id,
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        discount: p.originalPrice
          ? `-${Math.round(
              (1 -
                parseFloat(p.price.replace("$", "")) /
                  parseFloat(p.originalPrice.replace("$", ""))) *
                100,
            )}%`
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

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error loading random products:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadRandomProducts();
  };

  useEffect(() => {
    loadRandomProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-4">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-900">
          {t("title")}
        </h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label="Refresh recommendations"
        >
          <RefreshCw
            className={`w-5 h-5 text-gray-500 ${refreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mb-10 md:mb-12 px-4">
        {t("description")}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
