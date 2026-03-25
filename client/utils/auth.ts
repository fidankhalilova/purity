// utils/auth.ts
import { getCookie } from "./cookies";

// Get auth headers for API calls
export const getAuthHeaders = (
  accessToken?: string | null,
): { Authorization?: string } => {
  // If accessToken is provided, use it
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }

  // Otherwise try to get from localStorage
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }

  // No token found
  return {};
};

// Get the current access token
export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};
