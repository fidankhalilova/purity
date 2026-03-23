import type { Metadata } from "next";
import AdminSidebarLayout from "@/layout/AdminSidebarLayout";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Purity Admin",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminSidebarLayout>{children}</AdminSidebarLayout>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: { background: "#363636", color: "#fff" },
            success: { duration: 3000, style: { background: "#1f473e" } },
            error: { duration: 4000, style: { background: "#e8392a" } },
          }}
        />
      </body>
    </html>
  );
}
