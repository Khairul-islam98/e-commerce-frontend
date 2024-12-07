"use client";

import { useEffect, useState } from "react";

import { Separator } from "../ui/separator";
import { ProductCard } from "../all-products/product-card";
import { ProductSkeleton } from "../skeleton/product-skeleton";
import { useGetFlashSaleProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types";

export const FlashSaleList = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data, isFetching } = useGetFlashSaleProductsQuery({
    limit: 6,
    page,
  });

    useEffect(() => {
        if (data) {
        setProducts(data.data);
        }
    }, [data]);
  

  return (
    <div className="py-[20px]">
    
      <h2 className="font-bold text-4xl text-center my-10">
      Products
        <span className=" line-clamp-1 text-rose-600 italic">
          {" "}
  
          Flash Sale 
        </span>
      </h2>
      <Separator className="my-[25px]" />
      <div className="gridView gap-[15px]">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}

        {isFetching && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
      </div>
    
    </div>
  );
};


