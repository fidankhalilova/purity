"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, Eye, Loader2, Upload, X } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { glowIngredientService } from "@/services/glowIngredientService";
import { uploadService } from "@/services/uploadService";
import { GlowIngredient } from "@/types/product";
import { toast } from "react-hot-toast";
import { getImageUrl } from "@/utils/imageUrl";
import { useAdminAuth } from "@/context/AdminAuthContext";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors bg-white";
const textareaClass = `${inputClass} resize-none`;

export default function AdminGlowIngredients() {
  const { accessToken } = useAdminAuth();
  const [ingredients, setIngredients] = useState<GlowIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editing, setEditing] = useState<GlowIngredient | null>(null);
  const [viewing, setViewing] = useState<GlowIngredient | null>(null);
  const [form, setForm] = useState<Partial<GlowIngredient>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const data = await glowIngredientService.getAll(accessToken);
      setIngredients(data);
    } catch (error) {
      console.error("Error loading glow ingredients:", error);
      toast.error("Failed to load glow ingredients");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadService.uploadProductImage(file);
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
    setForm({});
    setModalOpen(true);
  };

  const openEdit = (item: GlowIngredient) => {
    setEditing(item);
    setForm(item);
    setModalOpen(true);
  };

  const openView = (item: GlowIngredient) => {
    setViewing(item);
    setViewModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this glow ingredient?"))
      return;
    try {
      setSubmitting(true);
      await glowIngredientService.delete(id, accessToken);
      toast.success("Glow ingredient deleted successfully");
      await loadIngredients();
    } catch (error) {
      console.error("Error deleting glow ingredient:", error);
      toast.error("Failed to delete glow ingredient");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    if (
      !form.tag ||
      !form.subtitle ||
      !form.title ||
      !form.description ||
      !form.image
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      if (editing) {
        await glowIngredientService.update(editing._id, form, accessToken);
        toast.success("Glow ingredient updated successfully");
      } else {
        await glowIngredientService.create(form, accessToken);
        toast.success("Glow ingredient created successfully");
      }
      await loadIngredients();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving glow ingredient:", error);
      toast.error("Failed to save glow ingredient");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<GlowIngredient>[] = [
    {
      key: "image",
      label: "Image",
      render: (row) => (
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#f0ebe2]">
          {row.image && (
            <img
              src={getImageUrl(row.image)}
              alt={row.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{row.tag}</p>
        </div>
      ),
    },
    {
      key: "subtitle",
      label: "Subtitle",
      render: (row) => (
        <span className="text-sm text-gray-600">{row.subtitle}</span>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (row) => (
        <p className="text-sm text-gray-500 line-clamp-2 max-w-xs">
          {row.description}
        </p>
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-24",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openView(row)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors"
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
        title="Glow Ingredients"
        subtitle={`${ingredients.length} total ingredients`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Ingredient
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={ingredients}
        searchKeys={["title", "tag", "subtitle"]}
      />

      <AdminModal
        title={editing ? "Edit Glow Ingredient" : "Add Glow Ingredient"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto px-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tag * (e.g., "Hero Ingredient", "Key Active")
            </label>
            <input
              value={form.tag ?? ""}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className={inputClass}
              placeholder="Hero Ingredient"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Subtitle *
            </label>
            <input
              value={form.subtitle ?? ""}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className={inputClass}
              placeholder="Brightening & Anti-oxidant"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Title *
            </label>
            <input
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Vitamin C"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Description *
            </label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={textareaClass}
              rows={4}
              placeholder="A powerful antioxidant that brightens skin, fades dark spots, and boosts collagen production..."
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Image *
            </label>
            <div className="flex gap-3 items-start">
              {form.image && (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(form.image)}
                    alt={form.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="glow-image-upload"
                />
                <label
                  htmlFor="glow-image-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  Upload Image
                </label>
                {form.image && (
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                    placeholder="Or enter image URL"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminModal>

      <AdminModal
        title="Glow Ingredient Details"
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      >
        {viewing && (
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={getImageUrl(viewing.image)}
                alt={viewing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="inline-block bg-[#1f473e]/10 text-[#1f473e] text-xs font-medium px-2 py-1 rounded-full mb-2">
                {viewing.tag}
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                {viewing.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{viewing.subtitle}</p>
            </div>
            <div className="bg-[#f5f0e8] rounded-2xl p-4">
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Description
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {viewing.description}
              </p>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
