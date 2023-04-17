import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart, Product, Login, Register,Welcome,Walkthrough,MyDrawer } from "./screens";
import {store} from './store';

export default function App() {

  const [token, setTokten] = useState(null);

  useEffect(() =>{
    async function fetchData() {
        const token = await AsyncStorage.getItem("accessToken");
        if(token){
          setTokten(token);
        }else{
          setTokten(null);
        }
    }
    fetchData();    
  },[])

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
                    initialRouteName={token ? "MyDrawer" : "Welcome"}
                >
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="Walkthrough" component={Walkthrough} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="MyDrawer" component={MyDrawer} />
                    <Stack.Screen name="MyCart" component={Cart} />
                    <Stack.Screen name="ProductInfo" component={Product} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
