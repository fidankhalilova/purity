export type OrderItem = {
  product: string;
  name: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  size?: string;
  color?: string;
  image?: string;
  discountApplied?: number;
};

export type Address = {
  _id?: string;
  label: "Home" | "Work" | "Other";
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
};

export type Order = {
  _id: string;
  orderNumber: string;
  user: string | UserInfo;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  status: "paid" | "getting_ready" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: "card" | "paypal" | "bank_transfer";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  trackingNumber?: string;
  notes?: string;
  couponCode?: string;
  orderedAt: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderInput = {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    size?: string | null;
    color?: string | null;
    price?: number;
    discountedPrice?: number;
  }[];
  shippingAddress: Omit<Address, "_id">;
  billingAddress?: Omit<Address, "_id">;
  paymentMethod: "card" | "paypal" | "bank_transfer";
  couponCode?: string;
  notes?: string;
};

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
