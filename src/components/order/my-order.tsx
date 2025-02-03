/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { useState } from "react";

import { ImagePlus, Star } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";

interface IProps {
  orders: any[];
}

export const MyOrderList: React.FC<IProps> = ({ orders }) => {
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { user } = useAppSelector((state) => state.auth);

  const handleOpenDialog = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
    setReviewContent("");
    setReviewRating(0);
    setImages([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages([...images, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmitReview = async () => {
    try {
      const formData = new FormData();
      const reviewData = {
        content: reviewContent,
        rating: reviewRating,
        productId: selectedOrder.product.id,
        orderId: selectedOrder.id,
        userId: user?.id,
      };

      formData.append("data", JSON.stringify(reviewData));

      images.forEach((image) => {
        formData.append("image", image);
      });

      const response = await createReview(formData).unwrap();

      if (response.success) {
        toast.success("Review submitted successfully!");
        handleCloseDialog();
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting your review.");
    }
  };

  return (
    <div className="w-full space-y-4">
      {orders?.map((order) => (
        <Card key={order.id} className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={order.product.shopInfo.logo || ""}
                    alt="Shop Logo"
                  />
                  <AvatarFallback>
                    {order.product.shopInfo?.name.charAt(0).toUpperCase() ||
                      "S"}
                  </AvatarFallback>
                </Avatar>
                {order.product.shopInfo?.name || "Unknown Shop"}
              </h3>
              <Badge variant="secondary">{order.status}</Badge>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-20 h-20 relative">
                <Image
                  src={order?.product?.image[0] || "/placeholder-image.png"}
                  alt={order.product?.name || "Product"}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">
                  {order.product?.name || "Product Name"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Color: {order.color || "N/A"}, Size: {order.size || "N/A"}
                </p>
                <div className="flex items-center gap-8 mt-2">
                  <span className="font-medium">
                    $ {order.totalAmount?.toFixed(2) || "0.00"}
                  </span>
                  <span className="text-muted-foreground">
                    Qty: {order.quantity || 0}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  className="bg-rose-600 text-white"
                  onClick={() => handleOpenDialog(order)}
                >
                  Write Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <h3>Write a Review</h3>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <h4 className="font-medium">{selectedOrder.product?.name}</h4>
              <Textarea
                placeholder="Write your review here..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
              <div className="flex gap-2">
                <p className="font-semibold">Rating:</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= reviewRating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => setReviewRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="relative mx-auto w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center transition hover:border-rose-600 hover:bg-blue-50">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <ImagePlus className="text-gray-400" size={20} />
                </div>
                {images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 left-1 bg-red-600 text-white text-xs p-1 rounded-full hover:bg-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
    
              onClick={handleSubmitReview}
              disabled={isCreating}
              className={`
                px-8 py-3 rounded-full text-white font-semibold 
                transition duration-300 ease-in-out
                ${
                  isCreating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-rose-600 hover:bg--700"
                }
              `}
            >
              {isCreating ? "Creating..." : "    Submit Review"}
            
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
