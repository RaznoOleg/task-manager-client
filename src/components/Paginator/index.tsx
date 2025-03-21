import React from 'react';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Paginator = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginatorProps) => {
  return (
    <div className="bottom-0 left-0 right-0 py-4 flex justify-between items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
