"use client";
import { useTranslations } from "next-intl";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function BoxIcon() {
  return (
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
      />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.497 3.842 3.745 3.745 0 01-3.842.497A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.842-.497 3.745 3.745 0 01-.497-3.842A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.497-3.842 3.745 3.745 0 013.842-.497A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.842.497c.978.978 1.338 2.396.497 3.842A3.745 3.745 0 0121 12z"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
      />
    </svg>
  );
}

export default function OurBenefits() {
  const t = useTranslations("AboutUs.OurVision");

  const badges = [
    {
      icon: <BoxIcon />,
      title: t("badges.crueltyFreeTitle"),
      desc: t("badges.crueltyFreeDesc"),
    },
    {
      icon: <BadgeCheckIcon />,
      title: t("badges.parabenFreeTitle"),
      desc: t("badges.parabenFreeDesc"),
    },
    {
      icon: <ChatIcon />,
      title: t("badges.earthTitle"),
      desc: t("badges.earthDesc"),
    },
  ];

  return (
    <section className="pb-16">
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex flex-col items-center text-center gap-5"
          >
            <div className="text-gray-900 mb-1">{badge.icon}</div>
            <h3 className="font-semibold text-gray-900 text-base">
              {badge.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {badge.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile swiper */}
      <div className="md:hidden">
        <style>{`
          .benefits-swiper { padding-bottom: 40px !important; }
          .benefits-swiper .swiper-pagination { bottom: 0 !important; }
          .benefits-swiper .swiper-pagination-bullet { background: #9ca3af; opacity: 1; width: 8px; height: 8px; margin: 0 4px !important; }
          .benefits-swiper .swiper-pagination-bullet-active { background: #374151; }
        `}</style>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides
          className="benefits-swiper"
        >
          {badges.map((badge) => (
            <SwiperSlide key={badge.title}>
              <div className="flex flex-col items-center text-center gap-4 px-8">
                <div className="text-gray-900">{badge.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
