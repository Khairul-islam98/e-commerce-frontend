"use client"


import { MyOrderList } from "@/components/order/my-order";
import { useGetUserOrderQuery } from "@/redux/features/order/orderApi";
import { useState } from "react";

const MyOrderPage = () => {
    const [page, setPage] = useState(1);
    const {data} = useGetUserOrderQuery({ page });
    console.log({data});
    return (
        <div className="w-full ">
      <h2 className="text-2xl font-bold mb-[28px]">You orders</h2>
      <div className="max-h-[50vh] overflow-auto smoothBar w-full">
        <MyOrderList orders={data?.data || []} />
      </div>
    </div>
    );
};

export default MyOrderPage;