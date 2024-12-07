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
    getPrioritizeShop: builder.query({
      query: () => ({
        url: "/shop",
        method: "GET",
      }),
      providesTags: ["shop"],
    }),
    getMyShop: builder.query({
      query: () => ({
        url: "/shop/my-shop",
        method: "GET",
      }),
      providesTags: ["shop"],
    }),
    updateShop: builder.mutation({
      query: (payload) => ({
        url: "/shop/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["shop"],
    }),
  }),
});

export const {
  useGetShopByIdQuery,
  useFollowingsShopMutation,
  useGetPrioritizeShopQuery,
  useGetMyShopQuery,
  useUpdateShopMutation,
} = shopApi;
