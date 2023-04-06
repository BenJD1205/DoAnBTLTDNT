import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import styles from "./login.styles";

const Login = ({ navigation }) => {
    const [tendangnhap, setTenDangNhap] = useState("");
    const [matkhau, setMatKhau] = useState("");

    function renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.title}>WELCOME YOU TO SHOP SHOE</Text>
            </View>
        );
    }

    const handleLogin = async () => {
        navigation.navigate("Home");
        // await fetch(`${config.backendPort}/auth/login`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ tendangnhap, matkhau }),
        // })
        //     .then((res) => res.json())
        //     .then((user) => {
        //         console.log(user);
        //         const data = user[0];
        //         navigation.navigate("Loaihoa");
        //     })
        //     .catch((err) => console.log(err));
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên đăng nhập</Text>
                    <TextInput
                        style={styles.input}
                        value={tendangnhap}
                        onChangeText={(data) => setTenDangNhap(data)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mật khẩu</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        value={matkhau}
                        onChangeText={(data) => setMatKhau(data)}
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
