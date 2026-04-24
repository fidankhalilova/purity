"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "next-intl";

export function useRequireAuth(allowedRoles?: string[]) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const returnUrl = pathname ? encodeURIComponent(pathname) : "";
        router.push(
          `/${locale}/account/login${returnUrl ? `?returnUrl=${returnUrl}` : ""}`,
        );
        return;
      }

      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push(`/${locale}`);
      }
    }
  }, [user, isLoading, router, locale, pathname, allowedRoles]);

  return { user, isLoading };
}
