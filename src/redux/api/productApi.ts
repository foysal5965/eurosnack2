import { IBrand, ICategory, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { Product } from "@/app/(adminDashboardLayout)/dashboard/admin/product-manage/page";

export const ProductApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        products: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `/product`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: Product[], meta: IMeta) => {
                return {
                    products: response,
                    meta
                }
            },
            providesTags: [tagTypes.product]
        }),
        getSingleProduct: build.query({
            query: (id: string | string[] | undefined) => ({
               url: `/product/${id}`,
               method: 'GET',
            }),
            providesTags: [tagTypes.product],
         }),
        createProduct: build.mutation({
            query: (data) => ({
                url: `/product/create-product`,
                method: 'POST',
                data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.product],
        }),
    })
})
export const {
  useProductsQuery,
  useCreateProductMutation,
  useGetSingleProductQuery
     } = ProductApi