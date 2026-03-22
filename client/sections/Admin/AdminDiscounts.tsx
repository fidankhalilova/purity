"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Link2, Unlink } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { discountService } from "@/services/discountService";
import { productService } from "@/services/productService";
import { Discount } from "@/types/discount";
import { Product } from "@/types/product";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";
const statusColor: Record<string, "green" | "red" | "gray"> = {
  active: "green",
  expired: "red",
  disabled: "gray",
};

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Discount | null>(null);
  const [form, setForm] = useState<Partial<Discount>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [discountsData, productsData] = await Promise.all([
        discountService.getAll(),
        productService.getAll(),
      ]);
      setDiscounts(discountsData);
      setProducts(productsData.products);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ type: "percentage", status: "active", maxUses: 100 });
    setModalOpen(true);
  };

  const openEdit = (d: Discount) => {
    setEditing(d);
    setForm({
      ...d,
      expires: d.expires ? new Date(d.expires).toISOString().split("T")[0] : "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this discount?")) return;
    try {
      setSubmitting(true);
      await discountService.delete(id);
      toast.success("Discount deleted successfully");
      await loadData();
    } catch (error) {
      console.error("Error deleting discount:", error);
      toast.error("Failed to delete discount");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    let newStatus: "active" | "expired" | "disabled";
    if (currentStatus === "active") newStatus = "disabled";
    else if (currentStatus === "disabled") newStatus = "active";
    else return;

    try {
      setSubmitting(true);
      await discountService.updateStatus(id, newStatus);
      toast.success(
        `Discount ${newStatus === "active" ? "activated" : "disabled"} successfully`,
      );
      await loadData();
    } catch (error) {
      console.error("Error updating discount status:", error);
      toast.error("Failed to update discount status");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);

      if (editing) {
        await discountService.update(editing._id, form);
        toast.success("Discount updated successfully");
      } else {
        await discountService.create(form);
        toast.success("Discount created successfully");
      }

      await loadData();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving discount:", error);
      toast.error("Failed to save discount");
    } finally {
      setSubmitting(false);
    }
  };

  const getProductName = (productId: string | Product | undefined) => {
    if (!productId) return null;
    if (typeof productId === "string") {
      const product = products.find((p) => p._id === productId);
      return product?.name || null;
    }
    return productId.name;
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
      key: "formattedValue",
      label: "Value",
      render: (row) => <span className="font-bold">{row.formattedValue}</span>,
    },
    {
      key: "product",
      label: "Product",
      render: (row) => {
        const productName = getProductName(row.product);
        return productName ? (
          <span className="text-xs text-gray-600">{productName}</span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        );
      },
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
    {
      key: "formattedExpiry",
      label: "Expires",
      sortable: true,
      render: (row) => <span className="text-xs">{row.formattedExpiry}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <button
          onClick={() => handleStatusToggle(row._id, row.status)}
          disabled={submitting || row.status === "expired"}
          className="cursor-pointer"
        >
          <AdminBadge label={row.status} color={statusColor[row.status]} />
        </button>
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
            disabled={submitting}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            disabled={submitting}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Discounts"
        subtitle={`${discounts.length} promo codes`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
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
              Code *
            </label>
            <input
              value={form.code ?? ""}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value.toUpperCase() })
              }
              className={inputClass}
              placeholder="GLOW10"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Type *
              </label>
              <select
                value={form.type ?? "percentage"}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as Discount["type"] })
                }
                className={inputClass}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed ($)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Value *
              </label>
              <input
                type="number"
                step="0.01"
                value={form.value ?? ""}
                onChange={(e) =>
                  setForm({ ...form, value: parseFloat(e.target.value) })
                }
                className={inputClass}
                placeholder={form.type === "percentage" ? "10" : "20.00"}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Max Uses *
              </label>
              <input
                type="number"
                value={form.maxUses ?? ""}
                onChange={(e) =>
                  setForm({ ...form, maxUses: parseInt(e.target.value) })
                }
                className={inputClass}
                placeholder="100"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Expires *
              </label>
              <input
                type="date"
                value={form.expires ?? ""}
                onChange={(e) => setForm({ ...form, expires: e.target.value })}
                className={inputClass}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Product (Optional)
            </label>
            <select
              value={(form.product as string) ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, product: value === "" ? undefined : value });
              }}
              className={inputClass}
            >
              <option value="">— No specific product —</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              If selected, this discount will only apply to this specific
              product
            </p>
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
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
