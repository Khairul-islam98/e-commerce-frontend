"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRecentProductHook } from "@/hooks/use-recent-product-hook";
import Link from "next/link";
import { ProductSkeleton } from "../skeleton/product-skeleton";
import { ProductCard } from "../all-products/product-card";
import { useEffect, useState } from "react";

export const RecentProductList = () => {
  const { products, isLoading } = useRecentProductHook();
  const [recentProducts, setRecentProducts] = useState(products);

  // Update local state when products change
  useEffect(() => {
    setRecentProducts(products);
  }, [products]);

  // Clear recent products from localStorage
  const handleClearRecentProducts = () => {
    localStorage.removeItem("recentProducts");
    setRecentProducts([]);
  };

  if (!isLoading && !recentProducts?.length) {
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
     
        <h2 className="font-bold text-center text-4xl my-10">
          Recently Viewed{" "}
          <span className="line-clamp-1 text-rose-600 italic">Products</span>
        </h2>
       

      <Separator className="my-[25px]" />
      <div className="gridView gap-[15px]">
        {recentProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}

        {isLoading && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
      </div>
      <Button
          className="bg-gray-200 mx-auto flex mt-4 text-gray-800 hover:bg-gray-300"
          onClick={handleClearRecentProducts}
        >
          Clear All
        </Button>

    </div>
  );
};
