import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  images } from '../../constants';
import { signIn } from "../../store/auth/auth.slice";

import styles from "./login.styles";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    function renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.title}>WELCOME YOU TO SHOP YOUR'S</Text>
                <Image source={images.logo} 
                    style={{
                        width: 100,
                        height: 100
                    }} 
                />
            </View>
        );
    }

    const handleLogin = async () => {
        try{
            dispatch(signIn({username,password},navigation));
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên đăng nhập</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(data) => setUsername(data)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mật khẩu</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        value={password}
                        onChangeText={(data) => setPassword(data)}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={styles.text}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.register}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.text1}>Are you have an account ?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
