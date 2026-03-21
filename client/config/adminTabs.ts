import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  Tag,
  FileText,
  Settings,
} from "lucide-react";

export type AdminTab = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

export const adminTabs: AdminTab[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview & analytics",
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    description: "Manage your products",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    description: "View & manage orders",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    description: "Customer accounts",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    description: "Product reviews",
  },
  {
    id: "discounts",
    label: "Discounts",
    icon: Tag,
    description: "Promo codes & offers",
  },
  {
    id: "blog",
    label: "Blog",
    icon: FileText,
    description: "Blog posts",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    description: "Store settings",
  },
];
