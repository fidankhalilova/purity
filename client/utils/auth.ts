export const getAuthHeaders = (
  accessToken?: string | null,
): { Authorization?: string } => {
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }

  return {};
};

export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};
