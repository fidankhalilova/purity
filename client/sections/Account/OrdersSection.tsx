"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronDown,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { orderService } from "@/services/orderService";
import { Order } from "@/types/order";
import { getImageUrl } from "@/utils/imageUrl";
import { toast } from "react-hot-toast";

interface OrdersSectionProps {
  userId: string;
}

const statusConfig = {
  paid: {
    label: "Paid",
    color: "bg-yellow-100 text-yellow-700",
    icon: Package,
  },
  getting_ready: {
    label: "Getting Ready",
    color: "bg-blue-100 text-blue-700",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-700",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-500",
    icon: XCircle,
  },
};

export default function OrdersSection({ userId }: OrdersSectionProps) {
  const t = useTranslations("AccountPage.orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, [userId]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getUserOrders(userId);
      setOrders(data);
      if (data.length > 0) setExpanded(data[0]._id);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      setCancelling(orderId);
      await orderService.cancel(orderId);
      await loadOrders();
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <Package className="w-12 h-12 text-gray-200" />
        <p className="text-lg font-semibold text-gray-900">{t("emptyTitle")}</p>
        <p className="text-sm text-gray-500">{t("emptyDesc")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {orders.length} {t("total")}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          const Icon = config.icon;
          const isOpen = expanded === order._id;

          return (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : order._id)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1 min-w-0">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.orderedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${config.color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t(`status.${order.status}`) || config.label}
                  </span>
                  <p className="text-sm font-bold text-gray-900 sm:ml-auto">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-gray-100 px-5 md:px-6 py-4 flex flex-col gap-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
                        {item.image && (
                          <Image
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {t("qty")}: {item.quantity} | Size: {item.size || "-"}{" "}
                          | Color: {item.color || "-"}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                    <button className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors">
                      {t("viewDetails")}
                    </button>
                    {order.status === "delivered" && (
                      <button className="flex-1 py-2.5 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors">
                        {t("reorder")}
                      </button>
                    )}
                    {order.status === "shipped" && order.trackingNumber && (
                      <button className="flex-1 py-2.5 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors">
                        {t("trackOrder")}
                      </button>
                    )}
                    {(order.status === "paid" ||
                      order.status === "getting_ready") && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={cancelling === order._id}
                        className="flex-1 py-2.5 border border-red-200 text-red-500 text-sm font-medium rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {cancelling === order._id ? (
                          <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                        ) : (
                          t("cancelOrder")
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
