// app/[locale]/reset-password/[token]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function ResetPasswordConfirmTemplate() {
  const t = useTranslations("AuthPages.reset");
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/verify-reset-token/${token}`,
      );
      const data = await response.json();

      if (data.success) {
        setValidToken(true);
      } else {
        setValidToken(false);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setValidToken(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        toast.success("Password reset successful!");
        setTimeout(() => {
          router.push(`/${locale}/account/login`);
        }, 3000);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors bg-white";

  if (verifying) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col items-center justify-center min-h-[70vh] py-10">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!validToken) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col items-center justify-center min-h-[70vh] py-10">
          <div className="w-full max-w-md text-center flex flex-col gap-6">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Invalid or Expired Link
            </h2>
            <p className="text-sm text-gray-500">
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
            <Link
              href={`/${locale}/account/forgot-password`}
              className="inline-block px-6 py-3 bg-[#1f473e] text-white font-semibold text-sm rounded-full hover:bg-[#163830] transition-colors"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col items-center justify-center min-h-[70vh] py-10">
          <div className="w-full max-w-md text-center flex flex-col gap-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Password Reset Successfully!
            </h2>
            <p className="text-sm text-gray-500">
              Your password has been reset. Redirecting you to login...
            </p>
            <Link
              href={`/${locale}/account/login`}
              className="inline-block px-6 py-3 bg-[#1f473e] text-white font-semibold text-sm rounded-full hover:bg-[#163830] transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
      <div className="flex flex-col gap-10 items-center justify-center min-h-[70vh] py-6">
        <div className="w-full flex flex-col gap-8">
          {/* Header */}
          <div className="text-center flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Create New Password
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
              Enter your new password below
            </p>
          </div>
        </div>
        <div className="w-full max-w-100 flex flex-col gap-8">
          {/* Form */}
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-[#1f473e] text-white font-semibold text-sm rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>

          <div className="flex justify-center">
            <Link
              href={`/${locale}/account/login`}
              className="text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-[#1f473e] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
