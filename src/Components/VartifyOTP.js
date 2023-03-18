import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import ButtonRegister from '../Other/ButtonRegister';
import { send_VartifyOTP_Action, Check_Olduser_Action } from '../Model/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from '../Global';



const VartifyOTP = ({ navigation }) => {

      const [Pin, setPin] = useState('');
      const [param, setparam] = useState({ pin: '', token: '' });

      const send_VartifyOTP = async () => {
            AsyncStorage.getItem('OTPtoken', async (err, result) => {
                  param.pin = Pin;
                  param.token = result;
                  var response = await send_VartifyOTP_Action(param);
                  if (response.ResultStatus == 200) {
                        
                        AsyncStorage.getItem('PhoneRegister', async (err, result) => {
                              await Check_Olduser(result);
                        });
                  } else {
                       // Global.isLogin = true;
                      
                        //navigation.navigate('PathHome', { name: 'PathHome' })
                         alert("รหัสยืนยัน OTP ไม่ถูกต้อง")
                  }
            });
      };

      const Check_Olduser = async (phone) => {
           
            var response = await Check_Olduser_Action(phone);
            if (response.ResultStatus == 200) {
                  if (!!response.Result) {
                      
                        Global.userId = response.Result.id;
                        Global.isLogin = true;
                        navigation.navigate('สินค้า')
                        AsyncStorage.setItem('sessionID', Global.userId.toString());
                        AsyncStorage.setItem('isLoggedIn', 'true');

                  } else {
                        Global.isLogin = false;
                        navigation.navigate('NewUser', { name: 'NewUser' })
                  }

            } else {
                  Global.isLogin = true;
                  // navigation.navigate('MainMenu', { name: 'MainMenu' })
                  // alert("รหัสยืนยัน OTP ไม่ถูกต้อง")
            }     

      };

      return (
            <View 
                  style={{
                        flexDirection: 'column',
                        height: '100%',
                  }}>
                  <View style={{ backgroundColor: '#F6F6F6', flex: 0.15 }} />
                  <View style={{ backgroundColor: '#F6F6F6', flex: 0.8 }} >
                        <Text style={style.title}>ใส่รหัสยืนยัน</Text>
                        <Text style={style.subtitle}>รหัสยืนยันส่งไปยัง SMS บนโทรศัพท์มือถือของท่านที่ได้ระบุหมายเลข {Global.userPhone}</Text>
                        <TextInput style={style.inputOTP}
                              value={Pin}
                              onChangeText={text => setPin(text)}
                              maxLength={6}
                              keyboardType="numeric"
                              placeholder="รหัส OTP 6 หลัก"></TextInput>

                        <ButtonRegister style={style.ButtonPhone} onPress={() => send_VartifyOTP()} title="ต่อไป" />
                  </View>
                  <View style={{ backgroundColor: '#F6F6F6', flex: 0.05 }} >
                        <Text style={style.title_end}>ข้อกำหนด</Text>
                  </View>

            </View>
      )


}

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375; // Define the breakpoint for small screens

const style = StyleSheet.create({
      title: {
            color: '#232323',
            fontSize: isSmallScreen ? 18 : 25,
            marginLeft: 25,
            marginRight: 25,
            textAlign: 'left',
            fontWeight: 'bold'
      },
      subtitle: {
            color: '#F0C3C3',
            fontSize: isSmallScreen ? 12 : 18,
            marginTop: 25,
            marginLeft: 25,
            marginRight: 25,
            textAlign: 'left',
            fontWeight: 'normal'
      },
      inputOTP: {
            color: '#000000',
            fontSize: isSmallScreen ? 12 : 18,
            marginTop: 35,
            marginLeft: '20%',
            marginRight: '20%',
            height: 45,
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#F6F6F6',
            borderBottomColor: '#444444',
            borderBottomWidth: 2,
      },
      ButtonPhone: {

            marginTop: 35,
            marginLeft: 25,
            marginRight: 25,
            height: 45,
      },
      title_end: {
            color: '#BA3C3C',
            fontSize: isSmallScreen ? 10 : 18,
            marginLeft: 25,
            marginRight: 25,
            textAlign: 'center',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
      },
});
export default VartifyOTP