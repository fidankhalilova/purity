export type ProductDetail = {
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
  glowIngredients: {
    tag: string;
    subtitle: string;
    title: string;
    description: string;
    image: string;
  }[];
  pairsWell: {
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    href: string;
  }[];
  boughtTogether: {
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    href: string;
    isCurrentItem?: boolean;
    sizes?: string[];
  }[];
  similarProducts: {
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
