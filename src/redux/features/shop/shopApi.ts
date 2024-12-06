import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShopById: builder.query({
      query: (shopId) => ({
        url: `/shop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["shop"],
    }),
    followingsShop: builder.mutation({
      query: (shopId) => ({
        url: `/shop/follow/${shopId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["shop"],
    }),
  }),
});

export const { useGetShopByIdQuery, useFollowingsShopMutation } = shopApi;
