"use client";
import { useState, useEffect } from "react";
import { Trash2, Eye, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import Image from "next/image";
import { reviewService } from "@/services/reviewService";
import { Review } from "@/types/review";
import { toast } from "react-hot-toast";

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
  const [viewing, setViewing] = useState<Review | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
      width: "w-24",
      render: (row) => (
        <div className="flex gap-2">
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
      />
      <AdminTable
        columns={columns}
        data={reviews}
        searchKeys={["author", "title"]}
      />

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
                      <Image
                        src={img}
                        alt="Review"
                        fill
                        className="object-cover"
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
