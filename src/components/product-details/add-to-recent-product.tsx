"use client";
import { useEffect } from "react";

export const AddToRecentProduct = ({ productId }: { productId: string }) => {
  useEffect(() => {
    const MAX_RECENT_PRODUCTS = 10; // Define a maximum size for the list
    const recentProducts: string[] = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );

    const updatedRecentProducts = recentProducts.filter(
      (id) => id !== productId
    );

    updatedRecentProducts.unshift(productId);

    if (updatedRecentProducts.length > MAX_RECENT_PRODUCTS) {
      updatedRecentProducts.pop();
    }

    localStorage.setItem(
      "recentProducts",
      JSON.stringify(updatedRecentProducts)
    );
  }, [productId]);

  return null;
};


