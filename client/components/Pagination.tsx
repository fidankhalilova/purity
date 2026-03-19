"use client";
import { useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  onPageChange,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const current = Number(searchParams?.get("page")) || 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-3 py-10">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-12 h-12 rounded-full text-sm font-medium transition-colors duration-200 ${
            current === page
              ? "bg-[#1f473e] text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === totalPages}
        className="w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:border-gray-400 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      </button>
    </div>
  );
}
