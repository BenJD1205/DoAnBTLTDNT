import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    cart:[],
    quantity:0,
    total:0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart:async(state,action) => {
            state.quantity +=1;
            state.cart.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
            await AsyncStorage.setItem('cart', JSON.stringify(state.cart));
        },
        remove:async(state,action) => {
            state.quantity +=1;
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
            state.total += action.payload.price * action.payload.quantity;
            await AsyncStorage.setItem('cart', JSON.stringify(state.cart));
        },
        setProperty: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        resetState: () => initialState,
    },
});

export const { addToCart, remove,setProperty, resetState } = cartSlice.actions;

export default cartSlice.reducer;
