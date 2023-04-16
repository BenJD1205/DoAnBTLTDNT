import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart.slice';
import authReducer from './auth/auth.slice';

export const store = configureStore({
    reducer: {
        // system
        cart: cartReducer,
        auth: authReducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
