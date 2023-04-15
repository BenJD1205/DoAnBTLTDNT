import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Cart, Product, Login, Register,Welcome,Walkthrough } from "./screens";

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Welcome"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="MyCart" component={Cart} />
                <Stack.Screen name="ProductInfo" component={Product} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Walkthrough" component={Walkthrough} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
