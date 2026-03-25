"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Settings,
  User,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { menuItems } from "@/constants/NavbarItems";
import { productService } from "@/services/productService";
import { getImageUrl } from "@/utils/imageUrl";
import { useAuth } from "@/context/AuthContext";

interface SearchProduct {
  _id: string;
  id?: string;
  name: string;
  price: string;
  image: string;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { cartCount } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const t = useTranslations("Navigation");

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key to close search
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Search products
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const { products } = await productService.getAll(1, 5, {
          search: searchQuery.trim(),
        });

        const mappedResults = products.map((p: any) => ({
          _id: p._id,
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.images?.[0] || "",
        }));
        setSearchResults(mappedResults);
      } catch (error) {
        console.error("Error searching products:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleProductClick = (product: SearchProduct) => {
    const slug = product.id || product._id;
    router.push(`/shop/${slug}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/">
          <img
            src="https://purity.nextsky.co/cdn/shop/files/logo_v2.1.svg?v=1755506437&width=100"
            alt="Purity logo"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-7">
            {menuItems.map((item) => (
              <li
                key={item.nameKey}
                className="relative"
                onMouseEnter={() =>
                  item.items && setActiveDropdown(item.nameKey)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.items ? (
                  <>
                    <button className="flex items-center gap-1 text-md font-medium text-gray-800 hover:text-black transition-colors">
                      {t(item.nameKey)}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.nameKey ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === item.nameKey && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-white border border-gray-100 shadow-lg rounded-sm z-50">
                        <ul className="py-2">
                          {item.items.map((subItem) => (
                            <li key={subItem.nameKey}>
                              <Link
                                href={subItem.href}
                                className="block px-5 py-2 text-md text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {t(subItem.nameKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-md font-medium text-gray-800 hover:text-black transition-colors"
                  >
                    {t(item.nameKey)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-700">
          <LanguageSwitcher />

          {/* Search Button with Modal */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }}
              className="hover:text-black transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Search Modal */}
            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                <form onSubmit={handleSearch} className="p-4">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        t("searchPlaceholder") || "Search products..."
                      }
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1f473e] transition-colors"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1f473e] transition-colors"
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </form>

                {/* Search Results */}
                {searchQuery.trim().length >= 2 && (
                  <div className="border-t border-gray-100 max-h-96 overflow-y-auto">
                    {isSearching ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="w-6 h-6 border-2 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((product) => (
                          <button
                            key={product._id}
                            onClick={() => handleProductClick(product)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                              {product.image && (
                                <img
                                  src={getImageUrl(product.image)}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {product.price}
                              </p>
                            </div>
                          </button>
                        ))}
                        <button
                          onClick={handleSearch}
                          className="w-full px-4 py-3 text-center text-sm font-medium text-[#1f473e] hover:bg-gray-50 transition-colors border-t border-gray-100"
                        >
                          View all results for "{searchQuery}"
                        </button>
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <p className="text-sm text-gray-500">
                          No products found for "{searchQuery}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="relative">
            <Link href="/account/settings">
              <Settings size={20} />
            </Link>
          </button>
          <button className="hidden sm:block">
            <Link href={`/${locale}/account/login`}>
              <User size={20} />
            </Link>
          </button>
          <button className="relative">
            <Link href="/account/basket">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1f473e] text-white text-xs rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </button>
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-400 ${
          isMobileMenuOpen ? "max-h-150" : "max-h-0"
        }`}
      >
        <ul className="px-6 py-4">
          {menuItems.map((item) => (
            <li key={item.nameKey}>
              {item.items ? (
                <div>
                  <button
                    onClick={() =>
                      setActiveMobileDropdown(
                        activeMobileDropdown === item.nameKey
                          ? null
                          : item.nameKey,
                      )
                    }
                    className="w-full flex items-center justify-between py-2.5 text-md font-medium text-gray-800"
                  >
                    {t(item.nameKey)}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-400 ${
                        activeMobileDropdown === item.nameKey
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      activeMobileDropdown === item.nameKey
                        ? "max-h-60"
                        : "max-h-0"
                    }`}
                  >
                    <ul className="pl-4 pb-2">
                      {item.items.map((subItem) => (
                        <li key={subItem.nameKey}>
                          <Link
                            href={subItem.href}
                            className="block py-2 text-md text-gray-600 hover:text-black"
                            onClick={() => {
                              setActiveMobileDropdown(null);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {t(subItem.nameKey)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block py-2.5 text-md font-medium text-gray-800 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.nameKey)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
