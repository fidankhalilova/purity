"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Trash2, ShoppingCart, Tag } from "lucide-react";

const initialCart = [
  {
    id: "1",
    name: "Dark Circle Patch",
    price: "$75.00",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
    qty: 1,
    size: "30ml",
  },
  {
    id: "2",
    name: "Pore Detox Scrub",
    price: "$70.00",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
    qty: 2,
    size: "100ml",
  },
  {
    id: "3",
    name: "Brighten Serum",
    price: "$160.00",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
    qty: 1,
  },
];

export default function BasketSection() {
  const t = useTranslations("AccountPage.basket");
  const locale = useLocale();
  const [items, setItems] = useState(initialCart);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setItems(items.map((i) => (i.id === id ? { ...i, qty } : i)));
  };
  const remove = (id: string) => setItems(items.filter((i) => i.id !== id));

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.qty,
    0,
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <ShoppingCart className="w-12 h-12 text-gray-200" />
        <p className="text-lg font-semibold text-gray-900">{t("emptyTitle")}</p>
        <p className="text-sm text-gray-500">{t("emptyDesc")}</p>
        <Link
          href={`/${locale}/shop`}
          className="mt-2 px-6 py-3 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors"
        >
          {t("shopNow")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {items.length} {t("items")}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-100 p-4 flex items-center gap-4"
            >
              <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-[#f0ebe2]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {item.name}
                </p>
                {item.size && (
                  <p className="text-xs text-gray-400 mt-0.5">{item.size}</p>
                )}
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {item.price}
                </p>
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 shrink-0">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="text-sm font-medium w-4 text-center">
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-72 shrink-0 bg-white rounded-3xl border border-gray-100 p-5 flex flex-col gap-4">
          <h2 className="font-bold text-gray-900">{t("orderSummary")}</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{t("subtotal")}</span>
              <span className="font-medium text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>{t("discount")}</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">{t("shipping")}</span>
              <span className="font-medium text-green-600">{t("free")}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
              <span>{t("total")}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 min-w-0">
                <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder={t("promoPlaceholder")}
                  className="flex-1 min-w-0 text-sm outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button
                onClick={() => {
                  if (promo) setPromoApplied(true);
                }}
                className="shrink-0 w-20 px-3 py-2.5 bg-gray-900 text-white text-xs font-medium rounded-xl hover:bg-gray-800 transition-colors text-center leading-tight"
              >
                {t("apply")}
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs text-green-600 font-medium">
                {t("promoApplied")}
              </p>
            )}
          </div>
          <button className="w-full py-3.5 bg-[#1f473e] text-white text-sm font-bold rounded-full hover:bg-[#163830] transition-colors">
            {t("checkout")} — ${total.toFixed(2)}
          </button>
          <Link
            href={`/${locale}/shop`}
            className="text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}
