"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import { badgeService } from "@/services/badgeService";
import { Badge } from "@/types/product";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminBadges() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Badge | null>(null);
  const [form, setForm] = useState<Partial<Badge>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      setLoading(true);
      const data = await badgeService.getAll();
      setBadges(data);
    } catch (error) {
      console.error("Error loading badges:", error);
      toast.error("Failed to load badges");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({});
    setModalOpen(true);
  };

  const openEdit = (b: Badge) => {
    setEditing(b);
    setForm(b);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this badge?")) return;

    try {
      setSubmitting(true);
      await badgeService.delete(id);
      toast.success("Badge deleted successfully");
      await loadBadges();
    } catch (error) {
      console.error("Error deleting badge:", error);
      toast.error("Failed to delete badge");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);

      if (editing) {
        await badgeService.update(editing._id, form);
        toast.success("Badge updated successfully");
      } else {
        await badgeService.create(form);
        toast.success("Badge created successfully");
      }

      await loadBadges();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving badge:", error);
      toast.error("Failed to save badge");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Badge>[] = [
    {
      key: "icon",
      label: "Icon",
      render: (row) => <span className="text-2xl">{row.icon}</span>,
    },
    {
      key: "label",
      label: "Label",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-lg bg-white">
            {row.icon}
          </div>
          <span className="font-semibold text-gray-900">{row.label}</span>
        </div>
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
        title="Badges"
        subtitle={`${badges.length} product badges`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Badge
          </button>
        }
      />
      <AdminTable columns={columns} data={badges} searchKeys={["label"]} />

      <AdminModal
        title={editing ? "Edit Badge" : "Add Badge"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Icon (emoji)
            </label>
            <input
              value={form.icon ?? ""}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className={inputClass}
              placeholder="🌿"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Label
            </label>
            <input
              value={form.label ?? ""}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              className={inputClass}
              placeholder="Cruelty-free"
              required
            />
          </div>
          {(form.icon || form.label) && (
            <div className="bg-[#f5f0e8] rounded-2xl p-4">
              <p className="text-xs text-gray-400 mb-2">Preview</p>
              <div className="flex flex-col items-center gap-1 w-16">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-xl bg-white">
                  {form.icon}
                </div>
                <span className="text-xs text-gray-600 text-center">
                  {form.label}
                </span>
              </div>
            </div>
          )}
        </div>
      </AdminModal>
    </div>
  );
}
