"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  Loader2,
} from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { skinShadeService } from "@/services/skinShadeService";
import { skinConcernService } from "@/services/skinConcernService";
import { skinColorService } from "@/services/skinColorService";
import { skinTypeService } from "@/services/skinTypeService";
import { productSizeService } from "@/services/productSizeService";
import { productService } from "@/services/productService";
import { productColorService } from "@/services/productColorService";
import { homeSectionService } from "@/services/homeSectionService";
import { tagService } from "@/services/tagService";
import { collectionService } from "@/services/collectionService";
import { badgeService } from "@/services/badgeService";
import {
  Product,
  ProductColor,
  ProductSize,
  SkinType,
  SkinConcern,
  SkinShade,
  SkinColor,
  Collection,
  Tag,
  HomeSection,
  Badge,
} from "@/types/product";
import { toast } from "react-hot-toast";
import { uploadService } from "@/services/uploadService";
import { Upload } from "lucide-react";
import { getImageUrl } from "@/utils/imageUrl";
import { createPortal } from "react-dom";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors bg-white";
const textareaClass = `${inputClass} resize-none`;

// Multi-select pill component
function MultiSelect({
  label,
  options,
  value,
  onChange,
  getOptionLabel,
}: {
  label: string;
  options: any[];
  value: string[];
  onChange: (v: string[]) => void;
  getOptionLabel: (option: any) => string;
}) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = (optId: string) =>
    onChange(
      value.includes(optId)
        ? value.filter((v) => v !== optId)
        : [...value, optId],
    );

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = Math.min(options.length * 40 + 16, 176);
      const spaceBelow = window.innerHeight - rect.bottom;

      setDropdownStyle({
        position: "fixed",
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
        ...(spaceBelow < dropdownHeight
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
      });
    }
  }, [open, options.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="flex flex-col gap-1.5" ref={wrapperRef}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(!open)}
          className={`${inputClass} flex items-center justify-between text-left`}
        >
          <span className={value.length ? "text-gray-700" : "text-gray-400"}>
            {value.length ? `${value.length} selected` : `Select ${label}...`}
          </span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
          )}
        </button>

        {open &&
          typeof window !== "undefined" &&
          createPortal(
            <div
              style={dropdownStyle}
              className="bg-white border border-gray-100 rounded-2xl shadow-xl py-2 max-h-44 overflow-y-auto"
            >
              {options.length === 0 && (
                <p className="text-xs text-gray-400 px-4 py-2">
                  No options available
                </p>
              )}
              {options.map((opt) => (
                <button
                  key={opt._id}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggle(opt._id);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                    value.includes(opt._id)
                      ? "font-semibold text-[#1f473e]"
                      : "text-gray-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      value.includes(opt._id)
                        ? "bg-[#1f473e] border-[#1f473e]"
                        : "border-gray-300"
                    }`}
                  >
                    {value.includes(opt._id) && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  {getOptionLabel(opt)}
                </button>
              ))}
            </div>,
            document.body,
          )}
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {value.map((v) => {
            const opt = options.find((o) => o._id === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1f473e]/10 text-[#1f473e] text-xs font-medium rounded-full"
              >
                {opt ? getOptionLabel(opt) : v}
                <button
                  type="button"
                  onClick={() => toggle(v)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Single select
function SingleSelect({
  label,
  options,
  value,
  onChange,
  getOptionLabel,
}: {
  label: string;
  options: any[];
  value: string;
  onChange: (v: string) => void;
  getOptionLabel: (option: any) => string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        <option value="">— None —</option>
        {options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {getOptionLabel(opt)}
          </option>
        ))}
      </select>
    </div>
  );
}

// String list editor
function StringListEditor({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");
  const add = () => {
    if (input.trim()) {
      onChange([...value, input.trim()]);
      setInput("");
    }
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          className={`${inputClass} flex-1`}
          placeholder={placeholder ?? `Add ${label}...`}
        />
        <button
          type="button"
          onClick={add}
          className="px-4 py-2 bg-[#1f473e] text-white text-sm font-medium rounded-2xl hover:bg-[#163830] transition-colors shrink-0"
        >
          Add
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-col gap-1 mt-1">
          {value.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl"
            >
              <span className="text-xs text-gray-700 truncate">{v}</span>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Collapsible section
function FormSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {open && <div className="p-4 flex flex-col gap-4">{children}</div>}
    </div>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [submitting, setSubmitting] = useState(false);

  // Reference data
  const [collections, setCollections] = useState<Collection[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [homeSections, setHomeSections] = useState<HomeSection[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [productColors, setProductColors] = useState<ProductColor[]>([]);
  const [productSizes, setProductSizes] = useState<ProductSize[]>([]);
  const [skinTypes, setSkinTypes] = useState<SkinType[]>([]);
  const [skinConcerns, setSkinConcerns] = useState<SkinConcern[]>([]);
  const [skinShades, setSkinShades] = useState<SkinShade[]>([]);
  const [skinColors, setSkinColors] = useState<SkinColor[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadingType, setUploadingType] = useState<"main" | "action" | null>(
    null,
  );
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const actionImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        productsData,
        collectionsData,
        tagsData,
        homeSectionsData,
        badgesData,
        productColorsData,
        productSizesData,
        skinTypesData,
        skinConcernsData,
        skinShadesData,
        skinColorsData,
      ] = await Promise.all([
        productService.getAll(),
        collectionService.getAll(),
        tagService.getAll(),
        homeSectionService.getAll(),
        badgeService.getAll(),
        productColorService.getAll(),
        productSizeService.getAll(),
        skinTypeService.getAll(),
        skinConcernService.getAll(),
        skinShadeService.getAll(),
        skinColorService.getAll(),
      ]);

      setProducts(productsData.products);
      setCollections(collectionsData);
      setTags(tagsData);
      setHomeSections(homeSectionsData);
      setBadges(badgesData);
      setProductColors(productColorsData);
      setProductSizes(productSizesData);
      setSkinTypes(skinTypesData);
      setSkinConcerns(skinConcernsData);
      setSkinShades(skinShadesData);
      setSkinColors(skinColorsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({
      status: "active",
      inStock: true,
      rating: 0,
      reviewCount: 0,
      images: [],
      productColors: [],
      productSizes: [],
      skinColors: [],
      skinShades: [],
      skinTypes: [],
      skinConcerns: [],
      tags: [],
      homeSections: [],
      pairsWell: [],
      boughtTogether: [],
      similarProducts: [],
      badges: [],
      benefits: [],
      actionImages: [],
      glowIngredients: [],
      collection: "",
      productInfo: "",
      howToUse: "",
      ingredients: "",
      description: "",
    });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      setSubmitting(true);
      await productService.delete(id);
      toast.success("Product deleted successfully");
      await loadAllData();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      if (editing) {
        await productService.update(editing._id, form);
        toast.success("Product updated successfully");
      } else {
        await productService.create(form);
        toast.success("Product created successfully");
      }
      await loadAllData();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const setFormValue = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Add image upload handler
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "action",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadingType(type);
      const url = await uploadService.uploadProductImage(file);

      if (type === "main") {
        setFormValue("images", [...(form.images || []), url]);
      } else {
        setFormValue("actionImages", [...(form.actionImages || []), url]);
      }

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      setUploadingType(null);
      if (type === "main" && mainImageInputRef.current) {
        mainImageInputRef.current.value = "";
      } else if (type === "action" && actionImageInputRef.current) {
        actionImageInputRef.current.value = "";
      }
    }
  };

  const columns: Column<Product>[] = [
    {
      key: "name",
      label: "Product",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
            {row?.images?.[0] && (
              <img
                src={getImageUrl(row.images[0])}
                alt={row.name}
                className="w-full h-full object-contain p-1"
              />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900 leading-none">
              {row.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">{row._id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "collection",
      label: "Collection",
      sortable: true,
      render: (row) => {
        const collection = collections.find((c) => c._id === row.collection);
        return (
          <span className="text-xs text-gray-600">
            {collection?.name || "—"}
          </span>
        );
      },
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900">{row.price}</span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (row) => (
        <div className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-semibold text-gray-700">
            {row.rating?.toFixed(1) || "0"}
          </span>
          <span className="text-xs text-gray-400">
            ({row.reviewCount || 0})
          </span>
        </div>
      ),
    },
    {
      key: "inStock",
      label: "Stock",
      render: (row) => (
        <AdminBadge
          label={row.inStock ? "In Stock" : "Out of Stock"}
          color={row.inStock ? "green" : "red"}
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <AdminBadge
          label={row.status || "active"}
          color={row.status === "active" ? "green" : "gray"}
        />
      ),
    },
    {
      key: "tags",
      label: "Tags",
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {(row.tags || []).slice(0, 2).map((tagId, index) => {
            // Handle both string ID and populated Tag object
            const tagIdString =
              typeof tagId === "string" ? tagId : (tagId as any)._id;
            const tag = tags.find((t) => t._id === tagIdString);
            return tag ? (
              <span
                key={`${tagIdString}-${index}`}
                className="text-[10px] font-semibold bg-[#1f473e]/10 text-[#1f473e] px-2 py-0.5 rounded-full"
              >
                {tag.name}
              </span>
            ) : null;
          })}
          {(row.tags || []).length > 2 && (
            <span className="text-[10px] text-gray-400">
              +{(row.tags || []).length - 2}
            </span>
          )}
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
        title="Products"
        subtitle={`${products.length} total products`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={products}
        searchKeys={["name", "_id"]}
      />

      <AdminModal
        title={editing ? `Edit: ${editing.name}` : "Add Product"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        saveLabel={editing ? "Save Changes" : "Create Product"}
      >
        <div className="flex flex-col gap-3">
          {/* Basic Info */}
          <FormSection title="Basic Information" defaultOpen>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name *
                </label>
                <input
                  value={form.name ?? ""}
                  onChange={(e) => setFormValue("name", e.target.value)}
                  className={inputClass}
                  placeholder="Product name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price *
                </label>
                <input
                  value={form.price ?? ""}
                  onChange={(e) => setFormValue("price", e.target.value)}
                  className={inputClass}
                  placeholder="$75.00"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Rating (0–5)
                </label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={form.rating ?? 0}
                  onChange={(e) =>
                    setFormValue("rating", parseFloat(e.target.value))
                  }
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Review Count
                </label>
                <input
                  type="number"
                  value={form.reviewCount ?? 0}
                  onChange={(e) =>
                    setFormValue("reviewCount", parseInt(e.target.value))
                  }
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </label>
                <select
                  value={form.status ?? "active"}
                  onChange={(e) =>
                    setFormValue("status", e.target.value as "active" | "draft")
                  }
                  className={inputClass}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex items-center gap-3 px-1 mt-4">
                <button
                  type="button"
                  onClick={() => setFormValue("inStock", !form.inStock)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${form.inStock ? "bg-[#1f473e]" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${form.inStock ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </button>
                <span className="text-sm text-gray-700 font-medium">
                  In Stock
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Description *
              </label>
              <textarea
                value={form.description ?? ""}
                onChange={(e) => setFormValue("description", e.target.value)}
                className={textareaClass}
                rows={3}
                placeholder="Product description..."
                required
              />
            </div>
          </FormSection>

          {/* Images */}
          <FormSection title="Images">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "main")}
                  ref={mainImageInputRef}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  {uploading && uploadingType === "main" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  Upload Main Image
                </label>
              </div>
              <StringListEditor
                label="Image URLs"
                value={form.images ?? []}
                onChange={(v) => setFormValue("images", v)}
                placeholder="https://..."
              />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "action")}
                  ref={actionImageInputRef}
                  className="hidden"
                  id="action-image-upload"
                />
                <label
                  htmlFor="action-image-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  {uploading && uploadingType === "action" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  Upload Action Image
                </label>
              </div>
              <StringListEditor
                label="Action Images"
                value={form.actionImages ?? []}
                onChange={(v) => setFormValue("actionImages", v)}
                placeholder="https://..."
              />
            </div>
          </FormSection>

          {/* Variants */}
          <FormSection title="Variants">
            <MultiSelect
              label="Product Colors"
              options={productColors}
              value={
                (form.productColors as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("productColors", v)}
              getOptionLabel={(opt) => opt.name}
            />
            <MultiSelect
              label="Product Sizes"
              options={productSizes}
              value={
                (form.productSizes as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("productSizes", v)}
              getOptionLabel={(opt) => `${opt.size} (${opt.ml}ml)`}
            />
          </FormSection>

          {/* Skin */}
          <FormSection title="Skin Targeting">
            <MultiSelect
              label="Skin Types"
              options={skinTypes}
              value={
                (form.skinTypes as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("skinTypes", v)}
              getOptionLabel={(opt) => opt.name}
            />
            <MultiSelect
              label="Skin Concerns"
              options={skinConcerns}
              value={
                (form.skinConcerns as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("skinConcerns", v)}
              getOptionLabel={(opt) => opt.name}
            />
            <MultiSelect
              label="Skin Shades"
              options={skinShades}
              value={
                (form.skinShades as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("skinShades", v)}
              getOptionLabel={(opt) => opt.name}
            />
            <MultiSelect
              label="Skin Colors"
              options={skinColors}
              value={
                (form.skinColors as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("skinColors", v)}
              getOptionLabel={(opt) => opt.name}
            />
          </FormSection>

          {/* Organization */}
          <FormSection title="Organization">
            <SingleSelect
              label="Collection"
              options={collections}
              value={
                typeof form.collection === "object"
                  ? (form.collection as any)?._id || ""
                  : ((form.collection as string) ?? "")
              }
              onChange={(v) => setFormValue("collection", v)}
              getOptionLabel={(opt) => opt.name}
            />
            <MultiSelect
              label="Tags"
              options={tags}
              value={
                (form.tags as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("tags", v)}
              getOptionLabel={(opt) => opt.name}
            />
            <MultiSelect
              label="Home Sections"
              options={homeSections}
              value={
                (form.homeSections as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("homeSections", v)}
              getOptionLabel={(opt) => opt.displayName}
            />
            <MultiSelect
              label="Badges"
              options={badges}
              value={
                (form.badges as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("badges", v)}
              getOptionLabel={(opt) => `${opt.icon} ${opt.label}`}
            />
          </FormSection>

          {/* Relations */}
          <FormSection title="Product Relations">
            <MultiSelect
              label="Pairs Well With"
              options={products}
              value={
                (form.pairsWell as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("pairsWell", v)}
              getOptionLabel={(opt) => opt.name}
            />
            <MultiSelect
              label="Bought Together"
              options={products}
              value={
                (form.boughtTogether as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("boughtTogether", v)}
              getOptionLabel={(opt) => opt.name}
            />
            <MultiSelect
              label="Similar Products"
              options={products}
              value={
                (form.similarProducts as any[])?.map((item) =>
                  typeof item === "object" ? item._id : item,
                ) ?? []
              }
              onChange={(v) => setFormValue("similarProducts", v)}
              getOptionLabel={(opt) => opt.name}
            />
          </FormSection>

          {/* Content */}
          <FormSection title="Product Content">
            <StringListEditor
              label="Benefits"
              value={form.benefits ?? []}
              onChange={(v) => setFormValue("benefits", v)}
              placeholder="e.g. Reduces puffiness"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Glow Ingredients
              </label>
              <input
                value={form.glowIngredients?.join(", ") ?? ""}
                onChange={(e) =>
                  setFormValue(
                    "glowIngredients",
                    e.target.value.split(",").map((s) => s.trim()),
                  )
                }
                className={inputClass}
                placeholder="Niacinamide, Vitamin C, etc."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Product Info
              </label>
              <textarea
                value={form.productInfo ?? ""}
                onChange={(e) => setFormValue("productInfo", e.target.value)}
                className={textareaClass}
                rows={3}
                placeholder="General product information..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                How to Use
              </label>
              <textarea
                value={form.howToUse ?? ""}
                onChange={(e) => setFormValue("howToUse", e.target.value)}
                className={textareaClass}
                rows={3}
                placeholder="Usage instructions..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ingredients
              </label>
              <textarea
                value={form.ingredients ?? ""}
                onChange={(e) => setFormValue("ingredients", e.target.value)}
                className={textareaClass}
                rows={4}
                placeholder="Water, Niacinamide, ..."
              />
            </div>
          </FormSection>
        </div>
      </AdminModal>
    </div>
  );
}
