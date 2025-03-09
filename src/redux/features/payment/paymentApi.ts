import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/initiate-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
