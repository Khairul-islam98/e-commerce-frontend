import { baseApi } from "@/redux/api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: (productId) => ({
        url: `/coupon/${productId}`,
      }),
      providesTags: ["coupon"],
    }),
  }),
});

export const { useGetCouponQuery } = couponApi;
