import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import Global from '../Global';


const Product = ({navigation}) => {

  const logout = async () => {
    await AsyncStorage.setItem('isLoggedIn','false');
    Global.isLogin = 'false'
    navigation.navigate('Register'); // navigate back to the login page
  };


  return (
    <View>
      <Text>Product</Text>
      <Button
      title="Logout"
      onPress={() => logout()}
    />
    </View>
  )
}

export default Product