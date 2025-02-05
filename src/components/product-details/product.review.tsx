/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useGetProductReviewsQuery } from "@/redux/features/review/reviewApi";
import { LucideStar } from "lucide-react";
import { FaStar, FaStarHalf, FaUser, FaReply } from "react-icons/fa";

export const ProductReview = ({
  productId,
  product,
}: {
  productId: string;
  product: any;
}) => {
  const { data, isLoading, isError } = useGetProductReviewsQuery(productId);

  if (isLoading) return <div className="text-center py-10">Loading reviews...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load reviews.</div>;

  const reviews = data?.data;

  // Function to render stars
  const renderStars = (rating: number) => {
    const maxRating = 5;
    return Array.from({ length: maxRating }).map((_, index) => (
      <FaStar
        key={index}
        className={`text-lg ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  if (!reviews?.length) {
    return (
      <div className="text-center py-10">
        <Image
          src="/image/no-review.jpeg"
          alt="No reviews"
          width={150}
          height={150}
          className="mx-auto"
        />
        <p className="text-lg text-gray-500 mt-4">There are no reviews for this product yet.</p>
        <p className="text-sm text-gray-400">Be the first to leave a review and help others!</p>
      </div>
    );
  }

  return (
    <>
      {reviews?.map((review: any) => (
         <div
         key={review.id}
         className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
          {/* USER INFO */}
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={review?.userinfo?.profilePhoto || "/image/avatar.png"}
              alt="User profile"
              width={50}
              height={50}
                     className="w-12 h-12 rounded-full object-cover"
            />
            <div>
                <h3 className="font-semibold dark:text-black">{review.userinfo.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
          </div>


          {/* REVIEW CONTENT */}
          {review.heading && <p className="font-semibold text-lg mt-2">{review.heading}</p>}
          {review.content && <p className="mt-2 text-gray-700">{review.content}</p>}

          {/* REVIEW MEDIA */}
          {review?.image?.length > 0 && (
             <div className="flex flex-wrap gap-2 mb-4">
              {review?.image?.map((media: string, idx: number) => (
                <Image
                  src={media}
                  key={idx}
                  alt="Review media"
                  width={120}
                  height={120}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* REPLIES */}
          {review.ReviewReply && review.ReviewReply.length > 0 && (
              <div className="mt-4 pl-6 border-l-2 border-gray-200">
                {review.ReviewReply.map((reply: any) => (
                  <div key={reply.id} className="mt-4">
                    <div className="flex items-center gap-3">
                      <FaReply className="text-gray-400" />
                      <img
                        src={reply.shop.userId.profilePhoto || "/image/avatar.png"}
                        alt={reply.shop.userId.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm dark:text-black">{reply.shop.userId.name}</p>
                        <p className="text-gray-500 text-xs">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700 text-sm">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </>
  );
};







//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">Product Reviews</h2>
//       <div className="space-y-6">
//         {reviews.map((review) => (
//           <div
//             key={review.id}
//             className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4 mb-4">
//               <img
//                 src={review.user.avatar}
//                 alt={review.user.name}
//                 className="w-12 h-12 rounded-full object-cover"
//                 onError={(e) => {
//                   e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80";
//                 }}
//               />
//               <div>
//                 <h3 className="font-semibold">{review.user.name}</h3>
//                 <div className="flex items-center gap-2">
//                   <div className="flex">{renderStars(review.rating)}</div>
//                   <span className="text-gray-500 text-sm">
//                     {new Date(review.date).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {review.title && (
//               <h4 className="font-semibold mb-2">{review.title}</h4>
//             )}
//             <p className="text-gray-700 mb-4">{review.content}</p>

//             {review.images && review.images.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {review.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Review image ${index + 1}`}
//                     className="w-24 h-24 object-cover rounded-lg"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                     }}
//                   />
//                 ))}
//               </div>
//             )}

//             {review.replies && review.replies.length > 0 && (
//               <div className="mt-4 pl-6 border-l-2 border-gray-200">
//                 {review.replies.map((reply) => (
//                   <div key={reply.id} className="mt-4">
//                     <div className="flex items-center gap-3">
//                       <FaReply className="text-gray-400" />
//                       <img
//                         src={reply.shopuserId.profilePhoto}
//                         alt={reply.shop.userId.name}
//                         className="w-8 h-8 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-semibold text-sm">{reply.shop.userId.name}</p>
//                         <p className="text-gray-500 text-xs">
//                           {new Date(reply.date).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="mt-2 text-gray-700 text-sm">{reply.content}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductReview;