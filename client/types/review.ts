export type Review = {
  _id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  images: string[];
  status: "published" | "deleted";
  createdAt?: string;
  updatedAt?: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};
