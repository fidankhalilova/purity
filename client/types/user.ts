import { Address } from "./order";
import { Product } from "./product";

export type NotificationSettings = {
  orderUpdates: boolean;
  shippingDelivery: boolean;
  promotionsOffers: boolean;
  newsletter: boolean;
  smsNotifications: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  avatar?: string;
  phone?: string;
  birthday?: string;
  gender?: "male" | "female" | "other";
  role: "customer" | "admin";
  status: "active" | "blocked";
  totalSpent: number;
  orderCount: number;
  addresses: Address[];
  wishlist: Product[];
  notificationSettings: NotificationSettings;
  displayLanguage: "en" | "az" | "ru";
  lastLogin?: string;
  joined: string;
  emailVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};
