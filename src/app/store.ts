import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginSlice from './features/loginSlice';
import cartSlice from './features/cartSlice';
import globalSlice from './features/globalSlice';
import { apiSlice } from './services/apiSlice';

const persistConfig = {
    key: 'cart',
    storage,
}

const persistedCart = persistReducer(persistConfig, cartSlice.reducer);


export const store = configureStore({
    reducer: {
        cart: persistedCart,
        global: globalSlice.reducer,
        login: loginSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
