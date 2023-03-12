import { View, Text, Alert } from 'react-native'
import React from 'react'
import MainMenu from './src/Components/MainMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Global from './src/Global'
import Register from './src/Components/Register'

const App = () => {

  return (
    <>
      <MainMenu></MainMenu>
    </>

  )
}

export default App