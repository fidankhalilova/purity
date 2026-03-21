"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/BreadCrumb";
import { Tag, Lock, ChevronDown } from "lucide-react";

const cartItems = [
  {
    name: "Dark Circle Patch",
    price: 75.0,
    qty: 1,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=300",
  },
  {
    name: "Pore Detox Scrub",
    price: 70.0,
    qty: 2,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=300",
  },
  {
    name: "Brighten Serum",
    price: 160.0,
    qty: 1,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=300",
  },
];

export default function CheckoutTemplate() {
  const t = useTranslations("CheckoutPage");
  const locale = useLocale();
  const router = useRouter();

  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = t.raw("shipping.countries") as string[];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const deliveryCost = delivery === "express" ? 12 : 0;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryCost - discount;

  const inputClass =
    "w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1f473e] transition-colors bg-white";

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      // simulate success — change to /fail to test fail page
      router.push(`/${locale}/checkout/success`);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
      <Breadcrumb overrideLastLabel={t("breadcrumb")} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6 mb-8">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
        {/* Left — forms */}
        <div className="flex flex-col gap-6">
          {/* Contact */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("contact.title")}
            </h2>
            <input
              type="email"
              placeholder={t("contact.email")}
              className={inputClass}
            />
            <input
              type="tel"
              placeholder={t("contact.phone")}
              className={inputClass}
            />
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("shipping.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("shipping.firstName")}
                className={inputClass}
              />
              <input
                type="text"
                placeholder={t("shipping.lastName")}
                className={inputClass}
              />
            </div>
            <input
              type="text"
              placeholder={t("shipping.address")}
              className={inputClass}
            />
            <input
              type="text"
              placeholder={t("shipping.apartment")}
              className={inputClass}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("shipping.city")}
                className={inputClass}
              />
              <input
                type="text"
                placeholder={t("shipping.zip")}
                className={inputClass}
              />
            </div>
            {/* Country dropdown */}
            <div className="relative">
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className={`${inputClass} flex items-center justify-between text-left ${!selectedCountry ? "text-gray-400" : "text-gray-700"}`}
              >
                {selectedCountry || t("shipping.country")}
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${countryOpen ? "rotate-180" : ""}`}
                />
              </button>
              {countryOpen && (
                <div className="absolute top-14 left-0 right-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-lg py-2 max-h-48 overflow-y-auto">
                  {countries.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCountry(c);
                        setCountryOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selectedCountry === c ? "font-semibold text-gray-900" : "text-gray-600"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("delivery.title")}
            </h2>
            {[
              {
                key: "standard" as const,
                label: t("delivery.standard"),
                desc: t("delivery.standardDesc"),
                price: t("delivery.standardPrice"),
              },
              {
                key: "express" as const,
                label: t("delivery.express"),
                desc: t("delivery.expressDesc"),
                price: t("delivery.expressPrice"),
              },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setDelivery(opt.key)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${delivery === opt.key ? "border-[#1f473e] bg-[#1f473e]/5" : "border-gray-100 hover:border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${delivery === opt.key ? "border-[#1f473e]" : "border-gray-300"}`}
                  >
                    {delivery === opt.key && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1f473e]" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {opt.label}
                    </p>
                    <p className="text-xs text-gray-400">{opt.desc}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold ${opt.key === "standard" ? "text-green-600" : "text-gray-900"}`}
                >
                  {opt.price}
                </span>
              </button>
            ))}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("payment.title")}
            </h2>

            {/* Card number with formatting */}
            <div className="relative">
              <input
                type="text"
                placeholder={t("payment.cardNumber")}
                maxLength={19}
                className={inputClass}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                {["visa", "mc"].map((card) => (
                  <div
                    key={card}
                    className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center"
                  >
                    <span
                      className={`text-[8px] font-bold ${card === "visa" ? "text-blue-700" : "text-red-500"}`}
                    >
                      {card === "visa" ? "VISA" : "MC"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder={t("payment.cardName")}
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("payment.expiry")}
                maxLength={5}
                className={inputClass}
              />
              <input
                type="text"
                placeholder={t("payment.cvv")}
                maxLength={3}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              {t("payment.secure")}
            </div>
          </div>
        </div>

        {/* Right — order summary */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-5">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("summary.title")}
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-4">
              {cartItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    {/* Image */}
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-[#f0ebe2]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    {/* Qty badge — over the image top-left corner */}
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-[#1f473e] text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {t("summary.items")}: {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100" />

            {/* Promo */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder={t("summary.promoPlaceholder")}
                  className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 min-w-0"
                />
              </div>
              <button
                onClick={() => {
                  if (promo) setPromoApplied(true);
                }}
                className="shrink-0 w-20 px-3 py-2.5 bg-gray-900 text-white text-xs font-medium rounded-xl hover:bg-gray-800 transition-colors text-center leading-tight"
              >
                {t("summary.apply")}
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs text-green-600 font-medium -mt-2">
                {t("summary.promoApplied")}
              </p>
            )}

            <div className="border-t border-gray-100" />

            {/* Totals */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t("summary.subtotal")}</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>{t("summary.discount")}</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">{t("summary.shipping")}</span>
                <span
                  className={
                    delivery === "standard"
                      ? "text-green-600 font-medium"
                      : "font-medium text-gray-900"
                  }
                >
                  {delivery === "standard"
                    ? t("summary.free")
                    : `+$${deliveryCost.toFixed(2)}`}
                </span>
              </div>
              <p className="text-xs text-gray-400">{t("summary.taxes")}</p>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
                <span>{t("summary.total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place order */}
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full py-4 bg-[#1f473e] text-white font-bold text-sm rounded-full hover:bg-[#163830] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {placing ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {t("summary.processing")}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  {t("summary.placeOrder")} — ${total.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
