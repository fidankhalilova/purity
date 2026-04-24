"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, Truck, Home, Loader2 } from "lucide-react";
import { orderService } from "@/services/orderService";
import { Order } from "@/types/order";

const stepIcons = [Package, Truck, Home];

export default function OrderSuccessTemplate() {
  const t = useTranslations("CheckoutPage.orderSuccess");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const steps = t.raw("steps") as { title: string; desc: string }[];

  useEffect(() => {
    if (orderId) {
      loadOrder();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const data = await orderService.getById(orderId!);
      setOrder(data);
    } catch (error) {
      console.error("Error loading order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  const deliveryDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
        {/* Success icon */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle
                className="w-12 h-12 text-green-600"
                strokeWidth={1.5}
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
            {t("desc")}
          </p>
        </div>

        {/* Order details card */}
        <div className="w-full bg-[#f5f0e8] rounded-3xl p-6 md:p-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-1">
              <p className="text-xs text-gray-400 font-medium">
                {t("orderNumber")}
              </p>
              <p className="text-sm font-bold text-gray-900">
                {order?.orderNumber ||
                  "#PRT-" + Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-1">
              <p className="text-xs text-gray-400 font-medium">
                {t("estimatedDelivery")}
              </p>
              <p className="text-sm font-bold text-gray-900">{deliveryDate}</p>
            </div>
          </div>

          {/* Order items preview */}
          {order && order.items.length > 0 && (
            <div className="border-t border-white/50 pt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">
                Items ordered
              </p>
              <div className="space-y-2">
                {order.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <p className="text-xs text-gray-400">
                    + {order.items.length - 3} more items
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="border-t border-white/50 pt-4 flex justify-between">
            <span className="font-semibold text-gray-900">Total paid</span>
            <span className="font-bold text-lg text-[#1f473e]">
              ${order ? order.total.toFixed(2) : "0.00"}
            </span>
          </div>

          {/* What happens next */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold text-gray-900">
              {t("whatHappensNext")}
            </p>
            <div className="flex flex-col gap-0">
              {steps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#1f473e] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-0.5 h-8 bg-[#1f473e]/20 mt-1" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-semibold text-gray-900">
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href={`/${locale}/account/orders`}
            className="flex-1 py-3.5 bg-[#1f473e] text-white text-sm font-bold rounded-full hover:bg-[#163830] transition-colors text-center"
          >
            {t("viewOrders")}
          </Link>
          <Link
            href={`/${locale}/shop`}
            className="flex-1 py-3.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors text-center"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}
