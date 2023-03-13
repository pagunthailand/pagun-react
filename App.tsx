import { View, Text, Alert, StatusBar } from 'react-native'
import MainMenu from './src/Components/MainMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Global from './src/Global'
import Register from './src/Components/Register'
import React from 'react'
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const App = () => {

  return (
    <>
      <MainMenu></MainMenu>
    </>


  )
}

export default App