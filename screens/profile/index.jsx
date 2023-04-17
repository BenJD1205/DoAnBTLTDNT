import { View, Text,TouchableOpacity,TextInput, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../../store/auth/auth.slice'
import {icons} from '../../constants';
import styles from './profile.styles'

import { COLOURS, Items } from "../../constants";

const Profile = ({navigation}) => {

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');

  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() =>{
    if(user){
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  },[user])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      dispatch(authAction.logout())
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateProfile = () => {
    dispatch(authAction.updateUserInfo({
      id:user.id,
      username,
      email,
      phone,
      address
    }))
  }

  function renderHeader (){
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo
            name="menu"
            style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
        <MaterialCommunityIcons
            name="cart"
            style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  function renderContent(){
    return (
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Image source={icons.person} style={styles.img} />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputText}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={COLOURS.backgroundMedium}
            value={username}
            onChangeText={(data) => setUsername(data)}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
          style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLOURS.backgroundMedium}
            value={email}
            onChangeText={(data) => setEmail(data)}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputText}>Phone</Text>
          <TextInput
          style={styles.input}
            placeholder="Phone"
            placeholderTextColor={COLOURS.backgroundMedium}
            value={phone}
            onChangeText={(data) => setPhone(data)}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputText}>Address</Text>
          <TextInput
          style={styles.input}
            placeholder="Address"
            placeholderTextColor={COLOURS.backgroundMedium}
            value={address}
            onChangeText={(data) => setAddress(data)}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderContent()}
      <TouchableOpacity style={styles.update} onPress={handleUpdateProfile}>
        <Text style={styles.text}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile