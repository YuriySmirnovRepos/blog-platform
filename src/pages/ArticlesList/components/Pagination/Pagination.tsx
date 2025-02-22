import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPages: number;
}

function getStartInterval(page: number) {
  return Math.floor((page - 1) / 5) * 5 + 1;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const navigate = useNavigate();
  const page = Number(useParams()?.page) || 1;

  const paginationStep = 5;
  const startInterval = getStartInterval(page);

  const [pageInterval, setPageInterval] = useState({
    start: startInterval,
    end: startInterval + paginationStep - 1,
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`/articles/${page}`);
    }
  };

  const goToNextInterval = () => {
    setPageInterval((prevInterval) => ({
      start: Math.min(
        prevInterval.start + paginationStep,
        totalPages - paginationStep + 1,
      ),
      end: Math.min(prevInterval.end + paginationStep, totalPages),
    }));
  };

  const goToPreviousInterval = () => {
    setPageInterval((prevInterval) => ({
      start: Math.max(prevInterval.start - paginationStep, 1),
      end: Math.max(prevInterval.end - paginationStep, paginationStep),
    }));
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = pageInterval.start; i <= pageInterval.end; i++) {
      pages.push(
        <button
          type="button"
          key={i}
          className={`${styles.button} ${i === page ? styles["button--active"] : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.button} ${styles["button--previous"]}`}
        title="Go to previous page"
        type="button"
        disabled={pageInterval.start === 1}
        onClick={goToPreviousInterval}
      ></button>

      {renderPageNumbers()}

      <button
        className={`${styles.button} ${styles["button--next"]}`}
        title="Go to next page"
        type="button"
        disabled={pageInterval.end === totalPages}
        onClick={goToNextInterval}
      ></button>
    </div>
  );
};
export default Pagination;
