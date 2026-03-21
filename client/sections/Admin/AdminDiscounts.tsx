"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";

type Discount = {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: string;
  uses: number;
  maxUses: number;
  expires: string;
  status: "active" | "expired" | "disabled";
};

const initialDiscounts: Discount[] = [
  {
    id: "1",
    code: "GLOW10",
    type: "percentage",
    value: "10%",
    uses: 45,
    maxUses: 100,
    expires: "Dec 31, 2026",
    status: "active",
  },
  {
    id: "2",
    code: "SAVE20",
    type: "fixed",
    value: "$20.00",
    uses: 100,
    maxUses: 100,
    expires: "Mar 01, 2026",
    status: "expired",
  },
  {
    id: "3",
    code: "BEAUTY50",
    type: "percentage",
    value: "50%",
    uses: 12,
    maxUses: 50,
    expires: "Jun 30, 2026",
    status: "active",
  },
];

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";
const statusColor: Record<string, "green" | "red" | "gray"> = {
  active: "green",
  expired: "red",
  disabled: "gray",
};

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Discount | null>(null);
  const [form, setForm] = useState<Partial<Discount>>({});

  const openAdd = () => {
    setEditing(null);
    setForm({ type: "percentage", status: "active" });
    setModalOpen(true);
  };
  const openEdit = (d: Discount) => {
    setEditing(d);
    setForm(d);
    setModalOpen(true);
  };
  const handleDelete = (id: string) =>
    setDiscounts(discounts.filter((d) => d.id !== id));
  const handleSave = () => {
    if (editing)
      setDiscounts(
        discounts.map((d) =>
          d.id === editing.id ? ({ ...d, ...form } as Discount) : d,
        ),
      );
    else
      setDiscounts([
        ...discounts,
        { ...form, id: String(Date.now()), uses: 0 } as Discount,
      ]);
    setModalOpen(false);
  };

  const columns: Column<Discount>[] = [
    {
      key: "code",
      label: "Code",
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-[#1f473e] bg-[#1f473e]/10 px-2.5 py-1 rounded-lg text-xs">
          {row.code}
        </span>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (row) => <AdminBadge label={row.type} color="blue" />,
    },
    {
      key: "value",
      label: "Value",
      render: (row) => <span className="font-bold">{row.value}</span>,
    },
    {
      key: "uses",
      label: "Usage",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1f473e] rounded-full"
              style={{
                width: `${Math.min((row.uses / row.maxUses) * 100, 100)}%`,
              }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {row.uses}/{row.maxUses}
          </span>
        </div>
      ),
    },
    { key: "expires", label: "Expires", sortable: true },
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
        title="Discounts"
        subtitle={`${discounts.length} promo codes`}
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Code
          </button>
        }
      />
      <AdminTable columns={columns} data={discounts} searchKeys={["code"]} />

      <AdminModal
        title={editing ? "Edit Discount" : "Add Discount"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Code
            </label>
            <input
              value={form.code ?? ""}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value.toUpperCase() })
              }
              className={inputClass}
              placeholder="GLOW10"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Type
              </label>
              <select
                value={form.type ?? "percentage"}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as Discount["type"] })
                }
                className={inputClass}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Value
              </label>
              <input
                value={form.value ?? ""}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className={inputClass}
                placeholder="10% or $20"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Max Uses
              </label>
              <input
                type="number"
                value={form.maxUses ?? ""}
                onChange={(e) =>
                  setForm({ ...form, maxUses: Number(e.target.value) })
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Expires
              </label>
              <input
                type="date"
                value={form.expires ?? ""}
                onChange={(e) => setForm({ ...form, expires: e.target.value })}
                className={inputClass}
              />
            </div>
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
                  status: e.target.value as Discount["status"],
                })
              }
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
