import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart(state, action) {
            state.cartItems = action.payload;
        },
        addToCart(state, action) {
            const existingIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
                };
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
            }
            AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            Toast.show({
                type: 'success',
                text1: 'Increase product successfully',
            });
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                );

                state.cartItems = nextCartItems;
            }

            AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            Toast.show({
                type: 'success',
                text1: 'Decrease product successfully',
            });
        },
        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem._id === action.payload._id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item._id !== cartItem._id
                    );

                    state.cartItems = nextCartItems;
                }
                AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                Toast.show({
                    type: 'success',
                    text1: 'Remove product from cart successfully',
                });
                return state;
            });
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart(state, action) {
            state.cartItems = [];
            AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart, getCart } =
    cartSlice.actions;

export default cartSlice.reducer;
