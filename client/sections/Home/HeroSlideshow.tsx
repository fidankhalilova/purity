"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";

const slideMedia = [
  {
    desktopVideo:
      "https://purity.nextsky.co/cdn/shop/videos/c/vp/ed68ae1fd532456e8e38f44fc2218d1e/ed68ae1fd532456e8e38f44fc2218d1e.HD-1080p-2.5Mbps-57170659.mp4?v=0",
    mobileVideo:
      "https://purity.nextsky.co/cdn/shop/videos/c/vp/38814bce0b5d464f90dd9d3b3219a072/38814bce0b5d464f90dd9d3b3219a072.HD-720p-1.6Mbps-58126290.mp4?v=0",
    image: null,
  },
  {
    desktopVideo: null,
    mobileVideo: null,
    image:
      "https://purity.nextsky.co/cdn/shop/files/slideshow_v2_dk_2.jpg?v=1757298599&width=1920",
  },
  {
    desktopVideo: null,
    mobileVideo: null,
    image:
      "https://purity.nextsky.co/cdn/shop/files/slideshow_v2_dk_3.jpg?v=1757298694&width=1920",
  },
];

export default function HeroSlideshow() {
  const t = useTranslations("HomePage.hero");
  const locale = useLocale();
  const slides = t.raw("slides") as any[];
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
      setProgress(0);
    }, 600);
  };

  const startProgress = () => {
    clearInterval(progressRef.current!);
    setProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / 6000) * 100, 100));
    }, 50);
  };

  useEffect(() => {
    startProgress();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, 6000);
    return () => {
      clearInterval(intervalRef.current!);
      clearInterval(progressRef.current!);
    };
  }, []);

  useEffect(() => {
    startProgress();
  }, [current]);

  const slide = slides[current];
  const media = slideMedia[current];

  return (
    <div className="relative w-full h-[85svh] min-h-125 overflow-hidden bg-gray-900">
      {slideMedia.map((m, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          {m.desktopVideo ? (
            <>
              <video
                src={m.desktopVideo}
                autoPlay
                muted
                loop
                playsInline
                className="hidden md:block w-full h-full object-cover"
              />
              <video
                src={m.mobileVideo!}
                autoPlay
                muted
                loop
                playsInline
                className="block md:hidden w-full h-full object-cover object-center"
              />
            </>
          ) : m.image ? (
            <img
              src={m.image}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          ) : null}

          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-28 px-6 md:px-16 lg:px-24">
        <div
          className={`transition-all duration-700 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
        >
          <span className="inline-block text-white/70 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
            {slide?.tag}
          </span>

          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 md:mb-4 max-w-xs sm:max-w-md md:max-w-2xl">
            {slide?.titleLine1}
            <br />
            {slide?.titleLine2}
            <span className="relative inline-block italic">
              <em>{slide?.titleItalic}</em>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 C40 2, 90 9, 140 4 C165 1, 185 7, 198 5"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="text-white/80 text-sm md:text-base mb-6 md:mb-8 max-w-xs md:max-w-sm">
            {slide?.desc}
          </p>

          <Link
            href={`/${locale}${slide?.btnHref}`}
            className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            {slide?.btnText}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 right-6 md:right-16 flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative w-1 h-12 bg-white/30 rounded-full overflow-hidden"
          >
            {i === current && (
              <div
                className="absolute top-0 left-0 w-full bg-white rounded-full"
                style={{
                  height: `${progress}%`,
                  transition: "height 0.05s linear",
                }}
              />
            )}
            {i < current && (
              <div className="absolute inset-0 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="hidden md:block absolute bottom-8 left-6 md:left-16 text-white/50 text-xs font-medium tracking-widest">
        0{current + 1} / 0{slides.length}
      </div>
    </div>
  );
}
