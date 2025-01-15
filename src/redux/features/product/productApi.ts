import { baseApi } from "@/redux/api/baseApi";
import { IProduct, IProductResponse } from "@/types";

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
    getFlashSaleProducts: builder.query<
      { data: IProduct[]; meta: { total: number } },
      { limit?: number; page?: number }
    >({
      query: ({ limit = 10, page = 1 }) => {
        return {
          url: `/flash-sale?limit=${limit}&page=${page}`,
          method: "GET",
        };
      },

      providesTags: ["product"],
    }),
    createDuplicateProduct: builder.mutation({
      query: (productId) => ({
        url: `/product/duplicate/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["product", "shop"],
    }),
    deleteProductById: builder.mutation({
      query: (productId) => ({
        url: `/product/delete/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product", "shop"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: `/product/create`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["product", "shop"],
    }),
    updateProduct: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["product", "shop"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetPrductByIdQuery,
  useGetCategoryRelatedProductsQuery,
  useGetFlashSaleProductsQuery,
  useCreateDuplicateProductMutation,
  useDeleteProductByIdMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;
