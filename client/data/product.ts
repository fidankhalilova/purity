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
        href: "/shop/clarifying-shampoo",
      },
      {
        name: "Heal Skin Serum",
        price: "$140.00",
        originalPrice: "$150.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        href: "/shop/heal-skin-serum",
      },
    ],
    boughtTogether: [
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        href: "/shop/dark-circle-patch",
        isCurrentItem: true,
      },
      {
        name: "Hydration Drops",
        price: "$120.00",
        originalPrice: "$150.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
        href: "/shop/hydration-drops",
      },
      {
        name: "Daily Glow Cream",
        price: "From $100.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
        href: "/shop/daily-glow-cream",
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
        href: "/shop/dark-circle-patch",
      },
      {
        name: "Glow Eye Patch",
        price: "$90.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
        rating: 5.0,
        ingredient: "Brighten, Hydrate, Energize Eyes.",
        inStock: true,
        href: "/shop/glow-eye-patch",
      },
      {
        name: "Silk Lash Mascara",
        price: "$26.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
        rating: 5.0,
        ingredient: "Lash care: oils, peptides, waxes.",
        inStock: true,
        href: "/shop/silk-lash-mascara",
      },
      {
        name: "Lift Laminate Gel",
        price: "$19.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        rating: 5.0,
        ingredient: "Healthy brows: keratin, aloe.",
        inStock: true,
        href: "/shop/lift-laminate-gel",
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
        body: "I use these every night before bed and I always wake up looking more rested. The formula is gentle and doesn't sting my sensitive skin.",
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
        body: "I've tried many eye patches before, but these are the first that truly made a visible difference.",
        images: [
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_5.jpg?v=1746763913&width=900",
        ],
      },
    ],
  },

  // ─── Product 2 ───────────────────────────────────────────────
  {
    id: "pore-detox-scrub",
    name: "Pore Detox Scrub",
    price: "$70.00",
    originalPrice: "$100.00",
    rating: 5.0,
    reviewCount: 12,
    inStock: true,
    description:
      "A deeply purifying clay scrub that draws out impurities, unclogs pores, and leaves skin feeling smooth, refreshed, and visibly clearer with every use.",
    images: [
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=900",
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
      "Visibly unclogs pores after first use.",
      "Clay-based formula absorbs excess oil.",
      "Suitable for oily and combination skin.",
    ],
    actionImages: [
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=900",
    ],
    productInfo:
      "Kaolin & Bentonite Clay Detox Scrub. 100ml. For oily and combination skin. Exfoliates and purifies in one step.",
    howToUse:
      "Apply a thin layer to damp skin. Massage gently in circular motions for 60 seconds. Rinse thoroughly. Use 2–3 times per week.",
    ingredients:
      "Kaolin Clay, Bentonite, Salicylic Acid, Glycerin, Aloe Vera Extract, Green Tea Extract, Niacinamide, Zinc PCA, Panthenol, Aqua.",
    glowIngredients: [
      {
        tag: "Purifying",
        subtitle: "Oil-Absorbing Clay",
        title: "Kaolin Clay",
        description:
          "Gently draws out impurities and absorbs excess sebum without over-stripping.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=900",
      },
      {
        tag: "Exfoliating",
        subtitle: "Pore-Clearing BHA",
        title: "Salicylic Acid",
        description:
          "Penetrates deep into pores to dissolve buildup and prevent breakouts.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=900",
      },
      {
        tag: "Balancing",
        subtitle: "Sebum Control",
        title: "Zinc PCA",
        description:
          "Regulates oil production and minimises the appearance of enlarged pores.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900",
      },
      {
        tag: "Soothing",
        subtitle: "Anti-Redness",
        title: "Aloe Vera",
        description:
          "Calms post-exfoliation redness and keeps skin balanced and comfortable.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
      },
    ],
    pairsWell: [
      {
        name: "Clear Away Cleanser",
        price: "$26.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        href: "/shop/clear-away-cleanser",
      },
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        href: "/shop/dark-circle-patch",
      },
    ],
    boughtTogether: [
      {
        name: "Pore Detox Scrub",
        price: "$70.00",
        originalPrice: "$100.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=900",
        href: "/shop/pore-detox-scrub",
        isCurrentItem: true,
      },
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        href: "/shop/dark-circle-patch",
      },
      {
        name: "Brighten Serum",
        price: "$160.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        href: "/shop/brighten-serum",
        sizes: ["30ml", "50ml", "100ml"],
      },
    ],
    similarProducts: [
      {
        name: "Pore Detox Scrub",
        price: "$70.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=900",
        rating: 5.0,
        ingredient: "Clay, Salicylic Acid, Zinc.",
        inStock: true,
        href: "/shop/pore-detox-scrub",
      },
      {
        name: "Clear Away Cleanser",
        price: "$26.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        rating: 4.5,
        ingredient: "Detox, Purify blend.",
        inStock: true,
        href: "/shop/clear-away-cleanser",
      },
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        rating: 4.5,
        ingredient: "Caffeine, Niacinamide.",
        inStock: true,
        href: "/shop/dark-circle-patch",
      },
      {
        name: "Brighten Serum",
        price: "$160.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        rating: 5.0,
        ingredient: "AHA, BHA, Niacinamide.",
        inStock: true,
        href: "/shop/brighten-serum",
      },
    ],
    reviews: [
      {
        author: "Sophie M.",
        rating: 5,
        date: "03/10/2026",
        title: "My pores have never looked smaller!",
        body: "I've been using this twice a week for a month and the difference is incredible. My skin feels so clean and my pores are noticeably smaller. The texture is great — not too harsh.",
      },
      {
        author: "Jordan K.",
        rating: 5,
        date: "02/14/2026",
        title: "Best scrub I've ever tried",
        body: "I was skeptical about clay scrubs but this one converted me. It doesn't leave my skin dry or irritated — just clean and balanced. Will definitely repurchase.",
        images: [
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=900",
        ],
      },
      {
        author: "Priya S.",
        rating: 4,
        date: "01/28/2026",
        title: "Great for oily skin",
        body: "Really effective at controlling shine throughout the day. I use it on Sunday nights and my skin stays clearer all week.",
      },
    ],
  },

  // ─── Product 3 ───────────────────────────────────────────────
  {
    id: "brighten-serum",
    name: "Brighten Serum",
    price: "$160.00",
    rating: 5.0,
    reviewCount: 8,
    inStock: true,
    description:
      "A powerful brightening serum with 10% AHA and 2% BHA that resurfaces, clears and purifies skin for visible radiance from the very first application.",
    images: [
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_5.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
    ],
    badges: [
      { icon: "🌿", label: "Cruelty-free" },
      { icon: "✨", label: "Dermatologist Tested" },
      { icon: "✓", label: "Paraben-free" },
    ],
    benefits: [
      "Visibly brightens skin in 2 weeks.",
      "10% AHA + 2% BHA resurfaces texture.",
      "Fades dark spots and uneven tone.",
    ],
    actionImages: [
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900",
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=900",
    ],
    productInfo:
      "10% AHA / 2% BHA Brightening Serum. 30ml. For all skin types. Resurfaces and brightens with consistent use. Apply at night only.",
    howToUse:
      "Apply a few drops to clean, dry skin at night. Avoid the eye area. Follow with moisturiser. Start with 2–3 nights per week and build up. Always use SPF the next morning.",
    ingredients:
      "Glycolic Acid, Lactic Acid, Salicylic Acid, Niacinamide, Hyaluronic Acid, Vitamin C, Aloe Vera, Panthenol, Glycerin, Aqua.",
    glowIngredients: [
      {
        tag: "Brightening",
        subtitle: "10% AHA Blend",
        title: "Glycolic Acid",
        description:
          "Dissolves dead skin cells and resurfaces texture for an instantly smoother, brighter complexion.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=900",
      },
      {
        tag: "Clarifying",
        subtitle: "2% BHA",
        title: "Salicylic Acid",
        description:
          "Works deep inside pores to clear congestion and reduce breakouts.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=900",
      },
      {
        tag: "Evening",
        subtitle: "Tone Corrector",
        title: "Vitamin C",
        description:
          "Neutralises free radicals and fades dark spots for a more even, luminous skin tone.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900",
      },
      {
        tag: "Hydrating",
        subtitle: "Moisture Retention",
        title: "Hyaluronic Acid",
        description:
          "Replenishes moisture lost during exfoliation, keeping skin plump and comfortable.",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=900",
      },
    ],
    pairsWell: [
      {
        name: "Pore Detox Scrub",
        price: "$70.00",
        originalPrice: "$100.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
        href: "/shop/pore-detox-scrub",
      },
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        href: "/shop/dark-circle-patch",
      },
    ],
    boughtTogether: [
      {
        name: "Brighten Serum",
        price: "$160.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=900",
        href: "/shop/brighten-serum",
        isCurrentItem: true,
      },
      {
        name: "Pore Detox Scrub",
        price: "$70.00",
        originalPrice: "$100.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
        href: "/shop/pore-detox-scrub",
      },
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        href: "/shop/dark-circle-patch",
      },
    ],
    similarProducts: [
      {
        name: "Brighten Serum",
        price: "$160.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=900",
        rating: 5.0,
        ingredient: "AHA, BHA, Vitamin C.",
        inStock: true,
        href: "/shop/brighten-serum",
      },
      {
        name: "Pore Detox Scrub",
        price: "$70.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
        rating: 5.0,
        ingredient: "Clay, Salicylic Acid.",
        inStock: true,
        href: "/shop/pore-detox-scrub",
      },
      {
        name: "Dark Circle Patch",
        price: "$75.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        rating: 4.5,
        ingredient: "Caffeine, Niacinamide.",
        inStock: true,
        href: "/shop/dark-circle-patch",
      },
      {
        name: "Clear Away Cleanser",
        price: "$26.00",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
        rating: 4.5,
        ingredient: "Detox, Purify blend.",
        inStock: true,
        href: "/shop/clear-away-cleanser",
      },
    ],
    reviews: [
      {
        author: "Mia C.",
        rating: 5,
        date: "03/15/2026",
        title: "Glow up is real!",
        body: "After two weeks my skin literally glows. Dark spots from old breakouts have faded significantly. This is now a permanent part of my nighttime routine.",
        images: [
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=900",
        ],
      },
      {
        author: "Lena R.",
        rating: 5,
        date: "02/20/2026",
        title: "Worth every penny",
        body: "I was hesitant about the price but this serum genuinely transformed my skin texture. It's smoother, clearer, and my foundation applies so much better now.",
      },
      {
        author: "Nia B.",
        rating: 5,
        date: "01/05/2026",
        title: "The best acid serum I've tried",
        body: "I've used many acid serums and this one is the most effective without being irritating. Start slow, trust the process.",
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
