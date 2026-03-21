"use client";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
} from "lucide-react";
import AdminStatCard from "@/components/Admin/AdminStatCard";
import AdminBadge from "@/components/Admin/AdminBadge";
import Image from "next/image";

const recentOrders = [
  {
    id: "#PRT-001",
    customer: "Isabella D.",
    product: "Dark Circle Patch",
    total: "$75.00",
    status: "delivered",
  },
  {
    id: "#PRT-002",
    customer: "Amelia T.",
    product: "Brighten Serum",
    total: "$160.00",
    status: "shipped",
  },
  {
    id: "#PRT-003",
    customer: "Sophie M.",
    product: "Pore Detox Scrub",
    total: "$70.00",
    status: "processing",
  },
  {
    id: "#PRT-004",
    customer: "Mia C.",
    product: "Dark Circle Patch",
    total: "$75.00",
    status: "cancelled",
  },
];

const statusColor: Record<string, "green" | "blue" | "yellow" | "red"> = {
  delivered: "green",
  shipped: "blue",
  processing: "yellow",
  cancelled: "red",
};

const topProducts = [
  {
    name: "Dark Circle Patch",
    sales: 142,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=200",
  },
  {
    name: "Brighten Serum",
    sales: 98,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=200",
  },
  {
    name: "Pore Detox Scrub",
    sales: 76,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=200",
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Revenue"
          value="$24,830"
          change="12%"
          positive
          icon={<DollarSign className="w-5 h-5 text-[#1f473e]" />}
        />
        <AdminStatCard
          label="Total Orders"
          value="384"
          change="8%"
          positive
          icon={<ShoppingCart className="w-5 h-5 text-blue-600" />}
          color="bg-blue-50"
        />
        <AdminStatCard
          label="Products"
          value="48"
          icon={<Package className="w-5 h-5 text-purple-600" />}
          color="bg-purple-50"
        />
        <AdminStatCard
          label="Customers"
          value="1,204"
          change="3%"
          positive
          icon={<Users className="w-5 h-5 text-orange-600" />}
          color="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <span className="text-xs text-[#1f473e] font-medium cursor-pointer hover:underline">
              View all
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {order.id}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {order.customer} · {order.product}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <AdminBadge
                    label={order.status}
                    color={statusColor[order.status]}
                  />
                  <span className="text-sm font-bold text-gray-900">
                    {order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900">Top Products</h3>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex flex-col gap-4">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {p.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1f473e] rounded-full"
                        style={{ width: `${(p.sales / 150) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">
                      {p.sales}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
