import { useState } from "react";
import Image from "next/image";
import { useGetProductReviewsQuery } from "@/redux/features/review/reviewApi";
import { useAppSelector } from "@/redux/hooks";

export const ProductReview = ({
  productId,
  product,
}: {
  productId: string;
  product: any;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetProductReviewsQuery(productId);

  const reviews = data;
  const [replies, setReplies] = useState<{ [key: string]: string }>({});
  const [showInput, setShowInput] = useState<{ [key: string]: boolean }>({});

  // Check if the logged-in user is the shop owner
  const isShopOwner = user?.id === product?.shopInfo?.owner;

  const handleReplyChange = (id: string, value: string) => {
    setReplies({ ...replies, [id]: value });
  };

  const handleReplySubmit = (id: string) => {
    console.log(`Reply to review ${id}: ${replies[id]}`);
    setShowInput({ ...showInput, [id]: false });
  };

  // Function to render stars
  const renderStars = (rating: number) => {
    const maxRating = 5;
    return Array.from({ length: maxRating }).map((_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };
  if (reviews?.data?.length === 0) {
    return (
      <div className="text-center py-10">
        <Image
          src="/image/no-review.jpeg"
          alt="No reviews"
          width={150}
          height={150}
          className="mx-auto"
        />
        <p className="text-lg text-gray-500 mt-4">
          There are no reviews for this product yet.
        </p>
        <p className="text-sm text-gray-400">
          Be the first to leave a review and help others!
        </p>
      </div>
    );
  }




  return (
    <>
      {reviews?.data?.map((review: any) => (
        <div className="flex flex-col gap-4 mb-4 p-4 border rounded" key={review.id}>
          {/* USER INFO */}
          <div className="flex items-center gap-4 font-medium">
            <Image
              src={review?.userinfo?.profilePhoto || "/image/avatar.png"}
              alt="User profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>{review?.userinfo?.name}</span>
          </div>

          {/* RATING STARS */}
          <div className="flex">{renderStars(review.rating)}</div>

          {/* REVIEW CONTENT */}
          {review.heading && <p className="font-semibold">{review.heading}</p>}
          {review.content && <p>{review.content}</p>}

          {/* REVIEW MEDIA */}
          <div className="flex gap-2">
            {review?.image?.map((media: string, idx: number) => (
              <Image
                src={media}
                key={idx}
                alt="Review media"
                width={100}
                height={100}
                className="object-cover rounded"
              />
            ))}
          </div>

          {/* REPLY SECTION */}
          {isShopOwner && (
            <div>
              {/* Reply Button */}
              <button
                className="mt-4 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
                onClick={() =>
                  setShowInput({
                    ...showInput,
                    [review.id]: !showInput[review.id],
                  })
                }
              >
                Reply
              </button>

              {/* Reply Input */}
              {showInput[review.id] && (
                <div className="mt-2 flex flex-col">
                  <textarea
                    value={replies[review.id] || ""}
                    onChange={(e) => handleReplyChange(review.id, e.target.value)}
                    rows={3}
                    className="p-2 border rounded"
                    placeholder="Write your reply..."
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
                    onClick={() => handleReplySubmit(review.id)}
                  >
                    Submit Reply
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
