import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainMenu from './src/Components/MainMenu'
import Register from './src/Components/Register'
import VartifyOTP from './src/Components/VartifyOTP'
import NewUser from './src/Components/NewUser'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App =  () => {


  const Stack_app = createNativeStackNavigator();


  return (
    
        <NavigationContainer >
          <Stack_app.Navigator screenOptions={({ route }) => ({
            headerShown: route.name !== 'Register' ? true : false
          })}>
            <Stack_app.Screen
              name="Register"
              component={Register}
              options={{ title: '' }}
            />
            <Stack_app.Screen options={{
              title: '',
              headerTintColor: '#000000',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#F6F6F6',
              },
            }} name="VartifyOTP" component={VartifyOTP} />
            <Stack_app.Screen options={{
              title: '',
              headerTintColor: '#000000',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#F6F6F6',
              },
            }} name="NewUser" component={NewUser} />
          </Stack_app.Navigator>
        </NavigationContainer>
  

  )
}

export default App 