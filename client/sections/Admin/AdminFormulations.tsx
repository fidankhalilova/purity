"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { formulationService } from "@/services/formulationService";
import { Formulation } from "@/types/formulation";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors bg-white";

export default function AdminFormulations() {
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Formulation | null>(null);
  const [form, setForm] = useState<Partial<Formulation>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadFormulations();
  }, []);

  const loadFormulations = async () => {
    try {
      setLoading(true);
      const data = await formulationService.getAll();
      setFormulations(data);
    } catch (error) {
      console.error("Error loading formulations:", error);
      toast.error("Failed to load formulations");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ isActive: true });
    setModalOpen(true);
  };

  const openEdit = (f: Formulation) => {
    setEditing(f);
    setForm(f);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this formulation? This will also remove it from all products.",
      )
    )
      return;
    try {
      setSubmitting(true);
      await formulationService.delete(id);
      toast.success("Formulation deleted successfully");
      await loadFormulations();
    } catch (error) {
      console.error("Error deleting formulation:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete formulation",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      setSubmitting(true);
      await formulationService.toggleActive(id);
      toast.success("Status updated");
      await loadFormulations();
    } catch (error) {
      console.error("Error toggling active:", error);
      toast.error("Failed to update status");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      if (editing) {
        await formulationService.update(editing._id, form);
        toast.success("Formulation updated successfully");
      } else {
        await formulationService.create(form);
        toast.success("Formulation created successfully");
      }
      await loadFormulations();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving formulation:", error);
      toast.error("Failed to save formulation");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Formulation>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (row) => (
        <span className="text-sm text-gray-500">{row.description || "—"}</span>
      ),
    },
    {
      key: "productCount",
      label: "Products",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-[#1f473e]">
          {row.productCount || 0}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <button
          onClick={() => handleToggleActive(row._id)}
          disabled={submitting}
          className="cursor-pointer"
        >
          <AdminBadge
            label={row.isActive ? "Active" : "Inactive"}
            color={row.isActive ? "green" : "gray"}
          />
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
        title="Formulations"
        subtitle={`${formulations.length} formulations`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Formulation
          </button>
        }
      />
      <AdminTable columns={columns} data={formulations} searchKeys={["name"]} />

      <AdminModal
        title={editing ? "Edit Formulation" : "Add Formulation"}
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
              placeholder="e.g. Hydrogel Patch"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Description{" "}
              <span className="text-gray-300 normal-case font-normal">
                (optional)
              </span>
            </label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Short description..."
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-gray-50">
            <p className="text-sm font-medium text-gray-900">Active</p>
            <button
              type="button"
              onClick={() => setForm({ ...form, isActive: !form.isActive })}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${form.isActive ? "bg-[#1f473e]" : "bg-gray-200"}`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
