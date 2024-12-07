import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    getUserOrder: builder.query({
      query: () => ({
        url: "/order/my-order",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetUserOrderQuery } = orderApi;
