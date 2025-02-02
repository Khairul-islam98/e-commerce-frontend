"use client";

import { useEffect, useState } from "react";

import { Separator } from "../ui/separator";
import { ProductCard } from "../all-products/product-card";
import { ProductSkeleton } from "../skeleton/product-skeleton";
import { useGetFlashSaleProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types";
import { motion } from "framer-motion";

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
    
    <motion.div
        className="bg-gradient-to-r from-rose-500 to-yellow-400 text-white py-10 px-5 rounded-lg shadow-lg flex flex-col items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-extrabold text-5xl md:text-6xl text-center tracking-tight">
          Flash Sale
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium text-center">
          Limited Time Offers on Your Favorite Products!
        </p>
       
      </motion.div>
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


