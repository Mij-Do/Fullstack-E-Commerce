import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
            }
        }),
        deleteDashboardProducts: builder.mutation({
            query: (documentId: string) => {
                return {
                    url: `api/products/${documentId}`,
                    method: "DELETE",
                };
            },
        }),
    }),
});

export const {useGetDashboardProductsQuery, useDeleteDashboardProductsMutation} = productsApiSlice;