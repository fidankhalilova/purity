"use client";
import { useState, useEffect } from "react";
import {
  Eye,
  Pencil,
  Loader2,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Image from "next/image";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { orderService } from "@/services/orderService";
import { Order, UserInfo } from "@/types/order";
import { toast } from "react-hot-toast";
import { getImageUrl } from "@/utils/imageUrl";

type AdminOrder = {
  _id: string;
  orderNumber: string;
  customer: string;
  email: string;
  date: string;
  total: string;
  items: number;
  status: Order["status"];
  address: string;
  trackingNumber?: string;
  rawOrder?: Order;
};

const statusColor: Record<
  Order["status"],
  "green" | "blue" | "yellow" | "red" | "gray"
> = {
  paid: "yellow",
  getting_ready: "blue",
  shipped: "blue",
  delivered: "green",
  cancelled: "red",
};

const statusSteps: {
  key: Order["status"];
  label: string;
  icon: React.ComponentType<any>;
}[] = [
  { key: "paid", label: "Order Paid", icon: Clock },
  { key: "getting_ready", label: "Getting Ready", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors bg-white";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

function OrderTimeline({ status }: { status: Order["status"] }) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-2xl">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <XCircle className="w-4 h-4 text-red-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-600">Order Cancelled</p>
          <p className="text-xs text-red-400">This order has been cancelled</p>
        </div>
      </div>
    );
  }

  const currentIndex = statusSteps.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center gap-0">
      {statusSteps.map((step, i) => {
        const Icon = step.icon;
        const isDone = i <= currentIndex;
        const isCurrent = i === currentIndex;
        const isLast = i === statusSteps.length - 1;

        return (
          <div
            key={step.key}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isDone ? "bg-[#1f473e]" : "bg-gray-100"
                } ${isCurrent ? "ring-2 ring-[#1f473e]/30 ring-offset-1" : ""}`}
              >
                <Icon
                  className={`w-4 h-4 ${isDone ? "text-white" : "text-gray-400"}`}
                />
              </div>
              <p
                className={`text-[10px] font-medium text-center leading-tight max-w-14 ${
                  isDone ? "text-[#1f473e]" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
            {!isLast && (
              <div
                className={`flex-1 h-0.5 mb-5 mx-1 transition-colors ${
                  i < currentIndex ? "bg-[#1f473e]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderDetailsModal({
  order,
  onClose,
  onEdit,
}: {
  order: AdminOrder;
  onClose: () => void;
  onEdit: () => void;
}) {
  const raw = order.rawOrder;

  const getUserEmail = (): string => {
    if (!raw?.user) return "No email";
    if (typeof raw.user === "string") return "No email";
    return (raw.user as UserInfo).email || "No email";
  };

  const getCouponCode = (): string | undefined => {
    return raw?.couponCode;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {order.orderNumber}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <AdminBadge
              label={order.status.replace("_", " ")}
              color={statusColor[order.status]}
            />
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f473e] text-white text-xs font-semibold rounded-full hover:bg-[#163830] transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Edit Status
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Timeline */}
          <div className="bg-[#f5f0e8] rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
              Order Progress
            </p>
            <OrderTimeline status={order.status} />
            {order.trackingNumber && (
              <div className="mt-4 pt-3 border-t border-[#e8dfd0] flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#1f473e] shrink-0" />
                <span className="text-xs text-gray-600">Tracking:</span>
                <span className="text-xs font-bold text-[#1f473e] font-mono">
                  {order.trackingNumber}
                </span>
              </div>
            )}
          </div>

          {/* Customer + Shipping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Customer
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1f473e] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {order.customer.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {order.customer}
                  </p>
                  <p className="text-xs text-gray-400">{getUserEmail()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Shipping Address
              </p>
              <div className="flex items-start gap-2">
                <svg
                  className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {order.address}
                </p>
              </div>
            </div>
          </div>

          {/* Order items */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Items ({order.items})
            </p>
            <div className="flex flex-col gap-2">
              {raw?.items?.length ? (
                raw.items.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl"
                  >
                    <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
                      {item.product?.images?.[0] ? (
                        <Image
                          src={getImageUrl(item.product.images[0])}
                          alt={item.product?.name || "Product"}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.product?.name || item.name || "Unknown Product"}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {item.size && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {item.color}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          ×{item.quantity}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900 shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#f0ebe2] flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {order.items} item{order.items > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-gray-400">
                      Open order to see details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-[#f5f0e8] rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Order Summary
            </p>
            <div className="flex flex-col gap-2">
              {raw?.subtotal !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-700">
                    ${raw.subtotal?.toFixed(2)}
                  </span>
                </div>
              )}
              {raw?.shippingCost !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span
                    className={
                      raw.shippingCost === 0
                        ? "text-green-600 font-medium"
                        : "text-gray-700"
                    }
                  >
                    {raw.shippingCost === 0
                      ? "Free"
                      : `$${raw.shippingCost?.toFixed(2)}`}
                  </span>
                </div>
              )}
              {raw?.discount !== undefined && raw.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-green-600">
                    -${raw.discount?.toFixed(2)}
                  </span>
                </div>
              )}
              {getCouponCode() && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Coupon Code</span>
                  <span className="font-mono text-xs font-bold text-[#1f473e] bg-[#1f473e]/10 px-2 py-0.5 rounded-full">
                    {getCouponCode()}
                  </span>
                </div>
              )}
              <div className="border-t border-[#e8dfd0] pt-2 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AdminOrder | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [status, setStatus] = useState<Order["status"]>("paid");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const token = getToken(); // Token from localStorage
      const { orders: fetchedOrders } = await orderService.getAll(
        undefined,
        undefined,
        token,
      );

      const adminOrders: AdminOrder[] = fetchedOrders.map((order) => {
        let customerName = "Unknown";
        let customerEmail = "No email";

        if (order.user) {
          if (typeof order.user === "string") {
            customerName = "User";
          } else {
            customerName = (order.user as UserInfo).name || "Unknown";
            customerEmail = (order.user as UserInfo).email || "No email";
          }
        }

        return {
          _id: order._id,
          orderNumber: order.orderNumber,
          customer: customerName,
          email: customerEmail,
          date: new Date(order.orderedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          total: `$${order.total.toFixed(2)}`,
          items: order.items.reduce((sum, item) => sum + item.quantity, 0),
          status: order.status,
          address: order.shippingAddress
            ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`
            : "No address",
          trackingNumber: order.trackingNumber,
          rawOrder: order,
        };
      });

      setOrders(adminOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (order: AdminOrder) => {
    setSelected(order);
    setDetailsOpen(true);
  };

  const openEdit = (order?: AdminOrder) => {
    const target = order ?? selected;
    if (!target) return;
    setSelected(target);
    setStatus(target.status);
    setTrackingNumber(target.trackingNumber || "");
    setDetailsOpen(false);
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!selected) return;
    try {
      setUpdating(true);
      const token = getToken();
      const updatedOrder = await orderService.updateStatus(
        selected._id,
        status,
        trackingNumber || undefined,
        token,
      );
      setOrders(
        orders.map((o) =>
          o._id === selected._id
            ? {
                ...o,
                status: updatedOrder.status,
                trackingNumber: updatedOrder.trackingNumber,
              }
            : o,
        ),
      );
      toast.success("Order status updated successfully");
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const columns: Column<AdminOrder>[] = [
    {
      key: "orderNumber",
      label: "Order ID",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900">{row.orderNumber}</span>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.customer}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      ),
    },
    { key: "date", label: "Date", sortable: true },
    {
      key: "items",
      label: "Items",
      render: (row) => (
        <span>
          {row.items} item{row.items > 1 ? "s" : ""}
        </span>
      ),
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      render: (row) => <span className="font-bold">{row.total}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <AdminBadge
          label={row.status.replace("_", " ")}
          color={statusColor[row.status]}
        />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-24",
      render: (row) => (
        <div className="flex gap-1.5">
          <button
            onClick={() => openDetails(row)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            title="Edit Status"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Orders"
        subtitle={`${orders.length} total orders`}
      />
      <AdminTable
        columns={columns}
        data={orders}
        searchKeys={["orderNumber", "customer", "email"]}
      />

      {detailsOpen && selected && (
        <OrderDetailsModal
          order={selected}
          onClose={() => setDetailsOpen(false)}
          onEdit={() => openEdit()}
        />
      )}

      <AdminModal
        title="Update Order Status"
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
        saveLabel={updating ? "Saving..." : "Save Changes"}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#f5f0e8] rounded-2xl p-4 flex flex-col gap-1.5">
              <p className="text-sm font-bold text-gray-900">
                {selected.orderNumber}
              </p>
              <p className="text-sm text-gray-600">
                {selected.customer} · {selected.email}
              </p>
              <p className="text-xs text-gray-400">{selected.address}</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {selected.total} · {selected.items} item
                {selected.items > 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Order["status"])}
                className={inputClass}
              >
                <option value="paid">Paid</option>
                <option value="getting_ready">Getting Ready</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tracking Number
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Preview
              </label>
              <div className="p-3 bg-gray-50 rounded-2xl">
                <OrderTimeline status={status} />
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
