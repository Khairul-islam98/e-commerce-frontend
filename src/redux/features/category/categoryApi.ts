import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, name], index) => {
          if (index === 0) {
            queryString += `${key}=${name}`;
          } else {
            queryString += `&${key}=${name}`;
          }
        });
        return {
          url: `/category?name${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, payload }) => ({
        url: `/category/${categoryId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: "/category",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
