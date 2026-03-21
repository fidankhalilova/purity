import type { Metadata } from "next";
import AdminSidebarLayout from "@/layout/AdminSidebarLayout";
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
      </body>
    </html>
  );
}
