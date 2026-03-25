// app/[locale]/admin/reviews/page.tsx (updated)
"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, Eye, Loader2, Upload, X } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import Image from "next/image";
import { reviewService } from "@/services/reviewService";
import { uploadService } from "@/services/uploadService";
import { Review } from "@/types/review";
import { toast } from "react-hot-toast";
import { getImageUrl } from "@/utils/imageUrl";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState<Partial<Review>>({});
  const [viewing, setViewing] = useState<Review | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getAll();
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadService.uploadReviewImage(file);
      setForm({ ...form, images: [...(form.images || []), url] });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setForm({
      ...form,
      images: form.images?.filter((_, i) => i !== index),
    });
  };

  const openAdd = () => {
    setEditing(null);
    setForm({
      status: "published",
      rating: 5,
      images: [],
      date: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    });
    setModalOpen(true);
  };

  const openEdit = (r: Review) => {
    setEditing(r);
    setForm(r);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this review?"))
      return;
    try {
      setSubmitting(true);
      await reviewService.delete(id);
      toast.success("Review deleted successfully");
      await loadReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSoftDelete = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "deleted" : "published";
    try {
      setSubmitting(true);
      await reviewService.updateStatus(id, newStatus);
      toast.success(
        `Review ${newStatus === "published" ? "restored" : "deleted"} successfully`,
      );
      await loadReviews();
    } catch (error) {
      console.error("Error updating review status:", error);
      toast.error("Failed to update review status");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);

      // Prepare the review data
      const reviewData = {
        ...form,
        // Ensure required fields are present
        author: form.author || "Anonymous",
        rating: form.rating || 5,
        title: form.title || "",
        body: form.body || "",
        images: form.images || [],
        status: form.status || "published",
        date:
          form.date ||
          new Date().toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }),
      };

      if (editing) {
        await reviewService.update(editing._id, reviewData);
        toast.success("Review updated successfully");
      } else {
        // For admin creation, use the regular create method (no productId)
        await reviewService.create(reviewData);
        toast.success("Review created successfully");
      }
      await loadReviews();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error("Failed to save review");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Review>[] = [
    {
      key: "author",
      label: "Author",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.author}</span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (row) => <Stars rating={row.rating} />,
    },
    {
      key: "title",
      label: "Title",
      render: (row) => (
        <span className="text-gray-700 text-xs font-medium">{row.title}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (row) => (
        <span className="text-xs text-gray-500">{row.date}</span>
      ),
    },
    {
      key: "images",
      label: "Photos",
      render: (row) =>
        row.images && row.images.length > 0 ? (
          <span className="text-xs text-[#1f473e] font-semibold">
            {row.images.length} photo{row.images.length > 1 ? "s" : ""}
          </span>
        ) : (
          <span className="text-xs text-gray-300">—</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <button
          onClick={() => handleSoftDelete(row._id, row.status)}
          disabled={submitting}
          className="cursor-pointer"
        >
          <AdminBadge
            label={row.status}
            color={row.status === "published" ? "green" : "red"}
          />
        </button>
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-32",
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
            onClick={() => setViewing(row)}
            disabled={submitting}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
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
        title="Reviews"
        subtitle={`${reviews.length} total reviews · ${reviews.filter((r) => r.status === "deleted").length} deleted`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add Review
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={reviews}
        searchKeys={["author", "title"]}
      />

      <AdminModal
        title={editing ? "Edit Review" : "Add Review"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Author *
            </label>
            <input
              value={form.author ?? ""}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className={inputClass}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Rating *
            </label>
            <select
              value={form.rating ?? 5}
              onChange={(e) =>
                setForm({ ...form, rating: parseInt(e.target.value) })
              }
              className={inputClass}
              required
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Title *
            </label>
            <input
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Review title"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Review Content *
            </label>
            <textarea
              value={form.body ?? ""}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className={`${inputClass} resize-none`}
              rows={4}
              placeholder="Write your review here..."
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Images
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
                id="review-image-upload"
              />
              <label
                htmlFor="review-image-upload"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                Upload Image
              </label>
            </div>
            {form.images && form.images.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {form.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 p-0.5 bg-red-500 text-white rounded-bl-lg"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              value={form.images?.join(", ") ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  images: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s),
                })
              }
              className={inputClass}
              placeholder="Or enter image URLs separated by commas"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </label>
            <input
              type="date"
              value={form.date ?? ""}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </label>
            <select
              value={form.status ?? "published"}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as "published" | "deleted",
                })
              }
              className={inputClass}
            >
              <option value="published">Published</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>
        </div>
      </AdminModal>

      <AdminModal
        title="Review Details"
        open={!!viewing}
        onClose={() => setViewing(null)}
      >
        {viewing && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1f473e]/10 flex items-center justify-center text-[#1f473e] font-bold text-sm">
                  {viewing.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {viewing.author}
                  </p>
                  <p className="text-xs text-gray-400">{viewing.date}</p>
                </div>
              </div>
              <Stars rating={viewing.rating} />
            </div>
            <div className="bg-[#f5f0e8] rounded-2xl p-4">
              <p className="text-sm font-bold text-gray-900 mb-2">
                {viewing.title}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {viewing.body}
              </p>
            </div>
            {viewing.images && viewing.images.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Photos
                </p>
                <div className="flex gap-2 flex-wrap">
                  {viewing.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-20 h-20 rounded-xl overflow-hidden"
                    >
                      <img
                        src={getImageUrl(img)}
                        alt="Review"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <AdminBadge
                label={viewing.status}
                color={viewing.status === "published" ? "green" : "red"}
              />
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
