"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const RabbitIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="29.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M28.1429 38.0315L29.9972 39.8859L31.8516 38.0315M24.3785 27.6837C17.7427 24.1319 14.9399 20.4788 18.1024 17.3195C21.6836 13.735 27.5247 18.5557 30.0005 24.7402C32.473 18.559 38.3109 13.735 41.8986 17.3195C45.0612 20.4788 42.2584 24.1319 35.6225 27.6902C36.9307 29.1816 37.5979 31.1275 37.4834 33.1062C37.4834 34.7643 40.8062 36.4257 40.8062 38.9178C40.6231 41.5931 38.494 43.7222 35.8187 43.9054C33.0715 43.9054 30.0071 41.4132 30.0071 39.7486C30.0071 41.41 26.9426 43.9054 24.1888 43.9054C21.5103 43.7255 19.3779 41.5964 19.1948 38.9178C19.1948 36.4225 22.5176 34.761 22.5176 33.0996C22.4031 31.1177 23.0736 29.1718 24.3818 27.6804L24.3785 27.6837ZM24.3785 27.6837L27.0374 25.5088C26.3441 24.0142 25.2648 22.7321 23.9141 21.7935C22.6582 20.5965 21.0688 19.805 19.355 19.5271C17.0036 19.3308 17.2096 21.7281 17.2096 21.7281M20.4408 42.1556L16.8008 43.611M19.2537 39.4248L16.8008 39.9154M39.5602 42.1556L43.2003 43.611M40.7408 39.4248L43.197 39.9154M42.7849 21.7281C42.7849 21.7281 42.9942 19.3308 40.6427 19.5271C38.929 19.8018 37.3395 20.5932 36.0836 21.7902C34.7329 22.7289 33.6537 24.0109 32.957 25.5055L35.616 27.6804M27.6588 33.2664C27.6752 33.6066 27.4103 33.8976 27.0669 33.9107C26.7267 33.9271 26.4357 33.6622 26.4226 33.3188C26.4226 33.3024 26.4226 33.2828 26.4226 33.2664C26.4389 32.9263 26.7267 32.6614 27.0669 32.6745C27.3874 32.6875 27.6458 32.9459 27.6588 33.2664ZM33.5784 33.2664C33.5784 33.6066 33.3005 33.8845 32.9603 33.8845C32.6202 33.8845 32.3422 33.6066 32.3422 33.2664C32.3422 32.9263 32.6202 32.6483 32.9603 32.6483C33.3005 32.6483 33.5784 32.9263 33.5784 33.2664Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ElementIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="29.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M27.412 28.3006L34.0641 26.5342L38.9345 31.3603L37.1528 37.9528M27.412 28.3006L25.6303 34.8957L30.5007 39.7218L37.1528 37.9554L42.1859 42.9418M27.412 28.3006L22.4323 23.3668L24.1634 16.7165L30.8741 15M22.5417 23.4745L15.7242 25.0832M25.1396 26.0479L18.3221 27.6566M31.6076 35.9288L29.7539 34.0914L30.4314 31.5811M21.8989 37.9843L14.7773 45M45.2185 15L38.8332 21.2928"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="35.43"
      strokeLinecap="round"
    />
  </svg>
);

const LeavesIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <path
      d="M59.25 30C59.25 46.1543 46.1543 59.25 30 59.25C13.8457 59.25 0.75 46.1543 0.75 30C0.75 13.8457 13.8457 0.75 30 0.75C46.1543 0.75 59.25 13.8457 59.25 30Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M40.0523 32.5859C34.4647 35.4793 31.6709 43.2 31.6709 43.2C29.7171 35.5414 25.6694 28.606 19.9996 23.2012M35.396 29.6895C33.153 31.2417 31.9965 34.0792 35.396 36.4417C37.2585 41.2691 40.7249 39.9714 42.7762 37.73C44.6235 35.7059 45.6765 30.4438 44.7604 26.9172C44.6965 26.6595 44.517 26.4484 44.2765 26.346C44.0361 26.2466 43.7652 26.2684 43.5461 26.4081C40.6062 28.2987 37.9494 27.923 35.396 29.6895ZM28.9136 22.8783C31.327 25.8182 32.6022 29.6864 26.8502 32.2879C24.2177 38.3726 20.2157 36.1188 17.5527 32.8684C15.0724 29.8478 14.0194 22.1084 15.7693 17.3461C15.8575 17.104 16.0523 16.9177 16.2927 16.837C16.5332 16.7594 16.7979 16.806 17.0019 16.9581C21.1743 20.0253 26.0802 19.423 28.9136 22.8814V22.8783Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function OurVision() {
  const t = useTranslations("AboutUs.OurVision");

  const badges = [
    {
      icon: <RabbitIcon />,
      title: t("badges.crueltyFreeTitle"),
      desc: t("badges.crueltyFreeDesc"),
    },
    {
      icon: <ElementIcon />,
      title: t("badges.parabenFreeTitle"),
      desc: t("badges.parabenFreeDesc"),
    },
    {
      icon: <LeavesIcon />,
      title: t("badges.earthTitle"),
      desc: t("badges.earthDesc"),
    },
  ];

  return (
    <div className="flex flex-col items-center gap-5 px-4">
      {/* Text block */}
      <div className="text-center w-full max-w-3xl flex flex-col items-center justify-center gap-4 md:gap-6">
        <h2 className="text-md">{t("tag")}</h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          {t("title")}
        </h1>
        <p className="text-sm sm:text-base">{t("description")}</p>
        <p className="text-sm sm:text-base">{t("body")}</p>
      </div>

      {/* Badges */}
      <div className="w-full mt-6 md:mt-8">
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-10">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center gap-2">
              {badge.icon}
              <h3 className="font-medium mt-1">{badge.title}</h3>
              <p className="text-center text-sm">{badge.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile swiper */}
        <div className="md:hidden">
          <style>{`
            .ourvision-swiper {
              padding-bottom: 40px !important;
            }
            .ourvision-swiper .swiper-pagination {
              position: absolute;
              bottom: 0 !important;
              left: 0;
              width: 100%;
            }
            .ourvision-swiper .swiper-pagination-bullet {
              background: #9ca3af;
              opacity: 1;
              width: 8px;
              height: 8px;
              margin: 0 4px !important;
            }
            .ourvision-swiper .swiper-pagination-bullet-active {
              background: #374151;
            }
          `}</style>
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides
            className="ourvision-swiper"
          >
            {badges.map((badge) => (
              <SwiperSlide key={badge.title}>
                <div className="flex flex-col items-center gap-5 px-8 text-center">
                  <div className="mb-2">{badge.icon}</div>
                  <h3 className="text-xl font-semibold">{badge.title}</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
