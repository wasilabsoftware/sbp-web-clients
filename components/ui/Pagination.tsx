"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-4 lg:pt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 lg:w-10 lg:h-10 rounded-sm border border-border-subtle flex items-center justify-center hover:bg-bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-text-tertiary" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 lg:w-10 lg:h-10 rounded-sm flex items-center justify-center text-sm lg:text-[15px] font-medium transition-colors ${
            currentPage === page
              ? "bg-berry-red text-text-inverse font-semibold"
              : "border border-border-subtle text-text-secondary hover:bg-bg-muted"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 lg:w-10 lg:h-10 rounded-sm border border-border-subtle flex items-center justify-center hover:bg-bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-text-secondary" />
      </button>
    </div>
  );
}
