"use client";
import { useState } from "react";
import { Trash2, Check, X } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";

type Review = {
  id: string;
  author: string;
  product: string;
  rating: number;
  title: string;
  date: string;
  status: "published" | "pending" | "rejected";
};

const initialReviews: Review[] = [
  {
    id: "1",
    author: "Isabella D.",
    product: "Dark Circle Patch",
    rating: 5,
    title: "Woke up with brighter eyes!",
    date: "May 07, 2025",
    status: "published",
  },
  {
    id: "2",
    author: "Amelia T.",
    product: "Dark Circle Patch",
    rating: 5,
    title: "Actually works on my under-eyes",
    date: "May 07, 2025",
    status: "published",
  },
  {
    id: "3",
    author: "test",
    product: "Dark Circle Patch",
    rating: 3,
    title: "Test",
    date: "Oct 10, 2025",
    status: "pending",
  },
  {
    id: "4",
    author: "Jordan K.",
    product: "Pore Detox Scrub",
    rating: 5,
    title: "Best scrub I've ever tried",
    date: "Feb 14, 2026",
    status: "pending",
  },
];

const statusColor: Record<string, "green" | "yellow" | "red"> = {
  published: "green",
  pending: "yellow",
  rejected: "red",
};

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
  const [reviews, setReviews] = useState(initialReviews);

  const approve = (id: string) =>
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, status: "published" as const } : r,
      ),
    );
  const reject = (id: string) =>
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, status: "rejected" as const } : r,
      ),
    );
  const remove = (id: string) => setReviews(reviews.filter((r) => r.id !== id));

  const columns: Column<Review>[] = [
    {
      key: "author",
      label: "Author",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.author}</span>
      ),
    },
    { key: "product", label: "Product", sortable: true },
    {
      key: "rating",
      label: "Rating",
      render: (row) => <Stars rating={row.rating} />,
    },
    {
      key: "title",
      label: "Review Title",
      render: (row) => <span className="text-gray-600">{row.title}</span>,
    },
    { key: "date", label: "Date", sortable: true },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <AdminBadge label={row.status} color={statusColor[row.status]} />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-28",
      render: (row) => (
        <div className="flex gap-1.5">
          {row.status === "pending" && (
            <>
              <button
                onClick={() => approve(row.id)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-green-600" />
              </button>
              <button
                onClick={() => reject(row.id)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-red-500" />
              </button>
            </>
          )}
          <button
            onClick={() => remove(row.id)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Reviews"
        subtitle={`${reviews.length} total reviews`}
      />
      <AdminTable
        columns={columns}
        data={reviews}
        searchKeys={["author", "product", "title"]}
      />
    </div>
  );
}
