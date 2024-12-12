import { IBrand, ICategory, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        categories: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `/category`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: ICategory[], meta: IMeta) => {
                return {
                    categoris: response,
                    meta
                }
            },
            providesTags: [tagTypes.category]
        }),
        createCategory: build.mutation({
            query: (data) => ({
                url: `/category/create-category`,
                method: 'POST',
                data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.category],
        }),
    })
})
export const {
  useCategoriesQuery,
  useCreateCategoryMutation
     } = categoryApi