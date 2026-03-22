"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, GripVertical, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { homeSectionService } from "@/services/homeSectionService";
import { HomeSection } from "@/types/product";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminHomeSections() {
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HomeSection | null>(null);
  const [form, setForm] = useState<Partial<HomeSection>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const data = await homeSectionService.getAll();
      setSections(data);
    } catch (error) {
      console.error("Error loading sections:", error);
      toast.error("Failed to load home sections");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ isActive: true, order: sections.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (s: HomeSection) => {
    setEditing(s);
    setForm(s);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
      setSubmitting(true);
      await homeSectionService.delete(id);
      toast.success("Section deleted successfully");
      await loadSections();
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error("Failed to delete section");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      setSubmitting(true);
      await homeSectionService.update(id, { isActive: !currentStatus });
      toast.success(
        `Section ${!currentStatus ? "shown" : "hidden"} successfully`,
      );
      await loadSections();
    } catch (error) {
      console.error("Error toggling section:", error);
      toast.error("Failed to update section");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);

      if (editing) {
        await homeSectionService.update(editing._id, form);
        toast.success("Section updated successfully");
      } else {
        await homeSectionService.create(form);
        toast.success("Section created successfully");
      }

      await loadSections();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving section:", error);
      toast.error("Failed to save section");
    } finally {
      setSubmitting(false);
    }
  };

  const sorted = [...sections].sort((a, b) => a.order - b.order);

  const columns: Column<HomeSection>[] = [
    {
      key: "order",
      label: "#",
      width: "w-12",
      render: (row) => (
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
          <span className="text-xs font-bold text-gray-400">{row.order}</span>
        </div>
      ),
    },
    {
      key: "displayName",
      label: "Section",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">{row.displayName}</p>
          <p className="text-xs font-mono text-gray-400 mt-0.5">{row.name}</p>
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Visible",
      render: (row) => (
        <AdminBadge
          label={row.isActive ? "Visible" : "Hidden"}
          color={row.isActive ? "green" : "gray"}
        />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-32",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => toggleActive(row._id, row.isActive)}
            disabled={submitting}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-colors ${
              row.isActive
                ? "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                : "bg-green-50 text-green-600 hover:bg-green-100"
            } disabled:opacity-50`}
          >
            {row.isActive ? "Hide" : "Show"}
          </button>
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
        title="Home Sections"
        subtitle="Control which sections appear on the homepage"
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Section
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={sorted}
        searchKeys={["displayName", "name"]}
        searchable={false}
      />

      <AdminModal
        title={editing ? "Edit Section" : "Add Section"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Display Name *
            </label>
            <input
              value={form.displayName ?? ""}
              onChange={(e) =>
                setForm({ ...form, displayName: e.target.value })
              }
              className={inputClass}
              placeholder="Top Sellers"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Section Key (internal name) *
            </label>
            <input
              value={form.name ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value.toLowerCase().replace(/\s+/g, "_"),
                })
              }
              className={inputClass}
              placeholder="top_sellers"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Display Order *
            </label>
            <input
              type="number"
              value={form.order ?? ""}
              onChange={(e) =>
                setForm({ ...form, order: Number(e.target.value) })
              }
              className={inputClass}
              placeholder="1"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Visibility
            </label>
            <select
              value={form.isActive ? "true" : "false"}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.value === "true" })
              }
              className={inputClass}
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
