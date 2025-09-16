import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginSlice';
import cartSlice from './features/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        login: loginSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
