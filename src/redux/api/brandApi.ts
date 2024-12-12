import { IBrand, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const brandApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        brands: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `/brand`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: IBrand[], meta: IMeta) => {
                return {
                    categoris: response,
                    meta
                }
            },
            providesTags: [tagTypes.brand]
        }),
        createBrand: build.mutation({
            query: (data) => ({
                url: `/brand/create-brand`,
                method: 'POST',
                data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.brand],
        }),
    })
})
export const {
     useCreateBrandMutation,
     useBrandsQuery
     } = brandApi