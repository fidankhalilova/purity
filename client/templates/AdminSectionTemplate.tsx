import AdminDashboard from "@/sections/Admin/AdminDashboard";
import AdminProducts from "@/sections/Admin/AdminProducts";
import AdminOrders from "@/sections/Admin/AdminOrders";
import AdminCustomers from "@/sections/Admin/AdminCustomers";
import AdminReviews from "@/sections/Admin/AdminReviews";
import AdminDiscounts from "@/sections/Admin/AdminDiscounts";
import AdminBlog from "@/sections/Admin/AdminBlog";
import AdminSettings from "@/sections/Admin/AdminSettings";

const sectionMap: Record<string, React.ComponentType> = {
  dashboard: AdminDashboard,
  products: AdminProducts,
  orders: AdminOrders,
  customers: AdminCustomers,
  reviews: AdminReviews,
  discounts: AdminDiscounts,
  blog: AdminBlog,
  settings: AdminSettings,
};

export default function AdminSectionTemplate({ section }: { section: string }) {
  const Section = sectionMap[section];
  if (!Section)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Section not found: {section}</p>
      </div>
    );
  return <Section />;
}
