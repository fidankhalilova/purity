import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "glow-in-3-steps",
    category: "Beauty Inspirations",
    title: "Get The Look: Glow in 3 Steps",
    date: "May 01 2025",
    author: "Olivia Bennett",
    excerpt:
      "Achieving a flawless, radiant look doesn't have to be time-consuming.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Tips"],
    comments: 0,
    older: {
      title: "Beginner's Guide to Skin Cycling",
      href: "/en/blog/skin-cycling",
    },
    blocks: [
      {
        type: "intro",
        text: "Achieving a flawless, radiant look doesn't have to be time-consuming or complicated—discover how three simple, nourishing products can transform your face from bare to beautiful in just minutes!",
      },
      { type: "h2", text: "Step 1: Full Coverage Cream" },
      {
        type: "link-p",
        parts: [
          { text: "Start with a fresh, even complexion by using " },
          {
            text: "Full Coverage Cream",
            href: "/products/full-coverage-cream",
          },
          {
            text: ". This product provides a flawless base, covering blemishes while allowing your natural skin to shine through.",
          },
        ],
      },
      {
        type: "tip",
        text: "For extra coverage, apply a second layer to any areas that need attention. This will leave you with a dewy, fresh finish.",
      },
      { type: "h2", text: "Step 2: Bold Lash Mascara" },
      {
        type: "link-p",
        parts: [
          { text: "Give your lashes a dramatic boost with " },
          { text: "Bold Lash Mascara", href: "/products/bold-lash-mascara" },
          {
            text: ". This mascara adds volume and definition for a fuller, thicker appearance.",
          },
        ],
      },
      {
        type: "tip",
        text: "Apply a few coats for more intense volume, wiggling the wand upwards from the base for maximum lift.",
      },
      { type: "h2", text: "Step 3: Glossy Lipstick" },
      {
        type: "link-p",
        parts: [
          { text: "Complete the look with " },
          { text: "Glossy Lipstick", href: "/products/glossy-lipstick" },
          {
            text: " for a gorgeous burst of color and shine. Choose from a soft nude to a bold red.",
          },
        ],
      },
      {
        type: "tip",
        text: "Use a lip liner before applying to outline and shape your lips for a more polished finish.",
      },
      {
        type: "image",
        src: "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
        alt: "Glossy Lipstick shades",
        caption: "Choose your perfect shade",
      },
      { type: "h2", text: "The Final Look: Bold & Beautiful" },
      {
        type: "p",
        text: "With these three simple steps, you've created a perfect, balanced makeup look that's both natural and bold.",
      },
      {
        type: "p",
        text: "Whether you're headed to work or heading out for a night, this simple three-step routine will get you done!",
      },
    ],
  },
  {
    id: "skin-cycling",
    category: "Self-Care",
    title: "Beginner's Guide to Skin Cycling",
    date: "Apr 27 2025",
    author: "Olivia Bennett",
    excerpt: "Skin cycling is the new skincare trend everyone's talking about.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Self-Care"],
    comments: 0,
    newer: {
      title: "Get The Look: Glow in 3 Steps",
      href: "/en/blog/glow-in-3-steps",
    },
    older: {
      title: "Best Way to Layer Your Products",
      href: "/en/blog/layer-your-products",
    },
    blocks: [
      {
        type: "intro",
        text: "Skin cycling is a structured routine that gives your skin time to recover between active ingredient nights.",
      },
      { type: "h2", text: "What is Skin Cycling?" },
      {
        type: "p",
        text: "The concept involves rotating your actives — retinol and exfoliants — across a 4-night cycle, followed by recovery nights.",
      },
      { type: "h2", text: "The 4-Night Cycle" },
      {
        type: "p",
        text: "Night 1: Exfoliation. Night 2: Retinol. Night 3 & 4: Recovery with moisturiser and barrier-support ingredients.",
      },
      {
        type: "tip",
        text: "If you're new to retinol, start with a low concentration and increase gradually to avoid irritation.",
      },
    ],
  },
  {
    id: "layer-your-products",
    category: "Tips",
    title: "Best Way to Layer Your Products",
    date: "Apr 26 2025",
    author: "Olivia Bennett",
    excerpt: "Layering your skincare correctly makes all the difference.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Tips"],
    comments: 0,
    newer: {
      title: "Beginner's Guide to Skin Cycling",
      href: "/en/blog/skin-cycling",
    },
    older: {
      title: "Top Sets for Holiday Self-Care",
      href: "/en/blog/holiday-self-care",
    },
    blocks: [
      {
        type: "intro",
        text: "Applying your skincare in the correct order ensures each product can absorb properly and work at its full potential.",
      },
      { type: "h2", text: "The Golden Rule: Thinnest to Thickest" },
      {
        type: "p",
        text: "Always apply products from the lightest to the heaviest consistency — toner, essence, serum, moisturiser, oil, SPF.",
      },
      {
        type: "tip",
        text: "Wait 30–60 seconds between each layer to allow proper absorption before applying the next product.",
      },
    ],
  },
  {
    id: "holiday-self-care",
    category: "Gifting",
    title: "Top Sets for Holiday Self-Care",
    date: "Mar 31 2025",
    author: "Olivia Bennett",
    excerpt: "The holidays are hectic—but your self-care doesn't have to be.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Gifting"],
    comments: 0,
    newer: {
      title: "Best Way to Layer Your Products",
      href: "/en/blog/layer-your-products",
    },
    older: {
      title: "Your Winter Skincare Routine",
      href: "/en/blog/winter-skincare",
    },
    blocks: [
      {
        type: "intro",
        text: "The holidays are hectic—but your self-care doesn't have to be. Whether winding down solo or gifting glow to someone special, we have the perfect sets.",
      },
      { type: "h2", text: "Why Gift Skincare?" },
      {
        type: "p",
        text: "Skincare gifts feel personal, luxurious, and genuinely useful. They show thoughtfulness beyond the ordinary.",
      },
    ],
  },
  {
    id: "winter-skincare",
    category: "Holidays",
    title: "Your Winter Skincare Routine",
    date: "Mar 20 2025",
    author: "Olivia Bennett",
    excerpt: "Cold weather calls for extra care.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Holidays"],
    comments: 0,
    newer: {
      title: "Top Sets for Holiday Self-Care",
      href: "/en/blog/holiday-self-care",
    },
    older: {
      title: "The Products We Can't Stop Using",
      href: "/en/blog/editors-picks",
    },
    blocks: [
      {
        type: "intro",
        text: "Cold weather strips moisture from your skin faster than any other season. Here's how to keep your barrier strong all winter.",
      },
      { type: "h2", text: "Switch to a Richer Moisturiser" },
      {
        type: "p",
        text: "Your summer gel moisturiser won't cut it in winter. Look for cream-based formulas with ceramides and hyaluronic acid.",
      },
      {
        type: "tip",
        text: "Apply your moisturiser while your skin is still slightly damp from cleansing to lock in extra hydration.",
      },
    ],
  },
  {
    id: "editors-picks",
    category: "Editor's Pick",
    title: "The Products We Can't Stop Using",
    date: "Mar 10 2025",
    author: "Olivia Bennett",
    excerpt: "Our editors share their all-time favourite Purity products.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Editor's Pick"],
    comments: 0,
    newer: {
      title: "Your Winter Skincare Routine",
      href: "/en/blog/winter-skincare",
    },
    older: {
      title: "Morning Rituals That Actually Work",
      href: "/en/blog/morning-rituals",
    },
    blocks: [
      {
        type: "intro",
        text: "After months of testing, these are the Purity products our editors reach for every single day without fail.",
      },
      { type: "h2", text: "The Holy Grail Serum" },
      {
        type: "p",
        text: "Our Vitamin C Brightening Serum has a permanent spot on every editor's shelf. Results are visible within two weeks.",
      },
    ],
  },
  {
    id: "morning-rituals",
    category: "Self-Care",
    title: "Morning Rituals That Actually Work",
    date: "Feb 05 2025",
    author: "Olivia Bennett",
    excerpt: "Start your day with intention.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Self-Care"],
    comments: 0,
    newer: {
      title: "The Products We Can't Stop Using",
      href: "/en/blog/editors-picks",
    },
    older: {
      title: "How to Read Skincare Labels",
      href: "/en/blog/read-skincare-labels",
    },
    blocks: [
      {
        type: "intro",
        text: "A mindful morning routine sets the tone for the entire day. Here's what actually makes a difference.",
      },
      { type: "h2", text: "Cleanse Gently" },
      {
        type: "p",
        text: "Start with a gentle, hydrating cleanser — not a stripping foamy one. Your skin repairs itself overnight and you don't want to undo that work.",
      },
      {
        type: "tip",
        text: "Use lukewarm water instead of hot — hot water breaks down your skin's natural lipid barrier.",
      },
    ],
  },
  {
    id: "read-skincare-labels",
    category: "Tips",
    title: "How to Read Skincare Labels",
    date: "Jan 28 2025",
    author: "Olivia Bennett",
    excerpt: "Confused by ingredient lists? We break it down.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Tips"],
    comments: 0,
    newer: {
      title: "Morning Rituals That Actually Work",
      href: "/en/blog/morning-rituals",
    },
    older: {
      title: "Valentine's Day Beauty Gift Guide",
      href: "/en/blog/valentines-gift-guide",
    },
    blocks: [
      {
        type: "intro",
        text: "Ingredient lists can feel overwhelming — but once you know the basics, they tell you everything you need to know.",
      },
      { type: "h2", text: "Ingredients are Listed by Concentration" },
      {
        type: "p",
        text: "The first ingredient is present in the highest amount. If water is first, the product is water-based. If an oil is first, it's oil-based.",
      },
      {
        type: "tip",
        text: "Ingredients below 1% concentration can be listed in any order — so a hero ingredient listed last may still be effective at that concentration.",
      },
    ],
  },
  {
    id: "valentines-gift-guide",
    category: "Gifting",
    title: "Valentine's Day Beauty Gift Guide",
    date: "Jan 10 2025",
    author: "Olivia Bennett",
    excerpt: "Show someone you care with a thoughtful skincare gift.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Gifting"],
    comments: 0,
    newer: {
      title: "How to Read Skincare Labels",
      href: "/en/blog/read-skincare-labels",
    },
    older: {
      title: "Summer Glow: Your Seasonal Switch",
      href: "/en/blog/summer-glow-routine",
    },
    blocks: [
      {
        type: "intro",
        text: "Valentine's Day is the perfect excuse to treat someone — or yourself — to something truly luxurious.",
      },
      { type: "h2", text: "For the Minimalist" },
      {
        type: "p",
        text: "A single, hero product in beautiful packaging. Our Soothing Serum Set is simple, effective, and looks stunning wrapped up.",
      },
    ],
  },
  {
    id: "summer-glow-routine",
    category: "Holidays",
    title: "Summer Glow: Your Seasonal Switch",
    date: "Jan 02 2025",
    author: "Olivia Bennett",
    excerpt: "As the seasons change, so should your routine.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Holidays"],
    comments: 0,
    newer: {
      title: "Valentine's Day Beauty Gift Guide",
      href: "/en/blog/valentines-gift-guide",
    },
    older: {
      title: "5 Serums Worth the Splurge",
      href: "/en/blog/serums-worth-splurge",
    },
    blocks: [
      {
        type: "intro",
        text: "Summer skin needs a lighter touch. Here's how to adapt your routine for warmer weather without losing results.",
      },
      { type: "h2", text: "Swap Your Moisturiser" },
      {
        type: "p",
        text: "Trade a heavy cream for a lightweight gel or fluid moisturiser. Your skin produces more sebum in heat — you don't need to add more weight.",
      },
      {
        type: "tip",
        text: "Keep your SPF the same or increase it in summer — UV exposure is significantly higher even on cloudy days.",
      },
    ],
  },
  {
    id: "serums-worth-splurge",
    category: "Editor's Pick",
    title: "5 Serums Worth the Splurge",
    date: "Dec 20 2024",
    author: "Olivia Bennett",
    excerpt: "Not all serums are created equal.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Editor's Pick"],
    comments: 0,
    newer: {
      title: "Summer Glow: Your Seasonal Switch",
      href: "/en/blog/summer-glow-routine",
    },
    older: {
      title: "SPF Every Day: Here's Why",
      href: "/en/blog/spf-every-day",
    },
    blocks: [
      {
        type: "intro",
        text: "Serums are where your skincare budget should go. Highly concentrated and targeted, these five are worth every penny.",
      },
      { type: "h2", text: "1. Vitamin C Brightening Serum" },
      {
        type: "p",
        text: "Our best-selling serum. Visibly reduces dark spots and boosts radiance within 2 weeks of consistent use.",
      },
      { type: "h2", text: "2. Hyaluronic Acid Hydra Serum" },
      {
        type: "p",
        text: "Three molecular weights of hyaluronic acid penetrate at different depths for all-day plumping hydration.",
      },
    ],
  },
  {
    id: "spf-every-day",
    category: "Tips",
    title: "SPF Every Day: Here's Why",
    date: "Dec 12 2024",
    author: "Olivia Bennett",
    excerpt: "Sunscreen isn't just for sunny days.",
    coverImage:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    tags: ["Tips"],
    comments: 0,
    newer: {
      title: "5 Serums Worth the Splurge",
      href: "/en/blog/serums-worth-splurge",
    },
    blocks: [
      {
        type: "intro",
        text: "Daily SPF is the single most impactful thing you can do for your skin's long-term health and appearance.",
      },
      { type: "h2", text: "UV Rays Are Present Every Day" },
      {
        type: "p",
        text: "UVA rays — responsible for ageing — penetrate clouds and glass. Rain or shine, they reach your skin.",
      },
      {
        type: "tip",
        text: "Apply SPF as the last step of your morning routine, at least 15 minutes before sun exposure for chemical filters.",
      },
    ],
  },
];

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}

export function getAllPostIds(): string[] {
  return blogPosts.map((p) => p.id);
}
