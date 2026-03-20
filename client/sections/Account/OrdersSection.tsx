"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronDown,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

const orders = [
  {
    id: "#PRT-2024-001",
    date: "Mar 10, 2026",
    status: "delivered" as const,
    total: "$145.00",
    items: [
      {
        name: "Dark Circle Patch",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        qty: 1,
        price: "$75.00",
      },
      {
        name: "Pore Detox Scrub",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
        qty: 1,
        price: "$70.00",
      },
    ],
  },
  {
    id: "#PRT-2024-002",
    date: "Feb 22, 2026",
    status: "shipped" as const,
    total: "$160.00",
    items: [
      {
        name: "Brighten Serum",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
        qty: 1,
        price: "$160.00",
      },
    ],
  },
  {
    id: "#PRT-2024-003",
    date: "Jan 05, 2026",
    status: "cancelled" as const,
    total: "$75.00",
    items: [
      {
        name: "Dark Circle Patch",
        image:
          "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=900",
        qty: 1,
        price: "$75.00",
      },
    ],
  },
];

export default function OrdersSection() {
  const t = useTranslations("AccountPage.orders");
  const [expanded, setExpanded] = useState<string | null>(orders[0].id);

  const statusConfig = {
    delivered: {
      label: t("status.delivered"),
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    shipped: {
      label: t("status.shipped"),
      color: "bg-blue-100 text-blue-700",
      icon: Truck,
    },
    processing: {
      label: t("status.processing"),
      color: "bg-yellow-100 text-yellow-700",
      icon: Package,
    },
    cancelled: {
      label: t("status.cancelled"),
      color: "bg-red-100 text-red-500",
      icon: XCircle,
    },
  };

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
          const { label, color, icon: Icon } = statusConfig[order.status];
          const isOpen = expanded === order.id;
          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : order.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1 min-w-0">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {order.id}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                  <span
                    className={`self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                  <p className="text-sm font-bold text-gray-900 sm:ml-auto">
                    {order.total}
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
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {t("qty")}: {item.qty}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 shrink-0">
                        {item.price}
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
                    {order.status === "shipped" && (
                      <button className="flex-1 py-2.5 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors">
                        {t("trackOrder")}
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
