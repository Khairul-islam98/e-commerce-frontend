"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "../skeleton/product-skeleton";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types";

export const Products = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{
    searchTerm: string;
    category: string;
    minPrice: string;
    maxPrice: string;
  }>({
    searchTerm: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    page,
    searchTerm: resolvedParams?.searchTerm || "",
    category: resolvedParams?.category || "",
    minPrice: resolvedParams?.minPrice || "",
    maxPrice: resolvedParams?.maxPrice || "",
  });


  useEffect(() => {
    const resolveParams = async () => {
      const search = await searchParams;
      const minPrice = (search.minPrice as string) || "";
      const maxPrice = (search.maxPrice as string) || "";
      const searchTerm = (search.searchTerm as string) || "";
      const category = (search.category as string) || "";

      const newParams = { searchTerm, category, minPrice, maxPrice };
      if (
        newParams.searchTerm !== resolvedParams.searchTerm ||
        newParams.category !== resolvedParams.category ||
        newParams.minPrice !== resolvedParams.minPrice ||
        newParams.maxPrice !== resolvedParams.maxPrice
      ) {
        setResolvedParams(newParams);
        setProducts([]);
        setPage(1);
        setHasMore(true);
      }
    };
    resolveParams();
  }, [searchParams, resolvedParams]);

  // Append new products when data changes
  useEffect(() => {
    if (data && data.data) {
      setProducts((prevProducts) =>
        page === 1 ? data.data : [...prevProducts, ...data.data]
      );
      const totalPages = Math.ceil(data.meta.total / 12);
      if (page >= totalPages) {
        setHasMore(false);
      }
    }
  }, [data, page]);

  // Handle infinite scrolling
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!isLoading && !isFetching && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [isLoading, isFetching, hasMore]);

  // Attach and clean up scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (products.length === 0) {
    return <div className="text-center py-10">
    <p className="text-gray-600 text-lg font-semibold">
      No Products Found
    </p>
  </div> ;
  }

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="gridView gap-[15px]">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      ) : null}
    </div>
  );
};
