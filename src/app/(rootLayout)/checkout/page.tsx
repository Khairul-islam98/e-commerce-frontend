"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useGetCouponQuery } from "@/redux/features/coupon/couponApi";
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentApi";
import { clearCheckout } from "@/redux/features/checkout/chekoutSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import Protectedroute from "@/components/protected-route";

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.checkout);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [createPayment] = useCreatePaymentMutation();

  const { data } = useGetCouponQuery(items[0]?.productId);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()

  const subTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalDiscountPrice = items.reduce((acc, item) => {
    const discount = item.discount;
    const price = item.price;
    const quantity = item.quantity;

    if (discount) {
      const discountPrice = (price * discount) / 100;
      return acc + discountPrice * quantity;
    }

    return acc + 0;
  }, 0);

  const discountedTotal = subTotal - totalDiscountPrice;
  const finalTotal = discountedTotal - (discountedTotal * couponDiscount) / 100;

  const handleApplyCoupon = () => {
    const coupons = data?.data;

    const validCoupon = coupons.find(
      (coupon: any) => coupon.code === couponCode
    );

    if (validCoupon) {
      setCouponDiscount(validCoupon.discountValue);
      setCouponError("");
    } else {
      setCouponError("Invalid or expired coupon code.");
      setCouponDiscount(0);
    }
  };

  const handleOrderConfirmation = async () => {
    try {
      setIsLoading(true);

      for (const item of items) {
        const orderPayload = {
          productId: item.productId,
          quantity: item.quantity,
          size: item.sizeName,
          color: item.colorName,
          couponCode: couponCode || undefined,
        };

    
        const response = await createOrder(orderPayload).unwrap();

        const orderId = response?.data?.id;



        for (const item of items) {
          const paymentPayload = {
            orderId: orderId,
            amount: finalTotal,
            shopId: item.shopId,
            email: user?.email,
          };
          const res = await createPayment(paymentPayload).unwrap();

          window.location.href = res.paymentUrl;
          dispatch(clearCheckout())
          dispatch(clearCart())
          
        }
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Protectedroute role={"*"}>
    <div className="min-h-screen mx-auto p-4 w-full">
      <div className="w-[90vw] max-w-5xl mx-auto">
        <div onClick={() => router.back()} className="cursor-pointer mb-6">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <ChevronLeft className="w-6" />
            Go Back
          </h3>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left side - Product Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="flex items-start gap-4 flex-wrap">
                {items.map((item, key) => (
                  <div
                    key={key}
                    className="flex items-start justify-start gap-4"
                  >
                    <div className="w-[100px] h-[100px] overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt="Product Image"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Color: {item.colorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.sizeName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}X
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Price: ${item.price}
                      </p>
                      {item.discount ? (
                        <p className="text-sm font-semibold text-muted-foreground">
                          Discount: {item.discount} %
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right side - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subTotal.toFixed(2)} $</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>-{totalDiscountPrice.toFixed(2)} $</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coupon Discount</span>
                    <span>
                      -{((discountedTotal * couponDiscount) / 100).toFixed(2)} $
                    </span>
                  </div>
                  <Separator />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter Coupon Code"
                      className="border p-2 rounded"
                    />
                    <button
                      className="bg-rose-500 text-white text-sm font-bold rounded-md"
                      onClick={handleApplyCoupon}
                    >
                      Apply Coupon
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-600 text-sm">{couponError}</p>
                  )}
                  {couponDiscount > 0 && (
                    <p className="text-green-600 text-sm">
                      Coupon applied! You saved {couponDiscount}%.
                    </p>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-rose-600"
              onClick={() => setIsModalOpen(true)}
              disabled={isLoading}
            >
              Confirm and Proceed to Payment
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Please confirm your details and proceed with the payment of $
              {finalTotal.toFixed(2)}.
            </p>
            <Button
              onClick={handleOrderConfirmation}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </Protectedroute>
  );
}
