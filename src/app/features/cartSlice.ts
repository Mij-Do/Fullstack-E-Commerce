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
        removeProductsFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(items => items.id !== action.payload);
        },
        clearAllProducts: (state) => {
            state.cartItems = [];
        }
    },
});

export const { addProductToCart, removeProductsFromCart, clearAllProducts } = cartSlice.actions;

export default cartSlice;