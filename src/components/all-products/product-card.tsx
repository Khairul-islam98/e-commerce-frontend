"use client";
import React, { useState } from "react";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ProductToolTip } from "./product-tooltip";
import { discountPrice } from "@/utils/discount";
import { Badge } from "@/components/ui/badge"; // ShadCN Badge component
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { CartConfict } from "../cart/cart-confict";


export const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const [isConflict, setIsConflict] = useState(false);
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const handleAddToCart = (replace?: boolean) => {
    const isSameShop = items.find((item) => item.shopId === product.shopId);
    if (!isSameShop && !replace && items.length > 0) {
      setIsConflict(true);
      toast.error("Cart conflict: Items from different shops cannot be added.");
      return;
    }

    const colorId = product.colors[0]?.id || "";
    const sizeId = product.sizes[0]?.id || "";

    if (!colorId || !sizeId) {
      toast.error("These are test data, you can't add this product to the cart.");
      return;
    }

    const payload = {
      colorId,
      sizeId,
      quantity: 1,
      productId: product.id,
      shopId: product.shopId,
      sizeName: product.sizes[0].name,
      colorName: product.colors[0].name,
      image: product.image[0],
      price: product.price,
      name: product.name,
      shopName: product.shopInfo.name,
      discount: product.discount || 0,
    };

 

    dispatch(
      addToCart({
        payload,
        replace: Boolean(replace),
      })
    );

    setIsConflict(false);
    toast.success("Product added to cart!");
  };

 

  const { name, price, image, stock, categoryInfo, discount } = product;

  return (
    <>
    <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative w-full aspect-w-4 aspect-h-3 overflow-hidden rounded-t-lg">
        <Image
          src={image[0] || "https://via.placeholder.com/150"}
          alt={name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          width={300}
          height={300}
        />
        {image[1] && (
          <Image
            src={image[1]}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            width={300}
            height={300}
          />
        )}
        {discount > 0 && (
         <Link
         href={`/flash-sale`}
         >
          <Badge
            variant="outline"
            className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            {discount}% OFF
          </Badge>
         </Link>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <Badge
          variant="outline"
          className="text-xs truncate bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded px-2 py-1"
        >
          {categoryInfo?.name || "Uncategorized"}
        </Badge>

        {/* Product Name */}
        <Link
          href={`/product/${product.id}`}
          className="block truncate text-base font-semibold text-gray-800 dark:text-gray-200 hover:text-main transition"
        >
          {name}
        </Link>

        {/* Price & Discount */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-main">
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
        </div>

        {/* Stock Information */}
        <span
          className={`text-sm ${
            stock > 0
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {/* Tooltip for Extra Details */}
        <ProductToolTip product={product} onAddToCart={() => handleAddToCart()} />
      </div>
    </div>
     <CartConfict
       isOpen={isConflict}
       setIsOpen={setIsConflict}
       onReplace={() => handleAddToCart(true)}
       newVendor={product.shopInfo?.name}
       currentVendor={items[0]?.shopName || ""}
      />
    </>
  );
};
