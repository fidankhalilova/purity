import AdminDashboard from "@/sections/Admin/AdminDashboard";
import AdminProducts from "@/sections/Admin/AdminProducts";
import AdminOrders from "@/sections/Admin/AdminOrders";
import AdminUsers from "@/sections/Admin/AdminUsers";
import AdminReviews from "@/sections/Admin/AdminReviews";
import AdminReviewsManage from "@/sections/Admin/AdminReviews";
import AdminDiscounts from "@/sections/Admin/AdminDiscounts";
import AdminBlog from "@/sections/Admin/AdminBlog";
import AdminSettings from "@/sections/Admin/AdminSettings";
import AdminProductColors from "@/sections/Admin/AdminProductColors";
import AdminProductSizes from "@/sections/Admin/AdminProductSizes";
import AdminSkinTypes from "@/sections/Admin/AdminSkinTypes";
import AdminSkinConcerns from "@/sections/Admin/AdminSkinConcerns";
import AdminSkinShades from "@/sections/Admin/AdminSkinShades";
import AdminSkinColors from "@/sections/Admin/AdminSkinColors";
import AdminCollections from "@/sections/Admin/AdminCollections";
import AdminTags from "@/sections/Admin/AdminTags";
import AdminHomeSections from "@/sections/Admin/AdminHomeSections";
import AdminBadges from "@/sections/Admin/AdminBadges";
import AdminBrands from "@/sections/Admin/AdminBrands";
import AdminFormulations from "@/sections/Admin/AdminFormulations";
import AdminGlowIngredients from "@/sections/Admin/AdminGlowIngredients";

const sectionMap: Record<string, React.ComponentType> = {
  dashboard: AdminDashboard,
  products: AdminProducts,
  orders: AdminOrders,
  customers: AdminUsers,
  reviews: AdminReviews,
  "reviews-manage": AdminReviewsManage,
  discounts: AdminDiscounts,
  blog: AdminBlog,
  settings: AdminSettings,
  "product-colors": AdminProductColors,
  "product-sizes": AdminProductSizes,
  "skin-types": AdminSkinTypes,
  "skin-concerns": AdminSkinConcerns,
  "skin-shades": AdminSkinShades,
  "skin-colors": AdminSkinColors,
  collections: AdminCollections,
  tags: AdminTags,
  "home-sections": AdminHomeSections,
  badges: AdminBadges,
  brands: AdminBrands,
  formulations: AdminFormulations,
  users: AdminUsers,
  "glow-ingredients": AdminGlowIngredients,
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
