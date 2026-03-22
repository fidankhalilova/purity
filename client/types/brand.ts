import { Product } from "./product";

export type Brand = {
  _id: string;
  name: string;
  country: string;
  logo: string;
  website?: string;
  description: string;
  isFeatured: boolean;
  isActive: boolean;
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};
