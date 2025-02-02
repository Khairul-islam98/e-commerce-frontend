"use server";


import envConfig from "@/config/env-config";
import { Separator } from "../ui/separator";
import { IProduct } from "@/types";
import { ProductCard } from "../all-products/product-card";


export default async function LatestProducts() {
  const res = await fetch(`${envConfig.baseApi}/product?limit=12`, {
    next: {
      revalidate: 20 * 60, // 20 minutes
    },
  });

  const data = (await res.json()) as { data: IProduct[] };

  return (
    <div className="w-full mt-[50px]">
      <div
        className="bg-gradient-to-r from-rose-500 to-yellow-400 text-white py-10 px-5 rounded-lg shadow-lg flex flex-col items-center"
       
      >
        <h1 className="font-extrabold text-5xl md:text-6xl text-center tracking-tight">
         Latest Products
        </h1>
       
       
      </div>
      <Separator className="my-[25px]" />
      <div className="gridView gap-[15px]">
        {data?.data?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
