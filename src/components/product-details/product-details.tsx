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
import { AddToRecentProduct } from "./add-to-recent-product";
import Loader from "../loader";

interface ProductDetailsProps {
  productId: string;
}

export const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const { data, isLoading } = useGetPrductByIdQuery(productId);

  const images = data?.data?.image || [];
  const { name, description, price, discount } = data?.data || {};
  const categoryInfo = data?.data?.categoryInfo?.name;
  const shopLogo = data?.data?.shopInfo?.logo;

  if (isLoading) return <Loader />

  return (
    <div className="min-h-screen">
      {/* Main Layout */}
      <div className="container mx-auto px-4 py-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-12">
        {/* Left Section - Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="top-20">
            <ProductImages items={images} />
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          {/* Shop Info */}
          <Link href={`/shop/${data?.data?.shopId}`} className="flex">
            <Card className="p-4 w-full shadow-md">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={shopLogo} alt="Shop Logo" />
                  <AvatarFallback>{data?.data?.shopInfo?.name}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Store className="w-4 h-4" />
                    <span>SHOP</span>
                  </div>
                  <h6 className="font-semibold hover:text-primary">
                    {data?.data?.shopInfo?.name}
                  </h6>
                </div>
              </div>
            </Card>
          </Link>

          {/* Product Title & Description */}
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            {name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>

          <div className="h-[2px] bg-gray-100 dark:bg-gray-700" />

          {/* Price Section */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-main">
              ${discountPrice(price, discount)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-base text-gray-500 line-through">
                  ${price}
                </span>
                <span className="text-sm font-medium text-green-500">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          <div className="h-[2px] bg-gray-100 dark:bg-gray-700" />

          {/* Product Customization */}
          <CustomizeProducts product={data?.data} />

          {/* Category Badge */}
          {categoryInfo && (
            <Badge className="bg-blue-100 text-blue-600">{categoryInfo}</Badge>
          )}
        </div>
      </div>

      {/* Reviews and Related Products */}
      <>
        <ProductReview productId={data?.data?.id} product={data?.data} />
        <CategoryRelatedProduct categoryId={data?.data?.categoryId} productData={data?.data}  />
        <AddToRecentProduct productId={data?.data?.id} />
      </>
    </div>
  );
};
