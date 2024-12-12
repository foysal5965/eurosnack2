import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        carts: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `/cart`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: any, meta: IMeta) => {
                return {
                    cats: response,
                    meta
                }
            },
            providesTags: [tagTypes.cart]
        }),
        cartItems: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `/cart/cart-items`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: any, meta: IMeta) => {
                return {
                    cartItem: response,
                    meta
                }
            },
            providesTags: [tagTypes.cart]
        }),
        addToCart:build.mutation({
            query: (data) => ({
                url: `/cart/add-to-cart`,
                method: 'POST',
                data: data,
             }),
             invalidatesTags: [tagTypes.cart],
        }),
        removeFromCart:build.mutation({
            query:(data)=>({
                url: `/cart/remove-from-cart`,
                method:'DELETE',
                data:data
            }),
            invalidatesTags: [tagTypes.cart],
        })
    })
})

export const {
    useCartsQuery,
useCartItemsQuery,
useAddToCartMutation,
useRemoveFromCartMutation
} = cartApi