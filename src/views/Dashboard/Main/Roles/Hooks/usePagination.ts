"use client";
import { useState } from "react";

export const usePagination = (initialLimit: number, incrementBy: number = 3) => {
  const [limit, setLimit] = useState<number>(initialLimit);

  // Function to load more items
  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + incrementBy);
  };

  return {
    limit,
    loadMore, // Expose the loadMore function
  };
};