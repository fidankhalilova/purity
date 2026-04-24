"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { skinConcernService } from "@/services/skinConcernService";
import { skinTypeService } from "@/services/skinTypeService";
import { SkinConcern, SkinType } from "@/types/product";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

const typeColor: Record<
  string,
  "green" | "blue" | "yellow" | "orange" | "gray"
> = {
  Dry: "blue",
  Oily: "yellow",
  Sensitive: "orange",
  Balanced: "green",
  Combination: "gray",
};

export default function AdminSkinConcerns() {
  const [concerns, setConcerns] = useState<SkinConcern[]>([]);
  const [skinTypes, setSkinTypes] = useState<SkinType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SkinConcern | null>(null);
  const [form, setForm] = useState<Partial<SkinConcern>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [concernsData, skinTypesData] = await Promise.all([
        skinConcernService.getAll(),
        skinTypeService.getAll(),
      ]);
      setConcerns(concernsData);
      setSkinTypes(skinTypesData);
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

  const openEdit = (c: SkinConcern) => {
    setEditing(c);
    setForm(c);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skin concern?")) return;
    try {
      setSubmitting(true);
      await skinConcernService.delete(id);
      toast.success("Skin concern deleted successfully");
      await loadData();
    } catch (error) {
      console.error("Error deleting skin concern:", error);
      toast.error("Failed to delete skin concern");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      if (editing) {
        await skinConcernService.update(editing._id, form);
        toast.success("Skin concern updated successfully");
      } else {
        await skinConcernService.create(form);
        toast.success("Skin concern created successfully");
      }
      await loadData();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving skin concern:", error);
      toast.error("Failed to save skin concern");
    } finally {
      setSubmitting(false);
    }
  };

  const getSkinTypeName = (
    skinTypeId: string | SkinType | undefined,
  ): string => {
    if (!skinTypeId) return "";
    if (typeof skinTypeId === "string") {
      const found = skinTypes.find((st) => st._id === skinTypeId);
      return found?.name || "";
    }
    return skinTypeId.name;
  };

  const columns: Column<SkinConcern>[] = [
    {
      key: "name",
      label: "Concern",
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
      key: "skinType",
      label: "Skin Type",
      render: (row) => {
        const typeName = getSkinTypeName(row.skinType);
        return (
          <AdminBadge
            label={typeName || "—"}
            color={typeColor[typeName] ?? "gray"}
          />
        );
      },
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
        title="Skin Concerns"
        subtitle={`${concerns.length} concerns`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Concern
          </button>
        }
      />
      <AdminTable columns={columns} data={concerns} searchKeys={["name"]} />

      <AdminModal
        title={editing ? "Edit Concern" : "Add Concern"}
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
              placeholder="Intense Hydration"
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
              placeholder="Describe this concern..."
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Skin Type *
            </label>
            <select
              value={(form.skinType as string) ?? ""}
              onChange={(e) => setForm({ ...form, skinType: e.target.value })}
              className={inputClass}
              required
            >
              <option value="">Select a skin type...</option>
              {skinTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
