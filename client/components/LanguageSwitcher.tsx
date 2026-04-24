"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage, LocaleKey } from "@/context/LanguageContext";

const languages = [
  { code: "en" as LocaleKey, name: "English" },
  { code: "ru" as LocaleKey, name: "Русский" },
  { code: "az" as LocaleKey, name: "Azərbaycan" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang, setLang } = useLanguage();

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-gray-700 hover:text-black transition-colors px-1"
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLang.code.toUpperCase()}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} hidden sm:block`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-100 shadow-lg rounded-sm py-1 z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                lang === l.code
                  ? "text-black font-medium bg-gray-50"
                  : "text-gray-700"
              }`}
            >
              <span>{l.name}</span>
              {lang === l.code && <span className="ml-auto text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
