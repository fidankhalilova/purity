export type User = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinedDate: string;
};

export type Order = {
  id: string;
  date: string;
  status: "delivered" | "processing" | "shipped" | "cancelled";
  total: string;
  items: { name: string; image: string; qty: number; price: string }[];
};

export type WishlistItem = {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  href: string;
  inStock: boolean;
};

export type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  qty: number;
  size?: string;
  color?: string;
};
