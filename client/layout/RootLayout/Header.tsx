"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Settings,
  User,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { menuItems } from "@/constants/NavbarItems";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);

  const t = useTranslations("Navigation");

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
          <button>
            <Search size={20} />
          </button>
          <button className="relative">
            <Link href="/account/settings">
              <Settings size={20} />
            </Link>
          </button>
          <button className="hidden sm:block">
            <Link href="/account/profile">
              <User size={20} />
            </Link>
          </button>
          <button>
            <Link href="/account/basket">
              <ShoppingBag size={20} />
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
