import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: (productId) => ({
        url: `/review/${productId}`,
      }),
      providesTags: ["review"],
    }),
  }),
});

export const { useGetProductReviewsQuery } = reviewApi;
