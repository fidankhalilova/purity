"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";

const tabProducts = {
  0: [
    {
      name: "Dark Circle Patch",
      price: "$75.00",
      rating: 4.5,
      tags: ["Eye Care", "Lift"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Pore Detox Scrub",
      price: "$70.00",
      originalPrice: "$100.00",
      discount: "-30%",
      rating: 5.0,
      tags: ["Clay", "Serum"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
      href: "/shop/pore-detox-scrub",
    },
    {
      name: "Brighten Serum",
      price: "$160.00",
      rating: 5.0,
      tags: ["Serum", "Spot"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
      href: "/shop/brighten-serum",
    },
    {
      name: "Clear Away Cleanser",
      price: "$26.00",
      rating: 4.5,
      tags: ["Detox", "Purify"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
      href: "/shop/clear-away-cleanser",
    },
  ],
  1: [
    {
      name: "Brighten Serum",
      price: "$160.00",
      rating: 5.0,
      tags: ["Serum", "Spot"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
      href: "/shop/brighten-serum",
    },
    {
      name: "Clear Away Cleanser",
      price: "$26.00",
      rating: 4.5,
      tags: ["Detox", "Purify"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
      href: "/shop/clear-away-cleanser",
    },
    {
      name: "Dark Circle Patch",
      price: "$75.00",
      rating: 4.5,
      tags: ["Eye Care", "Lift"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Pore Detox Scrub",
      price: "$70.00",
      originalPrice: "$100.00",
      discount: "-30%",
      rating: 5.0,
      tags: ["Clay", "Serum"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
      href: "/shop/pore-detox-scrub",
    },
  ],
  2: [
    {
      name: "Pore Detox Scrub",
      price: "$70.00",
      originalPrice: "$100.00",
      discount: "-30%",
      rating: 5.0,
      tags: ["Clay", "Serum"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
      href: "/shop/pore-detox-scrub",
    },
    {
      name: "Brighten Serum",
      price: "$160.00",
      rating: 5.0,
      tags: ["Serum", "Spot"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
      href: "/shop/brighten-serum",
    },
    {
      name: "Clear Away Cleanser",
      price: "$26.00",
      rating: 4.5,
      tags: ["Detox", "Purify"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
      href: "/shop/clear-away-cleanser",
    },
    {
      name: "Dark Circle Patch",
      price: "$75.00",
      rating: 4.5,
      tags: ["Eye Care", "Lift"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
  ],
} as Record<number, any[]>;

export default function TopSellers() {
  const t = useTranslations("HomePage.topSellers");
  const tabs = t.raw("tabs") as string[];
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleTab = (i: number) => {
    if (i === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(i);
      setAnimating(false);
    }, 200);
  };

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
        {(tabProducts[activeTab] || []).map((product, i) => (
          <ProductCard key={`${product.href}-${i}`} product={product} />
        ))}
      </div>
    </section>
  );
}
