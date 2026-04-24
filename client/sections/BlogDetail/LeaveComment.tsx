"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface LeaveCommentProps {
  postId: string;
}

export default function LeaveComment({ postId }: LeaveCommentProps) {
  const t = useTranslations("BlogDetail.leaveComment");
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!name || !email || !comment) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      toast.success("Comment submitted! It will appear after approval.");
      setComment("");
      if (!user) {
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
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
            disabled={submitting}
            className="w-full sm:w-auto px-16 py-4 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting && (
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
            )}
            {submitting ? t("submitting") : t("submitBtn")}
          </button>
        </div>
      </div>
    </section>
  );
}
