import { ApiResponse } from "@/types/user";
import { User } from "@/types/user";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const uploadService = {
  async uploadProductImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("productImage", file);

    const response = await fetch(`${API_BASE_URL}/upload/product-image`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data.url;
  },

  async uploadProductImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("productImages", file);
    });

    const response = await fetch(`${API_BASE_URL}/upload/product-images`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data.map((file: any) => file.url);
  },

  async uploadBrandLogo(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("brandLogo", file);

    const response = await fetch(`${API_BASE_URL}/upload/brand-logo`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);

    console.log("Upload response:", data.data.url);
    return data.data.url;
  },

  async uploadCollectionImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("collectionImage", file);

    const response = await fetch(`${API_BASE_URL}/upload/collection-image`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data.url;
  },

  async uploadBlogImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("blogImage", file);

    const response = await fetch(`${API_BASE_URL}/upload/blog-image`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data.url;
  },

  async uploadReviewImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("reviewImage", file);

    const response = await fetch(`${API_BASE_URL}/upload/review-image`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data.url;
  },

  async uploadAvatar(userId: string, file: File): Promise<User> {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`${API_BASE_URL}/users/${userId}/avatar`, {
      method: "PATCH",
      body: formData,
    });
    const data: ApiResponse<User> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to upload avatar");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },
};
