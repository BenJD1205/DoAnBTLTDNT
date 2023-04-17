import React, {useEffect} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../home';
import ProfileScreen from '../profile';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {

  return (
        <Drawer.Navigator  
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
  )
}

export default MyDrawer