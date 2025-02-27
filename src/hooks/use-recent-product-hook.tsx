"use client";
import envConfig from "@/config/env-config";
import { IProduct } from "@/types";

import { useEffect, useState } from "react";

interface IUseRecentProductHook {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
}

export const useRecentProductHook = (): IUseRecentProductHook => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        
        const recentProductIds: string[] = JSON.parse(
          localStorage.getItem("recentProducts") || "[]"
        );

        if (recentProductIds.length === 0) {
          setProducts([]);
          setIsLoading(false);
          return;
        }


        const response = await fetch(`${envConfig.baseApi}/recent/productId`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: recentProductIds }),
        });
   

        if (!response.ok) {
          setError("Failed to fetch recent products");
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        const products = data?.data || [];
        setProducts(products);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        console.error("Error fetching recent products:", err);
        setError(err.message || "Failed to fetch recent products");
      }
    };

    fetchRecentProducts();
  }, []);

  return { products, isLoading, error };
};


