"use client";

import { useState, useEffect } from "react";
import { Heading } from "../heading";
import { useGetVendorOrderQuery } from "@/redux/features/order/orderApi";
import OrderTable from "./order-table";
import { Pagination } from "../pagination";

export const ManageOrder = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useGetVendorOrderQuery(query);



  const handlePageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  return (
    <div>
      <Heading
        title="Manage Orders"
        description="View and manage your orders"
        className="mb-4"
      />

      <OrderTable isLoading={isLoading} orders={data?.data || []} />

      <Pagination
        total={data?.meta?.total || 0}
        limit={query.limit}
        currentPage={query.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
