"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProductDetail } from "@/types/product";

function Stars({
  rating,
  size = "sm",
  interactive = false,
  onRate,
}: {
  rating: number;
  size?: "sm" | "md";
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const cls = size === "md" ? "w-5 h-5" : "w-4 h-4";
  const display = interactive && hovered ? hovered : rating;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${cls} ${i < display ? "text-yellow-400" : "text-gray-200"} ${interactive ? "cursor-pointer transition-colors" : ""}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRate?.(i + 1)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function WriteReview({ onClose }: { onClose: () => void }) {
  const t = useTranslations("ProductDetail");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const ratingLabels = t.raw("ratingLabels") as string[];

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setImages((prev) => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:p-8 border border-gray-100 mt-6">
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <h3 className="text-base md:text-lg font-bold text-gray-900">
          {t("writeReviewTitle")}
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            {t("yourRating")} <span className="text-[#e8392a]">*</span>
          </label>
          <div className="flex items-center gap-3">
            <Stars rating={rating} size="md" interactive onRate={setRating} />
            {rating > 0 && (
              <span className="text-sm text-gray-400">
                {ratingLabels[rating]}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              {t("name")} <span className="text-[#e8392a]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("name")}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            {t("reviewTitle")} <span className="text-[#e8392a]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("reviewTitlePlaceholder")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            {t("yourReview")} <span className="text-[#e8392a]">*</span>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t("yourReviewPlaceholder")}
            rows={5}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            {t("addPhotos")}
          </label>
          <div className="flex gap-3 flex-wrap">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden group"
              >
                <Image src={img} alt="preview" fill className="object-cover" />
                <button
                  onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 hover:border-gray-400 transition-colors text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="text-xs">{t("photo")}</span>
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImages}
          />
          <p className="text-xs text-gray-400">{t("photoLimit")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              if (!rating || !title || !body || !name) return;
              onClose();
            }}
            disabled={!rating || !title || !body || !name}
            className="flex-1 bg-[#1f473e] text-white py-3.5 rounded-full text-sm font-medium hover:bg-[#163830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("submitReview")}
          </button>
          <button
            onClick={onClose}
            className="sm:w-auto px-6 py-3.5 border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CustomerReviews({
  product,
}: {
  product: ProductDetail;
}) {
  const t = useTranslations("ProductDetail");
  const [sort, setSort] = useState(t("mostRecent"));
  const [sortOpen, setSortOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const avg =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
  }));

  const sortOpts = [t("mostRecent"), t("highestRated"), t("lowestRated")];

  return (
    <section className="py-12 md:py-16 bg-[#f5f0e8] rounded-2xl md:rounded-3xl px-4 md:px-6 lg:px-10 my-8 md:my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-10">
        {t("customerReviews")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="bg-white rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center gap-2">
          <Stars rating={avg} size="md" />
          <p className="text-base md:text-lg font-bold text-gray-900">
            {avg.toFixed(2)} {t("outOf5")}
          </p>
          <p className="text-sm text-gray-500">
            {t("basedOn")} {product.reviews.length} {t("reviews")}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 md:p-6 flex flex-col gap-2">
          {ratingCounts.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-3">
              <Stars rating={star} />
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all"
                  style={{
                    width: product.reviews.length
                      ? `${(count / product.reviews.length) * 100}%`
                      : "0%",
                  }}
                />
              </div>
              <span className="text-sm text-gray-500 w-4 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-6 md:px-8 py-3 border-2 font-medium rounded-full transition-colors text-sm md:text-base ${
              showForm
                ? "bg-gray-900 border-gray-900 text-white"
                : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            }`}
          >
            {showForm ? t("cancelReview") : t("writeReview")}
          </button>
        </div>
      </div>

      {showForm && <WriteReview onClose={() => setShowForm(false)} />}

      <div className="relative inline-block mb-5 md:mb-6 mt-4">
        <button
          onClick={() => setSortOpen(!sortOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-full px-4 py-2 hover:bg-white transition-colors"
        >
          {sort}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {sortOpen && (
          <div className="absolute top-10 left-0 z-10 bg-white border border-gray-100 rounded-2xl shadow-sm py-2 min-w-40">
            {sortOpts.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setSort(opt);
                  setSortOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${sort === opt ? "font-semibold" : "text-gray-600"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col divide-y divide-gray-200">
        {product.reviews.map((review, i) => (
          <div key={i} className="py-6 md:py-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2 md:gap-3 flex-1">
                <Stars rating={review.rating} />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {review.author}
                  </span>
                </div>
                <p className="font-bold text-gray-900 text-sm md:text-base">
                  {review.title}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.body}
                </p>
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 md:gap-3 flex-wrap mt-2">
                    {review.images.map((img, j) => (
                      <div
                        key={j}
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt="Review photo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 shrink-0">
                {review.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
