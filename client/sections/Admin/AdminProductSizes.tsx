"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { productSizeService } from "@/services/productSizeService";
import { ProductSize } from "@/types/product";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminProductSizes() {
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductSize | null>(null);
  const [form, setForm] = useState<Partial<ProductSize>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadSizes();
  }, []);

  const loadSizes = async () => {
    try {
      setLoading(true);
      const data = await productSizeService.getAll();
      setSizes(data);
    } catch (error) {
      console.error("Error loading sizes:", error);
      toast.error("Failed to load sizes");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ inStock: true });
    setModalOpen(true);
  };

  const openEdit = (s: ProductSize) => {
    setEditing(s);
    setForm(s);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this size?")) return;

    try {
      setSubmitting(true);
      await productSizeService.delete(id);
      toast.success("Size deleted successfully");
      await loadSizes();
    } catch (error) {
      console.error("Error deleting size:", error);
      toast.error("Failed to delete size");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);

      if (editing) {
        await productSizeService.update(editing._id, form);
        toast.success("Size updated successfully");
      } else {
        await productSizeService.create(form);
        toast.success("Size created successfully");
      }

      await loadSizes();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving size:", error);
      toast.error("Failed to save size");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<ProductSize>[] = [
    {
      key: "size",
      label: "Size",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900">{row.size}</span>
      ),
    },
    {
      key: "ml",
      label: "Volume (ml)",
      sortable: true,
      render: (row) => <span>{row.ml} ml</span>,
    },
    {
      key: "sku",
      label: "SKU",
      render: (row) => (
        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-lg">
          {row.sku}
        </span>
      ),
    },
    {
      key: "inStock",
      label: "Stock",
      render: (row) => (
        <AdminBadge
          label={row.inStock ? "In Stock" : "Out of Stock"}
          color={row.inStock ? "green" : "red"}
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
        title="Product Sizes"
        subtitle={`${sizes.length} sizes`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Size
          </button>
        }
      />
      <AdminTable columns={columns} data={sizes} searchKeys={["size", "sku"]} />

      <AdminModal
        title={editing ? "Edit Size" : "Add Size"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Size Label *
              </label>
              <input
                value={form.size ?? ""}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                className={inputClass}
                placeholder="30ml"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Volume (ml) *
              </label>
              <input
                type="number"
                value={form.ml ?? ""}
                onChange={(e) =>
                  setForm({ ...form, ml: Number(e.target.value) })
                }
                className={inputClass}
                placeholder="30"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              SKU *
            </label>
            <input
              value={form.sku ?? ""}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              className={inputClass}
              placeholder="SKU-30ML"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Stock Status
            </label>
            <select
              value={form.inStock ? "true" : "false"}
              onChange={(e) =>
                setForm({ ...form, inStock: e.target.value === "true" })
              }
              className={inputClass}
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
