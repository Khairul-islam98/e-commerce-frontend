import { baseApi } from "@/redux/api/baseApi";
import { IProductResponse } from "@/types";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      IProductResponse,
      {
        page: number;
        searchTerm?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
      }
    >({
      query: ({ page, searchTerm, category, minPrice, maxPrice }) => {
        let query = `/product?page=${page}`;
        if (searchTerm) query += `&searchTerm=${searchTerm}`;
        if (category) query += `&category=${category}`;
        if (minPrice) query += `&minPrice=${minPrice}`;
        if (maxPrice) query += `&maxPrice=${maxPrice}`;
        return { url: query };
      },
      providesTags: ["product"],
    }),
    getPrductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
      providesTags: ["product"],
    }),
    getCategoryRelatedProducts: builder.query({
      query: (id) => ({
        url: `/product/category-related/${id}`,
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetPrductByIdQuery,
  useGetCategoryRelatedProductsQuery,
} = productApi;
