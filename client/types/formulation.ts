export type Formulation = {
  _id: string;
  name: string;
  description?: string;
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
