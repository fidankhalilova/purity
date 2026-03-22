"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import { skinTypeService } from "@/services/skinTypeService";
import { skinConcernService } from "@/services/skinConcernService";
import { SkinType, SkinConcern } from "@/types/product";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminSkinTypes() {
  const [skinTypes, setSkinTypes] = useState<SkinType[]>([]);
  const [skinConcerns, setSkinConcerns] = useState<SkinConcern[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SkinType | null>(null);
  const [form, setForm] = useState<Partial<SkinType>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [skinTypesData, skinConcernsData] = await Promise.all([
        skinTypeService.getAll(),
        skinConcernService.getAll(),
      ]);
      setSkinTypes(skinTypesData);
      setSkinConcerns(skinConcernsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({});
    setModalOpen(true);
  };

  const openEdit = (s: SkinType) => {
    setEditing(s);
    setForm(s);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skin type?")) return;
    try {
      setSubmitting(true);
      await skinTypeService.delete(id);
      toast.success("Skin type deleted successfully");
      await loadData();
    } catch (error) {
      console.error("Error deleting skin type:", error);
      toast.error("Failed to delete skin type");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      if (editing) {
        await skinTypeService.update(editing._id, form);
        toast.success("Skin type updated successfully");
      } else {
        await skinTypeService.create(form);
        toast.success("Skin type created successfully");
      }
      await loadData();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving skin type:", error);
      toast.error("Failed to save skin type");
    } finally {
      setSubmitting(false);
    }
  };

  const getConcernCount = (skinTypeId: string): number => {
    return skinConcerns.filter((concern) => {
      const concernSkinType = concern.skinType;
      if (typeof concernSkinType === "string") {
        return concernSkinType === skinTypeId;
      }
      return concernSkinType?._id === skinTypeId;
    }).length;
  };

  const columns: Column<SkinType>[] = [
    {
      key: "name",
      label: "Skin Type",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900">{row.name}</span>
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
      key: "concernCount",
      label: "Concerns",
      render: (row) => (
        <span className="font-semibold text-[#1f473e] bg-[#1f473e]/10 px-2.5 py-1 rounded-full text-xs">
          {getConcernCount(row._id)} concerns
        </span>
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
        title="Skin Types"
        subtitle={`${skinTypes.length} skin types`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Skin Type
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={skinTypes}
        searchKeys={["name", "description"]}
      />

      <AdminModal
        title={editing ? "Edit Skin Type" : "Add Skin Type"}
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
              placeholder="Dry"
              required
            />
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
              placeholder="Describe this skin type..."
            />
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
