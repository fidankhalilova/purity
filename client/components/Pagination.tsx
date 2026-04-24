"use client";
import { useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage?: number;
};

export default function Pagination({
  totalPages,
  onPageChange,
  currentPage: propCurrentPage,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const urlPage = Number(searchParams?.get("page")) || 1;
  const current = propCurrentPage || urlPage;

  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [];

    if (current <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (current >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        current - 1,
        current,
        current + 1,
        "...",
        totalPages,
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-10 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:border-gray-400 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-400 text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-sm font-medium transition-colors duration-200 ${
              current === page
                ? "bg-[#1f473e] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={current === page ? "page" : undefined}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === totalPages}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:border-gray-400 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
