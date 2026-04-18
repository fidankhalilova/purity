"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminSidebarLayout from "@/layout/AdminSidebarLayout";
import { useAdminAuth } from "@/context/AdminAuthContext";
import "@/app/globals.css";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAdminAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const returnUrl = encodeURIComponent("/admin");
        router.push(`/account/login?returnUrl=${returnUrl}`);
      } else if (user.role !== "admin") {
        router.push("/");
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  return <AdminSidebarLayout>{children}</AdminSidebarLayout>;
}
