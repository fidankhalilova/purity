// context/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { User } from "@/types/user";
import { toast } from "react-hot-toast";
import { cartService } from "@/services/cartService";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (token: string, userData: User) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getAuthHeaders: () => { Authorization: string } | {};
  cartCount: number;
  refreshCartCount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const locale = useLocale();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Load user on mount
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

  // Load cart count when user changes
  useEffect(() => {
    const loadCartCount = async () => {
      if (user && accessToken) {
        try {
          const cart = await cartService.getCart(user._id, accessToken);
          const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
          setCartCount(totalItems);
        } catch (error) {
          console.error("Error loading cart count:", error);
        }
      } else if (!user) {
        // Guest cart count from localStorage
        const guestCart = cartService.getLocalCart();
        const totalItems = guestCart.reduce((sum, item) => sum + item.qty, 0);
        setCartCount(totalItems);
      }
    };

    loadCartCount();
  }, [user, accessToken]);

  const refreshCartCount = useCallback(async () => {
    if (user && accessToken) {
      try {
        const cart = await cartService.getCart(user._id, accessToken);
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error refreshing cart count:", error);
      }
    } else {
      const guestCart = cartService.getLocalCart();
      const totalItems = guestCart.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(totalItems);
    }
  }, [user, accessToken]);

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

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);

    // Store user and token
    setUser(data.data.user);
    setAccessToken(data.data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("accessToken", data.data.accessToken);
    setCookie("accessToken", data.data.accessToken, 0.0104);

    // Sync guest cart to backend after login
    try {
      await cartService.syncLocalCartToBackend(
        data.data.user._id,
        data.data.accessToken,
      );
      // Refresh cart count after sync
      await refreshCartCount();
    } catch (error) {
      console.error("Error syncing cart after login:", error);
    }

    return data.data.user;
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);

    setUser(data.data.user);
    setAccessToken(data.data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("accessToken", data.data.accessToken);
    setCookie("accessToken", data.data.accessToken, 0.0104);

    // Sync guest cart to backend after registration
    try {
      await cartService.syncLocalCartToBackend(
        data.data.user._id,
        data.data.accessToken,
      );
      await refreshCartCount();
    } catch (error) {
      console.error("Error syncing cart after registration:", error);
    }
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
    setCartCount(0);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    deleteCookie("accessToken");

    router.push(`/${locale}/account/login`);
  };

  const googleLogin = useCallback(async (token: string, userData: User) => {
    if (typeof window !== "undefined") {
      setUser(userData);
      setAccessToken(token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", token);
      setCookie("accessToken", token, 0.0104);

      // Sync guest cart to backend after Google login
      try {
        await cartService.syncLocalCartToBackend(userData._id, token);
        // Refresh cart count after sync
        const cart = await cartService.getCart(userData._id, token);
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error syncing cart after Google login:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        googleLogin,
        login,
        register,
        logout,
        refreshToken,
        getAuthHeaders,
        cartCount,
        refreshCartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
