import { View, Text, Alert, StatusBar, Platform } from 'react-native'
import MainMenu from './src/Components/MainMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Global from './src/Global'
import React, { useEffect, useState } from 'react'
import firebase from '@react-native-firebase/app';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { updateFCMToken_Action } from './src/Model/Action'
import { PermissionsAndroid } from 'react-native';

const App = () => {
  let myVariable: any;
  const [param, setparam] = useState({ userid: null, token: '' });

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  requestUserPermission();
  registerAppWithFCM();
  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;


    // 
    // return unsubscribe;
  }, []);


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const defaultAppMessaging = firebase.messaging();
  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
    messaging().setAutoInitEnabled(true);
    messaging().getToken().then(token => {
      Global.googleToken = token;
      AsyncStorage.setItem('googleToken', token);
      AsyncStorage.getItem('sessionID', async (err, result_sessionID) => {
        param.token = token; 
        myVariable = result_sessionID;
        param.userid = myVariable;
        Alert.alert('A new FCM message arrived!', JSON.stringify(param));
        console.log('Token', Platform.OS, token)
        var response = await updateFCMToken_Action(param, token, param.userid);
        if (response.ResultStatus == 200) {
        } else {
        }
      });

    }, (err) => {
      console.log('err. ==> ', Platform.OS, err)
    });

  }



  return (
    <>
      <MainMenu></MainMenu>
    </>


  )
}

export default App