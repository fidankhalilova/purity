"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, Loader2, Upload, X } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import Image from "next/image";
import { collectionService } from "@/services/collectionService";
import { uploadService } from "@/services/uploadService";
import { Collection } from "@/types/product";
import { toast } from "react-hot-toast";
import { getImageUrl } from "@/utils/imageUrl";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [form, setForm] = useState<Partial<Collection>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setLoading(true);
      const data = await collectionService.getAll();
      setCollections(data);
    } catch (error) {
      console.error("Error loading collections:", error);
      toast.error("Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadService.uploadCollectionImage(file);
      setForm({ ...form, image: url });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ isActive: true });
    setModalOpen(true);
  };

  const openEdit = (c: Collection) => {
    setEditing(c);
    setForm(c);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    try {
      setSubmitting(true);
      await collectionService.delete(id);
      toast.success("Collection deleted successfully");
      await loadCollections();
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast.error("Failed to delete collection");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      if (editing) {
        await collectionService.update(editing._id, form);
        toast.success("Collection updated successfully");
      } else {
        await collectionService.create(form);
        toast.success("Collection created successfully");
      }
      await loadCollections();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving collection:", error);
      toast.error("Failed to save collection");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Collection>[] = [
    {
      key: "name",
      label: "Collection",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
            {row.image && (
              <img
                src={getImageUrl(row.image)}
                alt={row.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="font-bold text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (row) => (
        <span className="text-gray-500 text-xs">{row.description || "-"}</span>
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
        title="Collections"
        subtitle={`${collections.length} collections`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Collection
          </button>
        }
      />
      <AdminTable columns={columns} data={collections} searchKeys={["name"]} />

      <AdminModal
        title={editing ? "Edit Collection" : "Add Collection"}
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
              placeholder="Skin Care"
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
              placeholder="Collection description..."
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Image
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                Upload Image
              </label>
              {form.image && (
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={getImageUrl(form.image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: "" })}
                    className="p-1 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              )}
            </div>
            <input
              type="text"
              value={form.image ?? ""}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className={inputClass}
              placeholder="Or enter image URL manually"
            />
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
