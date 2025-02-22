"use client";

import { useGetMyShopQuery } from "@/redux/features/shop/shopApi";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Heading } from "../heading";
import { ProductTable } from "./product-table";
import { useAppSelector } from "@/redux/hooks";


export const ManageProducts = () => {

 const {user} = useAppSelector (state => state.auth)
  const { data, isFetching } = useGetMyShopQuery(user?.id);
  const productData = data?.data?.products || []

  return (
    <div>
      <Heading
        title="Manage Products"
        description="Create a new product and add it to your store"
        className="mb-[20px]"
      />
      <div className="w-full h-full flex items-center justify-end gap-[5px] mb-[23px]">
        <Link
          href="/dashboard/vendor/create-product"
          className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-mainHover transition-colors duration-300"
        >
          Create Product <Plus className="inline-block ml-2" />
        </Link>
      </div>
      <ProductTable products={productData || []} isLoading={isFetching} />
      
    </div>
  );
};

