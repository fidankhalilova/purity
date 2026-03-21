"use client";
import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";

type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: string;
  items: number;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  address: string;
};

const initialOrders: Order[] = [
  {
    id: "#PRT-2024-001",
    customer: "Isabella D.",
    email: "isabella@example.com",
    date: "Mar 10, 2026",
    total: "$145.00",
    items: 2,
    status: "delivered",
    address: "123 Glow St, New York, NY",
  },
  {
    id: "#PRT-2024-002",
    customer: "Amelia T.",
    email: "amelia@example.com",
    date: "Feb 22, 2026",
    total: "$160.00",
    items: 1,
    status: "shipped",
    address: "456 Beauty Ave, Brooklyn, NY",
  },
  {
    id: "#PRT-2024-003",
    customer: "Sophie M.",
    email: "sophie@example.com",
    date: "Jan 05, 2026",
    total: "$70.00",
    items: 1,
    status: "processing",
    address: "789 Skin Rd, Chicago, IL",
  },
  {
    id: "#PRT-2024-004",
    customer: "Jordan K.",
    email: "jordan@example.com",
    date: "Dec 15, 2025",
    total: "$75.00",
    items: 1,
    status: "cancelled",
    address: "321 Care Blvd, LA, CA",
  },
];

const statusColor: Record<string, "green" | "blue" | "yellow" | "red"> = {
  delivered: "green",
  shipped: "blue",
  processing: "yellow",
  cancelled: "red",
};

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [selected, setSelected] = useState<Order | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [status, setStatus] = useState<Order["status"]>("processing");

  const openEdit = (order: Order) => {
    setSelected(order);
    setStatus(order.status);
    setEditOpen(true);
  };
  const handleSave = () => {
    if (selected)
      setOrders(
        orders.map((o) => (o.id === selected.id ? { ...o, status } : o)),
      );
    setEditOpen(false);
  };

  const columns: Column<Order>[] = [
    {
      key: "id",
      label: "Order ID",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900">{row.id}</span>
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
        <AdminBadge label={row.status} color={statusColor[row.status]} />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-20",
      render: (row) => (
        <button
          onClick={() => openEdit(row)}
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5 text-gray-500" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Orders"
        subtitle={`${orders.length} total orders`}
      />
      <AdminTable
        columns={columns}
        data={orders}
        searchKeys={["id", "customer", "email"]}
      />

      <AdminModal
        title="Update Order Status"
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#f5f0e8] rounded-2xl p-4 flex flex-col gap-1.5">
              <p className="text-sm font-bold text-gray-900">{selected.id}</p>
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
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
