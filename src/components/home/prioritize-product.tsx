"use client";

import { useGetPrioritizeShopQuery } from "@/redux/features/shop/shopApi";
import { ProductCard } from "../all-products/product-card";
import { IProduct } from "@/types";
import { useAppSelector } from "@/redux/hooks";

export const PrioritizeProduct = () => {
    const { data, isLoading, error } = useGetPrioritizeShopQuery({});
    const { user } = useAppSelector((state) => state.auth);

    if (!user) {
        return (
            <div className="text-center text-lg font-medium text-gray-700 my-5">
                Please log in to view prioritized products from your followed shops.
            </div>
        );
    }

    if (user.role !== "CUSTOMER") {
        return (
            <div className="text-center text-lg font-medium text-gray-700 my-5">
                Only customers can view prioritized products from their followed shops.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-center text-lg font-medium text-blue-500 animate-pulse my-5">
                Loading prioritized products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-lg font-semibold text-red-500 my-5">
                Error loading prioritized products. Please try again later.
            </div>
        );
    }

    if (!data?.data?.data?.length) {
        return (
            <div className="text-center text-base font-normal text-gray-500 my-4">
                No prioritized products found from your followed shops.
            </div>
        );
    }

    return (
        <div>
            <h2 className="font-bold text-2xl text-center">
                Prioritized Products from{" "}
                <span className="line-clamp-1 text-rose-600 italic">
                    Your Followed Shops
                </span>
            </h2>
            <div className="gridView gap-[15px] my-10">
                {data?.data?.data?.map((product: IProduct) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};
