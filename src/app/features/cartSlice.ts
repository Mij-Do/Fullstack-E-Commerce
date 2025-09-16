import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../interfaces'

interface initialState {
    cartItems: IProduct[];
}

const initialState: initialState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<IProduct>) => {
            state.cartItems = [...state.cartItems, action.payload];
        }
    },
});

export const { addProductToCart } = cartSlice.actions;

export default cartSlice;