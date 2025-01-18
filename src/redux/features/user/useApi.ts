import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (!value) {
            return;
          }
          if (index === 0) {
            queryString += `${key}=${value}`;
          } else {
            queryString += `&${key}=${value}`;
          }
        });

        return {
          url: `/user?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    userStatusChange: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/user/status/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAllShop: builder.query({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (!value) {
            return;
          }
          if (index === 0) {
            queryString += `${key}=${value}`;
          } else {
            queryString += `&${key}=${value}`;
          }
        });

        return {
          url: `/user/shop?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    createShopBlacklist: builder.mutation({
      query: (shopId) => ({
        url: `/user/blacklist/${shopId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    getTransactionsHistory: builder.query({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (!value) {
            return;
          }
          if (index === 0) {
            queryString += `${key}=${value}`;
          } else {
            queryString += `&${key}=${value}`;
          }
        });

        return {
          url: `/user/transactions-history?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getOverview: builder.query({
      query: () => ({
        url: "/user/overview",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getTransactionsOverview: builder.query({
      query: () => ({
        url: "/user/transaction-overview",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getReviewOverview: builder.query({
      query: () => ({
        url: "/user/review-overview",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetAllUserQuery,
  useUserStatusChangeMutation,
  useGetAllShopQuery,
  useCreateShopBlacklistMutation,
  useGetTransactionsHistoryQuery,
  useGetOverviewQuery,
  useGetTransactionsOverviewQuery,
  useGetReviewOverviewQuery,
} = userApi;
