"use client";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [hovered, setHovered] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [collections, setCollections] = useState<CollectionWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCollection = searchParams?.get("collection") || "";

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const [collectionsData, productsData] = await Promise.all([
          collectionService.getAll(),
          productService.getAll(1, 1000),
        ]);

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

        const activeCollections: CollectionWithCount[] = collectionsData
          .filter((c) => c.isActive)
          .map((collection) => ({
            ...collection,
            productCount: productCounts[collection._id] || 0,
          }));

        setCollections(activeCollections);
      } catch (error) {
        console.error("Error loading collections:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCollections();
  }, []);

  const handleCollectionClick = (collectionId: string, e: React.MouseEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams?.toString());

    if (currentCollection === collectionId) {
      params.delete("collection");
    } else {
      params.set("collection", collectionId);
    }

    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params.navigation
    ) {
      const navigation = swiperRef.current.params.navigation;
      if (typeof navigation !== "boolean") {
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }
  }, [collections]);

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
          style={{ top: "calc(50% - 24px)" }}
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
          style={{ top: "calc(50% - 24px)" }}
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
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
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
          {collections.map((collection) => {
            const isActive = currentCollection === collection._id;

            return (
              <SwiperSlide key={collection._id}>
                <button
                  onClick={(e) => handleCollectionClick(collection._id, e)}
                  className="flex flex-col gap-3 group w-full text-left"
                >
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={getImageUrl(collection.image) || "/placeholder.jpg"}
                      alt={collection.name}
                      fill
                      className={`object-cover transition-all duration-500 ease-in-out ${
                        isActive
                          ? "scale-105 opacity-70"
                          : "group-hover:scale-105"
                      }`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-full p-2">
                          <svg
                            className="w-5 h-5 text-[#1f473e]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`text-base font-medium transition-colors ${
                        isActive ? "text-[#1f473e]" : "text-gray-900"
                      }`}
                    >
                      {collection.name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {collection.productCount || 0}
                    </span>
                  </div>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
