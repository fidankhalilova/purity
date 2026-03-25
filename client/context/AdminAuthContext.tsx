"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { toast } from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getAuthHeaders: () => { Authorization: string } | {};
}

const AdminAuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("accessToken");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedToken);
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    const refreshInterval = setInterval(
      async () => {
        try {
          await refreshToken();
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      },
      14 * 60 * 1000,
    );
    return () => clearInterval(refreshInterval);
  }, [accessToken]);

  const getAuthHeaders = () => {
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}` };
    }
    return {};
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success && data.data.accessToken) {
        setAccessToken(data.data.accessToken);
        localStorage.setItem("accessToken", data.data.accessToken);
        setCookie("accessToken", data.data.accessToken, 0.0104);
      }
    } catch (error) {
      console.error("Refresh token failed:", error);
      await logout();
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);

    setUser(data.data.user);
    setAccessToken(data.data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("accessToken", data.data.accessToken);
    setCookie("accessToken", data.data.accessToken, 0.0104);

    return data.data.user;
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    deleteCookie("accessToken");
    router.push("/account/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        login,
        logout,
        refreshToken,
        getAuthHeaders,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined)
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return context;
}
