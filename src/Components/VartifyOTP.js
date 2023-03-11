import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import ButtonRegister from '../Other/ButtonRegister';
import { send_VartifyOTP_Action, Check_Olduser_Action } from '../Model/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
                        alert("รหัสยืนยัน OTP ไม่ถูกต้อง")
                  }
            });
      };

      const Check_Olduser = async (phone) => {

            var response = await Check_Olduser_Action(phone);
            if (response.ResultStatus == 200) {
                  if (!!response.Result) {
                        AsyncStorage.setItem('sessionID', response.Result.id);
                  } else {
                        navigation.navigate('NewUser', { name: 'NewUser' })
                  }

            } else {
                  alert("รหัสยืนยัน OTP ไม่ถูกต้อง")
            }

      };

      return (
            <View
                  style={{
                        flexDirection: 'column',
                        height: '100%',
                  }}>
                  <View style={{ backgroundColor: '#F6F6F6', flex: 0.05 }} />
                  <View style={{ backgroundColor: '#F6F6F6', flex: 0.9 }} >
                        <Text style={style.title}>ใส่รหัสยืนยัน</Text>
                        <Text style={style.subtitle}>รหัสยืนยันส่งไปยัง SMS บนโทรศัพท์มือถือของท่านที่ได้ระบุหมายเลข 084000XXXX</Text>
                        <TextInput style={style.inputOTP}
                              value={Pin}
                              onChangeText={text => setPin(text)}
                              maxLength={6}
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