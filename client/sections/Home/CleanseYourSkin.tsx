"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { productService } from "@/services/productService";
import { getImageUrl } from "@/utils/imageUrl";

export default function CleanseYourSkin() {
  const t = useTranslations("HomePage.cleanseYourSkin");
  const steps = t.raw("steps") as string[];
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { products: allProducts } = await productService.getAll(1, 4, {
        status: "active",
        inStock: true,
      });

      const mappedProducts = allProducts.map((p: any) => ({
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

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error loading cleanse products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto">
        <div className="mb-10">
          <p className="text-sm text-gray-400 text-center mb-2">{t("tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, i) => (
            <div key={product._id} className="flex flex-col gap-2">
              {steps[i] && (
                <p className="text-sm font-semibold text-gray-400 text-center mb-1">
                  {steps[i]}
                </p>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
