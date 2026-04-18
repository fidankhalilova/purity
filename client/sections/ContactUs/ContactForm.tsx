"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const subjects = [
  "General Enquiry",
  "Order Support",
  "Product Question",
  "Returns & Refunds",
  "Partnership",
  "Other",
];

export default function ContactForm() {
  const t = useTranslations("ContactUsPage.Form");
  const subjects = t.raw("subjects") as string[];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // handle submission
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t("emailPlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-colors"
          />
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Subject dropdown */}
        <div className="relative">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 bg-gray-50 text-gray-400 text-sm outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>
              {t("subjectPlaceholder")}
            </option>
            {subjects.map((s) => (
              <option key={s} value={s} className="text-gray-700">
                {s}
              </option>
            ))}
          </select>
          {/* chevron */}
          <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          placeholder={t("commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={7}
          className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-colors resize-y"
        />

        {/* Submit */}
        <div className="flex justify-center mt-4">
          <a
            href="#_"
            className="relative inline-flex items-center justify-start px-10 py-4 overflow-hidden font-medium transition-all bg-[#1f473e] rounded-xl hover:bg-white group border-2 border-[#1f473e]"
          >
            <span className="absolute inset-0 border-0 group-hover:border-25 ease-linear duration-100 transition-all border-white rounded-xl" />
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-[#1f473e] whitespace-nowrap">
              {t("submitBtn")}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
