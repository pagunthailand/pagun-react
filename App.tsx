import { View, Text, Alert, StatusBar, Platform } from 'react-native'
import MainMenu from './src/Components/MainMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Global from './src/Global'
import React, { useEffect, useState } from 'react'
import firebase from '@react-native-firebase/app';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { updateFCMToken_Action } from './src/Model/Action'
import { PermissionsAndroid } from 'react-native';
// import PushNotification from 'react-native-push-notification';

const App = () => {
  let myVariable: any;
  const [param, setparam] = useState({ id: null, fcmToken: '' });

  // Initialize the push notification library
// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//   },
// });

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  requestUserPermission();
  registerAppWithFCM();
  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;

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
    myVariable = null;
    await messaging().registerDeviceForRemoteMessages();
    messaging().setAutoInitEnabled(true);
    messaging().getToken().then(token => {
      Global.googleToken = token;
      AsyncStorage.setItem('googleToken', token);
      AsyncStorage.getItem('sessionID', async (err, result_sessionID) => {
        param.fcmToken = token;
        myVariable = result_sessionID;
        param.id = myVariable;
        //Alert.alert('A new FCM message arrived!', JSON.stringify(param));
         console.log('Token', Platform.OS, token)
         console.log('param.userid', param.id ,result_sessionID);
        if (param.id != null) {
          var response = await updateFCMToken_Action(param);
          if (response.ResultStatus == 200) {
            console.log('Update Token Success');
            
          } else { 
          }
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