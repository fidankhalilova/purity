"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { toast } from "react-hot-toast";
import { productColorService } from "@/services/productColorService";

type ProductColor = {
  _id: string;
  name: string;
  colorCode: string;
  hexCode: string;
  image: string;
  inStock: boolean;
};

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminProductColors() {
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductColor | null>(null);
  const [form, setForm] = useState<Partial<ProductColor>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      setLoading(true);
      const data = await productColorService.getAll();
      setColors(data);
    } catch (error) {
      console.error("Error loading colors:", error);
      toast.error("Failed to load colors");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ inStock: true });
    setModalOpen(true);
  };

  const openEdit = (c: ProductColor) => {
    setEditing(c);
    setForm(c);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this color?")) return;

    try {
      setSubmitting(true);
      await productColorService.delete(id);
      toast.success("Color deleted successfully");
      await loadColors();
    } catch (error) {
      console.error("Error deleting color:", error);
      toast.error("Failed to delete color");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);

      if (editing) {
        await productColorService.update(editing._id, form);
        toast.success("Color updated successfully");
      } else {
        await productColorService.create(form);
        toast.success("Color created successfully");
      }

      await loadColors();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving color:", error);
      toast.error("Failed to save color");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<ProductColor>[] = [
    {
      key: "name",
      label: "Color Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full border border-gray-200 shrink-0"
            style={{ backgroundColor: row.hexCode }}
          />
          <span className="font-semibold text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: "colorCode",
      label: "Color Code",
      render: (row) => (
        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-lg">
          {row.colorCode}
        </span>
      ),
    },
    {
      key: "hexCode",
      label: "Hex Code",
      render: (row) => (
        <span className="font-mono text-xs text-gray-600">{row.hexCode}</span>
      ),
    },
    {
      key: "inStock",
      label: "In Stock",
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
        title="Product Colors"
        subtitle={`${colors.length} colors`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Color
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={colors}
        searchKeys={["name", "colorCode"]}
      />

      <AdminModal
        title={editing ? "Edit Color" : "Add Color"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Name *
            </label>
            <input
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="Sky Blue"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Color Code *
              </label>
              <input
                value={form.colorCode ?? ""}
                onChange={(e) =>
                  setForm({ ...form, colorCode: e.target.value })
                }
                className={inputClass}
                placeholder="SKY-BLUE"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Hex Code *
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={form.hexCode ?? "#000000"}
                  onChange={(e) =>
                    setForm({ ...form, hexCode: e.target.value })
                  }
                  className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-1"
                />
                <input
                  value={form.hexCode ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, hexCode: e.target.value })
                  }
                  className={`${inputClass} flex-1`}
                  placeholder="#000000"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Image URL (optional)
            </label>
            <input
              value={form.image ?? ""}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className={inputClass}
              placeholder="https://..."
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
