"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { discountPrice } from "@/utils/discount";
import { toast } from "sonner";
import { CartConfict } from "../cart/cart-confict";
import { ProductReview } from "./product.review";

interface CustomizeProductsProps {
  product: any;
}

export const CustomizeProducts = ({ product }: CustomizeProductsProps) => {
  const dispatch = useAppDispatch();

  
  const initialColor = product?.colors?.[0]?.name || "";
  const initialSize = product?.sizes?.[0]?.value || "";

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);
  const { items } = useAppSelector((state) => state.cart);
  const [isConflict, setIsConflict] = useState(false);

  const handleAddToCart = (replace?: boolean) => {
    const isSameShop = items.find((item) => item?.shopId === product?.shopId);
    if (!isSameShop && !replace && items.length > 0) {
      setIsConflict(true);
      toast.error("Cart conflict: Items from different shops cannot be added.");
      return;
    }
    if (!selectedColor || !selectedSize || quantity < 1) {
      toast.error("Please select all options and valid quantity.");
      return;
    }

    const payload = {
      productId: product.id,
      shopId: product.shopId,
      name: product.name,
      discount: product.discount || 0,
      price: product.price,
      colorId: product.colors.find((color: any) => color.name === selectedColor)?.id,
      sizeId: product.sizes.find((size: any) => size.value === selectedSize)?.id,
      colorName: selectedColor,
      sizeName: selectedSize,
      quantity,
      image: product.image?.[0] || "",
      shopName: product.shopInfo?.name,
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

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Choose Color */}
        {product?.colors && product.colors.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Choose a Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color: any) => (
                <Badge
                  key={color.id}
                  className={`cursor-pointer text-black dark:text-black  ${
                    selectedColor === color.name
                      ? "bg-rose-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedColor(color.name)}
                >
                  {color.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Choose Size */}
        {product?.sizes && product.sizes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Choose a Size</h3>
            <div className="flex gap-2">
              {product.sizes.map((size: any) => (
                <Badge
                  key={size.id}
                  className={`cursor-pointer text-black dark:text-black ${
                    selectedSize === size.value
                      ? "bg-rose-600  "
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size.value)}
                >
                  {size.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Choose Quantity */}

        <h3 className="text-lg font-semibold mb-2">Choose a Quantity</h3>
        <div className="flex">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 bg-gray-200 rounded-md">
              <button
                className="w-8 h-8 flex items-center justify-center bg-gray-200 text-black rounded"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="text-lg font-medium text-black text-center">
                {quantity}
              </span>
              <button
                className="w-8 h-8 flex items-center justify-center bg-gray-200 text-black rounded"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <Button
              onClick={() => handleAddToCart()}
              className="bg-rose-600 text-white hover:bg-main-dark rounded-full"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
      
      <CartConfict
        isOpen={isConflict}
        setIsOpen={setIsConflict}
        onReplace={() => handleAddToCart(true)}
        newVendor={product?.shopInfo?.name}
        currentVendor={items[0]?.shopName || ""}
      />

    </>
  
  );
};
