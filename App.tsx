import { View, Text, Alert, StatusBar } from 'react-native'
import MainMenu from './src/Components/MainMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Global from './src/Global'
import React, { useEffect, useState } from 'react'
import firebase from '@react-native-firebase/app';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { updateFCMToken_Action } from './src/Model/Action'

const App = () => {
  let myVariable: any;
  const [param, setparam] = useState({ userid: null, token: '' });
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().getToken().then(token => {
      Global.googleToken = token;
      AsyncStorage.setItem('googleToken', token);
      AsyncStorage.getItem('sessionID', async (err, result_sessionID) => {
        param.token = token;
        myVariable = result_sessionID;
        param.userid = myVariable;
        //Alert.alert('A new FCM message arrived!', JSON.stringify(param));
        var response = await updateFCMToken_Action(param,token,param.userid);
        if (response.ResultStatus == 200) {
        } else {
        }
      });

    });

    return unsubscribe;
  }, []);





  return (
    <>
      <MainMenu></MainMenu>
    </>


  )
}

export default App