import { View, Text } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import MainMenu from './src/Components/MainMenu'
import Register from './src/Components/Register'
import VartifyOTP from './src/Components/VartifyOTP'
import NewUser from './src/Components/NewUser'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class App extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  async componentDidMount() {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    const {isLoggedIn} = this.state;
    const Stack_app = createNativeStackNavigator();

    return (
      <>
        {!!isLoggedIn ?
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
          : <MainMenu></MainMenu>}
      </>
      // <View>
      //   {isLoggedIn ? (
      //     <Text>Welcome to My Page!</Text>
      //   ) : (
      //     <Text>Please log in to continue.</Text>
      //   )}
      // </View>
    );
  }
}

export default App 