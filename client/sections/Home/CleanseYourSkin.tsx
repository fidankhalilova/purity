import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";

const productData = [
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=600",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=600",
    name: "Green Tea Foam",
    price: "From $75.00",
    tags: ["Cleanser", "Glow"],
    rating: 5.0,
    href: "/shop/dark-circle-patch",
    description: "A gentle amino acid foam cleanser.",
    sizes: ["100ml", "150ml"],
    colors: [{ name: "Default", hex: "#f0ebe2" }],
  },
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=600",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=600",
    name: "Pink Boost Toner",
    price: "From $120.00",
    tags: ["Glow", "Hydrate"],
    rating: 5.0,
    href: "/shop/pore-detox-scrub",
    description: "A balancing toner for the next steps.",
    sizes: ["150ml", "200ml"],
    colors: [{ name: "Default", hex: "#f0ebe2" }],
  },
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=600",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=600",
    name: "Brighten Serum",
    price: "$160.00",
    tags: ["Serum", "Spot"],
    rating: 5.0,
    href: "/shop/brighten-serum",
    description: "10% AHA + 2% BHA brightening serum.",
    sizes: ["30ml", "50ml"],
    colors: [{ name: "Default", hex: "#f0ebe2" }],
  },
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=600",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=600",
    name: "Nature Detox Mask",
    price: "$90.00",
    tags: ["Detox", "Purity"],
    rating: 5.0,
    href: "/shop/dark-circle-patch",
    description: "A purifying clay mask.",
    sizes: ["75ml", "100ml"],
    colors: [{ name: "Default", hex: "#f0ebe2" }],
  },
];

export default function CleanseYourSkin() {
  const t = useTranslations("HomePage.cleanseYourSkin");
  const steps = t.raw("steps") as string[];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <p className="text-sm text-gray-400 text-center mb-2">{t("tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {productData.map((product, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-gray-400 text-center mb-1">
                {steps[i]}
              </p>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
