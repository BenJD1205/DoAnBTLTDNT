import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { publicAPI } from "../../utils/api";
import jwtDecode from "jwt-decode";

const initialState = {
    user:null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login:(state,action) => {
            state.user = action.payload;
        },
        logout:(state,action) => {
            state.user = null;
        },
        setProperty: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        resetState: () => initialState,
    },
});

export const { login,logout,setProperty, resetState } = authSlice.actions;

function signIn (user){
    return async (dispatch) => {
        try{
            const res = await publicAPI.post("/auth/login",{username:user.username,password:user.password});
            const userInfo = jwtDecode(res.data.accessToken);
            dispatch(login(userInfo));
            await AsyncStorage.setItem('accessToken', res.data.accessToken);
        }
        catch(err){
            console.log(err)
        }
    }
}

function getUserInfo(){
    return async (dispatch) => {
        try{
            const token = await AsyncStorage.getItem('accessToken');
            const userInfo = jwtDecode(token);
            const res = await publicAPI.get(`/users/${userInfo.id}`);
            dispatch(login(res.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

function updateUserInfo(userInfo){
    return async (dispatch) => {
        try{
            const res = await publicAPI.put(`/users/${userInfo.id}`,userInfo);
            console.log(res.data);
            dispatch(login(res.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

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

export {getCurrentUser,signIn,getUserInfo,updateUserInfo};

export default authSlice.reducer;
