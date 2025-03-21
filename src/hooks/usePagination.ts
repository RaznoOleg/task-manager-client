import { useState } from 'react';

const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return { currentPage, totalPages, currentItems, paginate, resetPage };
};

export default usePagination;
