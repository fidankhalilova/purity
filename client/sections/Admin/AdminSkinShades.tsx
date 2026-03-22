"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import { skinShadeService } from "@/services/skinShadeService";
import { SkinShade } from "@/types/product";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminSkinShades() {
  const [shades, setShades] = useState<SkinShade[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SkinShade | null>(null);
  const [form, setForm] = useState<Partial<SkinShade>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadShades();
  }, []);

  const loadShades = async () => {
    try {
      setLoading(true);
      const data = await skinShadeService.getAll();
      setShades(data);
    } catch (error) {
      console.error("Error loading skin shades:", error);
      toast.error("Failed to load skin shades");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({});
    setModalOpen(true);
  };

  const openEdit = (s: SkinShade) => {
    setEditing(s);
    setForm(s);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skin shade?")) return;
    try {
      setSubmitting(true);
      await skinShadeService.delete(id);
      toast.success("Skin shade deleted successfully");
      await loadShades();
    } catch (error) {
      console.error("Error deleting skin shade:", error);
      toast.error("Failed to delete skin shade");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      if (editing) {
        await skinShadeService.update(editing._id, form);
        toast.success("Skin shade updated successfully");
      } else {
        await skinShadeService.create(form);
        toast.success("Skin shade created successfully");
      }
      await loadShades();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving skin shade:", error);
      toast.error("Failed to save skin shade");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<SkinShade>[] = [
    {
      key: "name",
      label: "Shade",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border border-gray-200 shrink-0"
            style={{ backgroundColor: row.colorCode }}
          />
          <span className="font-bold text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: "colorCode",
      label: "Color Code",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-gray-600">
            {row.colorCode}
          </span>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (row) => (
        <span className="text-gray-500 text-xs">{row.description || "—"}</span>
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
        title="Skin Shades"
        subtitle={`${shades.length} shades`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Shade
          </button>
        }
      />
      <AdminTable columns={columns} data={shades} searchKeys={["name"]} />

      <AdminModal
        title={editing ? "Edit Shade" : "Add Shade"}
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
              placeholder="Fair Skin"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Color Code (Hex) *
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={form.colorCode ?? "#f5deb3"}
                onChange={(e) =>
                  setForm({ ...form, colorCode: e.target.value })
                }
                className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-1"
              />
              <input
                value={form.colorCode ?? ""}
                onChange={(e) =>
                  setForm({ ...form, colorCode: e.target.value })
                }
                className={`${inputClass} flex-1`}
                placeholder="#f5deb3"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Describe this shade..."
            />
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
