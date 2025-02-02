"use client";

import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import Loader from "../loader";

export const CategoryList = () => {
  const { data, isLoading } = useGetAllProductsQuery({ page: 1 });
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const uniqueCategories = [
        ...new Set(data.data.map((product) => product.categoryInfo.name)),
      ];
      setCategories(uniqueCategories);
    }
  }, [data]);

  const handleCategoryClick = (category: string) => {
    router.push(`/product?category=${category}`);
  };

  return (
    <>
      <h2 className="font-bold text-4xl text-center my-10">
       Choose
        <span className=" line-clamp-1 text-rose-600 italic">
          {" "}
          Categories
        </span>
      <Separator className="my-[25px]" />
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading ? (
         <Loader />
        ) : (
          categories.map((category) => (
            <div
              key={category}
              className="border p-4 rounded-md cursor-pointer hover:bg-rose-100/10 transition "
              onClick={() => handleCategoryClick(category)}
            >
              <h3 className="text-center text-lg font-semibold">{category}</h3>
            </div>
          ))
        )}
      </div>
    </>
  );
};
