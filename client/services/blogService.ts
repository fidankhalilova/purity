// services/blogService.ts
import { BlogPost, ApiResponse } from "@/types/blog";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const blogService = {
  async getAll(
    page?: number,
    limit?: number,
    category?: string,
  ): Promise<{ blogs: BlogPost[]; pagination: any }> {
    let url = `${API_BASE_URL}/blogs`;
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (category) params.append("category", category);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    const data: ApiResponse<BlogPost[]> = await response.json();

    if (!data.success) throw new Error(data.message || "Failed to fetch blogs");

    return {
      blogs: data.data || [],
      pagination: data.pagination || {
        page: page || 1,
        limit: limit || 10,
        total: 0,
        pages: 0,
      },
    };
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    // For server-side rendering, we need to use absolute URL
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
        : API_BASE_URL;

    const url = `${baseUrl}/blogs/slug/${slug}`;
    console.log("Fetching blog by slug:", url);

    const response = await fetch(url);
    const data: ApiResponse<BlogPost> = await response.json();

    if (!data.success) throw new Error(data.message || "Failed to fetch blog");
    if (!data.data) throw new Error("Blog not found");
    return data.data;
  },

  async getFeatured(): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE_URL}/blogs/featured`);
    const data: ApiResponse<BlogPost[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch featured blogs");
    return data.data || [];
  },

  async getRelated(id: string): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}/related`);
    const data: ApiResponse<BlogPost[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch related blogs");
    return data.data || [];
  },

  async create(
    blog: Partial<BlogPost>,
    token?: string | null,
  ): Promise<BlogPost> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers,
      body: JSON.stringify(blog),
    });
    const data: ApiResponse<BlogPost> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to create blog");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(
    id: string,
    blog: Partial<BlogPost>,
    token?: string | null,
  ): Promise<BlogPost> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(blog),
    });
    const data: ApiResponse<BlogPost> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to update blog");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string, token?: string | null): Promise<void> {
    const headers: HeadersInit = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers,
    });
    const data: ApiResponse = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to delete blog");
  },
};
