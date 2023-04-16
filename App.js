import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Cart, Product, Login, Register,Welcome,Walkthrough,Profile } from "./screens";
import {store} from './store';

export default function App() {

    const [fontsLoaded] = useFonts({
        "Poppins-Black":require('./assets/fonts/Poppins-Black.ttf'),
        "Poppins-Bold":require('./assets/fonts/Poppins-Bold.ttf'),
        "Poppins-SemiBold":require('./assets/fonts/Poppins-SemiBold.ttf'),
        "Poppins-Regular":require('./assets/fonts/Poppins-Regular.ttf'),
    });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
    

    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer onLayout={onLayoutRootView}>
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
                    <Stack.Screen name="Profile" component={Profile} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
