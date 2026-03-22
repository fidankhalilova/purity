"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { tagService } from "@/services/tagService";
import { Tag } from "@/types/product";
import { toast } from "react-hot-toast";

const tagTypes = [
  "new",
  "best-seller",
  "value-set",
  "limited-edition",
  "featured",
];

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Tag | null>(null);
  const [form, setForm] = useState<Partial<Tag>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      setLoading(true);
      const data = await tagService.getAll();
      setTags(data);
    } catch (error) {
      console.error("Error loading tags:", error);
      toast.error("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ type: "new", color: "#1f473e", isActive: true });
    setModalOpen(true);
  };

  const openEdit = (t: Tag) => {
    setEditing(t);
    setForm(t);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    try {
      setSubmitting(true);
      await tagService.delete(id);
      toast.success("Tag deleted successfully");
      await loadTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("Failed to delete tag");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      if (editing) {
        await tagService.update(editing._id, form);
        toast.success("Tag updated successfully");
      } else {
        await tagService.create(form);
        toast.success("Tag created successfully");
      }
      await loadTags();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving tag:", error);
      toast.error("Failed to save tag");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Tag>[] = [
    {
      key: "name",
      label: "Tag",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: row.color }}
          />
          <span className="font-bold text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (row) => (
        <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">
          {row.type}
        </span>
      ),
    },
    {
      key: "color",
      label: "Color",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg border border-gray-200"
            style={{ backgroundColor: row.color }}
          />
          <span className="font-mono text-xs text-gray-500">{row.color}</span>
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <AdminBadge
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "green" : "gray"}
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
        title="Tags"
        subtitle={`${tags.length} tags`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Tag
          </button>
        }
      />
      <AdminTable columns={columns} data={tags} searchKeys={["name", "type"]} />

      <AdminModal
        title={editing ? "Edit Tag" : "Add Tag"}
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
              placeholder="Best Seller"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Type *
            </label>
            <select
              value={form.type ?? "new"}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as Tag["type"] })
              }
              className={inputClass}
              required
            >
              {tagTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Color *
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={form.color ?? "#1f473e"}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-1"
              />
              <input
                value={form.color ?? ""}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className={`${inputClass} flex-1`}
                placeholder="#1f473e"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </label>
            <select
              value={form.isActive ? "true" : "false"}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.value === "true" })
              }
              className={inputClass}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
