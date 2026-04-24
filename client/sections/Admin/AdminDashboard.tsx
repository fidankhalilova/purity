"use client";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Loader2,
} from "lucide-react";
import AdminStatCard from "@/components/Admin/AdminStatCard";
import AdminBadge from "@/components/Admin/AdminBadge";
import Image from "next/image";
import { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { userService } from "@/services/userService";
import { orderService } from "@/services/orderService";
import { Order } from "@/types/order";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RecentOrder = {
  _id: string;
  orderNumber: string;
  customer: string;
  product: string;
  total: number;
  status: Order["status"];
};

type TopProduct = {
  _id: string;
  name: string;
  sales: number;
  image: string;
};

const statusColor: Record<
  Order["status"],
  "green" | "blue" | "yellow" | "red" | "gray" | "orange"
> = {
  paid: "yellow",
  getting_ready: "blue",
  shipped: "blue",
  delivered: "green",
  cancelled: "red",
};

const statusLabel: Record<Order["status"], string> = {
  paid: "Paid",
  getting_ready: "Getting Ready",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  // Token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      // login if no token
      router.push("/account/login");
      return;
    }
    loadDashboardData(token);
  }, []);

  const loadDashboardData = async (token: string) => {
    try {
      setLoading(true);

      // Fetch all data in parallel with token
      const [ordersData, productsData, usersData] = await Promise.all([
        orderService.getAll(1, 100, token),
        productService.getAll(1, 1000),
        userService.getAll(token),
      ]);

      const orders = ordersData.orders;
      const products = productsData.products;
      const users = usersData;

      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

      setStats({
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalUsers: users.length,
      });

      const recent = orders.slice(0, 5).map((order) => ({
        _id: order._id,
        orderNumber: order.orderNumber,
        customer: order.shippingAddress?.fullName || "Unknown",
        product: order.items[0]?.name || `${order.items.length} items`,
        total: order.total,
        status: order.status,
      }));
      setRecentOrders(recent);

      const productSales: Record<
        string,
        { name: string; sales: number; image: string }
      > = {};

      orders.forEach((order) => {
        order.items.forEach((item: any) => {
          let productId: string;

          if (typeof item.product === "string") {
            productId = item.product;
          } else if (item.product && typeof item.product === "object") {
            productId =
              (item.product as any)._id ||
              (item.product as any).id ||
              `product-${item.name}`;
          } else {
            productId = `product-${item.name}`;
          }

          if (!productSales[productId]) {
            productSales[productId] = {
              name: item.name,
              sales: 0,
              image: item.image || "",
            };
          }
          productSales[productId].sales += item.quantity;
        });
      });

      const top = Object.entries(productSales)
        .map(([id, data]) => ({
          _id: id,
          name: data.name,
          sales: data.sales,
          image: data.image,
        }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

      setTopProducts(top);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      // If unauthorized, redirect to login
      if (
        (error as any).message?.includes("401") ||
        (error as any).message?.includes("unauthorized")
      ) {
        router.push("/account/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<DollarSign className="w-5 h-5 text-[#1f473e]" />}
        />
        <AdminStatCard
          label="Total Orders"
          value={stats.totalOrders.toString()}
          icon={<ShoppingCart className="w-5 h-5 text-blue-600" />}
          color="bg-blue-50"
        />
        <AdminStatCard
          label="Products"
          value={stats.totalProducts.toString()}
          icon={<Package className="w-5 h-5 text-purple-600" />}
          color="bg-purple-50"
        />
        <AdminStatCard
          label="Customers"
          value={stats.totalUsers.toString()}
          icon={<Users className="w-5 h-5 text-orange-600" />}
          color="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <Link
              href="/admin/orders"
              className="text-xs text-[#1f473e] font-medium cursor-pointer hover:underline"
            >
              View all
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No orders yet
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {order.customer} · {order.product}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <AdminBadge
                      label={statusLabel[order.status]}
                      color={statusColor[order.status]}
                    />
                    <span className="text-sm font-bold text-gray-900">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top products */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900">Top Products</h3>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No sales yet
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {topProducts.map((product, i) => {
                const maxSales = topProducts[0]?.sales || 1;
                const percentage = (product.sales / maxSales) * 100;

                return (
                  <div key={product._id} className="flex items-center gap-3">
                    <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1f473e] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">
                          {product.sales} sold
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
