"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, Loader2, Star, Upload, X } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { brandService } from "@/services/brandService";
import { uploadService } from "@/services/uploadService";
import { Brand } from "@/types/brand";
import { toast } from "react-hot-toast";
import { getImageUrl } from "@/utils/imageUrl";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [form, setForm] = useState<Partial<Brand>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await brandService.getAll();
      setBrands(data);
    } catch (error) {
      console.error("Error loading brands:", error);
      toast.error("Failed to load brands");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadService.uploadBrandLogo(file);
      setForm({ ...form, logo: url });
      toast.success("Logo uploaded successfully");
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ isFeatured: false, isActive: true });
    setModalOpen(true);
  };

  const openEdit = (b: Brand) => {
    setEditing(b);
    setForm(b);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this brand? This will also remove it from all products.",
      )
    )
      return;
    try {
      setSubmitting(true);
      await brandService.delete(id);
      toast.success("Brand deleted successfully");
      await loadBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete brand",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      setSubmitting(true);
      await brandService.toggleFeatured(id);
      toast.success("Featured status updated");
      await loadBrands();
    } catch (error) {
      console.error("Error toggling featured:", error);
      toast.error("Failed to update featured status");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      setSubmitting(true);
      await brandService.toggleActive(id);
      toast.success("Active status updated");
      await loadBrands();
    } catch (error) {
      console.error("Error toggling active:", error);
      toast.error("Failed to update active status");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      if (editing) {
        await brandService.update(editing._id, form);
        toast.success("Brand updated successfully");
      } else {
        await brandService.create(form);
        toast.success("Brand created successfully");
      }
      await loadBrands();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving brand:", error);
      toast.error("Failed to save brand");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Brand>[] = [
    {
      key: "logo",
      label: "Logo",
      render: (row) => (
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          {row.logo && (
            <img
              src={getImageUrl(row.logo)}
              alt={row.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image failed to load:", row.logo);
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Brand Name",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400">{row.country}</p>
        </div>
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
      key: "isFeatured",
      label: "Featured",
      render: (row) => (
        <button
          onClick={() => handleToggleFeatured(row._id)}
          disabled={submitting}
          className="cursor-pointer"
        >
          {row.isFeatured ? (
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          ) : (
            <Star className="w-5 h-5 text-gray-300" />
          )}
        </button>
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
        title="Brands"
        subtitle={`${brands.length} brands`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Brand
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={brands}
        searchKeys={["name", "country"]}
      />

      <AdminModal
        title={editing ? "Edit Brand" : "Add Brand"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Brand Name *
            </label>
            <input
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="Glossier"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Country *
            </label>
            <input
              value={form.country ?? ""}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className={inputClass}
              placeholder="USA"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Logo *
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                Upload Logo
              </label>
              {form.logo && (
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={getImageUrl(form.logo)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(
                          "Preview image failed to load:",
                          form.logo,
                        );
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, logo: "" })}
                    className="p-1 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              )}
            </div>
            <input
              type="text"
              value={form.logo ?? ""}
              onChange={(e) => setForm({ ...form, logo: e.target.value })}
              className={inputClass}
              placeholder="Or enter URL manually"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Website
            </label>
            <input
              value={form.website ?? ""}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className={inputClass}
              placeholder="https://www.brand.com"
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
              className={`${inputClass} resize-none`}
              rows={4}
              placeholder="Brand description..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Featured
              </label>
              <select
                value={form.isFeatured ? "true" : "false"}
                onChange={(e) =>
                  setForm({ ...form, isFeatured: e.target.value === "true" })
                }
                className={inputClass}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
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
        </div>
      </AdminModal>
    </div>
  );
}
