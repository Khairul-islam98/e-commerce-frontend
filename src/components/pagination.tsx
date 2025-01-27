"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React, { useMemo } from "react";
import { Button } from "./ui/button";

export interface PaginationProps {
  total: number;
  limit?: number;
  currentPage: number; // Add currentPage as a required prop
  onPageChange: (page: number) => void;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export function Pagination({
  total,
  limit = 10,
  currentPage, // Use the prop for currentPage
  onPageChange,
  className,
  showText = true,
  textClassName,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  const pages = useMemo(() => {
    const items: (number | string)[] = [];

    // Display all pages if there are less than 7 pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Start with the first page
    items.push(1);

    // Add ellipsis if the current page is far from the beginning
    if (currentPage > 3) {
      items.push("...");
    }

    // Add surrounding pages (current page - 1, current page, current page + 1)
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    // Add ellipsis if the current page is far from the end
    if (currentPage < totalPages - 2) {
      items.push("...");
    }

    // Add the last page
    items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page); // Notify the parent about the page change
  };

  // If only one page, no pagination is needed
  if (totalPages <= 1) return null;

  return (
    <div className="space-y-4">
      {showText && (
        <p className={cn("text-sm text-gray-700", textClassName)}>
          Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
          <span className="font-medium">{Math.min(currentPage * limit, total)}</span> of{" "}
          <span className="font-medium">{total}</span> items
        </p>
      )}
      <nav
        className={cn("flex items-end justify-end space-x-2", className)}
        aria-label="Pagination"
      >
        <Button
         className=" bg-yellow-600 hover:bg-yellow-700 text-white"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center space-x-1">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <Button
                  key={`ellipsis-${index}`}
                  variant="ghost"
                  size="sm"
                  className="w-9"
                  disabled
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              );
            }

            const pageNumber = page as number;
            return (
              <Button
                key={pageNumber}
                size="sm"
                variant="outline"
                onClick={() => handlePageChange(pageNumber)}
                className={cn(
                  "w-9",
                  currentPage === pageNumber && " text-blue-300"
                )}
                aria-current={currentPage === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
         
          className="bg-green-600 hover:bg-green-700 text-white"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}
