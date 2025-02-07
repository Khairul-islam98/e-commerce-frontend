"use client";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const NavSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products } = useGetAllProductsQuery({
    page: 1,
    searchTerm: searchTerm,
  });

  return (
    <div className="relative hidden lg:block">
      <div className="border-[2px]  rounded-md w-[335px] xl:w-[475px] flex">
        <div className="h-auto flex-grow">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search product..."
            className="px-5 py-2.5 border-none dark:bg-white text-sm w-full rounded-md focus:ring-0 focus:outline-none leading-relaxed"
            value={searchTerm}
          />
        </div>
        {/* <!-- search btn --> */}
        <div className="w-[142px]">
          <button className="bg-rose-600 hover:bg-rose-700 rounded-r-md w-full px-4 py-2.5 text-white text-base font-medium">
            Search
          </button>
        </div>
      </div>
      {/* Search Result */}
      <div
        className={`absolute left-0 top-14 w-full shadow bg-white rounded-b-[3px] z-10 transition-all duration-300  mt-0 ${searchTerm?.length > 1 && products?.data && products?.data?.length > 0 ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="h-auto overflow-auto">
          {products?.data?.map((product) => {
            return (
              <Link
                onClick={() => setSearchTerm("")}
                key={product?.id}
                href={`/product/${product?.id}`}
                className="flex items-center py-2 border-b border-[#ebebeb] hover:bg-[#f2f0f0] transition-all duration-300"
              >
                <div className="w-[90px] p-2.5">
                  <Image
                    height={100}
                    width={100}
                    src={product?.image[0]}
                    className="w-full h-[50px] object-contain"
                    alt="product"
                  />
                </div>
                <div className="pl-2">
                  <h4 className="text-lg font-medium text-black mb-1.5">
                    {product?.name}
                  </h4>
                  <div className="mb-[5px] font-medium leading-[22px]">
                    <span className="text-primary mr-[5px]">
                      {product?.price}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Search Result */}
    </div>
  );
};

