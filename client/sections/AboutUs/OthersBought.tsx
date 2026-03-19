import ProductCard from "@/components/ProductCard";

export default function OthersBought() {
  return (
    <div>
      <div>
        <h2 className="text-center text-4xl font-semibold text-gray-900 mb-4">
          Others also bought
        </h2>
        <p className="text-center text-sm text-gray-500 mb-12">
          Check out similar products people are loving. Click to explore
          trending styles.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <div>
          <ProductCard
            product={{
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
            }}
          />
        </div>
        <div>
          <ProductCard
            product={{
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
            }}
          />
        </div>
        <div>
          <ProductCard
            product={{
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
            }}
          />
        </div>
        <div>
          <ProductCard
            product={{
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
            }}
          />
        </div>
      </div>
    </div>
  );
}
