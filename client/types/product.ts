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

export type SkinType = {
  _id: string;
  name: string;
  description?: string;
  skinConcerns?: SkinConcern[];
  createdAt?: string;
  updatedAt?: string;
};

export type SkinConcern = {
  _id: string;
  name: string;
  description?: string;
  skinType?: SkinType | string;
  createdAt?: string;
  updatedAt?: string;
};

export type SkinShade = {
  _id: string;
  name: string;
  colorCode?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SkinColor = {
  _id: string;
  name: string;
  colorCode?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Collection = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Tag = {
  _id: string;
  name: string;
  type: "new" | "best-seller" | "value-set" | "limited-edition" | "featured";
  color?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type HomeSection = {
  _id: string;
  name: string;
  displayName: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Badge = {
  _id: string;
  icon: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
};

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

export type Formulation = {
  _id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Product = {
  _id: string;
  id?: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  images: string[];
  status: "active" | "draft";

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

  pairsWell?: Product[] | string[];
  boughtTogether?: Product[] | string[];
  similarProducts?: Product[] | string[];

  benefits?: string[];
  actionImages?: string[];
  productInfo?: string;
  howToUse?: string;
  ingredients?: string;
  glowIngredients?: string[] | GlowIngredient[];

  createdAt?: string;
  updatedAt?: string;
};

export type ProductListResponse = {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

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

  glowIngredients: {
    _id?: string;
    tag: string;
    subtitle: string;
    title: string;
    description: string;
    image: string;
  }[];

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

  reviews: {
    author: string;
    rating: number;
    date: string;
    title: string;
    body: string;
    images?: string[];
  }[];
};
