import { Text, View, TouchableOpacity, TextInput,Image } from "react-native";
import styles from "./register.styles";
import {  images } from '../../constants';
import { publicAPI } from "../../utils/api";

import React, { useState } from "react";

const Register = ({ navigation }) => {
    const [tendangnhap, setTenDangNhap] = useState("");
    const [tennguoidung, setTenNguoiDung] = useState("");
    const [email, setEmail] = useState("");
    const [sodienthoai, setSoDienThoai] = useState("");
    const [matkhau, setMatKhau] = useState("");

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

    const handleRegister = async () => {
        try {
            const response = await publicAPI.post("/auth/register", {
                tenDangNhap: tendangnhap,
                tenNguoiDung: tennguoidung,
                email: email,
                sodienthoai: sodienthoai,
                matKhau: matkhau
            });
            if (response.data) {
                navigation.navigate("Login");
            }
        } catch (error) {
            console.log(error);
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
                        value={tendangnhap}
                        onChangeText={(data) => setTenDangNhap(data)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên Người Dùng</Text>
                    <TextInput
                        style={styles.input}
                        value={tennguoidung}
                        onChangeText={(data) => setTenNguoiDung(data)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Số Điện Thoại</Text>
                    <TextInput
                        style={styles.input}
                        value={sodienthoai}
                        onChangeText={(data) => setSoDienThoai(data)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(data) => setEmail(data)}
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
                <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                    <Text style={styles.text}>Đăng Ký</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.register}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.text1}>Already have an account ?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
