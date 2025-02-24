"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useCreateReviewReplyMutation } from "@/redux/features/review/reviewApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";

interface IProps {
  review: any;
}

export const ReviewCard: React.FC<IProps> = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [createReply] = useCreateReviewReplyMutation();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const replyData = form.replyData.value; 
    
    try {
   
      const result = await createReply({ 
        reviewId: review.id, 
        content: replyData, 
      
      });
     
      setReply(""); 
      setIsModalOpen(false); 
      toast.success("Reply submitted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit reply");
    }
  };
  
  

  return (
    <div className="border h-full rounded-lg p-6 bg-gradient-to-r from-white via-gray-50 to-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 mx-auto">
      {/* Header Section with User Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-14 h-14 border-2 border-gray-300">
            <AvatarImage src={review.userinfo?.image} alt="User avatar" />
            <AvatarFallback>{review.userinfo?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-xl text-gray-900">
              {review.userinfo?.name}
            </h3>
            <p className="text-xs text-gray-500">
              {format(new Date(review.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="md:flex items-center space-x-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < (review.rating || 0)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-rose-500 transition-all"
            onClick={handleOpenModal} // Open modal when clicked
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Review Content Section */}
      <div className="space-y-4">
        <p className="text-sm text-gray-700">{review.content}</p>

        <div className="flex gap-1">
          {review?.image?.map((img: string, index: number) => (
            <Image
              key={index}
              src={img}
              alt={`Review image ${index + 1}`}
              width={50}
              height={50}
              className="rounded-md shadow-lg transition-transform transform hover:scale-110 mb-2"
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Product Info Section (Centered) */}
      <div className="mt-6 flex flex-col items-center text-center">
        <div className="flex justify-center items-center space-x-4 mb-3">
          {review?.product?.image[0] && (
            <Image
              src={review?.product?.image[0] || ""}
              alt={review.product?.name || "Product image"}
              width={120}
              height={120}
              className="rounded-md shadow-md transition-transform transform hover:scale-110 sm:w-[100px] sm:h-[100px]"
            />
          )}
        </div>
        <Link href={`/product/${review.product?.id}`}>
          <p className="text-rose-500 hover:underline">
            {review.product?.name}
          </p>
        </Link>
      </div>

      {/* Modal for Reply */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-lg font-semibold mb-4">Reply to Review</h3>
      <form onSubmit={handleSubmitReply}>
        <textarea
          name="replyData" // Match the name with the correct input field
          placeholder="Write your reply..."
          rows={4}
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            className="bg-rose-600 hover:bg-rose-700 text-white"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};
