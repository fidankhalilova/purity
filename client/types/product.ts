// types/product.ts

// Base API Response Type
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

// Product Color Type
export type ProductColor = {
  _id: string;
  name: string;
  colorCode: string;
  hexCode: string;
  image: string;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Product Size Type
export type ProductSize = {
  _id: string;
  size: string;
  ml: number;
  price: string;
  originalPrice?: string;
  inStock: boolean;
  sku?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Skin Type Type
export type SkinType = {
  _id: string;
  name: string;
  description?: string;
  skinConcerns?: SkinConcern[];
  createdAt?: string;
  updatedAt?: string;
};

// Skin Concern Type
export type SkinConcern = {
  _id: string;
  name: string;
  description?: string;
  skinType?: SkinType | string;
  createdAt?: string;
  updatedAt?: string;
};

// Skin Shade Type
export type SkinShade = {
  _id: string;
  name: string;
  colorCode?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Skin Color Type
export type SkinColor = {
  _id: string;
  name: string;
  colorCode?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Collection Type
export type Collection = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  productCount?: number; // Add this optional property
  createdAt?: string;
  updatedAt?: string;
};

// Tag Type
export type Tag = {
  _id: string;
  name: string;
  type: "new" | "best-seller" | "value-set" | "limited-edition" | "featured";
  color?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Home Section Type
export type HomeSection = {
  _id: string;
  name: string;
  displayName: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Badge Type
export type Badge = {
  _id: string;
  icon: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
};

// Review Type
export type Review = {
  _id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  images?: string[];
  status: "published" | "pending" | "rejected";
  product?: string | Product;
  createdAt?: string;
  updatedAt?: string;
};

export interface GlowIngredient {
  _id: string;
  tag: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Brand Type
export type Brand = {
  _id: string;
  name: string;
  country?: string;
  logo?: string;
  website?: string;
  description?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Formulation Type
export type Formulation = {
  _id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Product Type
export type Product = {
  _id: string;
  id?: string; // Custom slug field
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  images: string[];
  status: "active" | "draft";

  // References
  productColors?: ProductColor[] | string[];
  productSizes?: ProductSize[] | string[];
  skinColors?: SkinColor[] | string[];
  skinShades?: SkinShade[] | string[];
  skinTypes?: SkinType[] | string[];
  skinConcerns?: SkinConcern[] | string[];
  collection?: Collection | string;
  tags?: Tag[] | string[];
  homeSections?: HomeSection[] | string[];
  badges?: Badge[] | string[];
  reviews?: Review[] | string[];
  brand?: Brand | string;
  formulation?: Formulation | string;

  // Relations
  pairsWell?: Product[] | string[];
  boughtTogether?: Product[] | string[];
  similarProducts?: Product[] | string[];

  // Additional fields
  benefits?: string[];
  actionImages?: string[];
  productInfo?: string;
  howToUse?: string;
  ingredients?: string;
  glowIngredients?: string[] | GlowIngredient[];

  createdAt?: string;
  updatedAt?: string;
};

// Product Service Response
export type ProductListResponse = {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

// Product Detail Type (for frontend display)
export type ProductDetail = {
  _id: string;
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  images: string[];
  badges: { icon: string; label: string }[];
  benefits: string[];
  actionImages: string[];
  productInfo: string;
  howToUse: string;
  ingredients: string;

  // Brand and Formulation
  brand?: {
    _id: string;
    name: string;
    logo?: string;
    website?: string;
    description?: string;
    isFeatured?: boolean;
    isActive?: boolean;
  };
  formulation?: { _id: string; name: string };

  // Colors and Sizes
  productColors?: {
    _id: string;
    name: string;
    hexCode?: string;
    colorCode?: string;
    inStock: boolean;
  }[];
  productSizes?: {
    _id: string;
    size: string;
    ml: number;
    price: string;
    originalPrice?: string;
    inStock: boolean;
    sku?: string;
  }[];

  // Glow Ingredients
  glowIngredients: {
    _id?: string;
    tag: string;
    subtitle: string;
    title: string;
    description: string;
    image: string;
  }[];

  // Related Products
  pairsWell: {
    _id: string;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    href: string;
  }[];
  boughtTogether: {
    _id: string;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    href: string;
    isCurrentItem?: boolean;
    sizes?: string[];
  }[];
  similarProducts: {
    _id: string;
    name: string;
    price: string;
    image: string;
    rating: number;
    ingredient: string;
    inStock: boolean;
    href: string;
  }[];

  // Reviews
  reviews: {
    author: string;
    rating: number;
    date: string;
    title: string;
    body: string;
    images?: string[];
  }[];
};
