import { View, Text, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from '../Global';

const Onpage = ({ navigation }) => {

        

          AsyncStorage.getItem('isLoggedIn').then((res) => {

                    if (res == 'true') {
                              Global.isLogin = 'true';
                              navigation.navigate('สินค้า')
                    } else {
                              Global.isLogin = 'false';
                              navigation.navigate('Register')
                    }

          })

          return (
                    <View
                              style={{
                                        flexDirection: 'column',
                                        height: '100%',
                              }}>
                              <View style={{
                                        backgroundColor: '#FFFFFF', flex: 1, flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                              }} >
                                        <Image
                                                  style={{ flex: 1, width: 200, height: 40, resizeMode: 'contain' }}
                                                  source={require('../assets/Logo/BG.png')}></Image>
                              </View>

                    </View>
          )
}

export default Onpage