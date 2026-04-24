import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  Tag,
  FileText,
  Settings,
  Palette,
  Ruler,
  Droplets,
  AlertCircle,
  Layers,
  BookOpen,
  Home,
  Award,
  Eye,
  Store,
  FlaskConical,
} from "lucide-react";

export type AdminTab = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  group?: string;
};

export const adminTabs: AdminTab[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview & analytics",
  },

  // Products group
  {
    id: "products",
    label: "Products",
    icon: Package,
    description: "Manage products",
    group: "Catalog",
  },
  {
    id: "collections",
    label: "Collections",
    icon: Layers,
    description: "Product collections",
    group: "Catalog",
  },
  {
    id: "tags",
    label: "Tags",
    icon: Tag,
    description: "Product tags",
    group: "Catalog",
  },
  {
    id: "badges",
    label: "Badges",
    icon: Award,
    description: "Product badges",
    group: "Catalog",
  },
  {
    id: "brands",
    label: "Brands",
    icon: Store,
    description: "Manage brands",
    group: "Catalog",
  },
  {
    id: "glow-ingredients",
    label: "Glow Ingredients",
    icon: Droplets,
    description: "Manage glow ingredients",
    group: "Catalog",
  },
  {
    id: "formulations",
    label: "Formulations",
    icon: FlaskConical,
    description: "Product formulation bases",
    group: "Catalog",
  },
  {
    id: "product-colors",
    label: "Product Colors",
    icon: Palette,
    description: "Color variants",
    group: "Catalog",
  },
  {
    id: "product-sizes",
    label: "Product Sizes",
    icon: Ruler,
    description: "Size variants",
    group: "Catalog",
  },

  // Skin group
  {
    id: "skin-types",
    label: "Skin Types",
    icon: Droplets,
    description: "Skin type categories",
    group: "Skin",
  },
  {
    id: "skin-concerns",
    label: "Skin Concerns",
    icon: AlertCircle,
    description: "Skin concern categories",
    group: "Skin",
  },
  {
    id: "skin-shades",
    label: "Skin Shades",
    icon: Eye,
    description: "Skin shade tones",
    group: "Skin",
  },
  {
    id: "skin-colors",
    label: "Skin Colors",
    icon: Palette,
    description: "Skin color types",
    group: "Skin",
  },

  // Store group
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    description: "View & manage orders",
    group: "Store",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    description: "User accounts",
    group: "Store",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    description: "Product reviews",
    group: "Store",
  },
  {
    id: "discounts",
    label: "Discounts",
    icon: Tag,
    description: "Promo codes & offers",
    group: "Store",
  },

  // Content group
  {
    id: "blog",
    label: "Blog",
    icon: FileText,
    description: "Blog posts",
    group: "Content",
  },
  {
    id: "home-sections",
    label: "Home Sections",
    icon: Home,
    description: "Homepage layout",
    group: "Content",
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    description: "Store settings",
  },
];
