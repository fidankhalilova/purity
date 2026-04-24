"use client";
import {
  X,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/utils/imageUrl";
import { Order } from "@/types/order";

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  paid: {
    label: "Paid",
    color: "bg-yellow-100 text-yellow-700",
    borderColor: "border-yellow-200",
    icon: Clock,
  },
  getting_ready: {
    label: "Getting Ready",
    color: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-200",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    borderColor: "border-green-200",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-500",
    borderColor: "border-red-200",
    icon: XCircle,
  },
};

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
}: OrderDetailModalProps) {
  const t = useTranslations("AccountPage.orders");

  if (!isOpen || !order) return null;

  const status = statusConfig[order.status];
  const StatusIcon = status?.icon || Package;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t("orderDetails")}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{order.orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Status Banner */}
          <div
            className={`bg-white rounded-2xl border ${status.borderColor} p-5 mb-6`}
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${status.color} flex items-center justify-center`}
                >
                  <StatusIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("currentStatus")}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {t(`status.${order.status}`) || status.label}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{t("placedOn")}</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatShortDate(order.orderedAt)}
                </p>
              </div>
            </div>
            {order.trackingNumber && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">{t("trackingNumber")}</p>
                <p className="text-sm font-medium text-gray-900">
                  {order.trackingNumber}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {/* Shipping Address */}
              {order.shippingAddress && (
                <div className="bg-[#f5f0e8] rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1f473e]" />
                    {t("shippingAddress")}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="font-medium text-gray-900">
                      {order.shippingAddress.fullName}
                    </p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    {order.shippingAddress.phone && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#1f473e]/10">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {order.shippingAddress.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#1f473e]" />
                  {t("orderSummary")}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("subtotal")}</span>
                    <span className="font-medium text-gray-900">
                      ${order.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t("discount")}</span>
                      <span className="text-green-600 font-medium">
                        -${order.discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("shipping")}</span>
                    <span className="font-medium text-gray-900">
                      {order.shippingCost === 0
                        ? t("free")
                        : `$${order.shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">
                      {t("total")}
                    </span>
                    <span className="font-bold text-lg text-[#1f473e]">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Payment Info */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#1f473e]" />
                  {t("paymentInfo")}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("paymentMethod")}</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("paymentStatus")}</span>
                    <span
                      className={`font-medium capitalize ${
                        order.paymentStatus === "completed"
                          ? "text-green-600"
                          : order.paymentStatus === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  {order.couponCode && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        {t("couponApplied")}
                      </span>
                      <span className="font-medium text-[#1f473e]">
                        {order.couponCode}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Estimated Delivery */}
              {order.status !== "cancelled" && order.status !== "delivered" && (
                <div className="bg-[#1f473e]/5 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#1f473e]" />
                    {t("estimatedDelivery")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(
                      Date.now() + 7 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("deliveryNote")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#1f473e]" />
              {t("items")} ({order.items.length})
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div key={index} className="p-4 flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
                      {item.image ? (
                        <Image
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                        {item.size && (
                          <span>
                            {t("size")}: {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span>
                            {t("color")}: {item.color}
                          </span>
                        )}
                        <span>
                          {t("quantity")}: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">{t("each")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="mt-6 bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t("orderNotes")}
              </p>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
