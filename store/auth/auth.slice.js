import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { publicAPI } from '../../utils/api';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        },
        setProperty: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        resetState: () => initialState,
    },
});

export const { login, logout, setProperty, resetState } = authSlice.actions;

function signIn(user, navigation) {
    return async (dispatch) => {
        try {
            const res = await publicAPI.post('/auth/login', {
                username: user.username,
                password: user.password,
            });
            const userInfo = jwtDecode(res.data.accessToken);
            if (res.data) {
                navigation.navigate('MyDrawer');
                dispatch(login(userInfo));
                await AsyncStorage.setItem('accessToken', res.data.accessToken);
                Toast.show({
                    type: 'success',
                    text1: 'Login successfully',
                });
            }
        } catch (err) {
            console.log(err);
            Toast.show({
                type: 'error',
                text1: `${err.response.data.message}`,
            });
        }
    };
}

function getUserInfo() {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const userInfo = jwtDecode(token);
            const res = await publicAPI.get(`/users/${userInfo.id}`);
            dispatch(login(res.data));
        } catch (err) {
            console.log(err);
        }
    };
}

function updateUserInfo(userInfo) {
    return async (dispatch) => {
        try {
            const res = await publicAPI.put(`/users/${userInfo.id}`, userInfo);
            console.log(res.data);
            dispatch(login(res.data));
        } catch (err) {
            console.log(err);
        }
    };
}

function getCurrentUser(id) {
    return async (dispatch) => {
        try {
            const res = await publicAPI.get(`/users/${id}`);
            dispatch(login(res.data));
        } catch (err) {
            console.log(err);
        }
    };
}

export { getCurrentUser, signIn, getUserInfo, updateUserInfo };

export default authSlice.reducer;
