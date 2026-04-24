"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { googleLogin, user } = useAuth();
  const [processing, setProcessing] = useState(true);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;

    const handleCallback = async () => {
      const token = searchParams?.get("token");
      const userDataParam = searchParams?.get("user");
      const error = searchParams?.get("error");

      if (error) {
        console.error("Google auth error:", error);
        toast.error("Google login failed. Please try again.");
        router.replace("/en/account/login");
        return;
      }

      if (token && userDataParam && !hasProcessed.current) {
        try {
          hasProcessed.current = true;

          const userData = JSON.parse(decodeURIComponent(userDataParam));

          console.log("Google login successful:", { token, userData });

          googleLogin(token, userData);

          const redirectUrl = sessionStorage.getItem("redirectAfterLogin");

          if (
            redirectUrl &&
            !redirectUrl.includes("/account/google/callback")
          ) {
            sessionStorage.removeItem("redirectAfterLogin");
            router.replace(redirectUrl);
          } else {
            if (userData.role === "admin") {
              router.replace("/en/admin");
            } else {
              router.replace("/en/shop");
            }
          }
        } catch (error) {
          console.error("Error processing Google callback:", error);
          toast.error("Login failed. Please try again.");
          router.replace("/en/account/login");
        }
      } else if (!hasProcessed.current) {
        console.error("Missing token or user data in callback");
        toast.error("Login failed. Missing authentication data.");
        router.replace("/en/account/login");
      }

      setProcessing(false);
    };

    handleCallback();
  }, [searchParams, router, googleLogin]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-[#1f473e] mb-4" />
      <p className="text-gray-600">Processing Google login...</p>
    </div>
  );
}
