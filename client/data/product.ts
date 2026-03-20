import { ProductDetail } from "@/types/product";

export const products: ProductDetail[] = [
  {
    id: "dark-circle-patch",
    name: "Dark Circle Patch",
    price: "$75.00",
    rating: 4.5,
    reviewCount: 4,
    inStock: true,
    description:
      "A lightweight, fast-absorbing cream that brightens, hydrates, and revitalizes your skin for a soft, luminous glow.",
    images: [
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_5.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_6.jpg?v=1746763913&width=900",
    ],
    badges: [
      { icon: "🌿", label: "Cruelty-free" },
      { icon: "🌱", label: "100% Vegan" },
      { icon: "✓", label: "Paraben-free" },
    ],
    benefits: [
      "Clinically proven to clear skin.",
      "Natural formula for glowing skin.",
      "30 pairs / 60 patches",
    ],
    actionImages: [
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_5.jpg?v=1746763913&width=900",
    ],
    productInfo:
      "Caffeine & Hyaluronic Acid Eye Gel Patch. 30 pairs (60 patches). Suitable for all skin types including sensitive skin. Dermatologist tested.",
    howToUse:
      "Apply patches under clean eyes. Leave on for 20–30 minutes. Remove and gently pat in remaining essence. Use 2–3 times per week.",
    ingredients:
      "Water, Caffeine, Sodium Hyaluronate, Niacinamide, Centella Asiatica Extract, Irish Moss Powder, Sodium Guaiazulene Sulfonate, Shea Butter, Glycerin, Panthenol.",
    glowIngredients: [
      {
        tag: "Oily Skin",
        subtitle: "Deep-Cleansing BHA",
        title: "Salicylic Acid",
        description:
          "Clears pores, reduces breakouts, and smooths texture without over-drying.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
      },
      {
        tag: "Centella",
        subtitle: "Soothing Complex",
        title: "Centella Asiatica",
        description:
          "Calms redness, repairs the skin barrier and promotes healing.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900",
      },
      {
        tag: "Hydrating",
        subtitle: "Deep Moisture",
        title: "Hyaluronic Acid",
        description:
          "Draws moisture deep into the skin for lasting plumpness and hydration.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
      },
      {
        tag: "Soothing",
        subtitle: "Anti-Irritant",
        title: "Niacinamide",
        description:
          "Evens skin tone, minimizes pores and reduces the appearance of dark spots.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=900",
      },
    ],
    pairsWell: [
      {
        name: "Clarifying Shampoo",
        price: "From $50.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
        href: "/products/clarifying-shampoo",
      },
      {
        name: "Heal Skin Serum",
        price: "$140.00",
        originalPrice: "$150.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        href: "/products/heal-skin-serum",
      },
    ],
    boughtTogether: [
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        href: "/products/dark-circle-patch",
        isCurrentItem: true,
      },
      {
        name: "Hydration Drops",
        price: "$120.00",
        originalPrice: "$150.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
        href: "/products/hydration-drops",
      },
      {
        name: "Daily Glow Cream",
        price: "From $100.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
        href: "/products/daily-glow-cream",
        sizes: ["50ml", "100ml", "200ml"],
      },
    ],
    similarProducts: [
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        rating: 4.5,
        ingredient: "Eye Care: Caffeine, Niacinamide.",
        inStock: true,
        href: "/products/dark-circle-patch",
      },
      {
        name: "Glow Eye Patch",
        price: "$90.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
        rating: 5.0,
        ingredient: "Brighten, Hydrate, Energize Eyes.",
        inStock: true,
        href: "/products/glow-eye-patch",
      },
      {
        name: "Silk Lash Mascara",
        price: "$26.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
        rating: 5.0,
        ingredient: "Lash care: oils, peptides, waxes.",
        inStock: true,
        href: "/products/silk-lash-mascara",
      },
      {
        name: "Lift Laminate Gel",
        price: "$19.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        rating: 5.0,
        ingredient: "Healthy brows: keratin, aloe.",
        inStock: true,
        href: "/products/lift-laminate-gel",
      },
    ],
    reviews: [
      {
        author: "test 2",
        rating: 5,
        date: "02/21/2026",
        title: "test 2",
        body: "this is performing the test",
      },
      {
        author: "test",
        rating: 3,
        date: "10/10/2025",
        title: "Test",
        body: "Test",
      },
      {
        author: "Isabella D.",
        rating: 5,
        date: "05/07/2025",
        title: "Woke up with brighter eyes!",
        body: "I use these every night before bed and I always wake up looking more rested. The formula is gentle and doesn't sting my sensitive skin. After consistent use, my dark circles are less pronounced and my under-eyes feel more hydrated.",
        images: [
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900",
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=900",
        ],
      },
      {
        author: "Amelia T.",
        rating: 5,
        date: "05/07/2025",
        title: "Actually works on my under-eyes",
        body: "I've tried many eye patches before, but these are the first that truly made a visible difference. They feel incredibly cool and soothing the moment you put them on.",
        images: [
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_5.jpg?v=1746763913&width=900",
        ],
      },
    ],
  },
];

export function getProductById(id: string): ProductDetail | undefined {
  return products.find((p) => p.id === id);
}

export function getAllProductIds(): string[] {
  return products.map((p) => p.id);
}
