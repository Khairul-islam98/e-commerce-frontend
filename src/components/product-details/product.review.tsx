import { useState } from "react";
import Image from "next/image";

export const ProductReview = ({ productId }: { productId: string, }) => {
  // Dummy review data for testing
  const isShopOwner = true;
  const dummyReviews = [
    {
      id: "1",
      customer: {
        display_name: "John Doe",
        avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      rating: 4,
      heading: "Great product!",
      body: "This product is exactly what I needed. Highly recommend it.",
      media: [
        { id: "1", url: "https://via.placeholder.com/100x50" },
        { id: "2", url: "https://via.placeholder.com/100x50" },
      ],
    },
    {
      id: "2",
      customer: {
        display_name: "Jane Smith",
        avatar_url: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      rating: 5,
      heading: "Excellent!",
      body: "I love this product. It works perfectly and looks great!",
      media: [
        { id: "1", url: "https://via.placeholder.com/100x50" },
        { id: "2", url: "https://via.placeholder.com/100x50" },
      ],
    },
  ];

  const [replies, setReplies] = useState<{ [key: string]: string }>({});
  const [showInput, setShowInput] = useState<{ [key: string]: boolean }>({});

  const handleReplyChange = (id: string, value: string) => {
    setReplies({ ...replies, [id]: value });
  };

  const handleReplySubmit = (id: string) => {
    // Handle the reply submission here (e.g., API call)
    console.log(`Reply to review ${id}: ${replies[id]}`);
    setShowInput({ ...showInput, [id]: false }); // Hide input after submission
  };

  const reviews = dummyReviews;

  return reviews.map((review) => (
    <div className="flex flex-col gap-4 mb-2" key={review.id}>
      {/* USER */}
      <div className="flex items-center gap-4 font-medium">
        <Image
          src={review.customer.avatar_url}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{review.customer.display_name}</span>
      </div>
      {/* STARS */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            src={
              index < review.rating
                ? "/star-filled.png" // Full star (make sure to replace with actual filled star image)
                : "/star-empty.png" // Empty star
            }
            alt="star"
            key={index}
            width={16}
            height={16}
          />
        ))}
      </div>
      {/* DESC */}
      {review.heading && <p>{review.heading}</p>}
      {review.body && <p>{review.body}</p>}
      <div className="flex gap-2">
        {review.media.map((media) => (
          <Image
            src={media.url}
            key={media.id}
            alt="review media"
            width={100}
            height={50}
            className="object-cover"
          />
        ))}
      </div>

      {/* Reply button and input */}
      {isShopOwner && (
        <div>
          {/* Reply Button */}
          <button
            className="mt-4 px-4 py-2 bg-rose-600 text-white rounded"
            onClick={() => setShowInput({ ...showInput, [review.id]: !showInput[review.id] })}
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
                className="mt-2 px-4 py-2 bg-rose-600 text-white rounded"
                onClick={() => handleReplySubmit(review.id)}
              >
                Submit Reply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  ));
};
