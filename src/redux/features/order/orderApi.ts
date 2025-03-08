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
    getVendorOrder: builder.query({
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
          url: `/order/vendor-order?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrderQuery,
  useGetVendorOrderQuery,
} = orderApi;
