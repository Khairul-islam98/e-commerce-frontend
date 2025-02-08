"use client";

import { useState } from "react";
import { ShopHeader } from "./shop-header";
import { ShopSearch } from "./shop-search";
import { ShopProduct } from "./shop-product";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";

interface ShopDetailsProps {
  shopId: string;
}

export const ShopDetails = ({ shopId }: ShopDetailsProps) => {
  const [query, setQuery] = useState({ page: 1, searchTerm: "", shopId });
  const { data, isFetching } = useGetAllProductsQuery(query);


  const filteredProducts = data?.data?.filter(product => product.shopId === shopId) || [];

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-full mt-[30px] bg-white px-4 py-6 rounded-[15px]">
        <div className="grid gap-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 lg:max-w-3xl items-center justify-center mx-auto">
              <ShopHeader shopId={shopId} />
            </div>
          </div>
          <ShopSearch
            onValueChange={(value) => setQuery({ ...query, searchTerm: value })}
          />
          <ShopProduct
            isLoading={isFetching}
            products={filteredProducts}
          />
        </div>
      </div>
    </div>
  );
};
