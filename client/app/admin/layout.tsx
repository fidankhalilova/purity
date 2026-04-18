// app/admin/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { AdminAuthProvider } from "@/context/AdminAuthContext"; // ← Import the Provider only
import AdminAuthGuard from "@/components/AdminAuthGuard"; // ← We'll create this

// ✅ Metadata works here because this is a Server Component
export const metadata: Metadata = {
  title: "Admin - Purity",
  description: "By Fidan Khalilova",
};

// Main Layout (Server Component)
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
