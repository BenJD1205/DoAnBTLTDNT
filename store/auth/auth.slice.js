import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { publicAPI } from "../../utils/api";

const initialState = {
    user:null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login:async(state,action) => {
            state.user = action.payload;
        },
        logout:async(state,action) => {
            state.user = null;
            await AsyncStorage.removeItem('user');
        },
        setProperty: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        resetState: () => initialState,
    },
});

export const { login,logout,setProperty, resetState } = authSlice.actions;

function getCurrentUser(id){
    return async (dispatch) => {
        try{
            const res = await publicAPI.get(`/users/${id}`);
            dispatch(login(res.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

export {getCurrentUser };

export default authSlice.reducer;
