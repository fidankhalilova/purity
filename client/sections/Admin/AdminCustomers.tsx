"use client";
import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";

type Customer = {
  id: string;
  name: string;
  email: string;
  joined: string;
  orders: number;
  spent: string;
  status: "active" | "blocked";
};

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Isabella D.",
    email: "isabella@example.com",
    joined: "Jan 2025",
    orders: 4,
    spent: "$380.00",
    status: "active",
  },
  {
    id: "2",
    name: "Amelia T.",
    email: "amelia@example.com",
    joined: "Mar 2025",
    orders: 2,
    spent: "$230.00",
    status: "active",
  },
  {
    id: "3",
    name: "Sophie M.",
    email: "sophie@example.com",
    joined: "Jun 2025",
    orders: 1,
    spent: "$70.00",
    status: "active",
  },
  {
    id: "4",
    name: "Jordan K.",
    email: "jordan@example.com",
    joined: "Aug 2025",
    orders: 3,
    spent: "$465.00",
    status: "blocked",
  },
];

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState<Partial<Customer>>({});
  const [modalOpen, setModalOpen] = useState(false);

  const openEdit = (c: Customer) => {
    setEditing(c);
    setForm(c);
    setModalOpen(true);
  };
  const handleDelete = (id: string) =>
    setCustomers(customers.filter((c) => c.id !== id));
  const handleSave = () => {
    if (editing)
      setCustomers(
        customers.map((c) =>
          c.id === editing.id ? ({ ...c, ...form } as Customer) : c,
        ),
      );
    setModalOpen(false);
  };

  const columns: Column<Customer>[] = [
    {
      key: "name",
      label: "Customer",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      ),
    },
    { key: "joined", label: "Joined", sortable: true },
    {
      key: "orders",
      label: "Orders",
      sortable: true,
      render: (row) => <span className="font-semibold">{row.orders}</span>,
    },
    {
      key: "spent",
      label: "Total Spent",
      sortable: true,
      render: (row) => <span className="font-bold">{row.spent}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <AdminBadge
          label={row.status}
          color={row.status === "active" ? "green" : "red"}
        />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-20",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Customers"
        subtitle={`${customers.length} registered customers`}
      />
      <AdminTable
        columns={columns}
        data={customers}
        searchKeys={["name", "email"]}
      />

      <AdminModal
        title="Edit Customer"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Name
            </label>
            <input
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email
            </label>
            <input
              value={form.email ?? ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </label>
            <select
              value={form.status ?? "active"}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as Customer["status"],
                })
              }
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
