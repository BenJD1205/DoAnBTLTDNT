import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 80,
        padding: "auto",
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        color: "#383838",
    },
    form: {
        flex: 1,
        padding: 20,
        alignContent: "center",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 10,
    },
    input: {
        borderColor: "#9f9f9f",
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    btn: {
        marginTop: 14,
        width: "100%",
        padding: 10,
        backgroundColor: "#21268A",
    },
    text: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 14,
    },
    register: {
        marginTop: 14,
    },
    text1: {
        color: "#21268A",
        textAlign: "center",
        fontSize: 14,
    },
});

export default styles;
