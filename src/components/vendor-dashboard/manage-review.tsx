"use client";

import { useState } from "react";
import { Pagination } from "../pagination";
import { ReviewCard } from "./review-card";
import { useGetMyShopReviewsQuery } from "@/redux/features/review/reviewApi";

export const ManageReview = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetMyShopReviewsQuery({ page, limit: 10 });



  return (
    <div>
      <h1 className="text-2xl text-rose-400 font-bold mb-4">Product Reviews</h1>
      {/* Grid Layout for Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mb-6 mx-auto gap-2">
        {data?.data?.map((review: any) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        limit={10}
        currentPage={page}
        total={data?.meta.total || 0}
        onPageChange={setPage}
      />
    </div>
  );
};
