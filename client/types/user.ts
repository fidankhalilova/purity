export type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  status: "active" | "blocked";
  totalSpent: number;
  orderCount: number;
  joined: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};
