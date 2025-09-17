import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../interfaces'
import { addToCart } from '../../utils';

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
            state.cartItems = addToCart(state.cartItems, action.payload);
        },
        removeProductsFromCart: (state, action: PayloadAction<IProduct[]>) => {
            state.cartItems = action.payload;
        }
    },
});

export const { addProductToCart, removeProductsFromCart } = cartSlice.actions;

export default cartSlice;