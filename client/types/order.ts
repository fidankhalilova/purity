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

export type Order = {
  _id: string;
  orderNumber: string;
  user: string;
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
