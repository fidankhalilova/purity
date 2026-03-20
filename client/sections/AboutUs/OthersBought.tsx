import ProductCard from "@/components/ProductCard";
import { useTranslations } from "next-intl";

const products = [
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
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
    tags: ["Clay", "Serum"],
    rating: 5.0,
    href: "/products/pore-detox-scrub",
  },
  {
    name: "Soothing Eye Remover",
    price: "$12.00",
    description:
      "A gentle, effective eye makeup remover that soothes and hydrates the delicate eye area.",
    sizes: ["50ml", "100ml"],
    colors: [{ name: "Sky Blue", hex: "#a8d8ea" }],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
    tags: ["Calm", "Eye"],
    rating: 5.0,
    href: "/products/soothing-eye-remover",
  },
  {
    name: "Clear Away Cleanser",
    price: "$26.00",
    description:
      "A gentle detoxifying cleanser that deeply purifies skin and leaves a fresh, balanced complexion.",
    sizes: ["100ml", "200ml"],
    colors: [{ name: "Fresh Green", hex: "#c8e6c9" }],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
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
      "A renewing foam cleanser that gently removes makeup and impurities while nourishing all skin types.",
    sizes: ["100ml", "150ml"],
    colors: [{ name: "Teal", hex: "#1f473e" }],
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
    tags: ["Gentle", "Glow"],
    rating: 5.0,
    href: "/products/foam-cleanser",
  },
];

export default function OthersBought() {
  const t = useTranslations("AboutUs.OthersBought");

  return (
    <div>
      <div>
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          {t("title")}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-10 md:mb-12 px-4">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {products.map((product, i) => (
          <ProductCard key={`${product.href}-${i}`} product={product} />
        ))}
      </div>
    </div>
  );
}
