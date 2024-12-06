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
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
