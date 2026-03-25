"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminSidebarLayout from "@/layout/AdminSidebarLayout";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { Toaster } from "react-hot-toast";
import "../globals.css";

// Create a separate component that uses useAdminAuth
function AdminAuthGuard({ children }: { children: React.ReactNode }) {
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

// Main layout - wrap with AdminAuthProvider first
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminAuthProvider>
          <AdminAuthGuard>{children}</AdminAuthGuard>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: { background: "#363636", color: "#fff" },
              success: { duration: 3000, style: { background: "#1f473e" } },
              error: { duration: 4000, style: { background: "#e8392a" } },
            }}
          />
        </AdminAuthProvider>
      </body>
    </html>
  );
}
