"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProductDetail } from "@/types/product";
import ProductAccordion from "./ProductAccordion";
import PairsWell from "./PairsWell";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : i < rating ? "text-yellow-300" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductHero({ product }: { product: ProductDetail }) {
  const t = useTranslations("ProductDetail");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const gridImages = product.images.slice(0, 6);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 py-6 md:py-8">
      {/* Left — images */}
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-pointer bg-[#f0ebe2]">
          <Image
            src={gridImages[activeImg]}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-300"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {gridImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${activeImg === i ? "border-[#1f473e]" : "border-transparent"}`}
            >
              <Image
                src={img}
                alt={`${product.name} ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right — info */}
      <div className="flex flex-col gap-4 md:gap-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
          {product.name}
        </h1>

        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-sm font-semibold text-gray-700">
            {product.rating}
          </span>
          <span className="text-sm text-gray-400">
            ({product.reviewCount} {t("reviews")})
          </span>
        </div>

        <div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {product.price}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {t("taxesIncluded")}{" "}
            <a href="#" className="underline text-gray-600">
              {t("shipping")}
            </a>{" "}
            {t("shippingCalculated")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-sm text-green-600 font-medium">
            {t("inStock")}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 w-fit">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="text-sm font-medium w-4 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <button className="flex-1 bg-[#1f473e] text-white py-3 px-6 rounded-full font-medium hover:bg-[#163830] transition-colors text-sm">
            {t("addToCart")} — {product.price}
          </button>
        </div>

        <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
          {t("buyItNow")}
        </button>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            {t("freeShipping")}{" "}
            <a href="#" className="underline ml-1">
              {t("shippingPolicy")}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            {t("returns")}{" "}
            <a href="#" className="underline ml-1">
              {t("returnPolicy")}
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description}
        </p>

        <div className="flex gap-4 md:gap-6 flex-wrap">
          {product.badges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center text-lg md:text-xl">
                {badge.icon}
              </div>
              <span className="text-xs text-gray-600 text-center">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 md:p-5">
          <p className="font-bold text-gray-900 mb-3">{t("topBenefits")}</p>
          <ul className="flex flex-col gap-1.5">
            {product.benefits.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="text-gray-400 mt-0.5">•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {product.actionImages.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              {t("seeInAction")}
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.actionImages.map((img, i) => (
                <div
                  key={i}
                  className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100"
                >
                  <Image
                    src={img}
                    alt="In action"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <ProductAccordion product={product} />
        <PairsWell product={product} />
      </div>
    </div>
  );
}
