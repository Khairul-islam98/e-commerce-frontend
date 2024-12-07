"use client";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { useRecentProductHook } from "@/hooks/use-recent-product-hook";

import Link from "next/link";
import { ProductSkeleton } from "../skeleton/product-skeleton";
import { ProductCard } from "../all-products/product-card";

export const RecentProductList = () => {
  const { products, isLoading } = useRecentProductHook();
  console.log({products});

  if (!isLoading && !products?.length) {
    return (
      <div className="mb-5">
        <Separator className="my-[25px]" />
        <div className="text-center text-lg font-medium text-gray-700 dark:text-white my-5">
          No recently viewed products found.
        </div>
        <div className="text-center">
          <Link href="/all-products">
            <Button className="bg-rose-600 text-white">View All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-[20px]">
       <h2 className="font-bold text-4xl text-center my-10">
       Recently viewed
        <span className=" line-clamp-1 text-rose-600 italic">
          {" "}
          Products
        </span>
      </h2>
      <Separator className="my-[25px]" />
      <div className="gridView gap-[15px]">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}

        {isLoading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};


