import { Suspense } from "react";
import { ProductSkeleton } from "../skeleton/product-skeleton";
import { ProductFilter } from "./filter/product-filter";
import { Products } from "./products";

export const AllProducts = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="flex items-center md:items-start justify-start flex-col md:flex-row gap-[23px] py-[50px]">
      <ProductFilter />
      <Suspense
        fallback={
          <div className="w-full flex flex-col gap-[15px]">
            <div className="gridView w-full gap-[10px] sm:gap-[20px] justify-center">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          </div>
        }
      >
        <Products searchParams={searchParams} />
      </Suspense>
    </div>
  );
};
