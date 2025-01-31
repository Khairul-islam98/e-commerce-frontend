"use client";

import { discountPrice } from "@/utils/discount";
import { Button } from "../ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { removeFromCart, updateCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { IProduct } from "@/types";
import envConfig from "@/config/env-config";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { addToCheckout } from "@/redux/features/checkout/chekoutSlice";
import Loader from "../loader";

export const CartItem = () => {
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const totalDiscountPrice = items.reduce((acc, item) => {
    if (item.discount && !item.isOutOfStock) {
      const discountAmount = (item.price * item.discount) / 100;
      return acc + discountAmount * item.quantity;
    }
    return acc;
  }, 0);

  const changeCartQuantity = async ({
    cartId,
    value,
  }: {
    cartId: string;
    value: number;
  }) => {
    const cartItem = items.find((item) => item.cartId === cartId);
    if (!cartItem) return;

    const newQuantity = cartItem.quantity + value;

    if (newQuantity <= 0) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${envConfig.baseApi}/product/${cartItem.productId}`);
      if (!res.ok) {
        toast.error("Something went wrong.");
        setIsLoading(false);
        return;
      }

      const product = (await res.json()) as { data: IProduct };
      const availableStock = product.data.stock;

      if (newQuantity > availableStock) {
        toast.error(`Only ${availableStock} items available in stock.`);
        setIsLoading(false);
        return;
      }

      dispatch(updateCart({ cartId, payload: { quantity: newQuantity } }));
      toast.success("Cart updated successfully.");
    } catch (error) {
      toast.error("Error updating cart.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToCheckout = () => {
    const checkoutItems = items
      .filter((item) => !item.isOutOfStock)
      .map((item) => ({
        ...item,
      }));

    dispatch(addToCheckout(checkoutItems));
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white dark:bg-gray-800 border rounded-lg shadow p-4">
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 pb-4 border-b text-sm font-medium dark:text-gray-300">
            <div>PRODUCT</div>
            <div className="text-right">PRICE</div>
            <div className="text-center">QUANTITY</div>
            <div className="text-right">DISCOUNT</div>
            <div className="text-right">TOTAL</div>
          </div>

          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.cartId}
                className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 py-4 border-b items-center dark:border-gray-700"
              >
                {/* Product Details */}
                <div className="flex gap-4">
                  <button
                    onClick={() => dispatch(removeFromCart(item.cartId))}
                    className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <X className="h-4 w-4 dark:text-gray-300" />
                  </button>
                  <Image
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-medium dark:text-gray-200">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Color: {item.colorName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Size: {item.sizeName}
                    </p>
                  </div>
                </div>

                {/* Price, Quantity, Discount, Total */}
                <div className="text-right dark:text-gray-200">${item.price.toFixed(2)}</div>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() =>
                      changeCartQuantity({
                        cartId: item.cartId,
                        value: -1,
                      })
                    }
                    className="h-6 w-6 flex items-center justify-center rounded border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="w-8 text-center dark:text-gray-200">{item.quantity}</span>
                  <button
                    onClick={() =>
                      changeCartQuantity({
                        cartId: item.cartId,
                        value: 1,
                      })
                    }
                    className="h-6 w-6 flex items-center justify-center rounded border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                <div className="text-right dark:text-gray-200">{item.discount}%</div>
                <div className="text-right dark:text-gray-200">
                  ${(discountPrice(item.price, item.discount) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-8 dark:text-gray-400">Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-80">
          <div className="bg-white dark:bg-gray-800 border rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold dark:text-gray-200">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="dark:text-gray-300">Subtotal</span>
                <span className="dark:text-gray-200">${(total + totalDiscountPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount</span>
                <span>-${totalDiscountPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t dark:border-gray-700">
                <span className="dark:text-gray-300">Grand Total</span>
                <span className="dark:text-gray-200">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              onClick={handleProceedToCheckout}
              className="w-full bg-rose-600 text-white hover:bg-rose-700"
              size="lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <Loader />
      )}
    </div>
  );
};
