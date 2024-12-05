import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalItems
}: PaginationProps) {
  const pageSizeOptions = [25, 50, 100, 200];

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-700">
          <span>Showing </span>
          <span className="font-medium">
            {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
          </span>
          <span> to </span>
          <span className="font-medium">
            {Math.min(currentPage * pageSize, totalItems)}
          </span>
          <span> of </span>
          <span className="font-medium">{totalItems}</span>
          <span> leads</span>
        </div>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === page
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}