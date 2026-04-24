import { Product, ProductDetail } from "@/types/product";

export const transformToProductDetail = (
  product: Product,
  locale: string,
): ProductDetail => {
  const transformGlowIngredients = (
    ingredients: any,
  ): ProductDetail["glowIngredients"] => {
    if (!ingredients || !Array.isArray(ingredients)) return [];

    return ingredients.map((ingredient) => {
      if (
        typeof ingredient === "object" &&
        ingredient !== null &&
        "tag" in ingredient
      ) {
        return {
          tag: ingredient.tag || "",
          subtitle: ingredient.subtitle || "",
          title: ingredient.title || "",
          description: ingredient.description || "",
          image: ingredient.image || "",
        };
      }
      if (typeof ingredient === "string") {
        return {
          tag: "Ingredient",
          subtitle: "",
          title: ingredient,
          description: "",
          image: "",
        };
      }
      return { tag: "", subtitle: "", title: "", description: "", image: "" };
    });
  };

  return {
    _id: product._id,
    id: (product as any).id || product._id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating,
    reviewCount: product.reviewCount,
    inStock: product.inStock,
    description: product.description,
    images: product.images,

    brand: product.brand
      ? {
          _id:
            typeof product.brand === "object"
              ? (product.brand as any)._id
              : product.brand,
          name:
            typeof product.brand === "object"
              ? (product.brand as any).name
              : "",
          logo:
            typeof product.brand === "object"
              ? (product.brand as any).logo
              : "",
          website:
            typeof product.brand === "object"
              ? (product.brand as any).website
              : "",
          description:
            typeof product.brand === "object"
              ? (product.brand as any).description
              : "",
          isFeatured:
            typeof product.brand === "object"
              ? (product.brand as any).isFeatured
              : false,
          isActive:
            typeof product.brand === "object"
              ? (product.brand as any).isActive
              : true,
        }
      : undefined,

    formulation: product.formulation
      ? {
          _id:
            typeof product.formulation === "object"
              ? (product.formulation as any)._id
              : product.formulation,
          name:
            typeof product.formulation === "object"
              ? (product.formulation as any).name
              : "",
        }
      : undefined,

    productColors:
      product.productColors && Array.isArray(product.productColors)
        ? product.productColors
            .filter((c): c is any => c !== null && typeof c === "object")
            .map((c) => ({
              _id: c._id,
              name: c.name || "",
              hexCode: c.hexCode || c.colorCode || "#e5e7eb",
              inStock: c.inStock !== false,
            }))
        : [],

    productSizes:
      product.productSizes && Array.isArray(product.productSizes)
        ? product.productSizes
            .filter((s): s is any => s !== null && typeof s === "object")
            .map((s) => ({
              _id: s._id,
              size: s.size || `${s.ml}ml`,
              ml: s.ml || 0,
              price: s.price || product.price,
              originalPrice: s.originalPrice || product.originalPrice,
              inStock: s.inStock !== false,
              sku: s.sku || "",
            }))
        : [],

    badges:
      product.badges?.map((b: any) => ({
        icon: b.icon,
        label: b.label,
      })) || [],
    benefits: product.benefits || [],
    actionImages: product.actionImages || [],
    productInfo: product.productInfo || "",
    howToUse: product.howToUse || "",
    ingredients: product.ingredients || "",
    glowIngredients: transformGlowIngredients(product.glowIngredients),

    pairsWell:
      product.pairsWell && Array.isArray(product.pairsWell)
        ? product.pairsWell
            .filter((p): p is any => p !== null && typeof p === "object")
            .map((p) => ({
              _id: p._id,
              name: p.name,
              price: p.price,
              originalPrice: p.originalPrice,
              image: p.images?.[0] || "",
              href: `/${locale}/shop/${p.id || p._id}`,
            }))
        : [],

    boughtTogether:
      product.boughtTogether && Array.isArray(product.boughtTogether)
        ? product.boughtTogether
            .filter((p): p is any => p !== null && typeof p === "object")
            .map((p) => ({
              _id: p._id,
              name: p.name,
              price: p.price,
              originalPrice: p.originalPrice,
              image: p.images?.[0] || "",
              href: `/${locale}/shop/${p.id || p._id}`,
              isCurrentItem: p._id === product._id,
              sizes: p.productSizes?.map((s: any) => s.size) || [],
            }))
        : [],

    similarProducts:
      product.similarProducts && Array.isArray(product.similarProducts)
        ? product.similarProducts
            .filter((p): p is any => p !== null && typeof p === "object")
            .map((p) => ({
              _id: p._id,
              name: p.name,
              price: p.price,
              image: p.images?.[0] || "",
              rating: p.rating,
              ingredient: p.ingredients?.split(",")[0]?.trim() || "",
              inStock: p.inStock,
              href: `/${locale}/shop/${p.id || p._id}`,
            }))
        : [],

    reviews:
      product.reviews && Array.isArray(product.reviews)
        ? product.reviews
            .filter((r): r is any => r !== null && typeof r === "object")
            .map((r) => ({
              author: r.author,
              rating: r.rating,
              date: r.date,
              title: r.title,
              body: r.body,
              images: r.images,
            }))
        : [],
  };
};
