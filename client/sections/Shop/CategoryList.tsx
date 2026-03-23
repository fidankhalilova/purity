"use client";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { collectionService } from "@/services/collectionService";
import { productService } from "@/services/productService";
import { getImageUrl } from "@/utils/imageUrl";
import { Collection } from "@/types/product";
import "swiper/css";

interface CollectionWithCount extends Collection {
  productCount: number;
}

export default function CategoryList() {
  const t = useTranslations("ShopPage");
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [hovered, setHovered] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [collections, setCollections] = useState<CollectionWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        // Load collections and products in parallel
        const [collectionsData, productsData] = await Promise.all([
          collectionService.getAll(),
          productService.getAll(1, 1000), // Get all products to count
        ]);

        // Count products per collection
        const productCounts: Record<string, number> = {};
        productsData.products.forEach((product: any) => {
          if (product.collection) {
            const collectionId =
              typeof product.collection === "object"
                ? product.collection._id
                : product.collection;
            productCounts[collectionId] =
              (productCounts[collectionId] || 0) + 1;
          }
        });

        // Add count to each collection
        const activeCollections: CollectionWithCount[] = collectionsData
          .filter((c) => c.isActive)
          .map((collection) => ({
            ...collection,
            productCount: productCounts[collection._id] || 0,
          }));

        setCollections(activeCollections);
        console.log(
          "Collections loaded:",
          activeCollections.map((c) => ({
            name: c.name,
            count: c.productCount,
          })),
        );
      } catch (error) {
        console.error("Error loading collections:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCollections();
  }, []);

  if (loading) {
    return (
      <section className="py-10">
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div
        className="relative flex gap-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Prev button */}
        <button
          ref={prevRef}
          className={`hidden md:flex absolute left-3 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm items-center justify-center text-gray-700 shadow-sm transition-all duration-300 ${
            hovered && !isBeginning
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
          style={{ top: "calc(50% - 24px)", transform: "translateY(-50%)" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next button */}
        <button
          ref={nextRef}
          className={`hidden md:flex absolute right-3 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm items-center justify-center text-gray-700 shadow-sm transition-all duration-300 ${
            hovered && !isEnd
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
          style={{ top: "calc(50% - 24px)", transform: "translateY(-50%)" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1.5}
          spaceBetween={16}
          grabCursor
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {collections.map((collection) => (
            <SwiperSlide key={collection._id}>
              <Link
                href={`/shop?collection=${collection._id}`}
                className="flex flex-col gap-3 group"
              >
                {/* Image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={getImageUrl(collection.image) || "/placeholder.jpg"}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>

                {/* Label with product count */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-medium text-gray-900">
                    {collection.name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {collection.productCount || 0}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
