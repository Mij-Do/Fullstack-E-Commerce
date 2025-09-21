import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import CookieServices from '../../services/CookieServices';
import type { IProduct } from '../../interfaces';

export const productsApiSlice = createApi ({
    reducerPath: "api",
    tagTypes: ["Products"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER}),
    endpoints: builder => ({
        getDashboardProducts: builder.query({
            query: (arg: number) => {
                return {
                    url: `/api/products?populate=thumbnail&populate=categories`,
                }
            },
            providesTags: (result) =>
            result
            ? [...result.data?.map(({documentId}: IProduct) => ({ type: 'Products' as const, documentId })), 'Products']
            : ['Products'],
        }),
        deleteDashboardProducts: builder.mutation({
            query: (documentId: string) => {
                return {
                    url: `/api/products/${documentId}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${CookieServices.get("jwt")}`
                    },
                };
            },
            invalidatesTags: (documentId) => [{ type: 'Products', documentId }],
        }),
    }),
});

export const {useGetDashboardProductsQuery, useDeleteDashboardProductsMutation} = productsApiSlice;