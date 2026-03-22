import { Product } from "./product";

export type Discount = {
  _id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  uses: number;
  maxUses: number;
  expires: string;
  status: "active" | "expired" | "disabled";
  product?: Product | string;
  formattedValue?: string;
  formattedExpiry?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};
