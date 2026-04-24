"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const t = useTranslations("ContactUsPage.Form");
  const subjects = t.raw("subjects") as string[];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!subject) {
      toast.error("Please select a subject");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message: comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setName("");
        setEmail("");
        setSubject("");
        setComment("");
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t("namePlaceholder") || "Your Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-colors"
            disabled={isSubmitting}
          />
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 text-sm outline-none focus:border-gray-400 transition-colors"
            disabled={isSubmitting}
          />
        </div>

        {/* Subject dropdown */}
        <div className="relative">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 bg-gray-50 text-gray-400 text-sm outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
            disabled={isSubmitting}
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
          disabled={isSubmitting}
        />

        {/* Submit */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative inline-flex items-center justify-start px-10 py-4 overflow-hidden font-medium transition-all bg-[#1f473e] rounded-xl hover:bg-white group border-2 border-[#1f473e] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 border-0 group-hover:border-25 ease-linear duration-100 transition-all border-white rounded-xl" />
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-[#1f473e] whitespace-nowrap flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                t("submitBtn")
              )}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}
