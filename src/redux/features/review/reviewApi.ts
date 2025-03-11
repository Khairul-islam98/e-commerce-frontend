import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: (productId) => ({
        url: `/review/${productId}`,
      }),
      providesTags: ["review"],
    }),
    getMyShopReviews: builder.query({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (value) {
            if (index === 0) {
              queryString += `${key}=${value}`;
            } else {
              queryString += `&${key}=${value}`;
            }
          }
        });
        return {
          url: `/review?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    createReviewReply: builder.mutation({
      query: (data) => ({
        url: `/review/createReplay`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/review/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useGetMyShopReviewsQuery,
  useCreateReviewReplyMutation,
  useCreateReviewMutation,
} = reviewApi;
