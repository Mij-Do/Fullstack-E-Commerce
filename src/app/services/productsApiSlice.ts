import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import CookieServices from '../../services/CookieServices';
import type { IProduct, IUploadResponse } from '../../interfaces';

export const productsApiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Products"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
    endpoints: builder => ({
        getDashboardProducts: builder.query({
            query: () => ({
                url: `/products?populate=thumbnail&populate=categories`,
            }),
            providesTags: (result) =>
                result
                    ? [...result.data?.map(({ documentId }: IProduct) => ({ type: 'Products' as const, id: documentId })), { type: 'Products', id: 'LIST' }]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        createDashboardProducts: builder.mutation({
            query: ( body : unknown) => ({
                url: `/products`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${CookieServices.get("jwt")}`
                },
                body,
            }),
            invalidatesTags: [{ type: "Products", id: "LIST" }]
        }),
        updateDashboardProducts: builder.mutation({
            query: ({ documentId, body }: {documentId: string; body: unknown}) => ({
                url: `/products/${documentId}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${CookieServices.get("jwt")}`
                },
                body,
            }),
            async onQueryStarted({documentId, ...patch}, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    productsApiSlice.util.updateQueryData("getDashboardProducts", undefined, draft => {
                        const product = draft.data.find((p: IProduct) => p.documentId === documentId);
                        if (product) {
                            Object.assign(product, patch);
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
                { type: "Products", id: documentId },
            ],
        }),
        uploadFile: builder.mutation<IUploadResponse[], FormData>({ 
            query: (body: FormData) => ({ 
                url: '/upload', 
                method: 'POST', 
                headers: {
                    Authorization: `Bearer ${CookieServices.get("jwt")}`
                },
                body,
            })
        }),    
        deleteDashboardProducts: builder.mutation({
            query: (documentId: string) => {
                return {
                    url: `/products/${documentId}`,
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

export const { 
    useGetDashboardProductsQuery, 
    useDeleteDashboardProductsMutation, 
    useUpdateDashboardProductsMutation, 
    useUploadFileMutation,
    useCreateDashboardProductsMutation
} = productsApiSlice;