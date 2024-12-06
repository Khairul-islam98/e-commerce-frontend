"use client";

import { useGetPrductByIdQuery } from "@/redux/features/product/productApi";
import ProductImages from "./product-image";
import { discountPrice } from "@/utils/discount";
import { Badge } from "../ui/badge";
import { CustomizeProducts } from "./customize-product";
import { Store } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { CategoryRelatedProduct } from "./category-related-product";
import { ProductReview } from "./product.review";

interface ProductDetailsProps {
  productId: string;
}

export const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const { data, isLoading } = useGetPrductByIdQuery(productId);

  const images = data?.data?.image || [];

  const { name, description, price, discount } = data?.data || {};

  const categoryinfo = data?.data?.categoryInfo?.name;

  if (isLoading) return <p>Loading...</p>;

  console.log(data?.data?.shopInfo?.name);
  const shoplogo = data?.data?.shopInfo?.logo;

  return (
    <>
      <div className="px-4 py-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={images} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <Link
            href={`/shop/${data?.data?.shopId}`}
            className="w-full mt-6 flex"
          >
            <Card className="p-4 w-full">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={shoplogo} alt="Shop Logo" />
                  <AvatarFallback>{data?.data?.shopInfo?.name}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Store className="w-4 h-4" />
                    <span>SHOP</span>
                  </div>
                  <h6 className="font-semibold hover:text-primary ml-2">
                    {data?.data?.shopInfo?.name}
                  </h6>
                </div>
              </div>
            </Card>
          </Link>
          <h1 className="text-4xl font-medium">{name}</h1>
          <p className="text-gray-500">{description}</p>
          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-main md:ml-5">
              ${discountPrice(price, discount)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${price}
                </span>
                <span className="text-xs font-medium text-green-500 dark:text-green-400">
                  {discount}% off
                </span>
              </>
            )}
            {/* <Badge className="bg-main">{categoryinfo}</Badge> */}
          </div>
          <div className="h-[2px] bg-gray-100" />
          <CustomizeProducts product={data?.data} />
        </div>
      </div>
      <ProductReview productId={data?.data?.id} />
      <CategoryRelatedProduct categoryId={data?.data?.categoryId} />
    </>
  );
};
