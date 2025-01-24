"use client"


import { MyOrderList } from "@/components/order/my-order";
import { useGetUserOrderQuery } from "@/redux/features/order/orderApi";
import { useState } from "react";

const MyOrderPage = () => {
    const [page, setPage] = useState(1);
    const {data} = useGetUserOrderQuery({ page });

    return (
        <div className="w-full ">
      <h2 className="text-2xl font-bold text-rose-400 mb-[28px]">My order</h2>
      <div className="max-h-[50vh] overflow-auto smoothBar w-full">
        <MyOrderList orders={data?.data || []} />
      </div>
    </div>
    );
};

export default MyOrderPage;