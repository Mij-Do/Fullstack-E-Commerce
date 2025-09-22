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
            query: (arg: string) => {
                return {
                    url: `/api/products?populate=thumbnail&populate=categories`,
                }
            },
            providesTags: (result) =>
            result
            ? [...result.data?.map(({documentId}: IProduct) => ({ type: 'Products' as const, documentId })), 'Products']
            : ['Products'],
        }),
        updateDashboardProducts: builder.mutation({
            query: ({ documentId, body }) => ({
                url: `/api/products/${documentId}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${CookieServices.get("jwt")}`
                },
                body,
            }),
            async onQueryStarted({ documentId, updatedData }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    productsApiSlice.util.updateQueryData("getDashboardProducts", documentId, draft => {
                        const product = draft.data.find((p: IProduct) => p.documentId === documentId);
                        if (product) {
                            Object.assign(product, updatedData);
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ({ documentId }) => [
                { type: "Products", id: documentId }
            ],
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

export const {useGetDashboardProductsQuery, useDeleteDashboardProductsMutation, useUpdateDashboardProductsMutation} = productsApiSlice;