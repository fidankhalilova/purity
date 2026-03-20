"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function LeaveComment() {
  const t = useTranslations("BlogDetail.leaveComment");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <section className="py-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {t("title")}
        </h2>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          {t("description")}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t("namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-colors"
          />
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <textarea
          placeholder={t("commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={6}
          className="w-full px-5 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-colors resize-y"
        />
        <div className="flex justify-center mt-2">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-16 py-4 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors duration-300"
          >
            {t("submitBtn")}
          </button>
        </div>
      </div>
    </section>
  );
}
